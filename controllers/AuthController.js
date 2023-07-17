// Importing necessary error modules

import { BadRequestError, notFoundError, unAuthorizedError } from '../error/index.js';

import { StatusCodes } from 'http-status-codes';
import User from "../model/user.js";

// Controller for user registration
const register = async (req, res) => {
  // Extracting name, email, and password from the request body
  const { name, email, password } = req.body;

  // Checking if the name is provided
  if (!name) {
    throw new BadRequestError("Please provide a name");
  }

  // Checking if the email is provided
  if (!email) {
    throw new BadRequestError("Please provide an email");
  }

  // Checking if the password is provided
  if (!password) {
    throw new BadRequestError("Please provide a password");
  }

  // Checking if the user with the provided email already exists
  const userAlreadyExist = await User.findOne({ email });
  if (userAlreadyExist) {
    throw new BadRequestError("Email already in use");
  }

  // Creating a new user with the provided data
  const user = await User.create({ name, email, password });

  // Generating a JWT token for the user
  const token = user.createJwt();

  // Sending the response with the created user and token
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastName
    },
    token
  });
}

// Controller for user login
const login = async (req, res) => {
  const { email, password } = req.body;

  // Checking if the email is provided
  if (!email) {
    throw new BadRequestError("Please provide an email");
  }

  // Checking if the password is provided
  if (!password) {
    throw new BadRequestError("Please provide a password");
  }

  // Checking if the user with the provided email exists
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new unAuthorizedError("User does not exist");
  }

  // Comparing the provided password with the stored hashed password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new unAuthorizedError("Wrong password");
  }

  // Generating a JWT token for the user
  const token = user.createJwt();

  // Clearing the password field in the user object
  user.password = undefined;

  // Sending the response with the user object and token
  res.status(StatusCodes.OK).json({
    user,
    token
  });
}

// Controller for updating user information
const update = async (req, res) => {
  res.send("update");
}

// Exporting the controllers
export { register, login, update };
