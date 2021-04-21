import BaseController from "./base";
import { generatePhoneAuthCode, generateToken } from "../utils";

import User from '../database/models/user';


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
        phoneVerificationCode: generatedPhoneAuthCode,
      });

      const {
        fullName,
        email,
        phone,
        isPhoneVerified,
        isActive,
        createdAt,
        updatedAt,
      } = user;

      const userResponse = {
        fullName,
        email,
        phone,
        isPhoneVerified,
        isActive,
        createdAt,
        updatedAt,
      };
      return super.success(res, 201, "User registered successfully", {
        user: userResponse,
      });
    } catch (error) {
      console.log(error)
      return super.error(res, 500, "Unable to register user");
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
         email
      });

      if (user) {
        const isValidPassword = await user.validatePassword(password);

        if (isValidPassword) {
          const token = generateToken({
            email,
            id: user.id,
            userType: user.userType,
            isPhoneVerified: user.isPhoneVerified,
          });
          return super.success(res, 200, "User login successful", {
            token,
          });
        }
        return super.error(res, 401, "Invalid login details!");
      }

      return super.error(res, 401, "Invalid login details!");
    } catch (error) {
      return super.error(res, 500, "Unable to login user");
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
        return super.error(res, 400, "Phone already verified");
      }

      if (user.validatePhoneVerificationCode(phoneCode)) {
        user.isPhoneVerified = true;
        await user.save();

        return super.success(res, 200, "Phone verified successfully");
      }

      return super.error(res, 400, "Invalid verification code");
    } catch (error) {
      return super.error(res, 500, "Unable to verify phone code");
    }
  }
}


export default Auth;
