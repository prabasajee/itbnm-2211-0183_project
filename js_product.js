const btnCart = document.querySelector('#cart-btn');
const cart = document.querySelector('.cart1');
const btnClose = document.querySelector('#close');

btnCart.addEventListener('click', () => {
    cart.classList.add('cart1-active');
});

btnClose.addEventListener('click', () => {
    cart.classList.remove('cart1-active');
});

document.addEventListener('DOMContentLoaded', loadContent);

function loadContent() {
    // Remove Food Items from Cart
    const btnRemove = document.querySelectorAll('.cart-remove');
    btnRemove.forEach(btn => {
        btn.addEventListener('click', removeItem);
    });

    // Product Item Change Event
    const qtyElements = document.querySelectorAll('.cart-quantity');
    qtyElements.forEach(input => {
        input.addEventListener('change', changeQty);
    });

    // Add Cart Event
    const cartBtns = document.querySelectorAll('.fas.fa-shopping-cart');
    cartBtns.forEach(btn => {
        btn.addEventListener('click', addCart);
    });

    updateTotal();
}

function removeItem() {
    if (confirm('Are you sure to remove?')) {
        const title = this.parentElement.querySelector('.cart-food-title').textContent;
        itemList = itemList.filter(el => el.title !== title);
        this.parentElement.remove();
        updateTotal(); // Update total directly
    }
}

function changeQty() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    updateTotal();
}

let itemList = [];

function addCart() {
    const food = this.parentElement;
    const title = food.querySelector('.food-title').textContent;
    const price = food.querySelector('.price').textContent;
    const imgSrc = food.querySelector('.food-img').src;

    const newProduct = { title, price, imgSrc };

    if (itemList.find(el => el.title === newProduct.title)) {
        alert("Product already added to cart");
        return;
    } else {
        itemList.push(newProduct);
    }

    const newProductElement = createCartProduct(title, price, imgSrc);
    const element = document.createElement('div');
    element.innerHTML = newProductElement;
    const cartBasket = document.querySelector('.cart-content');
    cartBasket.appendChild(element);
    loadContent(); // Reload content to add event listeners
    updateTotal();
}

function createCartProduct(title, price, imgSrc) {
    return `
    <div class="cart-box">
        <img src="${imgSrc}" class="cart-img">
        <div class="detail-box">
            <div class="cart-food-title">${title}</div>
            <div class="price-box">
                <div class="cart-price">${price}</div>
                <div class="cart-amt">${price}</div>
            </div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="fa-solid fa-trash cart-remove"></i>
    </div>`;
}

function updateTotal() {
    const cartItems = document.querySelectorAll('.cart-box');
    const totalValue = document.querySelector('.total_p');
    const cartCount = document.querySelector('.cart');

    let total = 0;

    cartItems.forEach(product => {
        const priceElement = product.querySelector('.cart-price');
        const price = parseFloat(priceElement.textContent.replace("rs ", ""));
        const qty = parseInt(product.querySelector('.cart-quantity').value, 10);
        total += (price * qty);
        product.querySelector('.cart-amt').textContent = "rs " + (price * qty).toFixed(2);
    });

    totalValue.textContent = 'rs ' + total.toFixed(2);

    let count = cartItems.length;
    cartCount.textContent = count;
    cartCount.style.display = count === 0 ? 'none' : 'block';
}
