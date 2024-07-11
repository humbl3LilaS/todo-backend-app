import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();
app.use(bodyParser.json());

dotenv.config();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("hello madafaka");
});


app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});