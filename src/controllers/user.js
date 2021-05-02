import BaseController from './base';

import User from '../database/models/user';

class Users extends BaseController {
  /**
   * Get Users Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/users/getUsers
   * @description This function implements the logic for getting users.
   * @access Public
   */
  async getUsers(req, res) {
    try {
      const users = await User.find({
        $or: [{ userType: 1 }, { userType: 2 }],
      }).select('-password');

      return super.success(res, 200, 'Users gotten successfully', {
        users,
      });
    } catch (error) {
      return super.error(res, 500, 'Unable to get users');
    }
  }

  /**
   * Get Therapists Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/users/getTherapists
   * @description This function implements the logic for getting all therapists.
   * @access Public
   */
   async getTherapists(req, res) {
    try {
      const therapists = await User.find({
        userType: 3
      }).select('-password');

      return super.success(res, 200, 'Users gotten successfully', {
        therapists,
      });
    } catch (error) {
      return super.error(res, 500, 'Unable to get therapists');
    }
  }
}

export default Users;
