import express from 'express';
import {
  createOrderControllers,
  deleteOrderControllers,
  getOrderByIdControllers,
  getOrderStatusControllers,
  getOrdersControllers,
  updateOrderControllers,
} from '../controllers/orderControllers.js';
import { isloggedIn } from '../middlewares/isLoggedIn.js';

const orderRouter = express.Router();

orderRouter.post('/', isloggedIn, createOrderControllers);
orderRouter.get('/', isloggedIn, getOrdersControllers);
orderRouter.get('/sales/status', isloggedIn, getOrderStatusControllers);
orderRouter.get('/:id', isloggedIn, getOrderByIdControllers);
orderRouter.put('/update/:id', isloggedIn, updateOrderControllers);
orderRouter.delete('/:id/delete', isloggedIn, deleteOrderControllers);

export default orderRouter;
