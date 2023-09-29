import express from 'express';
import { createCouponControllers } from '../controllers/couponControllers.js';
import { isloggedIn } from '../middlewares/isLoggedIn.js';

const couponRouter = express.Router();

couponRouter.post('/', isloggedIn, createCouponControllers);

export default couponRouter;
