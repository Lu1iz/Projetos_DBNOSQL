import express from "express";
import cors from "cors";
import connectDb from "./db.js";
import itemRouter from "./routes/itemRouter.js";

const port = 4000;
const app = express();

connectDb();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/items', itemRouter);

app.listen(port, () => {
    console.log(`Server api running on port ${port}!`);
})