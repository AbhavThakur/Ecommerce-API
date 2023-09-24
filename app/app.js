import dotenv from 'dotenv';
import express from 'express';

import dbConnect from '../config/dbConnect.js';
import {
  globalErrorHandler,
  websiteNotFound,
} from '../middlewares/globalErrHandler.js';
// Routers import

import {
  brandRouter,
  categoryRouter,
  colorRouter,
  productRouter,
  userRouter,
} from '../routes/index.js';

dotenv.config();
// db connect
dbConnect();
const app = express();

//pass incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const version = '/api/v1';
app.use(`${version}/users`, userRouter);
app.use(`${version}/products`, productRouter);
app.use(`${version}/categories`, categoryRouter);
app.use(`${version}/brands`, brandRouter);
app.use(`${version}/colors`, colorRouter);

// error handler
app.use(websiteNotFound);
app.use(globalErrorHandler);

export default app;
