import asyncHandler from 'express-async-handler';
import { CouponModal } from '../model/index.js';

export const createCouponControllers = asyncHandler(async (req, res) => {
  const { code, startDate, endDate, discount } = req.body;
  const coupon = await CouponModal.findOne({ code });

  if (coupon) {
    throw new Error('Coupon already exists');
  }

  if (isNaN(discount)) {
    throw new Error('Discount must be a number');
  }
  //create coupon
  const newCoupon = await CouponModal.create({
    code,
    startDate,
    endDate,
    discount,
    user: req.userAuthId,
  });

  res.status(201).json({
    success: true,
    message: 'Coupon created successfully',
    data: newCoupon,
  });
});
