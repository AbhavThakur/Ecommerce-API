import { Modal, Schema } from '../utils/helper.js';

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    wishLists: [
      {
        type: Schema.Types.ObjectId,
        ref: 'WishLists',
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    hasShippingAddress: {
      type: Boolean,
      default: false,
    },
    shippingAddress: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      postalCode: {
        type: String,
      },
      province: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//compile the schema to model
const UserModal = Modal('User', UserSchema);

export default UserModal;
