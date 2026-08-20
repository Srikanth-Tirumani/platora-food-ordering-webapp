const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
const addOrderItems = async (req, res) => {
  try {
    const { orderItems, deliveryAddress, paymentMethod, totalPrice, isPaid } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items found in cart' });
    }

    if (!deliveryAddress || !deliveryAddress.addressLine1) {
      return res.status(400).json({ message: 'Delivery address is required' });
    }

    // Clean and sanitize order items
    const cleanedOrderItems = orderItems.map((item) => ({
      name: item.name || 'Food Item',
      qty: Number(item.qty) || 1,
      price: Number(item.price) || 0,
      image: item.image || '',
      isVeg: Boolean(item.isVeg),
    }));

    // Clean and sanitize delivery address
    const cleanedAddress = {
      type: deliveryAddress.type || 'Home',
      addressLine1: deliveryAddress.addressLine1,
      city: deliveryAddress.city || '',
      postalCode: deliveryAddress.postalCode || '',
    };

    const order = new Order({
      user: req.user._id,
      orderId: 'ORD' + Date.now().toString().slice(-6) + Math.floor(100 + Math.random() * 900),
      orderItems: cleanedOrderItems,
      deliveryAddress: cleanedAddress,
      paymentMethod: paymentMethod || 'Online',
      isPaid: Boolean(isPaid),
      paidAt: isPaid ? new Date() : undefined,
      totalPrice: Number(totalPrice) || 0,
      status: 'Placed',
    });

    const createdOrder = await order.save();
    return res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Order Creation Error:', error);
    return res.status(400).json({ 
      message: error.message || 'Error creating order. Please check order details.' 
    });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
      return res.json(order);
    } else {
      return res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error('Get Order By ID Error:', error);
    return res.status(400).json({ message: error.message || 'Error fetching order' });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json(orders);
  } catch (error) {
    console.error('Get My Orders Error:', error);
    return res.status(400).json({ message: error.message || 'Error fetching your orders' });
  }
};

// @desc    Update order status (Mock for tracking)
// @route   PUT /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      return res.json(updatedOrder);
    } else {
      return res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error('Update Order Status Error:', error);
    return res.status(400).json({ message: error.message || 'Error updating order status' });
  }
};

module.exports = { addOrderItems, getOrderById, getMyOrders, updateOrderStatus };

