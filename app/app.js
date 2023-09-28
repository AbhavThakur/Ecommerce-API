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
  orderRouter,
  productRouter,
  reviewRouter,
  userRouter,
} from '../routes/index.js';
import { stripe } from '../utils/helper.js';

dotenv.config();
// db connect
dbConnect();
const app = express();

//pass incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Stripe webhooks

const endpointSecret =
  'whsec_2e06f4ae747b60b5ee4a5df0a3d140feab02764737c0a34752c78693b8501eaf';

app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

// routes
const version = '/api/v1';
app.use(`${version}/users`, userRouter);
app.use(`${version}/products`, productRouter);
app.use(`${version}/categories`, categoryRouter);
app.use(`${version}/brands`, brandRouter);
app.use(`${version}/colors`, colorRouter);
app.use(`${version}/reviews`, reviewRouter);
app.use(`${version}/orders`, orderRouter);

// global route
app.use(`${version}/success`, (req, res) => {
  res.send('success');
});
app.use(`${version}/cancel`, (req, res) => {
  res.send('cancel');
});

app.use('/', (req, res) => {
  res.send('hello world');
});

// error handler
app.use(websiteNotFound);
app.use(globalErrorHandler);

export default app;
