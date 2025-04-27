<template>
    <div class="container">
      <!-- 顶部导航 -->
      <header>
        <h1>川派中医药食同源特色</h1>
        <div class="header-buttons">
          <button class="top-right-button" @click="goBack">返回</button>
        </div>
      </header>
      
      <!-- 上半部分 -->
      <div class="top-section">
        <div class="left-side">
          <h2>川派中医与药食同源的关系</h2>
          <p>川派中医强调地域特色与药食同源的结合，充分利用四川丰富的自然资源和独特的气候条件，将中药材与食材巧妙融合，通过饮食调理达到防病治病、养生保健的目的。例如，四川多湿，常用具有健脾祛湿功效的食材和中药材，如薏苡仁、茯苓等，制作成药膳来调理身体。</p>
        </div>
        <div class="right-side">
          <h2>川派中医药食同源的核心特点</h2>
          <div class="button-group">
            <button @click="setCoreFeature('注重湿气与脾胃调理')">重湿气与脾胃调理</button>
            <button @click="setCoreFeature('气血津液的平衡调理')">气血津液平衡调理</button>
            <button @click="setCoreFeature('阴阳平衡与食材的性味')">阴阳平衡与食材性味</button>
            <button @click="setCoreFeature('强调治未病的理念')">强调"治未病"理念</button>
          </div>
          <div class="core-feature">
            <h3>当前核心特点:</h3>
            <p>{{ currentFeature }}</p>
          </div>
        </div>
      </div>
  
      <!-- 下半部分 -->
      <div class="bottom-section">
        <h2>川派药食同源的实际应用</h2>
        <p>川派药食同源在实际应用中，广泛应用于养生保健、疾病预防和康复治疗等方面。例如，针对湿气重的情况，可以制作健脾祛湿的药膳，如薏苡仁山药粥；对于气血不足的人群，可以食用红枣桂圆炖鸡汤等滋补药膳。这些药膳不仅美味可口，还能发挥良好的养生保健作用。</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const currentFeature = ref("点击按钮查看川派药食同源的核心特点")
  
  // 返回到Data_zcy页面
  const goBack = () => {
    router.push('/data-zcy')
  }
  
  const setCoreFeature = (feature) => {
    currentFeature.value = feature
  }
  </script>
  
  <style scoped>
  .container {
    width: 100%;
    height: 100vh; /* 设置容器高度为视口高度 */
    font-family: 'Microsoft YaHei', sans-serif;
    background-color: #111;
    color: #e0fdfa;
    padding: 20px;
    display: flex;
    flex-direction: column; /* 使用垂直方向布局 */
    border: 1px solid #0ff;
  }
  
  .top-section {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background-color: #222;
    border: 1px solid #0ff;
    border-radius: 8px;
    margin-bottom: 20px;
    flex: 2; /* 使上半部分自适应填充空间 */
  }
  
  .left-side {
    flex: 0.3;
    margin-right: 10px;
    border-right: 1px solid #0ff;
    padding-right: 20px;
  }
  
  .right-side {
    flex: 1;
    padding-left: 20px;
  }
  
  .button-group {
    display: flex;
    flex-direction: row; /* 水平排列按钮 */
    justify-content: space-around; /* 按钮间均匀分布 */
    gap: 15px; /* 设置按钮之间的间距 */
    margin-top: 20px;
  }
  
  .button-group button {
    padding: 12px 18px; /* 增加内边距，使按钮更大一些 */
    background-color: #333; /* 深色背景 */
    color: #0ff; /* 蓝绿色文字 */
    border: 1px solid #0ff; /* 边框色与文字色一致 */
    border-radius: 6px; /* 圆角更大一些 */
    font-size: 14px; /* 适当增大字体 */
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s; /* 加入按钮的放大动画 */
  }
  
  .button-group button:hover {
    background-color: #0ff; /* 悬停时背景色改为亮色 */
    color: #000; /* 悬停时文字改为黑色 */
    transform: scale(1.05); /* 添加放大效果 */
  }
  
  .button-group button:active {
    background-color: #0056b3; /* 按钮被点击时的背景色 */
    transform: scale(1); /* 取消放大效果 */
  }
  
  .core-feature {
    margin-top: 20px;
    padding: 20px;
    height: 340px;
    background-color: #222;
    border: 1px solid #0ff;
    border-radius: 8px;
  }
  
  .bottom-section {
    padding: 20px;
    background-color: #222;
    border: 1px solid #0ff;
    border-radius: 8px;
    flex: 1; /* 使下半部分自适应填充空间 */
  }
  
  header {
    background-color: #111;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #0ff;
    font-size: 18px;
    margin-bottom: 15px;
  }
  
  header h1 {
    font-size: 24px;
  }
  
  button.top-right-button {
    background-color: #0ff;
    color: #000;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    border: none;
    font-weight: bold;
    transition: all 0.3s;
  }
  
  button.top-right-button:hover {
    background-color: rgba(0, 255, 255, 0.7);
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  }
  
  .sidebar {
    width: 250px;
    background-color: #1a1a1a;
    padding: 15px;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar li {
    margin: 10px 0;
    cursor: pointer;
    padding: 10px;
    text-align: center;
    background-color: #333;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .sidebar li:hover {
    background-color: #007bff;
  }
  
  .center-panel {
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px;
  }
  
  .video-box video {
    width: 100%;
    height: 350px;
    object-fit: cover;
  }
  
  .left-extension {
    flex: 1;
    background-color: #222;
    padding: 10px;
    border-right: 1px solid #0ff;
    display: flex;
    flex-direction: column;
  }
  
  .chart-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    width: 100%;
  }
  
  .chart-cell {
    background-color: #111;
    height: 180px;
    border: 1px dashed #0ff;
  }
  
  .right-panel {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
  
  .donut-row {
    display: flex;
    gap: 10px;
  }
  
  .donut-chart {
    flex: 1;
    height: 280px;
    background-color: #111;
    border: 1px dashed #0ff;
  }
  
  .line-charts {
    display: flex;
    gap: 10px;
  }
  
  .line-chart {
    flex: 1;
    background-color: #111;
    border: 1px dashed #0ff;
  }
  
  .text-scroll {
    overflow: hidden;
    background-color: #111;
    border: 1px dashed #0ff;
    color: #e0fdfa;
    height: 200px;
    position: relative;
  }
  
  .text-scroll ul {
    list-style: none;
    padding: 0;
    margin: 0;
    animation: scroll-up 30s linear infinite;
  }
  
  .text-scroll li {
    padding: 6px 0;
    font-family: "仿宋", "楷体", "霞鹜文楷", serif;
    font-size: 10px;
    color: #e0fdfa;
    white-space: nowrap;
  }
  
  @keyframes scroll-up {
    0% { transform: translateY(0); }
    100% { transform: translateY(-100%); }
  }
  
  .header-buttons {
    display: flex;
    gap: 10px;
  }
  
  </style>