require('dotenv').config();
const sequelize = require('./config/db');
const Project = require('./models/Project');

const projects = [
  {
    title: "Language Translator",
    description: "A real-time language translation application with a clean UI, supporting multiple languages.",
    image: "https://images.unsplash.com/photo-1543165796-5426273eaab3?auto=format&fit=crop&q=80&w=1000",
    techStack: ["HTML", "CSS", "JavaScript", "API"],
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
    techStack: ["HTML", "CSS", "JavaScript"],
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
    techStack: ["HTML", "CSS", "JavaScript"],
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
    techStack: ["GSAP", "HTML", "CSS", "JavaScript"],
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
    techStack: ["HTML", "CSS"],
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
    techStack: ["HTML", "CSS", "Bootstrap"],
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
    techStack: ["HTML", "CSS", "JavaScript"],
    isPremium: false,
    price: 0,
    githubUrl: "https://github.com/Mahesh13247/kmaheshkumarachary.com",
    liveDemoUrl: "https://kmaheshkumarachary.vercel.app/",
    category: "Components"
  }
];

const seedDB = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('✅ SQLite Database Reset');
    
    await Project.bulkCreate(projects);
    console.log('✅ Projects Seeded Successfully');
    
    process.exit();
  } catch (err) {
    console.error('❌ Seeding Error:', err);
    process.exit(1);
  }
};

seedDB();
