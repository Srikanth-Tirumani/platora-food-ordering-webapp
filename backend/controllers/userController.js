const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      addresses: user.addresses,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        addresses: updatedUser.addresses,
        referralCode: updatedUser.referralCode,
        token: req.headers.authorization ? req.headers.authorization.split(' ')[1] : '',
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Update Profile Error:', err);
    res.status(400).json({ message: err.message || 'Error updating profile' });
  }
};

// @desc    Add address
// @route   POST /api/users/address
const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      const newAddress = {
        type: req.body.type,
        addressLine1: req.body.addressLine1,
        city: req.body.city,
        postalCode: req.body.postalCode,
        isDefault: req.body.isDefault || false,
      };

      if (newAddress.isDefault) {
        user.addresses.forEach(a => a.isDefault = false);
      }

      user.addresses.push(newAddress);
      await user.save();
      res.status(201).json(user.addresses);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Add Address Error:', err);
    res.status(400).json({ message: err.message || 'Error adding address' });
  }
};

// @desc    Delete address
// @route   DELETE /api/users/address/:id
const deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.addresses = user.addresses.filter(
        (a) => a._id.toString() !== req.params.id
      );
      await user.save();
      res.json(user.addresses);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Delete Address Error:', err);
    res.status(400).json({ message: err.message || 'Error deleting address' });
  }
};

// @desc    Set default address
// @route   PUT /api/users/address/:id/default
const setDefaultAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.addresses.forEach((a) => {
        a.isDefault = a._id.toString() === req.params.id;
      });
      await user.save();
      res.json(user.addresses);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Set Default Address Error:', err);
    res.status(400).json({ message: err.message || 'Error updating default address' });
  }
};

// @desc    Delete user profile
// @route   DELETE /api/users/profile
const deleteUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      await User.deleteOne({ _id: user._id });
      res.json({ message: 'User removed completely' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Delete Profile Error:', err);
    res.status(400).json({ message: err.message || 'Error deleting profile' });
  }
};

module.exports = { getUserProfile, updateUserProfile, addAddress, deleteAddress, setDefaultAddress, deleteUserProfile };

