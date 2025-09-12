import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  type: { type: String, enum: ['text', 'image'], required: true },
  value: { type: String, required: true },
  page: { type: String, required: true },
  section: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export const Content = mongoose.model('Content', ContentSchema);