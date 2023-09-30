import dotenv from 'dotenv';
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import dbConnect from '../config/dbConnect.js';
import {
  globalErrorHandler,
  websiteNotFound,
} from '../middlewares/globalErrHandler.js';

// Routers import
import { stripeWebhookControllers } from '../controllers/stripeControllers.js';

import {
  brandRouter,
  categoryRouter,
  colorRouter,
  couponRouter,
  orderRouter,
  productRouter,
  reviewRouter,
  userRouter,
} from '../routes/index.js';

dotenv.config();
// db connect
dbConnect();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//Stripe webhooks
app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhookControllers
);

//pass incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// routes
export const version = '/api/v1';
app.use(`${version}/users`, userRouter);
app.use(`${version}/products`, productRouter);
app.use(`${version}/categories`, categoryRouter);
app.use(`${version}/brands`, brandRouter);
app.use(`${version}/colors`, colorRouter);
app.use(`${version}/reviews`, reviewRouter);
app.use(`${version}/orders`, orderRouter);
app.use(`${version}/coupons`, couponRouter);

// global route
app.use('/:fileName', (req, res) => {
  let fileName = req.params.fileName;
  res.sendFile(path.join(__dirname, 'public', fileName + '.html'));
});
app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// error handler
app.use(websiteNotFound);
app.use(globalErrorHandler);

export default app;
