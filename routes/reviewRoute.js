import express from 'express';
import { createReviewController } from '../controllers/reviewControllers.js';
import { isloggedIn } from '../middlewares/isLoggedIn.js';

const reviewRouter = express.Router();

reviewRouter.post('/:productID', isloggedIn, createReviewController);

export default reviewRouter;
