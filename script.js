// 在DOMContentLoaded事件监听器内添加以下代码

// 购物车弹窗元素
const cartModal = document.querySelector('.cart-modal');
const closeCartBtn = document.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('.cart-items-container');
const cartTotal = document.querySelector('.cart-total');
const shippingNotice = document.querySelector('.shipping-notice');
const shippingFee = document.querySelector('.shipping-fee');
const freeShippingAmount = document.querySelector('.free-shipping-amount');
const confirmOrderBtn = document.querySelector('.confirm-order');
const cartIcon = document.querySelector('.cart-icon');

// 动画元素
const animationElement = document.querySelector('.add-to-cart-animation');

// 打开购物车
cartIcon.addEventListener('click', function() {
    cartModal.classList.add('active');
    renderCartItems();
});

// 关闭购物车
closeCartBtn.addEventListener('click', function() {
    cartModal.classList.remove('active');
});

// 渲染购物车商品
function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.items.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">购物车是空的</p>';
        return;
    }
    
    cart.items.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">￥${item.price}</div>
                <div class="cart-item-controls">
                    <button class="cart-item-decrease">-</button>
                    <span class="cart-item-quantity">${item.quantity}</span>
                    <button class="cart-item-increase">+</button>
                </div>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
        
        // 为增减按钮添加事件
        const decreaseBtn = cartItemElement.querySelector('.cart-item-decrease');
        const increaseBtn = cartItemElement.querySelector('.cart-item-increase');
        
        decreaseBtn.addEventListener('click', () => updateCartItem(item.id, -1));
        increaseBtn.addEventListener('click', () => updateCartItem(item.id, 1));
    });
    
    // 更新总价和运费
    updateCartTotal();
}

// 更新购物车商品数量
function updateCartItem(productId, change) {
    const itemIndex = cart.items.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cart.items[itemIndex].quantity += change;
        
        if (cart.items[itemIndex].quantity <= 0) {
            cart.items.splice(itemIndex, 1);
        }
        
        // 更新总价
        cart.total += change * cart.items[itemIndex].price;
        
        // 更新UI
        updateCartUI();
        renderCartItems();
    }
}

// 更新购物车总价和运费
function updateCartTotal() {
    cartTotal.textContent = `￥${cart.total}`;
    
    // 运费逻辑
    const shippingFeeAmount = 8;
    const freeShippingThreshold = 100;
    
    if (cart.total >= freeShippingThreshold) {
        shippingFee.textContent = '';
    } else {
        shippingFee.textContent = `（当前需支付运费：￥${shippingFeeAmount}）`;
    }
    
    freeShippingAmount.textContent = freeShippingThreshold;
}

// 加入购物车动画
function playAddToCartAnimation(startElement, endElement) {
    const startRect = startElement.getBoundingClientRect();
    const endRect = endElement.getBoundingClientRect();
    
    animationElement.style.left = `${startRect.left}px`;
    animationElement.style.top = `${startRect.top}px`;
    animationElement.style.opacity = '1';
    
    setTimeout(() => {
        animationElement.style.transform = `translate(${endRect.left - startRect.left}px, ${endRect.top - startRect.top}px)`;
        animationElement.style.opacity = '0.5';
    }, 10);
    
    setTimeout(() => {
        animationElement.style.transform = 'translate(0, 0)';
        animationElement.style.opacity = '0';
    }, 500);
}

// 修改原有的addToCartButtons点击事件
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        
        // 播放动画
        playAddToCartAnimation(this, cartIcon);
        
        // 查找商品信息
        const product = products.find(p => p.name === productName);
        if (!product) return;
        
        // 检查是否已在购物车
        const existingItem = cart.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({
                ...product,
                quantity: 1
            });
        }
        
        // 更新总价
        cart.total += product.price;
        
        // 更新UI
        updateCartUI();
    });
});

// 提交订单
confirmOrderBtn.addEventListener('click', function() {
    if (cart.items.length === 0) return;
    
    alert(`订单提交成功！\n总金额: ￥${cart.total}\n包含商品: ${cart.items.map(item => `${item.name}×${item.quantity}`).join(', ')}`);
    
    // 重置购物车
    cart = { items: [], total: 0 };
    updateCartUI();
    renderCartItems();
    cartModal.classList.remove('active');
});
