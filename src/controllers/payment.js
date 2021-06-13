import BaseController from './base';

import Payments from '../database/models/payment';

class Payment extends BaseController {
  /**
   * Create user subscription route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/payment/createPayment
   * @description This function implements the logic for creating a user pamyment.
   * @access Private
   */
  async createPayment(req, res) {
    try {
      const { trxref, status, transaction, amount } = req.body;
      const payment = await Payments.create({
        userId: req.userId,
        trxref,
        transaction,
        amount,
        status,
      });

      return super.success(res, 200, 'Payment created successfully', {
        payment,
      });
    } catch (error) {
      return super.error(res, 500, 'Unable to create payment');
    }
  }
}

export default Payment;
