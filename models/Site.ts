import mongoose from "mongoose";

const SiteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true },
  socials: {
    github: String,
    linkedin: String,
    facebook: String,
  },
  shortBio: { type: String, required: true },
  resumePath: { type: String, default: "/resume.pdf" },
  profile: {
    coverImage: { type: String, default: "/images/banner.png" },
    avatar: { type: String, default: "/images/avatar.jpg" },
    username: String,
    followers: String,
    following: Number,
    joined: String,
    work: String,
    education: String,
    relationship: String,
  },
}, { timestamps: true });

export default mongoose.models.Site || mongoose.model("Site", SiteSchema);
