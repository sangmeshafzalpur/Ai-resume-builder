import mongoose from 'mongoose';

const resumeSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
      default: 'Untitled Resume',
    },
    personal_info: {
      type: Object,
      default: {},
    },
    professional_summary: {
      type: String,
      default: '',
    },
    experience: {
      type: Array,
      default: [],
    },
    education: {
      type: Array,
      default: [],
    },
    skills: {
      type: Array,
      default: [],
    },
    project: {
      type: Array,
      default: [],
    },
    certifications: {
      type: Array,
      default: [],
    },
    languages: {
      type: Array,
      default: [],
    },
    template: {
      type: String,
      default: 'classic',
    },
    accent_color: {
      type: String,
      default: '#3B82F6',
    },
    public: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
