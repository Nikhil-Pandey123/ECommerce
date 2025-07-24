import mongoose from 'mongoose';
import Order from '../models/Order.js';

export const submitOrder = async (req, res) => {
  try {
    const { items, total, shippingInfo } = req.body;

    // Validate required fields
    if (!items || !items.length || !total || !shippingInfo) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }

    const { fullName, email, address } = shippingInfo;

    if (!fullName || !email || !address) {
      return res.status(400).json({
        message: 'All shipping information fields are required',
      });
    }

    // Create new order using your Order model
    const newOrder = new Order({
      items,
      total,
      shippingInfo: {
        fullName,
        address,
        email,
      },
      status: 'Pending',
    });

    // Save the order
    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: 'Order placed successfully',
      orderId: savedOrder._id,
      order: savedOrder,
    });
  } catch (error) {
    console.log('Error creating order:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};
