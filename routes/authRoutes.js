// Import necessary controller functions and middleware

import { login, register, update } from "../controllers/AuthController.js"; // Importing controller functions

import authenticateUser from "../middleWare/Authenticate.js"; // Importing authentication middleware
import express from "express"; // Import the express module

const router = express.Router(); // Create an instance of Express Router

// Define routes and associate them with respective controller functions and middleware
router.route('/register').post(register); // POST request for user registration handled by the 'register' function
router.route('/login').post(login); // POST request for user login handled by the 'login' function
router.route('/update').patch(authenticateUser, update); // PATCH request for user profile update, with authentication middleware

export default router; // Export the router instance for use in other files
