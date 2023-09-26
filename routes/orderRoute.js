import express from 'express';
import { createOrderControllers } from '../controllers/orderControllers.js';
import { isloggedIn } from '../middlewares/isLoggedIn.js';

const orderRouter = express.Router();

orderRouter.post('/', isloggedIn, createOrderControllers);

export default orderRouter;
