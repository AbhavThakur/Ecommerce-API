import { Modal, Schema } from '../utils/helper.js';

const CouponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

//coupon is expired
CouponSchema.virtual('isExpired').get(function () {
  return this.endDate < new Date();
});

// validations
CouponSchema.pre('validate', function (next) {
  if (this.endDate < this.startDate) {
    next(new Error('End date must be after start date'));
  }
  next();
});
CouponSchema.pre('validate', function (next) {
  if (this.startDate < Date.now()) {
    next(new Error('Start date must greater than today date'));
  }
  next();
});
CouponSchema.pre('validate', function (next) {
  if (this.endDate < Date.now()) {
    next(new Error('End date must be greater than today date'));
  }
  next();
});

CouponSchema.pre('validate', function (next) {
  if (this.discount < 0 || isNaN(this.discount) || this.discount > 100) {
    next(new Error('Discount must be a positive number and less than 100'));
  }
  next();
});

const CouponModal = Modal('Coupon', CouponSchema);

export default CouponModal;
