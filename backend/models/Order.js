const mongoose = require('mongoose');

const deliveryAddressSchema = new mongoose.Schema(
  {
    type: { type: String, default: 'Home' },
    addressLine1: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  { _id: false }
);

const orderItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    qty: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
    image: { type: String },
    isVeg: { type: Boolean },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    orderId: { type: String, required: true },
    orderItems: [orderItemSchema],
    deliveryAddress: deliveryAddressSchema,
    paymentMethod: { type: String, required: true, default: 'Online' },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'Placed' }, // Placed, Preparing, Out for Delivery, Delivered
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

