const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  techStack: {
    type: DataTypes.TEXT,
    defaultValue: '[]',
    get() {
      return JSON.parse(this.getDataValue('techStack'));
    },
    set(val) {
      this.setDataValue('techStack', JSON.stringify(val));
    }
  },
  isPremium: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  price: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  githubUrl: {
    type: DataTypes.STRING
  },
  liveDemoUrl: {
    type: DataTypes.STRING
  },
  downloadUrl: {
    type: DataTypes.STRING
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'Other'
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  unlocks: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  detailedDescription: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  features: {
    type: DataTypes.TEXT,
    defaultValue: '[]',
    get() {
      try { return JSON.parse(this.getDataValue('features')); } catch { return []; }
    },
    set(val) {
      this.setDataValue('features', JSON.stringify(val));
    }
  },
  screenshots: {
    type: DataTypes.TEXT,
    defaultValue: '[]',
    get() {
      try { return JSON.parse(this.getDataValue('screenshots')); } catch { return []; }
    },
    set(val) {
      this.setDataValue('screenshots', JSON.stringify(val));
    }
  },
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Project;
