import mongoose, {Schema} from 'mongoose';

const blogSchema = new Schema(
  {
    legacyId: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
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
    excerpt: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      default: 'Doan Viet',
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    readTime: {
      type: String,
      default: '5 min read',
    },
    tags: {
      type: [String],
      default: [],
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    content: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
