import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import configVariables from '../config';

export const generatePhoneAuthCode = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

export const generateToken = (payload) =>
  jwt.sign(payload, configVariables.JWT_SECRET, { expiresIn: '1d' });

export const verifyToken = (payload) =>
  jwt.verify(payload, configVariables.JWT_SECRET);

export const generatePasswordHash = (password) => {
  if (password) {
    return bcrypt.hashSync(password, parseInt(configVariables.SALT_ROUNDS));
  }
  return null;
};

export const validatePassword = (existingPassword, password) => {
  const isValid = bcrypt.compareSync(password, existingPassword);
  return isValid;
};

export const convertUserType = (type) => {
  if (type === 1) {
    return 'Peer';
  } else if (type === 2) {
    return 'Volunteer Therapist';
  } else if (type === 3) {
    return 'Therapist';
  } else {
    return 'Peer';
  }
};
