const express = require('express');
const router = express.Router();
const { submitContactForm, getMessages, toggleMessageStatus } = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', submitContactForm);
router.get('/', protect, admin, getMessages);
router.put('/:id/toggle', protect, admin, toggleMessageStatus);

module.exports = router;
