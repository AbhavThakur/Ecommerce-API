import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ColorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    image: {
      type: String,
      default: 'https://picsum.photos/200/300',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ColorModal = mongoose.model('Color', ColorSchema);

export default ColorModal;
