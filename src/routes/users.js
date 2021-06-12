import express from 'express';

import UserController from '../controllers/user';

import { validateToken } from '../middlewares';

const Router = express.Router();

const userController = new UserController();

const { getUsers, getTherapists, getUserTherapists } = userController;

// @route   GET api/users/getUsers
// @desc    Get users
// @access  Private
Router.get('/getPeers', validateToken, getUsers);

// @route   GET api/users/getTherapists
// @desc    Get users
// @access  Private
Router.get('/getTherapists', validateToken, getTherapists);

// @route   GET api/users/getUserTherapists
// @desc    Get users
// @access  Private
Router.get('/getUserTherapists', validateToken, getUserTherapists);

export default Router;
