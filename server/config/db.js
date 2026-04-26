const { Sequelize } = require('sequelize');
const path = require('path');

let sequelize;

if (process.env.DATABASE_URL) {
  console.log('🚀 Production Mode: Connecting to PostgreSQL...');
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  });
} else {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('❌ CRITICAL ERROR: DATABASE_URL is missing in production environment!');
  }
  console.log('💻 Development Mode: Connecting to SQLite...');
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite'),
    logging: false
  });
}

module.exports = sequelize;
