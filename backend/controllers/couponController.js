const Coupon = require('../models/Coupon');

// @desc    Apply coupon
// @route   POST /api/coupons/apply
const applyCoupon = async (req, res) => {
  const { code } = req.body;
  const coupon = await Coupon.findOne({ code, isActive: true });

  if (coupon && coupon.expiryDate > new Date()) {
    res.json(coupon);
  } else {
    res.status(404).json({ message: 'Invalid or expired coupon' });
  }
};

// @desc    Get all coupons (Admin)
const getCoupons = async (req, res) => {
  const coupons = await Coupon.find({});
  res.json(coupons);
};

module.exports = { applyCoupon, getCoupons };
