const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const Project = require('../models/Project');
const User = require('../models/User');
const Coupon = require('../models/Coupon');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  try {
    const { projectId, couponCode } = req.body;
    
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    let finalAmount = project.price;

    if (couponCode) {
      const coupon = await Coupon.findOne({ 
        where: { 
          code: couponCode, 
          isActive: true, 
          // SQLite date handling might differ, but Sequelize handles simple comparisons
        } 
      });
      // Additional check for date if needed
      if (coupon && new Date(coupon.expiryDate) > new Date()) {
        finalAmount = project.price - (project.price * coupon.discount / 100);
      }
    }

    const options = {
      amount: Math.round(finalAmount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    
    await Payment.create({
      userId: req.user.id,
      projectId,
      orderId: order.id,
      amount: finalAmount,
      status: 'pending',
      couponUsed: couponCode
    });

    res.json(order);
  } catch (error) {
    console.error('❌ Razorpay Order Creation Error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');

    if (digest === razorpay_signature) {
      const payment = await Payment.findOne({ where: { orderId: razorpay_order_id } });
      
      if (!payment) {
        return res.status(404).json({ message: 'Payment record not found' });
      }

      if (payment.status === 'completed') {
        return res.status(400).json({ message: 'Payment already verified' });
      }

      payment.status = 'completed';
      payment.paymentId = razorpay_payment_id;
      await payment.save();

      const user = await User.findByPk(payment.userId);
      const unlocked = user.unlockedProjects;
      const projectIdStr = String(payment.projectId);
      if (!unlocked.map(String).includes(projectIdStr)) {
        unlocked.push(payment.projectId);
        user.unlockedProjects = unlocked;
        await user.save();
      }

      const project = await Project.findByPk(payment.projectId);
      project.unlocks += 1;
      await project.save();

      res.json({ message: 'Payment verified and project unlocked', payment });
    } else {
      res.status(400).json({ message: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      where: { userId: req.user.id },
      include: [{ 
        model: Project,
        attributes: ['title', 'price']
      }],
      order: [['createdAt', 'DESC']]
    });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
