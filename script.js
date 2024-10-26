document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const successMessageElement = document.getElementById('success-message');
    const customerEmailElement = document.getElementById('customer-email');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.dataset.product;
            const price = parseFloat(button.dataset.price);
            cart.push({ product, price });
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${product} added to cart.`);
        });
    });

    if (cartItemsElement) {
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.product} - $${item.price.toFixed(2)}`;
            cartItemsElement.appendChild(li);
            total += item.price;
        });
        totalPriceElement.textContent = total.toFixed(2);
    }

    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', event => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            customerEmailElement.textContent = email;
            successMessageElement.style.display = 'block';
            paymentForm.style.display = 'none';
            localStorage.removeItem('cart');
        });
    }
});
