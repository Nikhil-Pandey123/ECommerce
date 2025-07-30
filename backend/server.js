import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import orderRoutes from './routes/orderRoute.js';
import adminRoutes from './routes/adminRoutes.js'; // Add admin routes
import { protect, requireAdmin } from './middleware/auth.js'; // Import middleware
import { getEsewaPaymentHash, verifyEsewaPayment } from './esewa.js';
import PurchasedItem from './models/purchasedItemModel.js';
import Payment from './models/paymentModel.js';
import Order from './models/Order.js';
import Product from './models/Products.js';
import User from './models/User.js';

// Load environment variables
dotenv.config();

const app = express();

const router = express.Router();

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Routes
app.use('/api/users', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes); // Add protected admin routes

// eSewa payment routes (keep your existing payment logic)
app.post('/initialize-esewa', async (req, res) => {
  console.log('Received request: ', req.body);
  try {
    const { orderId, totalPrice } = req.body;

    const orderData = await Order.findById(orderId);
    if (!orderData) {
      return res.status(400).json({
        success: false,
        message: 'Order not found.',
      });
    }

    const purchasedItemData = await PurchasedItem.create({
      item: orderId,
      paymentMethod: 'esewa',
      totalPrice: totalPrice,
    });

    const paymentInitiate = await getEsewaPaymentHash({
      amount: totalPrice,
      transaction_uuid: purchasedItemData._id,
    });

    res.json({
      success: true,
      payment: paymentInitiate,
      purchasedItemData,
    });
  } catch (error) {
    console.error('Initialize eSewa error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
app.get('/complete-payment', async (req, res) => {
  const { data } = req.query;

  try {
    if (!data) {
      return res.status(400).json({
        success: false,
        message: 'No payment data received',
      });
    }

    const paymentInfo = await verifyEsewaPayment(data);

    const purchasedItemData = await PurchasedItem.findById(
      paymentInfo.response.transaction_uuid
    );

    if (!purchasedItemData) {
      return res.status(500).json({
        success: false,
        message: 'Purchase not found',
      });
    }

    const paymentData = await Payment.create({
      transactionId: paymentInfo.decodedData.transaction_code,
      productId: paymentInfo.response.transaction_uuid,
      amount: purchasedItemData.totalPrice,
      dataFromVerificationReq: paymentInfo,
      apiQueryFromUser: req.query,
      paymentGateway: 'esewa',
      status: 'success',
    });

    await PurchasedItem.findByIdAndUpdate(
      paymentInfo.response.transaction_uuid,
      { $set: { status: 'completed' } }
    );

    res.redirect(
      `http://localhost:3000/complete-payment?transactionId=${paymentData.transactionId}`
    );
  } catch (error) {
    console.error('Payment completion error:', error);
    res.redirect(
      `http://localhost:3000/payment-failure?error=${encodeURIComponent(error.message)}`
    );
  }
});

app.get('/payment-failure', (req, res) => {
  res.redirect('http://localhost:3000/payment-failure');
});

app.get('/create-item', async (req, res) => {
  let itemData = await Product.create({
    name: 'Airflex T-Shirt',
    price: 899,
    isBestSeller: true,
    category: 'apparel',
    image: 'https://example.com/image.jpg',
    description: 'This is a sample product description.',
  });
  res.json({
    success: true,
    item: itemData,
  });
});

// DEPRECATED: Keep these for backwards compatibility, but they're now unprotected
// You should migrate to using /api/admin/users and /api/admin/orders instead
app.get('/getUsers', async (req, res) => {
  try {
    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/getOrders', async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');

    app.listen(5000, () => {
      console.log('Server is running on http://localhost:5000');
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err.message);
  });
