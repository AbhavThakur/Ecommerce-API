import { Modal, Schema } from '../utils/helper.js';

const ReviewSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Review must belong to a product'],
    },
    message: {
      type: String,
      required: [true, 'Please add a message'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please add a rating between 1 and 5'],
    },
  },
  {
    timestamps: true,
  }
);

const ReviewModal = Modal('Review', ReviewSchema);

export default ReviewModal;
