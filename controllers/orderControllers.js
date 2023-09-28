import asyncHandler from 'express-async-handler';

import { OrderModal, Product, UserModal } from '../model/index.js';
import { stripe } from '../utils/helper.js';

export const createOrderControllers = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;

  // Check user exists (if not, throw error)
  const userExists = await UserModal.findById(req.userAuthId);
  if (!userExists) {
    throw new Error('User not found');
  }
  if (!userExists?.hasShippingAddress) {
    throw new Error('User has no shipping address');
  }
  // Check if orderItems exists
  if (orderItems && orderItems?.length === 0) {
    throw new Error('No order items');
  }
  // create order
  const order = await OrderModal.create({
    orderItems,
    shippingAddress,
    totalPrice,
    user: req.userAuthId,
  });

  //Update the Product quantity
  // finding the orderItems array from the product
  const products = await Product.find({ _id: { $in: orderItems } });

  orderItems?.map(async (order) => {
    // if  productID and ID of product in orderItems are the same
    const product = products?.find((product) => {
      return product?._id?.toString() === order?._id?.toString();
    });

    if (product) {
      // increase the total sold quantity
      product.totalSold += order.quantity;
    }
    //update the product with new totalSold quantity
    await product.save();
  });

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: 'T-shirt',
            description: 'best for parties',
          },
          unit_amount: 10 * 100,
        },
        quantity: 2,
      },
    ],
    mode: 'payment',
    success_url: 'https://ecommerce-rfxn.onrender.com/api/v1/success',
    cancel_url: 'https://ecommerce-rfxn.onrender.com/api/v1/cancel',
  });

  //push order Id to user and save
  userExists.orders.push(order._id);
  await userExists.save();

  res.send({
    url: session.url,
  });
  // res.json({
  //   success: true,
  //   message: 'Order created successfully',
  //   data: order,
  //   User: userExists,
  // });
});

// get all orders per user
export const getOrdersControllers = asyncHandler(async (req, res) => {
  const orders = await OrderModal.find({ user: req.userAuthId });
  res.json({
    success: true,
    message: 'Orders found',
    data: orders,
  });
});

// delete order by Order ID
export const deleteOrderControllers = asyncHandler(async (req, res) => {
  const order = await OrderModal.findByIdAndDelete(req.params.id);
  if (!order) {
    throw new Error('Order not found');
  }
  res.status(200).json({
    success: true,
    message: 'Order deleted',
    data: order,
  });
});
