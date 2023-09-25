import asyncHandler from 'express-async-handler';
import { Product, ReviewModal } from '../model/index.js';

/**
 * Creates a review controller.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {undefined}
 */

export const createReviewController = asyncHandler(async (req, res) => {
  const { rating, message } = req.body;
  const { productID } = req.params;

  //check if product exists for the review
  const productExists = await Product.findById(productID).populate('reviews');
  if (!productExists) {
    throw new Error('Product not found');
  }

  // check if user already reviewed the product
  const hasReviewed = productExists?.reviews.find(
    (review) => review?.user.toString() === req?.userAuthId.toString()
  );
  if (hasReviewed) {
    throw new Error('You have already reviewed this product');
  }

  // create new review
  const newReview = await ReviewModal.create({
    message,
    rating,
    product: productExists?._id,
    user: req.userAuthId,
  });

  // add review to product
  productExists.reviews.push(newReview?._id);
  await productExists.save();

  res.status(200).json({
    status: 'success',
    message: 'Review created successfully',
    data: {
      review: newReview,
    },
  });
});
