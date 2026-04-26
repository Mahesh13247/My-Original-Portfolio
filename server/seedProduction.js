/**
 * Production Seed Script — Run this on Render Shell to populate PostgreSQL
 * Usage: node seedProduction.js
 */
require('dotenv').config();
const sequelize = require('./config/db');
const Project = require('./models/Project');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const projects = [
  {
    title: "Language Translator",
    description: "A real-time language translation application with a clean UI, supporting multiple languages.",
    image: "https://images.unsplash.com/photo-1543165796-5426273eaab3?auto=format&fit=crop&q=80&w=1000",
    techStack: JSON.stringify(["HTML", "CSS", "JavaScript", "API"]),
    isPremium: false,
    price: 0,
    githubUrl: "https://github.com/Mahesh13247/Language-Translator-",
    liveDemoUrl: "https://mahesh13247.github.io/Language-Translator-/",
    category: "Utility"
  },
  {
    title: "Focus-on-Today",
    description: "A sleek productivity tool designed to help you track and achieve your daily goals.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1000",
    techStack: JSON.stringify(["HTML", "CSS", "JavaScript"]),
    isPremium: false,
    price: 0,
    githubUrl: "https://github.com/Mahesh13247/Focus-on-Today",
    liveDemoUrl: "https://mahesh13247.github.io/Focus-on-Today/",
    category: "Productivity"
  },
  {
    title: "Panda Login Form",
    description: "Interactive panda-themed login form where the panda follows your typing and covers its eyes when you enter your password.",
    image: "https://images.unsplash.com/photo-1564349683136-77e08bef1ef1?auto=format&fit=crop&q=80&w=1000",
    techStack: JSON.stringify(["HTML", "CSS", "JavaScript"]),
    isPremium: true,
    price: 499,
    githubUrl: "https://github.com/Mahesh13247/panda-login-page",
    liveDemoUrl: "https://mahesh13247.github.io/panda-login-page/",
    category: "Animations"
  },
  {
    title: "Fruit Coke (GSAP Slider)",
    description: "A premium product showcase slider featuring smooth GSAP animations and high-end visual transitions.",
    image: "https://images.unsplash.com/photo-1527960669566-f882ba85a4c6?auto=format&fit=crop&q=80&w=1000",
    techStack: JSON.stringify(["GSAP", "HTML", "CSS", "JavaScript"]),
    isPremium: true,
    price: 999,
    githubUrl: "https://github.com/Mahesh13247/Responsive-GSAP-Slider-Animations",
    liveDemoUrl: "https://mahesh13247.github.io/Responsive-GSAP-Slider-Animations/",
    category: "UI/UX"
  },
  {
    title: "Social Media Glowing Buttons",
    description: "A collection of beautiful, glowing social media buttons with high-quality hover effects.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1000",
    techStack: JSON.stringify(["HTML", "CSS"]),
    isPremium: true,
    price: 299,
    githubUrl: "https://github.com/Mahesh13247/Glowinf-icon-hover-effects",
    liveDemoUrl: "https://mahesh13247.github.io/Glowinf-icon-hover-effects/",
    category: "Components"
  },
  {
    title: "Food Order Website",
    description: "A full-featured food ordering landing page with interactive menu and responsive design.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000",
    techStack: JSON.stringify(["HTML", "CSS", "Bootstrap"]),
    isPremium: true,
    price: 1499,
    githubUrl: "https://github.com/Mahesh13247/food-order-website",
    liveDemoUrl: "https://mahesh13247.github.io/food-order-website/",
    category: "E-Commerce"
  },
  {
    title: "Analog Clock",
    description: "A minimalist and smooth analog clock with custom animations and realistic hands.",
    image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&q=80&w=1000",
    techStack: JSON.stringify(["HTML", "CSS", "JavaScript"]),
    isPremium: false,
    price: 0,
    githubUrl: "https://github.com/Mahesh13247/kmaheshkumarachary.com",
    liveDemoUrl: "https://kmaheshkumarachary.vercel.app/",
    category: "Components"
  }
];

const seedDB = async () => {
  try {
    console.log('🔄 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Database connected!');

    await sequelize.sync({ alter: true });
    console.log('✅ Tables synced');

    // Seed projects (skip if already exist)
    const existingCount = await Project.count();
    if (existingCount === 0) {
      await Project.bulkCreate(projects);
      console.log(`✅ ${projects.length} projects seeded!`);
    } else {
      console.log(`ℹ️  ${existingCount} projects already exist — skipping project seed`);
    }

    // Create admin user if not exists
    const adminEmail = 'kmaheshachary34@gmail.com';
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Admin@1234', 10);
      await User.create({
        name: 'Mahesh Kumar Achary',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
      console.log('✅ Admin user created!');
      console.log('   Email:', adminEmail);
      console.log('   Password: Admin@1234  ← CHANGE THIS AFTER LOGIN!');
    } else {
      console.log('ℹ️  Admin user already exists — skipping');
    }

    console.log('\n🎉 Production seed complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed Error:', err.message);
    process.exit(1);
  }
};

seedDB();
