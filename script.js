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
            image: 'https://via.placeholder.com/150/FFFFFF/4CAF50?text=蜈蚣药'
        },
        {
            id: 2,
            name: '八仙鼻通',
            price: 32,
            originalPrice: 45,
            image: 'https://via.placeholder.com/150/FFFFFF/2196F3?text=八仙鼻通'
        },
        {
            id: 3,
            name: '减肥咖啡',
            price: 98,
            originalPrice: 128,
            image: 'https://via.placeholder.com/150/FFFFFF/FF9800?text=减肥咖啡'
        }
    ];

    // DOM元素
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    const totalPrice = document.querySelector('.total-price');
    const checkoutBtn = document.querySelector('.checkout-btn');

    // 添加商品到购物车
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
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

    // 结算按钮点击事件
    checkoutBtn.addEventListener('click', function() {
        alert(`订单提交成功！\n总金额: ￥${cart.total}\n包含商品: ${cart.items.map(item => `${item.name}×${item.quantity}`).join(', ')}`);
        
        // 重置购物车
        cart = { items: [], total: 0 };
        updateCartUI();
    });

    // 分类导航点击事件
    const categoryItems = document.querySelectorAll('.category-nav li');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            categoryItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            // 实际应用中这里应该加载对应分类的商品
        });
    });
});
