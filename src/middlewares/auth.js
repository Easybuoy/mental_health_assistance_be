import User from '../database/models/user';
import BaseController from '../controllers/base';

class AuthMiddleware extends BaseController {
  /**
   * validateSignup
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} object
   * @description This function validates the email and phone to see if it does not exist in the database.
   */
  async validateSignup(req, res, next) {
    const { email, phone } = req.body;
    const existingUser = await User.findOne({
      $or: [{ phone: phone }, { email: email }],
    });

    if (existingUser) {
      if (
        existingUser.phone === phone &&
        existingUser.email === email
      ) {
        return super.error(res, 400, 'Email and Phone already exists');
      }

      if (existingUser.phone === phone) {
        return super.error(res, 400, 'Phone already exists');
      }

      if (existingUser.email === email) {
        return super.error(res, 400, 'Email already exists');
      }
    }
    next();
  }
}

export default AuthMiddleware;
