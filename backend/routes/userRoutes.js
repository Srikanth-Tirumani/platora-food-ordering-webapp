const express = require('express');
const { 
  getUserProfile, 
  updateUserProfile, 
  addAddress, 
  deleteAddress, 
  setDefaultAddress, 
  deleteUserProfile 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .delete(protect, deleteUserProfile);

router.route('/address').post(protect, addAddress);
router.route('/address/:id').delete(protect, deleteAddress);
router.route('/address/:id/default').put(protect, setDefaultAddress);

module.exports = router;

