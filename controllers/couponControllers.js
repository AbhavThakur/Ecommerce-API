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
    code: code?.toUpperCase(),
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

// get all coupons
export const getAllCouponsControllers = asyncHandler(async (req, res) => {
  const coupons = await CouponModal.find();
  res.json({
    success: true,
    message: 'Coupons found',
    data: coupons,
  });
});

// get coupon by user id
export const getCouponByIdControllers = asyncHandler(async (req, res) => {
  const coupons = await CouponModal.findById(req.params.id);
  res.json({
    success: true,
    message: 'Coupons found',
    data: coupons,
  });
});

// update coupon by coupon id
export const updateCouponControllers = asyncHandler(async (req, res) => {
  const coupon = await CouponModal.findByIdAndUpdate(
    req.params.id,
    {
      code: req.body.code?.toUpperCase(),
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      discount: req.body.discount,
    },
    {
      new: true,
    }
  );
  if (!coupon) {
    throw new Error('Coupon not found');
  }
  res.json({
    success: true,
    message: 'Coupon updated',
    data: coupon,
  });
});

// delete coupon by coupon id

export const deleteCouponControllers = asyncHandler(async (req, res) => {
  const coupon = await CouponModal.findByIdAndDelete(req.params.id);
  if (!coupon) {
    throw new Error('Coupon not found');
  }
  res.json({
    success: true,
    message: 'Coupon deleted',
    data: coupon,
  });
});
