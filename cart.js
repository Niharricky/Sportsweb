document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.querySelector('.cart-items');
    const totalItems = document.getElementById('total-items');
    const totalPrice = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    let cart = [];

    function renderCart() {
        cartItems.innerHTML = '';
        let total = 0;
        let count = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            count += item.quantity;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>Price: $${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });

        totalItems.textContent = count;
        totalPrice.textContent = total.toFixed(2);
    }

    function addToCart(item) {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        renderCart();
    }

    cartItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            renderCart();
        }
    });

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
        } else {
            alert('Thank you for your purchase!');
            cart = [];
            renderCart();
        }
    });

    // Sample items for demonstration purposes
    addToCart({ id: 1, name: 'Basketball', price: 700, image: '/' });
    addToCart({ id: 2, name: 'Football', size5,price: 500, image: '' });
    addToCart({ id: 3, name: 'Arsenal Jersey', price: 1800, image: '' });
});
