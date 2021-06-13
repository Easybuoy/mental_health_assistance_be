import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  trxref: {
    type: Schema.Types.String,
    required: true,
  },
  status: {
    type: Schema.Types.String,
    required: true,
  },
  transaction: {
    type: Schema.Types.String,
    required: true,
  },
  amount: {
    type: Schema.Types.String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model('payment', PaymentSchema);

export default Payment;
