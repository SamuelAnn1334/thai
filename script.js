document.addEventListener('DOMContentLoaded', function() {
    // 页面元素
    const screens = {
        phoneInput: document.getElementById('phone-input'),
        productList: document.getElementById('product-list'),
        orderConfirm: document.getElementById('order-confirm'),
        orderSuccess: document.getElementById('order-success')
    };
    
    const phoneInput = document.getElementById('phone-number');
    const confirmPhoneBtn = document.getElementById('confirm-phone');
    const errorMsg = document.getElementById('error-msg');
    
    // 订单数据
    let currentOrder = {
        phone: '',
        items: [],
        orderId: null
    };
    
    // 事件监听
    confirmPhoneBtn.addEventListener('click', confirmPhone);
    
    // 手机号验证函数
    function confirmPhone() {
        const phone = phoneInput.value.trim();
        const phoneRegex = /^1[3-9]\d{9}$/;
        
        if (!phone) {
            showError('请输入手机号码');
            return;
        }
        
        if (!phoneRegex.test(phone)) {
            showError('请输入有效的11位手机号码');
            return;
        }
        
        currentOrder.phone = phone;
        switchScreen(screens.productList);
    }
    
    function showError(message) {
        errorMsg.textContent = message;
    }
    
    function switchScreen(screenToShow) {
        Object.values(screens).forEach(screen => {
            screen.classList.remove('active');
        });
        screenToShow.classList.add('active');
    }
    
    // 其他功能函数保持原有逻辑
    // ...
});
