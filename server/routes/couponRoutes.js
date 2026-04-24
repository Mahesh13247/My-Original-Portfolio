const express = require('express');
const router = express.Router();
const { createCoupon, getAllCoupons, toggleCoupon } = require('../controllers/couponController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, admin, createCoupon);
router.get('/', protect, admin, getAllCoupons);
router.put('/:id/toggle', protect, admin, toggleCoupon);

module.exports = router;
