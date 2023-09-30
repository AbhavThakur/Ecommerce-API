import express from 'express';
import {
  createCouponControllers,
  deleteCouponControllers,
  getAllCouponsControllers,
  getCouponByIdControllers,
  updateCouponControllers,
} from '../controllers/couponControllers.js';
import isAdmin from '../middlewares/isAdmin.js';
import { isloggedIn } from '../middlewares/isLoggedIn.js';

const couponRouter = express.Router();

couponRouter.post('/', isloggedIn, isAdmin, createCouponControllers);
couponRouter.get('/', getAllCouponsControllers);
couponRouter.get('/:id', getCouponByIdControllers);
couponRouter.put('/update/:id', isloggedIn, isAdmin, updateCouponControllers);
couponRouter.delete(
  '/delete/:id',
  isloggedIn,
  isAdmin,
  deleteCouponControllers
);

export default couponRouter;
