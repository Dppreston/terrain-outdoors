import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/router";
// require("/dotenv/config");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/", router);

const dbOptions = {
  dbName: "terrain",
  useNewUrlParser: true,
};

mongoose
  .connect(
    "mongodb+srv://dpdanepreston:terraininventory@terraininventory.ublvcfh.mongodb.net/terrain?retryWrites=true&w=majority",
    dbOptions
  )
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => console.log(err));

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

export {};
