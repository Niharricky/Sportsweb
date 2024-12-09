const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Razorpay instance
const razorpay = new Razorpay({
    key_id: 'YOUR_KEY_ID', // Replace with your Razorpay Key ID
    key_secret: 'YOUR_KEY_SECRET', // Replace with your Razorpay Key Secret
});

// Create an order
app.post('/create-order', async (req, res) => {
    const { amount } = req.body;

    try {
        const order = await razorpay.orders.create({
            amount: amount,
            currency: 'INR',
        });

        res.json(order);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Verify payment
app.post('/verify-payment', (req, res) => {
    const { order_id, payment_id, signature } = req.body;

    const body = `${order_id}|${payment_id}`;
    const expectedSignature = crypto
        .createHmac('sha256', 'YOUR_KEY_SECRET') // Replace with your Razorpay Key Secret
        .update(body.toString())
        .digest('hex');

    if (expectedSignature === signature) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.listen(4242, () => console.log('Server running on http://localhost:4242'));
