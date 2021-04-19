import http from 'http';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import xss from 'xss-clean';
// import socketio from 'socket.io';

import authRoutes from './routes/auth';
require('./config/db');
const app = express();
const server = http.createServer(app);
// const io = socketio(server);

// io.on('connection', (socket) => {
//   console.log('emited');
//   socket.emit('message', 'Chale')
// });

// 
// Json Body Parser
app.use(express.json({ limit: '10kb' }));

// Cors
app.use(cors());

// Helmet
app.use(helmet());

// Data Sanitization against XSS
app.use(xss());

app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'Welcome to ELA API 👋🏾' });
});

app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
  const error = new Error('Route Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    status: 'error',
    message: error.message,
  });
  next();
});

export default server;