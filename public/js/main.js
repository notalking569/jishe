// 通用函数
function navigateTo(url) {
    window.location.href = url;
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 为返回按钮添加事件监听
    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    });
}); 