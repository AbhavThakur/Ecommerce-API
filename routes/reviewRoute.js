import express from 'express';
import {
  createReviewController,
  deleteReviewController,
  getAllReviewsController,
} from '../controllers/reviewControllers.js';
import { isloggedIn } from '../middlewares/isLoggedIn.js';

const reviewRouter = express.Router();

reviewRouter.post('/:productID', isloggedIn, createReviewController);
reviewRouter.get('/', getAllReviewsController);
reviewRouter.delete('/:id/delete', deleteReviewController);

export default reviewRouter;
