import Chat from '../database/models/chat';
import User from '../database/models/user';

export const runSocketFunctions = (io) => {
  io.on('connection', async (socket) => {
    const id = socket.handshake.query.id;
    socket.join(id);

    socket.on('get user name', async (recepientId) => {
      const user = await User.findOne({
        _id: recepientId,
      }).select('-_id');
      socket.emit('user mame', user.fullName);
    });

    socket.on('get messages', async (recepientId) => {
      const messages = await Chat.find({
        $and: [
          { $or: [{ senderId: id }, { senderId: recepientId }] },
          { $or: [{ recepientId: recepientId }, { recepientId: id }] },
        ],
      }).select('-_id');

      socket.emit('messages', messages);
    });

    socket.on('send message', async ({ senderId, message, recepientId }) => {
      const payload = {
        senderId: senderId,
        recepientId: recepientId,
        message: message,
      };

      await Chat.create(payload);
      socket.to(recepientId).emit('message', payload);
    });

    // Call
    // Initial call
    socket.on('initCall', (data) => {
      io.to(data.userToCall).emit('hi', {
        from: data.from,
      });
    });

    socket.on('initAcceptCall', (data) => {
      io.to(data.to).emit('initCallAccepted');
    });

    socket.on('callUser', (data) => {
      io.to(data.userToCall).emit('hey', {
        signal: data.signalData,
        from: data.from,
      });
    });

    socket.on('acceptCall', (data) => {
      io.to(data.to).emit('callAccepted', data.signal);
    });

    socket.on('disconnectCall', (data) => {
      io.to(data.to).emit('callDisconnected');
    });

    socket.on('declineCall', (data) => {
      io.to(data.to).emit('callDeclined');
    });
  });
};
