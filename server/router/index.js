import express from "express";
import { User } from '../server.js';

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
  res.statusCode = 418;
  res.send();
});

export default indexRouter;