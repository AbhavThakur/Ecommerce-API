import asyncHandler from 'express-async-handler';
import { OrderModal } from '../model/index.js';
import { endpointSecret, stripe } from '../utils/helper.js';

export const stripeWebhookControllers = asyncHandler(
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
