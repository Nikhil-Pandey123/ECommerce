import express from 'express';

import { submitOrder } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', submitOrder);

export default router;
