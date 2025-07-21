import mongoose from 'mongoose';

export const submitOrder = async (req, res) => {
  try {
    const { name, email, address } = req.body;

    if (!name || !email || !address) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }

    const newOrder = new mongoose.Schema({
      shippingInfo: {
        fullName: name,
        address,
        email,
      },
      createdAt: { type: Date, default: Date.now },
    });

    await newOrder.save();

    res.status(201).json({
      message: 'Order placed successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
};
