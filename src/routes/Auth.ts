import express from "express";
import {login, signup} from "../controller/authController";

const authRouter = express();

authRouter.post("/login", login);

authRouter.post("/signup", signup);


// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiZWRlbHdlaXNzIiwiaWQiOiI2NjkzZDRkNTY2YTM4NjM5YmU3MjU3YmQifSwiaWF0IjoxNzIwOTY0MzA5LCJleHAiOjE3MjA5Njc5MDl9.mqFKKUpv7ON7u6V_ZVrm_1iRmOgH1dkhXcC2nFk3WGc"

export {authRouter};


