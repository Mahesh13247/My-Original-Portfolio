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

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // In production, also allow same-origin requests
    return callback(null, true);
  },
  credentials: true,
}));

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

const { DataTypes } = require('sequelize');

// Safely add a column if it doesn't already exist
const addColumnSafe = async (table, column, definition) => {
  try {
    await sequelize.getQueryInterface().addColumn(table, column, definition);
    console.log(`  ✅ Migrated: ${table}.${column}`);
  } catch {
    // Column already exists — safe to ignore
  }
};

// Run all pending schema migrations
const runMigrations = async () => {
  console.log('🔄 Running schema migrations...');
  await addColumnSafe('Projects', 'downloadUrl',          { type: DataTypes.STRING, allowNull: true });
  await addColumnSafe('Projects', 'detailedDescription',  { type: DataTypes.TEXT,   allowNull: true });
  await addColumnSafe('Projects', 'features',             { type: DataTypes.TEXT,   defaultValue: '[]' });
  await addColumnSafe('Projects', 'screenshots',          { type: DataTypes.TEXT,   defaultValue: '[]' });
  await addColumnSafe('Projects', 'videoUrl',             { type: DataTypes.STRING, allowNull: true });
  console.log('✅ Migrations complete');
};

// Auto-seed projects if database is empty
const autoSeed = async () => {
  try {
    const count = await Project.count();
    if (count > 0) return; // Already has data, skip

    console.log('🌱 Empty database detected — auto-seeding projects...');
    const bcrypt = require('bcryptjs');

    const projects = [
      { title: "Language Translator", description: "A real-time language translation application with a clean UI, supporting multiple languages.", image: "https://images.unsplash.com/photo-1543165796-5426273eaab3?auto=format&fit=crop&q=80&w=1000", techStack: JSON.stringify(["HTML","CSS","JavaScript","API"]), isPremium: false, price: 0, githubUrl: "https://github.com/Mahesh13247/Language-Translator-", liveDemoUrl: "https://mahesh13247.github.io/Language-Translator-/", category: "Utility" },
      { title: "Focus-on-Today", description: "A sleek productivity tool designed to help you track and achieve your daily goals.", image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1000", techStack: JSON.stringify(["HTML","CSS","JavaScript"]), isPremium: false, price: 0, githubUrl: "https://github.com/Mahesh13247/Focus-on-Today", liveDemoUrl: "https://mahesh13247.github.io/Focus-on-Today/", category: "Productivity" },
      { title: "Panda Login Form", description: "Interactive panda-themed login form where the panda follows your typing and covers its eyes on password.", image: "https://images.unsplash.com/photo-1564349683136-77e08bef1ef1?auto=format&fit=crop&q=80&w=1000", techStack: JSON.stringify(["HTML","CSS","JavaScript"]), isPremium: true, price: 499, githubUrl: "https://github.com/Mahesh13247/panda-login-page", liveDemoUrl: "https://mahesh13247.github.io/panda-login-page/", category: "Animations" },
      { title: "Fruit Coke (GSAP Slider)", description: "A premium product showcase slider featuring smooth GSAP animations and high-end visual transitions.", image: "https://images.unsplash.com/photo-1527960669566-f882ba85a4c6?auto=format&fit=crop&q=80&w=1000", techStack: JSON.stringify(["GSAP","HTML","CSS","JavaScript"]), isPremium: true, price: 999, githubUrl: "https://github.com/Mahesh13247/Responsive-GSAP-Slider-Animations", liveDemoUrl: "https://mahesh13247.github.io/Responsive-GSAP-Slider-Animations/", category: "UI/UX" },
      { title: "Social Media Glowing Buttons", description: "A collection of beautiful, glowing social media buttons with high-quality hover effects.", image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1000", techStack: JSON.stringify(["HTML","CSS"]), isPremium: true, price: 299, githubUrl: "https://github.com/Mahesh13247/Glowinf-icon-hover-effects", liveDemoUrl: "https://mahesh13247.github.io/Glowinf-icon-hover-effects/", category: "Components" },
      { title: "Food Order Website", description: "A full-featured food ordering landing page with interactive menu and responsive design.", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000", techStack: JSON.stringify(["HTML","CSS","Bootstrap"]), isPremium: true, price: 1499, githubUrl: "https://github.com/Mahesh13247/food-order-website", liveDemoUrl: "https://mahesh13247.github.io/food-order-website/", category: "E-Commerce" },
      { title: "Analog Clock", description: "A minimalist and smooth analog clock with custom animations and realistic hands.", image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&q=80&w=1000", techStack: JSON.stringify(["HTML","CSS","JavaScript"]), isPremium: false, price: 0, githubUrl: "https://github.com/Mahesh13247/kmaheshkumarachary.com", liveDemoUrl: "https://kmaheshkumarachary.vercel.app/", category: "Components" },
    ];

    await Project.bulkCreate(projects);
    console.log(`✅ ${projects.length} projects seeded!`);

    // Create admin if not exists
    const adminEmail = 'kmaheshachary34@gmail.com';
    const existing = await User.findOne({ where: { email: adminEmail } });
    if (!existing) {
      const hashed = await bcrypt.hash('Admin@1234', 10);
      await User.create({ name: 'Mahesh Kumar Achary', email: adminEmail, password: hashed, role: 'admin' });
      console.log('✅ Admin user created — email: kmaheshachary34@gmail.com / password: Admin@1234');
    }
    console.log('🎉 Auto-seed complete!');
  } catch (err) {
    console.error('⚠️  Auto-seed failed (non-fatal):', err.message);
  }
};

// Database Connection
const connectDB = async () => {
  try {
    await sequelize.sync();
    console.log('✅ Database Synced');
    await runMigrations();
    await autoSeed(); // ← Seeds data automatically if DB is empty
  } catch (err) {
    console.error('❌ Could not sync Database');
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

// Serve Frontend (always serve if dist folder exists)
const clientDistPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  console.log('✅ Serving React frontend from:', clientDistPath);
  app.use(express.static(clientDistPath));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(clientDistPath, 'index.html'));
  });
} else {
  console.log('⚠️  client/dist not found — frontend not served (dev mode)');
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
