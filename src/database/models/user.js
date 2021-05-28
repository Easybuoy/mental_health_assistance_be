import mongoose from 'mongoose';
import {
  generatePasswordHash,
  validatePassword as validatePasswordHash,
  convertUserType,
} from '../../utils';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  fullName: {
    type: Schema.Types.String,
    required: true,
  },
  userType: {
    type: Schema.Types.Number,
    required: true,
    default: 1,
  },
  userTypeString: {
    type: Schema.Types.String,
    required: true,
    default: 'User',
  },
  terms: {
    type: Schema.Types.Boolean,
    required: true,
    default: false,
  },
  phone: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  image: {
    type: Schema.Types.String,
    required: true,
  },
  isActive: {
    type: Schema.Types.Boolean,
    required: true,
    default: false,
  },
  phoneVerificationCode: {
    type: Schema.Types.Number,
    required: true,
    unique: true,
  },
  hasActiveSubscription: {
    type: Schema.Types.Boolean,
    required: true,
    default: false,
  },
  isPhoneVerified: {
    type: Schema.Types.Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Schema.Types.Date,
    default: Date.now,
  },
});

UserSchema.pre('save', function () {
  this.password = generatePasswordHash(this.password);
  this.userTypeString = convertUserType(this.userType);
});

const User = mongoose.model('users', UserSchema);

User.prototype.validatePassword = function (password) {
  return validatePasswordHash(this.password, password);
};

export default User;
