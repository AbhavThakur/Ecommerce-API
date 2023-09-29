import { Modal, Schema, generateRandomOrderNumber } from '../utils/helper.js';

const randomText = Math.random().toString(36).substring(7).toLocaleUpperCase();

/**
 * Generates a random number between 1000 and 9999.
 *
 * @return {number} The generated random number.
 */
const randomNumber = Math.floor(1000 + Math.random() * 9000);

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please add a user'],
    },
    orderItems: [
      {
        type: Object,
        required: true,
      },
    ],
    shippingAddress: {
      type: Object,
      required: true,
    },
    orderNumber: {
      type: String,
      default: generateRandomOrderNumber(14),
    },
    // From stripe
    paymentStatus: {
      type: String,
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      default: 'Not specified',
    },
    totalPrice: {
      type: Number,
      default: 0.0,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModal = Modal('Order', OrderSchema);

export default OrderModal;
