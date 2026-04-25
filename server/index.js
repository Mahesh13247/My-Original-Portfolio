require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(uploadDir));

const sequelize = require('./config/db');
const User = require('./models/User');
const Project = require('./models/Project');
const Payment = require('./models/Payment');
const Contact = require('./models/Contact');
const Coupon = require('./models/Coupon');

// Define Associations
User.hasMany(Payment, { foreignKey: 'userId' });
Payment.belongsTo(User, { foreignKey: 'userId' });
Project.hasMany(Payment, { foreignKey: 'projectId' });
Payment.belongsTo(Project, { foreignKey: 'projectId' });

// Database Connection
const connectDB = async () => {
  try {
    await sequelize.sync();
    console.log('✅ SQLite Database Synced');
  } catch (err) {
    console.error('❌ Could not sync SQLite Database');
    console.error('   Error:', err.message);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/coupons', require('./routes/couponRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// Serve Frontend in Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
  });
}

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
