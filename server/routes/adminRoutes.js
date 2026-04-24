const express = require('express');
const router = express.Router();
const { getDashboardStats, getAllUsers, getAllPayments, createUser, updateUser, deleteUser } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/stats', protect, admin, getDashboardStats);
router.get('/users', protect, admin, getAllUsers);
router.post('/users', protect, admin, createUser);
router.put('/users/:id', protect, admin, updateUser);
router.delete('/users/:id', protect, admin, deleteUser);
router.get('/payments', protect, admin, getAllPayments);

module.exports = router;
