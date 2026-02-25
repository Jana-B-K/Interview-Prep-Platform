import { Router } from "express";
import * as userController from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/', userController.getUser);
userRouter.put('/', userController.updateUser);

export default userRouter; 