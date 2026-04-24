const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, getUserPayments } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-order', protect, createOrder);
router.post('/verify', protect, verifyPayment);
router.get('/user-history', protect, getUserPayments);

module.exports = router;
