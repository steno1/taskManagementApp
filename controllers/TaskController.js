// Import necessary modules and error classes

import { BadRequestError, notFoundError } from '../error/index.js'; // Importing custom error classes

import { StatusCodes } from "http-status-codes"; // Importing HTTP status codes
import Task from '../model/task.js'; // Importing the Task model
import checkPermission from '../utils/checkPermissions.js'; // Importing the checkPermission function
import moment from 'moment/moment.js'; // Importing the Moment.js library for date manipulation
import mongoose from 'mongoose';

// Importing the Mongoose library for interacting with MongoDB

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

const getAllTask = async (req, res) => {
  // Extracting query parameters from the request
  const { status, priority, sort, search } = req.query;

  // Constructing a query object to filter tasks based on createdBy field
  const queryObject = {
    createdBy: req.user.userId
  };

  // If status is not "all", add status as a filter to the query
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if(priority && priority !=="all"){
    queryObject.priority=priority  
  }
 // If search is provided, use a regex to search in both title and description
if (search) {
  // Construct a search query using a regular expression for case-insensitive matching
  queryObject.$or = [
    { Title: { $regex: search, $options: "i" } }, // Search in Title field
    { Description: { $regex: search, $options: "i" } } // Search in Description field
  ];
}

// Find tasks based on the constructed query object
  // Note: No await here, as this line only creates a query
let result = Task.find(queryObject);

 // Chain sorting conditions based on the 'sort' parameter
  // Note: No sorting is applied yet, these are just potential conditions

// Check the value of the 'sort' parameter for sorting tasks
if (sort === 'latest') {
  // Sort tasks in descending order of creation date (newest first)
  result = result.sort("-createdAt");
}
if (sort === 'Oldest') {
  // Sort tasks in ascending order of creation date (oldest first)
  result = result.sort("createdAt");
}
if (sort === 'A-Z') {
  // Sort tasks in ascending alphabetical order of title
  result = result.sort("Title");
}
if (sort === 'Z-A') {
  // Sort tasks in descending alphabetical order of title
  result = result.sort("-Title");
}

// Pagination setup
const page = Number(req.query.page) || 1;  // Get the requested page number from query, default to 1 if not provided
const limit = Number(req.query.limit) || 10;  // Get the number of items per page from query, default to 10 if not provided
const skip = (page - 1) * limit;  // Calculate the number of items to skip based on the requested page number and items per page
result = result.skip(skip).limit(limit);  // Apply the pagination by skipping 'skip' items and limiting the result to 'limit' items

// Await the execution of the query and store the result in 'tasks'
const tasks = await result;

// Calculate the total number of tasks based on the query filters
const totalTasks = await Task.countDocuments(queryObject);

// Calculate the total number of pages required for pagination
const numOfPages = Math.ceil(totalTasks / limit);

// Send a response with the fetched tasks, totalTasks count, and numOfPages
res.status(StatusCodes.OK).json({
  tasks, // The tasks for the requested page
  totalTasks, // The total number of tasks matching the query filters
  numOfPages // The total number of pages required for pagination
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
