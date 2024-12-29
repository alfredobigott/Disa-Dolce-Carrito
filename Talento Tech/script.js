document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.querySelector('.cart-total span:last-child');
    const clearCartBtn = document.querySelector('.clear-cart-btn');

    function updateCartTotal() {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
        });
        cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <input type="number" value="${item.quantity}" min="1" data-index="${index}">
                        <button class="cart-item-remove" data-index="${index}">Eliminar</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
        updateCartTotal();
    }

    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const productCard = btn.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('p').textContent.replace('$', ''));
            const productImage = productCard.querySelector('img').src;

            const existingItemIndex = cart.findIndex(item => item.name === productName);
            if (existingItemIndex !== -1) {
                cart[existingItemIndex].quantity += 1;
            } else {
                cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
            }
            renderCartItems();
        });
    });

    cartItemsContainer.addEventListener('input', (e) => {
        if (e.target.type === 'number') {
            const index = e.target.getAttribute('data-index');
            cart[index].quantity = parseInt(e.target.value);
            updateCartTotal();
        }
    });

    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart-item-remove')) {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            renderCartItems();
        }
    });

    clearCartBtn.addEventListener('click', () => {
        cart.length = 0;
        renderCartItems();
    });

    renderCartItems();
});
