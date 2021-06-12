import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  therapistUserId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Subscription = mongoose.model('subscription', SubscriptionSchema);

export default Subscription;
