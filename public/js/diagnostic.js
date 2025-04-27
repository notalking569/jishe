document.addEventListener('DOMContentLoaded', function() {
    const diagnosticSquares = document.querySelectorAll('.diagnostic-square');
    const detailContents = document.querySelectorAll('.diagnostic-detail-content');
    
    // 默认显示第一个诊法（望诊）
    diagnosticSquares[0].classList.add('active');
    document.getElementById('望诊-content').classList.add('active');
    
    // 为每个诊法方块添加点击事件
    diagnosticSquares.forEach(square => {
        square.addEventListener('click', function() {
            const type = this.dataset.type;
            
            // 移除所有活跃状态
            diagnosticSquares.forEach(item => item.classList.remove('active'));
            detailContents.forEach(content => content.classList.remove('active'));
            
            // 添加当前活跃状态
            this.classList.add('active');
            document.getElementById(`${type}-content`).classList.add('active');
        });
        
        // 添加鼠标悬停动画效果
        square.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.square-icon');
            icon.style.transform = 'scale(1.2)';
        });
        
        square.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.square-icon');
            if (!this.classList.contains('active')) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // 如果有图片加载失败，提供备用内容
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_189b385b5a0%20text%20%7B%20fill%3A%23e94560%3Bfont-weight%3Anormal%3Bfont-family%3AMicrosoft%20YaHei%2C%20sans-serif%3Bfont-size%3A20pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_189b385b5a0%22%3E%3Crect%20width%3D%22400%22%20height%3D%22200%22%20fill%3D%22%23333333%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22148.328125%22%20y%3D%22109.2%22%3E%E5%9B%BE%E7%89%87%E5%8A%A0%E8%BD%BD%E5%A4%B1%E8%B4%A5%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
            this.alt = '图片加载失败';
        });
    });
}); 