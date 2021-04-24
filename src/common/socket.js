import Chat from '../database/models/chat';

export const runSocketFunctions = (io) => {
  io.on('connection', (socket) => {
    console.log('emited', socket.id);
    const id = socket.handshake.query.id;
    console.log(id, socket.id);
    socket.join(id);
    // socket.emit('message', 'Chale');
    socket.on('send message', async ({senderId, message, recepientId }) => {
      const payload = {
        senderId: senderId,
        recepientUserId: recepientId,
        message: message,
      };

      await Chat.create(payload);
      socket.to(recepientId).emit('message', payload);
      // io.emit('message', body);
      // socket.broadcast.to(recepient).emit('receive-message');
    });
  });
};
