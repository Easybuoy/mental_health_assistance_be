import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  recepientId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model('chat', ChatSchema);

export default Chat;
