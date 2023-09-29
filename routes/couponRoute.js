import express from 'express';
import {
  createCouponControllers,
  getAllCouponsControllers,
} from '../controllers/couponControllers.js';
import { isloggedIn } from '../middlewares/isLoggedIn.js';

const couponRouter = express.Router();

couponRouter.post('/', isloggedIn, createCouponControllers);
couponRouter.get('/', getAllCouponsControllers);

export default couponRouter;
