const User = require('./models/User');
const sequelize = require('./config/db');

const promoteToAdmin = async () => {
  try {
    await sequelize.sync();
    // Update all users to be admin for testing purposes
    await User.update({ role: 'admin' }, { where: {} });
    console.log('✅ All users promoted to admin successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to promote users:', error);
    process.exit(1);
  }
};

promoteToAdmin();
