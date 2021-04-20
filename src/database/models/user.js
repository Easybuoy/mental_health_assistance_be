import mongoose from 'mongoose';
import {
  generatePasswordHash,
  validatePassword as validatePasswordHash,
} from '../../utils';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
    unique: true,
  },
  userType: {
    type: Number,
    required: true,
    default: 1,
  },
  terms: {
    type: Boolean,
    required: true,
    default: false,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false,
  },
  phoneVerificationCode: {
    type: Number,
    required: true,
    unique: true,
  },
  isPhoneVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', function () {
  this.password = generatePasswordHash(this.password);
});

const User = mongoose.model('users', UserSchema);

User.prototype.validatePassword = function (password) {
  return validatePasswordHash(this.password, password);
};

export default User;
