
import { BadRequestError, notFoundError } from '../error/index.js'; 

import { StatusCodes } from "http-status-codes"; 
import Task from '../model/task.js'; 
import checkPermission from '../utils/checkPermissions.js'; 
import moment from 'moment/moment.js';
import mongoose from 'mongoose';

const createTask = async (req, res) => {
  const { Title, Description } = req.body;

  if (!Title) {
    throw new BadRequestError("Please provide Title"); 
  }

  if (!Description) {
    throw new BadRequestError("Please provide Description"); 
  }

  req.body.createdBy = req.user.userId; 

  const newTask = await Task.create(req.body);

  res.status(StatusCodes.CREATED).json({ newTask });
};
const updateTask = async (req, res) => {
  const { id: taskId } = req.params;
  const { Title, Description } = req.body;

  if (!Description || !Title) {
    throw new BadRequestError('Please provide all values'); 
  }
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    throw new notFoundError(`No task with id ${taskId}`);
  }
  
  checkPermission(req.user, task.createdBy);

  const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true 
  });
  
  res.status(StatusCodes.OK).json({ updatedTask });
};

const deleteTask = async (req, res) => {
  
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    throw new notFoundError(`No job with id ${taskId}`); 
  }

  checkPermission(req.user, task.createdBy); 
 
  await task.deleteOne({ _id: taskId });

  res.status(StatusCodes.OK).json({ msg: "Successfully removed job" });
};

const getAllTask = async (req, res) => {
  const { status, priority, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId
  };

  if (status && status !== "all") {
    queryObject.status = status;
  }
  if(priority && priority !=="all"){
    queryObject.priority=priority  
  }

if (search) {
  queryObject.$or = [
    { Title: { $regex: search, $options: "i" } }, 
    { Description: { $regex: search, $options: "i" }
  ];
}
let result = Task.find(queryObject);

if (sort === 'latest') {
  result = result.sort("-createdAt");
}
if (sort === 'Oldest') {
  result = result.sort("createdAt");
}
if (sort === 'A-Z') {

  result = result.sort("Title");
}
if (sort === 'Z-A') {

  result = result.sort("-Title");
}

const page = Number(req.query.page) || 1; 
const limit = Number(req.query.limit) || 10; 
const skip = (page - 1) * limit;  
result = result.skip(skip).limit(limit);  

const tasks = await result;

const totalTasks = await Task.countDocuments(queryObject);

const numOfPages = Math.ceil(totalTasks / limit);

res.status(StatusCodes.OK).json({
  tasks, 
  totalTasks, 
  numOfPages 
});
};

const showTaskStat = async (req, res) => {

  let stat = await Task.aggregate([
 
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },

    { $group: { _id: "$status", count: { $sum: 1 } } }
  ]);

  stat = stat.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
 
    return acc;
  }, {});
   
const defaultStats = {
  Completed: stat.Completed || 0, 
  Abandoned: stat.Abandoned || 0,  
  InProgress: stat.InProgress || 0 
};

let monthlyApplication = await Task.aggregate([
  {
    $match: {
      createdBy: new mongoose.Types.ObjectId(req.user.userId) 
    }
  },
  {
    $group: {
      _id: {
        year: {
          $year: "$createdAt" 
        },
        month: {
          $month: "$createdAt" 
        }
      },
      count: {
        $sum: 1 
      }
    }
  },
  {
    $sort: {
      "_id.year": -1, 
      "_id.month": -1  
    }
  },
  {
    $limit: 6 
  }
]);


monthlyApplication = monthlyApplication.map((item) => {
  const { _id: { year, month }, count } = item;

  const date = moment().month(month - 1).year(year).format("MMM Y");

  return { date, count };
}).reverse();

res.status(StatusCodes.OK).json({ defaultStats, monthlyApplication });
};

export { updateTask, createTask, deleteTask, showTaskStat, getAllTask };
