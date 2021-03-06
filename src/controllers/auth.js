import BaseController from './base';
import { generatePhoneAuthCode, generateToken } from '../utils';

import User from '../database/models/user';
import DEFAULT from '../config/constants';

class Auth extends BaseController {
  /**
   * Register Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/auth/register
   * @description This function implements the logic for registering a new user.
   * @access Public
   */
  async register(req, res) {
    try {
      const generatedPhoneAuthCode = generatePhoneAuthCode();
      const user = await User.create({
        ...req.body,
        isActive: true,
        image: req.body.image ? req.body.image : DEFAULT.PROFILE_IMAGE,
        phoneVerificationCode: generatedPhoneAuthCode,
      });

      const {
        fullName,
        email,
        phone,
        isPhoneVerified,
        isActive,
        userTypeString,
        image,
        date,
      } = user;

      const userResponse = {
        fullName,
        email,
        phone,
        isPhoneVerified,
        isActive,
        image,
        date,
        userType: userTypeString,
      };
      return super.success(res, 201, 'User registered successfully', {
        user: userResponse,
      });
    } catch (error) {
      return super.error(res, 500, 'Unable to register user');
    }
  }

  /**
   * Login Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/auth/login
   * @description This function implements the logic for logging in a new user.
   * @access Public
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        email,
      });

      if (user) {
        const isValidPassword = await user.validatePassword(password);

        if (isValidPassword) {
          const token = generateToken({
            email,
            id: user.id,
            userType: user.userType,
            isPhoneVerified: user.isPhoneVerified,
            name: user.fullName,
            userType: user.userTypeString,
            hasActiveSubscription: user.hasActiveSubscription,
          });
          return super.success(res, 200, 'User login successful', {
            token,
          });
        }
        return super.error(res, 401, 'Invalid login details!');
      }

      return super.error(res, 401, 'Invalid login details!');
    } catch (error) {
      return super.error(res, 500, 'Unable to login user');
    }
  }

  /**
   * Login Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/auth/login
   * @description This function implements the logic for logging in a new user.
   * @access Public
   */
  async getUserToken(req, res) {
    try {
      const { user } = req;
      const token = generateToken({
        email: user.email,
        id: user.id,
        userType: user.userType,
        isPhoneVerified: user.isPhoneVerified,
        name: user.fullName,
        userType: user.userTypeString,
        hasActiveSubscription: user.hasActiveSubscription,
      });
      return super.success(res, 200, 'User token generated successfully', {
        token,
      });
    } catch (error) {
      return super.error(res, 500, 'Unable to get user token');
    }
  }

  /**
   * Verify Phone Code Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/auth/verifyphonecode
   * @description This function implements the logic for veryfing a new user.
   * @access Private
   */
  async verifyPhoneCode(req, res) {
    try {
      const { user } = req;
      const { phoneCode } = req.body;
      if (user.isPhoneVerified == true) {
        return super.error(res, 400, 'Phone already verified');
      }

      if (user.validatePhoneVerificationCode(phoneCode)) {
        user.isPhoneVerified = true;
        await user.save();

        return super.success(res, 200, 'Phone verified successfully');
      }

      return super.error(res, 400, 'Invalid verification code');
    } catch (error) {
      return super.error(res, 500, 'Unable to verify phone code');
    }
  }
}

export default Auth;
