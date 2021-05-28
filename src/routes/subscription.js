import express from 'express';

import SubscriptionController from '../controllers/subscription';

import { validateToken, isTherapist, isUser } from '../middlewares';

import { validateInput } from '../middlewares';

import { validateCreateSubscriptionInput } from '../validations/subscription';

const Router = express.Router();

const subscriptionController = new SubscriptionController();

const { getUserSubscriptions, getTherapistSubscriptions, createSubscription } =
  subscriptionController;

// @route   GET api/subscription/createSubscription
// @desc    Get users
// @access  Private
Router.post(
  '/createSubscription',
  validateInput(validateCreateSubscriptionInput),
  validateToken,
  isUser,
  createSubscription
);

// @route   GET api/subscription/getUserSubscriptions
// @desc    Get users
// @access  Private
Router.get(
  '/getUserSubscriptions',
  validateToken,
  isUser,
  getUserSubscriptions
);

// @route   GET api/subscription/getTherapistSubscriptions
// @desc    Get users
// @access  Private
Router.get(
  '/getTherapistSubscriptions',
  validateToken,
  isTherapist,
  getTherapistSubscriptions
);

export default Router;
