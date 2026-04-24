const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: 'your_razorpay_key_id',
  key_secret: 'your_razorpay_key_secret',
});

async function test() {
  try {
    const order = await razorpay.orders.create({
      amount: 50000,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });
    console.log(order);
  } catch (err) {
    console.error("ERROR:", err);
  }
}
test();
