import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import mongoose from "mongoose";
import {todoRouter} from "./routes/Todo";

const app = express();
app.use(bodyParser.json());



const PORT = process.env.PORT || 3000;

app.use("/api/v1/todos",todoRouter)
app.get("/", async (req, res) => {
    res.send("hello")
});



try {
    mongoose.connect(process.env.DB_URI as string).then(r => console.log("DB server connected"));
    app.listen(PORT, () => {
        console.log(`Server is listening at port ${PORT}`);
    });
} catch (e) {
}