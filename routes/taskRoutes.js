import {createTask, deleteTask, getAllTask, showTaskStat, updateTask} 
from "../controllers/TaskController.js";

import authenticateTask from "../middleWare/Authenticate.js";
import express from "express"

const router =express.Router();


router.route('/createTask').post(createTask)
router.route('/getAllTask').get(getAllTask)
router.route('/stat').get(showTaskStat)
router.route('/:id').delete(deleteTask)
router.route('/updateTask').patch(updateTask)

export default router