import User from '../database/models/user';
import { verifyToken } from '../utils';

/**
 * validateInput
 * @param {function} validationMethod
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} object
 * @description This function returns object of validations required.
 */
export const validateInput = (validationMethod) => (req, res, next) => {
  const { errors, isValid } = validationMethod(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json({ status: 'error', errors });
  }

  next();
};

/**
 * Validate Token
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} object
 * @description This function checks if token provided is valid.
 */
export const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ status: 'error', message: 'No Token Provided' });
  }

  try {
    const data = verifyToken(token);

    if (data) {
      req.userId = data.id;
      const existingUser = await User.findOne({
        _id: req.userId,
      }).select('-password');

      if (!existingUser) {
        return res
          .status(404)
          .json({ status: 'error', message: 'User Not Found' });
      }
      req.user = existingUser;
      next();
    }
  } catch (error) {
    return res
      .status(401)
      .json({ status: 'error', message: 'Invalid Token Provided' });
  }
};

/**
 * Validate Therapist
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} object
 * @description This function checks if the user is a therapist.
 */
export const isTherapist = (req, res, next) => {
  if (req.user.userType !== 3) {
    return res
      .status(403)
      .json({ message: 'Forbidden from accessing this resource' });
  }
  next();
};

/**
 * Validate User
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} object
 * @description This function checks if the user is a normal user.
 */
 export const isUser = (req, res, next) => {
  if (req.user.userType !== 1 && req.user.userType !== 2) {
    return res
      .status(403)
      .json({ message: 'Forbidden from accessing this resource' });
  }
  next();
};
