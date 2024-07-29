import express from "express";
import {getUserByIdController} from "../controller/userControllers";
import {authenticateUser} from "../middleware/AuthenticateUser";

const userRouter = express();

userRouter.get("/me", authenticateUser, getUserByIdController);

export {userRouter};