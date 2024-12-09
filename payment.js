document.getElementById('pay-now').addEventListener('click', async () => {
    try {
        // Step 1: Create an order on the backend
        const response = await fetch('http://localhost:4242/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: 50000, // Amount in paise (500 INR)
            }),
        });

        const { id: order_id, currency } = await response.json();

        // Step 2: Open Razorpay checkout
        const options = {
            key: 'YOUR_KEY_ID', // Replace with your Razorpay Key ID
            amount: 50000, // Amount in paise
            currency: currency,
            name: 'Your Company Name',
            description: 'Test Transaction',
            order_id: order_id,
            handler: function (response) {
                alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
                // Step 3: Verify payment on the backend
                fetch('http://localhost:4242/verify-payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        order_id: order_id,
                        payment_id: response.razorpay_payment_id,
                        signature: response.razorpay_signature,
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.success) {
                            alert('Payment verified successfully!');
                        } else {
                            alert('Payment verification failed!');
                        }
                    });
            },
            theme: {
                color: '#3399cc',
            },
        };

        const rzp = new Razorpay(options);
        rzp.open();
    } catch (error) {
        console.error('Error initiating payment:', error);
        alert('Something went wrong. Please try again later.');
    }
});
