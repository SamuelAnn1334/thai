document.addEventListener('DOMContentLoaded', function() {
    // 购物车数据
    let cart = {
        items: [],
        total: 0
    };

    // 商品数据
    const products = [
        {
            id: 1,
            name: '蜈蚣药',
            price: 89,
            image: 'https://via.placeholder.com/150/FFFFFF/4CAF50?text=蜈蚣药',
            description: '适用于风湿关节痛',
            sales: '月售280+',
            tag: '百年秘方'
        },
        {
            id: 2,
            name: '八仙鼻通',
            price: 32,
            originalPrice: 45,
            image: 'https://via.placeholder.com/150/FFFFFF/2196F3?text=八仙鼻通',
            description: '快速缓解鼻塞',
            sales: '月售420+',
            tag: '鼻塞克星'
        },
        {
            id: 3,
            name: '减肥咖啡',
            price: 98,
            image: 'https://via.placeholder.com/150/FFFFFF/FF9800?text=减肥咖啡',
            description: '天然成分无副作用',
            sales: '月售650+',
            tag: '健康减重'
        }
    ];

    // DOM元素
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    const totalPrice = document.querySelector('.total-price');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.querySelector('.cart-modal');
    const closeCartBtn = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items-container');
    const cartTotal = document.querySelector('.cart-total');
    const confirmOrderBtn = document.querySelector('.confirm-order');
    const animationElement = document.querySelector('.add-to-cart-animation');

    // 添加商品到购物车
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

    // 更新购物车UI
    function updateCartUI() {
        // 更新数量
        const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = itemCount;
        
        // 更新总价
        totalPrice.textContent = `￥${cart.total}`;
        
        // 启用/禁用结算按钮
        checkoutBtn.disabled = itemCount === 0;
    }

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
            cartTotal.textContent = '￥0';
            return;
        }
        
        cart.items.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.dataset.id = item.id;
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
        
        // 更新总价
        cartTotal.textContent = `￥${cart.total}`;
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

    // 点击空白处关闭购物车
    document.addEventListener('click', function(e) {
        if (!cartModal.contains(e.target) && 
            !cartIcon.contains(e.target) && 
            cartModal.classList.contains('active')) {
            cartModal.classList.remove('active');
        }
    });
});
