import express from 'express';

import PaymentController from '../controllers/payment';

import { validateToken, isTherapist, isUser } from '../middlewares';

import { validateInput } from '../middlewares';

import { validateCreatePaymentInput } from '../validations/payment';

const Router = express.Router();

const paymentController = new PaymentController();

const { createPayment } =
paymentController;

// @route   POST api/payment/createPayment
// @desc    Create payment
// @access  Private
Router.post(
  '/createPayment',
  validateInput(validateCreatePaymentInput),
  validateToken,
  isUser,
  createPayment
);


export default Router;
