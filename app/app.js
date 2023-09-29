import dotenv from 'dotenv';
import express from 'express';

import dbConnect from '../config/dbConnect.js';
import {
  globalErrorHandler,
  websiteNotFound,
} from '../middlewares/globalErrHandler.js';

// Routers import
import OrderModal from '../model/OrderModal.js';
import {
  brandRouter,
  categoryRouter,
  colorRouter,
  orderRouter,
  productRouter,
  reviewRouter,
  userRouter,
} from '../routes/index.js';
import { endpointSecret, stripe } from '../utils/helper.js';

dotenv.config();
// db connect
dbConnect();
const app = express();

//Stripe webhooks
app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      const { orderId } = session.metadata;
      const paymentStatus = session.payment_status;
      const paymentMethod = session.payment_method_types[0];
      const totalAmount = session.amount_total / 100;
      const currency = session.currency;

      await OrderModal.findByIdAndUpdate(
        JSON.parse(orderId),
        {
          paymentStatus,
          paymentMethod,
          totalPrice: totalAmount,
          currency,
        },
        { new: true }
      );
    } else {
      console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

//pass incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
export const version = '/api/v1';
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
