import express from 'express';
import {
  getDashboardData,
  checkAdminAccess,
  getAllUsers,
  deleteUser,
} from '../controllers/adminController.js';
import { protect, requireAdmin, protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.use(protectAdmin);

router.get('/check-access', checkAdminAccess);
router.get('/dashboard', getDashboardData);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

export default router;
