// Import necessary controller functions and middleware

import { login, register, update } from "../controllers/AuthController.js"; // Importing controller functions

import authenticateUser from "../middleWare/Authenticate.js"; // Importing authentication middleware
import express from "express"; // Import the express module
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 20, // Limit each IP to 20 requests per `window` (here, per 15 minutes)
	message:"Too many requests from this Ip Address, Please try again after 15 minutes"
})

const router = express.Router(); // Create an instance of Express Router

// Define routes and associate them with respective controller functions and middleware
router.route('/register').post(limiter,register); // POST request for user registration handled by the 'register' function
router.route('/login').post(limiter,login); // POST request for user login handled by the 'login' function
router.route('/update').patch(authenticateUser, update); // PATCH request for user profile update, with authentication middleware

export default router; // Export the router instance for use in other files
