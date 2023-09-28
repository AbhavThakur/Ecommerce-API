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

// routes
const version = '/api/v1';
app.use(`${version}/users`, userRouter);
app.use(`${version}/products`, productRouter);
app.use(`${version}/categories`, categoryRouter);
app.use(`${version}/brands`, brandRouter);
app.use(`${version}/colors`, colorRouter);
app.use(`${version}/reviews`, reviewRouter);
app.use(`${version}/orders`, orderRouter);

//Stripe webhooks
// This is your Stripe CLI webhook secret for testing your endpoint locally.
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
      case 'payment_intent.created':
        const paymentIntentCreated = event.data.object;
        // Then define and call a function to handle the event payment_intent.created
        break;
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

// error handler
app.use(websiteNotFound);
app.use(globalErrorHandler);

export default app;
