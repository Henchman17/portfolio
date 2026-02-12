import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  tagline: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  stack: [{ type: String }],
  featured: { type: Boolean, default: false },
  links: {
    github: String,
    live: String,
    docs: String,
  },
  gallery: [{ type: String }],
  sections: {
    overview: { type: String, required: true },
    problem: { type: String, required: true },
    features: [{ type: String }],
    learnings: [{ type: String }],
  },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
