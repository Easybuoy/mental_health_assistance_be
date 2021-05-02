import express from "express";

import UserController from "../controllers/user";

import { validateToken } from "../middlewares";

const Router = express.Router();

const userController = new UserController();

const {
  getUsers,
  getTherapists
} = userController;

// @route   GET api/users/getUsers
// @desc    Get users
// @access  Private
Router.get("/getUsers", validateToken , getUsers);

// @route   GET api/users/getUsers
// @desc    Get users
// @access  Private
Router.get("/getTherapists", validateToken , getTherapists);



export default Router;
