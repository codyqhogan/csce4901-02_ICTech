import express from 'express';
const app = express();
import mongoose from "mongoose";
//require("dotenv").config();
import dotenv from "dotenv";
import indexRouter from './router/index.js';
import userRouter from './router/user.js';

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

const port = 3001;
const uri = process.env.MONGODB_CONNECTION_STRING;

mongoose
    .connect(uri, { useNewUrlParser: true })
    .then(() => console.log("MongoDb Connected"));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
export const User = db.model('User', new mongoose.Schema({ name: String }));

app.listen(port, () => {console.log("Listening on port 3001")});

app.use('/', indexRouter)
  .use('/users', userRouter);