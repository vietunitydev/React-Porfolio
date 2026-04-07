import mongoose, {Schema} from 'mongoose';

const assetSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    publicId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    folder: {
      type: String,
      default: 'portfolio',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Asset =
  mongoose.models.Asset || mongoose.model('Asset', assetSchema);
