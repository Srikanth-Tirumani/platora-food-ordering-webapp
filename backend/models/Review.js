const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  productName: { type: String, required: true }, // For simplified link to foodData names
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
