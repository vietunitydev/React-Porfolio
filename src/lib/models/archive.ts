import mongoose, {Schema} from 'mongoose';

const archiveSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    content: {
      type: String,
      default: '',
    },
    happenedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Archive =
  mongoose.models.Archive || mongoose.model('Archive', archiveSchema);
