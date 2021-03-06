import BaseController from './base';

import Subscriptions from '../database/models/subscription';
import User from '../database/models/user';

class Subscription extends BaseController {
  /**
   * Create user subscription route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/subscription/createSubscription
   * @description This function implements the logic for creating a user subscriptions.
   * @access Private
   */
  async createSubscription(req, res) {
    try {
      const recentSubscription = await Subscriptions.findOneAndUpdate(
        {
          userId: req.userId,
          isActive: true,
        },
        { $set: { isActive: false } },
        { new: true, runValidators: true }
      ).sort('-date');

      const subscription = await Subscriptions.create({
        userId: req.userId,
        therapistUserId: req.body.therapistUserId,
        plan: 1,
        isActive: true,
      });

      await User.findOneAndUpdate(
        { _id: req.userId },
        { $set: { hasActiveSubscription: true } },
        { new: true, runValidators: true }
      );

      return super.success(res, 200, 'Subscription created successfully', {
        subscription,
      });
    } catch (error) {
      return super.error(res, 500, 'Unable to create subscription');
    }
  }

  /**
   * Get User Subscrptions Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/subscription/getUserSubscriptions
   * @description This function implements the logic for getting user subscriptions.
   * @access Public
   */
  async getUserSubscriptions(req, res) {
    try {
      const subscriptions = await Subscriptions.find({
        userId: req.userId,
      });

      return super.success(res, 200, 'Subscriptions gotten successfully', {
        subscriptions,
      });
    } catch (error) {
      return super.error(res, 500, 'Unable to get subscriptions');
    }
  }

  /**
   * Get Therapists Subscriptions Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/subscriptions/getTherapistSubscriptions
   * @description This function implements the logic for getting therapist subscriptions.
   * @access Public
   */
  async getTherapistSubscriptions(req, res) {
    try {
      const subscriptions = await Subscriptions.find({
        therapistUserId: req.userId,
      });

      return super.success(res, 200, 'Subscriptions gotten successfully', {
        subscriptions,
      });
    } catch (error) {
      return super.error(res, 500, 'Unable to get subscriptions');
    }
  }
}

export default Subscription;
