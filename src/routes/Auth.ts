import express from "express";
import {login, signup} from "../controller/authController";

const authRouter = express();

authRouter.post("/login", login);

authRouter.post("/signup", signup);

export {authRouter};


