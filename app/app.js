import dotenv from 'dotenv';
import express from 'express';
import dbConnect from '../config/dbConnect.js';

import {
  globalErrorHandler,
  websiteNotFound,
} from '../middlewares/globalErrHandler.js';
import userRouter from '../routes/usersRoute.js';

dotenv.config();
// db connect
dbConnect();
const app = express();
//pass incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routes
app.use('/api/v1/users', userRouter);
// error handler
app.use(websiteNotFound);
app.use(globalErrorHandler);

export default app;
