import express from 'express';
import {
  createCouponControllers,
  deleteCouponControllers,
  getAllCouponsControllers,
  getCouponByIdControllers,
  updateCouponControllers,
} from '../controllers/couponControllers.js';
import { isloggedIn } from '../middlewares/isLoggedIn.js';

const couponRouter = express.Router();

couponRouter.post('/', isloggedIn, createCouponControllers);
couponRouter.get('/', getAllCouponsControllers);
couponRouter.get('/:id', getCouponByIdControllers);
couponRouter.put('/update/:id', isloggedIn, updateCouponControllers);
couponRouter.delete('/delete/:id', isloggedIn, deleteCouponControllers);

export default couponRouter;
