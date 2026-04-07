import mongoose, {Schema} from 'mongoose';

const projectSchema = new Schema(
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
    year: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    mainTasks: {
      type: [String],
      default: [],
    },
    teamSize: {
      type: String,
      default: '',
    },
    duration: {
      type: String,
      default: '',
    },
    platform: {
      type: String,
      default: '',
    },
    features: {
      type: [String],
      default: [],
    },
    technologies: {
      type: [String],
      default: [],
    },
    designPatterns: {
      type: [String],
      default: [],
    },
    videoUrl: {
      type: String,
      default: '',
    },
    screenshotColumns: {
      type: Number,
      default: 2,
      min: 1,
      max: 3,
    },
    screenshots: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Project =
  mongoose.models.Project || mongoose.model('Project', projectSchema);
