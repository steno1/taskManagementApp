// Import necessary modules and error classes

import { BadRequestError, notFoundError } from '../error/index.js'; // Importing custom error classes

import CustomApiError from '../error/CustomApi.js'; // Importing a custom error class (not used in this code)
import { StatusCodes } from "http-status-codes"; // Importing HTTP status codes
import Task from '../model/task.js'; // Importing the Task model
import checkPermission from '../utils/checkPermissions.js'; // Importing the checkPermission function

// Function to create a new task
const createTask = async (req, res) => {
  // Extracting Title and Description from the request body
  const { Title, Description } = req.body;

  // Check if Title and Description are provided
  if (!Title) {
    throw new BadRequestError("Please provide Title"); // Throwing a BadRequestError if Title is not provided
  }

  if (!Description) {
    throw new BadRequestError("Please provide Description"); // Throwing a BadRequestError if Description is not provided
  }

  // Set the createdBy field in the request body to the authenticated user's userId
  req.body.createdBy = req.user.userId; // Assuming the user is authenticated and userId is available in the request object
  
  // Create a new task instance using the Task model and save it to the database
  const newTask = await Task.create(req.body);

  // Send a response with the newly created task
  res.status(StatusCodes.CREATED).json({ newTask });
};

// Function to update an existing task
const updateTask = async (req, res) => {
  // Extracting taskId, Title, and Description from the request parameters and body
  const { id: taskId } = req.params;
  const { Title, Description } = req.body;

  // Check if Title and Description are provided
  if (!Description || !Title) {
    throw new BadRequestError('Please provide all values'); // Throwing a BadRequestError if Title or Description is not provided
  }

  // Find the task by its ID in the database
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    // If the task with the given ID is not found, throw a NotFoundError
    throw new notFoundError(`No task with id ${taskId}`);
  }
  
  // Check if the authenticated user has permission to update the task
  checkPermission(req.user, task.createdBy); // checkPermission is not defined in this code snippet

  // Update the task with the new data in the request body
  const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true, // Return the updated document after the update
    runValidators: true // Run schema validators on the update
  });

  // Send a response with the updated task
  res.status(StatusCodes.OK).json({ updatedTask });
};

// Function to delete a task (currently only sends a response, no actual deletion)
const deleteTask = async (req, res) => {
  // Extracting taskId from the request parameters
  const { id: taskId } = req.params;

  // Find the task by its ID in the database
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    // If the task with the given ID is not found, throw a NotFoundError
    throw new notFoundError(`No job with id ${taskId}`);
  }

  // Check if the authenticated user has permission to delete the task
  checkPermission(req.user, task.createdBy); // checkPermission is not defined in this code snippet

  // Remove the task from the database
  await task.deleteOne({_id:taskId});

  // Send a response indicating successful deletion
  res.status(StatusCodes.OK).json({ msg: "Successfully removed job" });
};

// Function to get all tasks created by the authenticated user
const getAllTask = async (req, res) => {
  // Fetch all tasks from the database that belong to the user with the specified createdBy field
  const tasks = await Task.find({ createdBy: req.user.userId });

  // Send a response with the fetched tasks, totalTasks count, and numOfPages (currently hardcoded to 1)
  res.status(StatusCodes.OK).json({
    tasks,
    totalTasks: tasks.length,
    numOfPages: 1
  });
};

// Function to show task statistics (currently only sends a response)
const showTaskStat = async (req, res) => {
  // Sending a response with a message
  res.send("Show task stats");
};

// Export all the functions as part of the module for use in other files
export { updateTask, createTask, deleteTask, showTaskStat, getAllTask };
