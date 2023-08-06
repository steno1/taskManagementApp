// Import necessary modules and error classes

import { BadRequestError, notFoundError } from '../error/index.js'; // Importing custom error classes

import { StatusCodes } from "http-status-codes"; // Importing HTTP status codes
import Task from '../model/task.js'; // Importing the Task model
import checkPermission from '../utils/checkPermissions.js'; // Importing the checkPermission function
import moment from 'moment/moment.js';
import mongoose from 'mongoose';

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
    throw new notFoundError(`No task with id ${taskId}`); // If the task with the given ID is not found, throw a NotFoundError
  }
  
  // Check if the authenticated user has permission to update the task
  checkPermission(req.user, task.createdBy); // Note: checkPermission is not defined in this code snippet

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
    throw new notFoundError(`No job with id ${taskId}`); // If the task with the given ID is not found, throw a NotFoundError
  }

  // Check if the authenticated user has permission to delete the task
  checkPermission(req.user, task.createdBy); // Note: checkPermission is not defined in this code snippet

  // Remove the task from the database
  await task.deleteOne({ _id: taskId });

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

// Function to show task statistics
const showTaskStat = async (req, res) => {
  // Using the aggregate function of the Task model to perform aggregation operations
  let stat = await Task.aggregate([
    // The $match stage filters tasks that are created by the authenticated user
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    // The $group stage groups the matched tasks by their status and calculates the count of tasks in each group
    { $group: { _id: "$status", count: { $sum: 1 } } }
  ]);

  // Using the reduce function to transform the result array into a more readable object
  stat = stat.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    /* acc[title] = count;: This line adds a property to the acc 
    (accumulator) object using the title (status) as the key and sets 
    its value to the count*/
    return acc;
  }, {});
   
  // Calculate default task statistics based on task statuses
const defaultStats = {
  Completed: stat.Completed || 0, // Count of completed tasks, default to 0 if not available in 'stat' result
  Abandoned: stat.Abandoned || 0,  // Count of abandoned tasks, default to 0 if not available in 'stat' result
  InProgress: stat.InProgress || 0 // Count of tasks in progress, default to 0 if not available in 'stat' result
};

// Perform aggregation to retrieve monthly task application data
// Perform aggregation to retrieve monthly task application data
let monthlyApplication = await Task.aggregate([
  {
    $match: {
      createdBy: new mongoose.Types.ObjectId(req.user.userId) // Match tasks created by the authenticated user
    }
  },
  {
    $group: {
      _id: {
        year: {
          $year: "$createdAt" // Extract the year from the 'createdAt' timestamp of the tasks
        },
        month: {
          $month: "$createdAt" // Extract the month from the 'createdAt' timestamp of the tasks
        }
      },
      count: {
        $sum: 1 // Count the number of tasks in each group (year and month)
      }
    }
  },
  {
    $sort: {
      "_id.year": -1, // Sort the groups in descending order of year
      "_id.month": -1  // Within each year, sort the months in descending order
    }
  },
  {
    $limit: 6 // Limit the result to the most recent 6 months
  }
]);

// Map and transform the aggregated result for monthly task application
monthlyApplication = monthlyApplication.map((item) => {
  const { _id: { year, month }, count } = item;

  // Convert numeric month to human-readable format (e.g., "Jan 2023")
  const date = moment().month(month - 1).year(year).format("MMM Y");

  return { date, count }; // Return an object containing the formatted date and task count
}).reverse(); // Reverse the array to have the oldest data first

// Sending the transformed stat object as a response
res.status(StatusCodes.OK).json({ defaultStats, monthlyApplication });
};


// Export all the functions as part of the module for use in other files
export { updateTask, createTask, deleteTask, showTaskStat, getAllTask };
