const Payment = require('./models/Payment');
const User = require('./models/User');
const { Op } = require('sequelize');

async function cleanup() {
  try {
    // 1. Delete mock payment records
    const deletedCount = await Payment.destroy({
      where: {
        orderId: {
          [Op.like]: 'order_mock_%'
        }
      }
    });
    console.log(`Deleted ${deletedCount} mock payment records.`);

    // 2. Clear unlockedProjects for users (optional but ensures a fresh start)
    // Actually, let's just reset everyone's unlockedProjects to empty if the user wants a clean slate,
    // or we can be surgical. Let's just reset everyone for a truly clean dashboard.
    const users = await User.findAll();
    for (const user of users) {
      if (user.role !== 'admin') {
         user.unlockedProjects = [];
         await user.save();
      }
    }
    console.log('Reset unlocked projects for all non-admin users.');

  } catch (err) {
    console.error('Cleanup failed:', err);
  } finally {
    process.exit();
  }
}

cleanup();
