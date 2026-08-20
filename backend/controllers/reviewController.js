const Review = require('../models/Review');

// @desc    Create new review
// @route   POST /api/reviews
const createReview = async (req, res) => {
  const { rating, comment, productName } = req.body;

  const review = new Review({
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
    productName,
  });

  const createdReview = await review.save();
  res.status(201).json(createdReview);
};

// @desc    Get reviews for a product
// @route   GET /api/reviews/:productName
const getProductReviews = async (req, res) => {
  const reviews = await Review.find({ productName: req.params.productName });
  res.json(reviews);
};

module.exports = { createReview, getProductReviews };
