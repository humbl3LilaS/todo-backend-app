import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import mongoose from "mongoose";
import {todoRouter} from "./routes/Todo";
import {authRouter} from "./routes/Auth";
import cors from "cors";
import {userRouter} from "./routes/User";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use("/api/v1/todos", todoRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.get("/", async (req, res) => {
    res.send("hello");
});

try {
    mongoose
        .connect(process.env.DB_URI as string)
        .then((r) => console.log("DB server connected"));
    app.listen(PORT, () => {
        console.log(`Server is listening at port ${PORT}`);
    });
} catch (e) {
}


export default app;