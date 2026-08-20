const express = require('express');
const { applyCoupon, getCoupons } = require('../controllers/couponController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/apply', protect, applyCoupon);
router.get('/', protect, getCoupons);

module.exports = router;
