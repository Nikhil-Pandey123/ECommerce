import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import orderRoutes from './routes/orderRoute.js';
import { getEsewaPaymentHash, verifyEsewaPayment } from './esewa.js';
import PurchasedItem from './models/purchasedItemModel.js';
import Payment from './models/paymentModel.js';
import Order from './models/Order.js';
import Product from './models/Products.js';

// Load environment variables
dotenv.config();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
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

app.post('/initialize-esewa', async (req, res) => {
  console.log('Received request: ', req.body);
  try {
    const { orderId, totalPrice } = req.body; // Changed from itemId to orderId

    // Validate that the order exists
    const orderData = await Order.findById(orderId);
    if (!orderData) {
      return res.status(400).json({
        success: false,
        message: 'Order not found.',
      });
    }

    // Create a record for the purchase
    const purchasedItemData = await PurchasedItem.create({
      item: orderId, // Using orderId as the item reference
      paymentMethod: 'esewa',
      totalPrice: totalPrice,
    });

    // Initiate payment with eSewa
    const paymentInitiate = await getEsewaPaymentHash({
      amount: totalPrice,
      transaction_uuid: purchasedItemData._id,
    });

    // Respond with payment details
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

// FIXED: Added proper error handling and response
app.get('/complete-payment', async (req, res) => {
  const { data } = req.query;

  try {
    if (!data) {
      return res.status(400).json({
        success: false,
        message: 'No payment data received',
      });
    }

    // Verify payment with eSewa
    const paymentInfo = await verifyEsewaPayment(data);

    // Find the purchased item using the transaction UUID
    const purchasedItemData = await PurchasedItem.findById(
      paymentInfo.response.transaction_uuid
    );

    if (!purchasedItemData) {
      return res.status(500).json({
        success: false,
        message: 'Purchase not found',
      });
    }

    // Create a new payment record in the database
    const paymentData = await Payment.create({
      transactionId: paymentInfo.decodedData.transaction_code,
      productId: paymentInfo.response.transaction_uuid,
      amount: purchasedItemData.totalPrice,
      dataFromVerificationReq: paymentInfo,
      apiQueryFromUser: req.query,
      paymentGateway: 'esewa',
      status: 'success',
    });

    // Update the purchased item status to 'completed'
    await PurchasedItem.findByIdAndUpdate(
      paymentInfo.response.transaction_uuid,
      { $set: { status: 'completed' } }
    );

    // FIXED: Redirect to success page instead of JSON response
    res.redirect(
      `http://localhost:3000/complete-payment?transactionId=${paymentData.transactionId}`
    );
  } catch (error) {
    console.error('Payment completion error:', error);
    // Redirect to failure page on error
    res.redirect(
      `http://localhost:3000/payment-failure?error=${encodeURIComponent(error.message)}`
    );
  }
});

// FIXED: Added failure endpoint
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

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');

    // Start server only if DB connects
    app.listen(5000, () => {
      console.log('Server is running on http://localhost:5000');
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err.message);
  });
