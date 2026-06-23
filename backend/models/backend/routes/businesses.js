const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, index: true }, // e.g., 'Fundi Simu'
  description: { type: String, required: true },
  location: { type: String, required: true }, // City/Region
  contactPhone: { type: String, required: true },
  contactEmail: { type: String },
  images: [String], // URLs from cloud storage (e.g., Cloudinary)
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subscriptionPlan: { type: String, enum: ['free', 'featured', 'premium'], default: 'free' },
  isVerified: { type: Boolean, default: false },
  averageRating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Index for fast text search
BusinessSchema.index({ name: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Business', BusinessSchema);
