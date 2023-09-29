import asyncHandler from 'express-async-handler';

import { version } from '../app/app.js';
import { CouponModal, OrderModal, Product, UserModal } from '../model/index.js';
import { stripe } from '../utils/helper.js';

export const createOrderControllers = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;

  const { coupon } = req?.query;

  //------------ check if coupon exists ----------
  if (!coupon) {
    throw new Error('Coupon not found');
  }
  const couponExists = await CouponModal.findOne({
    code: coupon?.toUpperCase(),
  });
  if (!couponExists) {
    throw new Error('Coupon not found');
  }
  if (couponExists?.isExpired) {
    throw new Error('Coupon expired');
  }
  if (couponExists?.daysLeft < 0) {
    throw new Error('Coupon expired');
  }
  const discount = couponExists?.discount / 100;
  // ---------- Coupon End ----------

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
    totalPrice: couponExists ? totalPrice - totalPrice * discount : totalPrice,
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

  const lineItems = orderItems?.map((item) => {
    return {
      price_data: {
        currency: 'inr',
        product_data: {
          name: item?.name,
          description: item?.description,
        },
        unit_amount: item?.price * 100,
      },
      quantity: item?.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    customer_email: userExists?.email,
    metadata: {
      orderId: JSON.stringify(order._id),
    },
    mode: 'payment',
    success_url: `${req.protocol}://${req.headers.host}${version}/success`,
    cancel_url: `${req.protocol}://${req.headers.host}${version}/cancel`,
  });

  //push order Id to user and save
  userExists.orders.push(order._id);
  await userExists.save();

  res.json({
    success: true,
    message: 'Order created successfully',
    url: session.url,
    data: order,
  });
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

// get order by Order ID
export const getOrderByIdControllers = asyncHandler(async (req, res) => {
  const order = await OrderModal.findById(req.params.id);
  if (!order) {
    throw new Error('Order not found');
  }
  res.json({
    success: true,
    message: 'Order found',
    data: order,
  });
});

// update order by Order ID

export const updateOrderControllers = asyncHandler(async (req, res) => {
  const order = await OrderModal.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    {
      new: true,
    }
  );
  if (!order) {
    throw new Error('Order not found');
  }
  res.json({
    success: true,
    message: 'Order updated',
    data: order,
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
