const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/authMiddleware');

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const imageUpload = multer({
  storage,
  limits: { fileSize: 5000000 }, // 5MB for images
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  }
});

const sourceUpload = multer({
  storage,
  limits: { fileSize: 1000000000 }, // 1GB for source code
  fileFilter: (req, file, cb) => {
    const filetypes = /zip|rar|7z|gz|tar/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      return cb(null, true);
    } else {
      cb('Error: Compressed files only (.zip, .rar, etc.)!');
    }
  }
});

const screenshotUpload = multer({
  storage,
  limits: { fileSize: 10000000 }, // 10MB per screenshot
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) return cb(null, true);
    cb('Error: Images only!');
  }
});

const videoUpload = multer({
  storage,
  limits: { fileSize: 500000000 }, // 500MB for video
  fileFilter: (req, file, cb) => {
    const filetypes = /mp4|webm|mov|avi|mkv/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) return cb(null, true);
    cb('Error: Video files only (.mp4, .webm, etc.)!');
  }
});

router.post('/avatar', protect, imageUpload.single('avatar'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url });
});

router.post('/source', protect, sourceUpload.single('source'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url });
});

// Upload multiple screenshots (up to 10)
router.post('/screenshots', protect, screenshotUpload.array('screenshots', 10), (req, res) => {
  if (!req.files || req.files.length === 0) return res.status(400).json({ message: 'No files uploaded' });
  const urls = req.files.map(f => `${req.protocol}://${req.get('host')}/uploads/${f.filename}`);
  res.json({ urls });
});

// Upload a project demo video
router.post('/video', protect, videoUpload.single('video'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url });
});

module.exports = router;
