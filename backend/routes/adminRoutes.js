// routes/adminRoutes.js
import express from 'express';
import {
  getDashboardData,
  checkAdminAccess,
  getAllUsers,
  deleteUser,
} from '../controllers/adminController.js';
import { protect, requireAdmin, protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// All routes in this file are protected using the admin middleware
router.use(protectAdmin);

// Admin dashboard routes

router.get('/dashboard', requireAdmin, getDashboardData);
router.get('/check-access', protect, requireAdmin, checkAdminAccess);

// User management routes
router.get('/users', requireAdmin, getAllUsers);
router.delete('/users/:id', requireAdmin, deleteUser);
//  more admin routes here
// router.get('/orders', getAllOrders);
// router.get('/products', getAllProducts);
// router.post('/products', createProduct);

export default router;
