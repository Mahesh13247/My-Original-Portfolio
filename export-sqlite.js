/**
 * export-sqlite.js
 * Run this script ONCE locally to export all your SQLite data to export-data.json
 * Usage: node server/export-sqlite.js
 */
require('dotenv').config({ path: './server/.env' });
const path = require('path');
const { Sequelize, DataTypes } = require('./server/node_modules/sequelize');
const fs = require('fs');

const sqlite = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'server', 'database.sqlite'),
  logging: false,
});

// Mirror models with raw field definitions (no hooks needed, we just read)
const User = sqlite.define('User', {
  id: { type: DataTypes.STRING, primaryKey: true },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.STRING,
  avatar: DataTypes.STRING,
  unlockedProjects: DataTypes.TEXT,
}, { timestamps: true });

const Project = sqlite.define('Project', {
  id: { type: DataTypes.STRING, primaryKey: true },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  image: DataTypes.STRING,
  techStack: DataTypes.TEXT,
  isPremium: DataTypes.BOOLEAN,
  price: DataTypes.FLOAT,
  githubUrl: DataTypes.STRING,
  liveDemoUrl: DataTypes.STRING,
  category: DataTypes.STRING,
  views: DataTypes.INTEGER,
  downloadUrl: DataTypes.STRING,
  detailedDescription: DataTypes.TEXT,
  features: DataTypes.TEXT,
  screenshots: DataTypes.TEXT,
  videoUrl: DataTypes.STRING,
}, { timestamps: true });

const Payment = sqlite.define('Payment', {
  id: { type: DataTypes.STRING, primaryKey: true },
  userId: DataTypes.STRING,
  projectId: DataTypes.STRING,
  amount: DataTypes.FLOAT,
  status: DataTypes.STRING,
  razorpayOrderId: DataTypes.STRING,
  razorpayPaymentId: DataTypes.STRING,
}, { timestamps: true });

const Coupon = sqlite.define('Coupon', {
  id: { type: DataTypes.STRING, primaryKey: true },
  code: DataTypes.STRING,
  discountType: DataTypes.STRING,
  discountValue: DataTypes.FLOAT,
  maxUses: DataTypes.INTEGER,
  usedCount: DataTypes.INTEGER,
  isActive: DataTypes.BOOLEAN,
}, { timestamps: true });

const Contact = sqlite.define('Contact', {
  id: { type: DataTypes.STRING, primaryKey: true },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  message: DataTypes.TEXT,
  status: DataTypes.STRING,
}, { timestamps: true });

async function exportData() {
  try {
    await sqlite.authenticate();
    console.log('✅ Connected to local SQLite database');

    const [users, projects, payments, coupons, contacts] = await Promise.all([
      User.findAll({ raw: true }).catch(() => []),
      Project.findAll({ raw: true }).catch(() => []),
      Payment.findAll({ raw: true }).catch(() => []),
      Coupon.findAll({ raw: true }).catch(() => []),
      Contact.findAll({ raw: true }).catch(() => []),
    ]);

    const data = { users, projects, payments, coupons, contacts };
    const outputPath = path.join(__dirname, 'server', 'export-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

    console.log('\n📦 Export complete!');
    console.log(`   👤 Users:    ${users.length}`);
    console.log(`   📁 Projects: ${projects.length}`);
    console.log(`   💳 Payments: ${payments.length}`);
    console.log(`   🎟️  Coupons:  ${coupons.length}`);
    console.log(`   📩 Contacts: ${contacts.length}`);
    console.log(`\n✅ Saved to: server/export-data.json`);
    console.log('   Next: run  node server/import-to-render.js  to push data to your Render PostgreSQL');
  } catch (err) {
    console.error('❌ Export failed:', err.message);
  } finally {
    await sqlite.close();
  }
}

exportData();
