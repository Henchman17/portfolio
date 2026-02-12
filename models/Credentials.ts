import mongoose from "mongoose";

const CredentialsSchema = new mongoose.Schema({
  certifications: [{
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    date: String,
    link: String,
  }],
  education: [{
    degree: { type: String, required: true },
    school: { type: String, required: true },
    year: String,
  }],
  skills: [{
    category: { type: String, required: true },
    items: [{ type: String }],
  }],
}, { timestamps: true });

export default mongoose.models.Credentials || mongoose.model("Credentials", CredentialsSchema);
