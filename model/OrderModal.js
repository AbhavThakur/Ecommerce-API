import { Modal, Schema, randomNumber, randomText } from '../utils/helper.js';

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
    orderNum: {
      type: String,
      unique: true,
      default: randomText(7) + randomNumber,
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
      default: 'USD',
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
