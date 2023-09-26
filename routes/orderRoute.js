import express from 'express';
import {
  createOrderControllers,
  deleteOrderControllers,
  getOrdersControllers,
} from '../controllers/orderControllers.js';
import { isloggedIn } from '../middlewares/isLoggedIn.js';

const orderRouter = express.Router();

orderRouter.post('/', isloggedIn, createOrderControllers);
orderRouter.get('/', isloggedIn, getOrdersControllers);
orderRouter.delete('/:id/delete', isloggedIn, deleteOrderControllers);

export default orderRouter;
