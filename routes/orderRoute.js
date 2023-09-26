import express from 'express';
import {
  createOrderControllers,
  deleteOrderControllers,
} from '../controllers/orderControllers.js';
import { isloggedIn } from '../middlewares/isLoggedIn.js';

const orderRouter = express.Router();

orderRouter.post('/', isloggedIn, createOrderControllers);
orderRouter.delete('/:id/delete', isloggedIn, deleteOrderControllers);

export default orderRouter;
