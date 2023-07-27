import { login, register, update } from 
"../controllers/AuthController.js"

import authenticateUser from "../middleWare/Authenticate.js";
import express from "express"

const router=express.Router();

router.route('/register').post(register);
router.route('/login').post(login)
router.route('/update').patch(authenticateUser, update)

export default router;
