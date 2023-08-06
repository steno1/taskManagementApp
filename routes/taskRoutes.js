// Import necessary controller functions and middleware

import { createTask, deleteTask, getAllTask, showTaskStat, updateTask } from "../controllers/TaskController.js"; // Importing controller functions

import authenticateTask from "../middleWare/Authenticate.js"; // Importing task-specific authentication middleware
import express from "express"; // Import the express module

const router = express.Router(); // Create an instance of Express Router

// Define routes and associate them with respective controller functions and middleware

router.route('/createTask').post(createTask); // POST request for task creation handled by the 'createTask' function
router.route('/getAllTask').get(getAllTask); // GET request to fetch all tasks handled by the 'getAllTask' function
router.route('/stat').get(showTaskStat); // GET request for task statistics handled by the 'showTaskStat' function
router.route('/:id').delete(authenticateTask, deleteTask); // DELETE request for task deletion, with task-specific authentication middleware
router.route('/:id').patch(authenticateTask, updateTask); // PATCH request for task update, with task-specific authentication middleware

export default router; // Export the router instance for use in other files
