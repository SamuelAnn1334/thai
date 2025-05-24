document.addEventListener('DOMContentLoaded', function() {
    // 页面元素
    const phoneInputScreen = document.getElementById('phone-input');
    const productListScreen = document.getElementById('product-list');
    const orderConfirmScreen = document.getElementById('order-confirm');
    const orderSuccessScreen = document.getElementById('order-success');
    
    const phoneInput = document.getElementById('phone-number');
    const confirmPhoneBtn = document.getElementById('confirm-phone');
    const viewCartBtn = document.getElementById('view-cart');
    const submitOrderBtn = document.getElementById('submit-order');
    const backToProductsBtn = document.getElementById('back-to-products');
    const newOrderBtn = document.getElementById('new-order');
    
    const orderPhoneDisplay = document.getElementById('order-phone');
    const cartItemsContainer = document.getElementById('cart-items');
    const orderIdDisplay = document.getElementById('order-id');
    
    // 订单数据
    let currentOrder = {
        phone: '',
        items: [],
        orderId: null
    };
    
    // 商品数据
    const products = {
        1: { id: 1, name: '蜈蚣药', description: '传统配方，有效缓解关节疼痛' },
        2: { id: 2, name: '八仙鼻通', description: '快速缓解鼻塞，呼吸畅通' },
        3: { id: 3, name: '减肥咖啡', description: '天然成分，健康减重' }
    };
    
    // 事件监听
    confirmPhoneBtn.addEventListener('click', confirmPhone);
    viewCartBtn.addEventListener('click', viewCart);
    submitOrderBtn.addEventListener('click', submitOrder);
    backToProductsBtn.addEventListener('click', backToProducts);
    newOrderBtn.addEventListener('click', newOrder);
    
    // 为所有"加入订单"按钮添加事件监听
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.parentElement.dataset.id);
            addToCart(productId);
        });
    });
    
    // 函数定义
    function confirmPhone() {
        const phone = phoneInput.value.trim();
        
        if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
            alert('请输入有效的手机号码');
            return;
        }
        
        currentOrder.phone = phone;
        switchScreen(productListScreen);
    }
    
    function addToCart(productId) {
        const existingItem = currentOrder.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            currentOrder.items.push({
                id: productId,
                name: products[productId].name,
                quantity: 1
            });
        }
        
        alert(`${products[productId].name} 已添加到订单`);
    }
    
    function viewCart() {
        if (currentOrder.items.length === 0) {
            alert('您的订单中没有商品');
            return;
        }
        
        orderPhoneDisplay.textContent = currentOrder.phone;
        renderCartItems();
        switchScreen(orderConfirmScreen);
    }
    
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        
        currentOrder.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span>${item.name} × ${item.quantity}</span>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }
    
    function submitOrder() {
        // 在实际应用中，这里应该发送数据到服务器
        // 这里我们只是模拟订单提交
        
        // 生成随机订单号
        currentOrder.orderId = 'ORD-' + Date.now().toString().slice(-8);
        orderIdDisplay.textContent = currentOrder.orderId;
        
        // 打印订单信息到控制台，方便你在后台查看
        console.log('新订单:', currentOrder);
        
        switchScreen(orderSuccessScreen);
    }
    
    function backToProducts() {
        switchScreen(productListScreen);
    }
    
    function newOrder() {
        // 重置订单数据
        currentOrder = {
            phone: currentOrder.phone, // 保留手机号
            items: [],
            orderId: null
        };
        
        phoneInput.value = currentOrder.phone;
        switchScreen(phoneInputScreen);
    }
    
    function switchScreen(screenToShow) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        screenToShow.classList.add('active');
    }
});
