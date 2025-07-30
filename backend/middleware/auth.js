import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Unauthorized: No token',
      authenticated: false,
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({
        message: 'User Not Found',
      });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      message: 'Unauthorized: Invalid token',
      authenticated: false,
    });
  }
};

// New middleware for admin-only routes
const requireAdmin = (req, res, next) => {
  // Check if user is authenticated first
  if (!req.user) {
    return res.status(401).json({
      message: 'Authentication required',
      authenticated: false,
    });
  }

  // Check if user has admin role
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      message:
        'Admin access required. You do not have permission to access this resource.',
      authenticated: true,
      authorized: false,
    });
  }

  next();
};

// Combined middleware for admin routes
export const protectAdmin = [protect, requireAdmin];

export { protect, requireAdmin };
