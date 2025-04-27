<template>
    <div class="page-container">
      <!-- 返回按钮 -->
      <div class="navigation-buttons">
        <button class="return-button" @click="goBack">返回川派页面</button>
      </div>
      
      <!-- 左边部分 -->
      <aside class="left-panel">
        <h3>巴蜀地区气候与地理</h3>
        
        <!-- 图片和文字介绍 -->
        <div class="info-box">
          <div class="image-container">
            <img :src="currentImage" alt="气候或地理特点" class="climate-map" style="width: 80%; height: 180px;" />
          </div>
          <div class="text-container">
            <p v-if="currentImage === '/img/doctors/lishizhen.png'">四川的气候特征对川人体质有重要影响，湿润的环境导致川人体质偏湿。四川的地形复杂，气候湿润，降水量充沛，温暖的气候助长了湿气的积聚。</p>
            <p v-if="currentImage === '/img/doctors/xueji.png'">四川盆地的湿气通过空气和水分影响着人们的体质，特别是在湿润的春夏季节，湿气更加明显。</p>
          </div>
          <!-- 气候特点和地理特点按钮 -->
          <div class="buttons">
            <button @click="showImage('climate')">气候特点</button>
            <button @click="showImage('geography')">地理特点</button>
          </div>
        </div>
  
        <!-- 数据可视化图表 -->
        <div class="charts">
          <div id="climate-map" style="width: 100%; height: 200px;"></div> <!-- 地图组件 -->
          <div id="constitution-pie-chart" style="width: 300px; height: 100px;"></div> <!-- 体质分类饼图 -->
        </div>
      </aside>
  
      <!-- 右边部分 -->
      <div class="right-panel">
        <!-- 右上部分 -->
        <div class="right-top">
          <!-- 中间部分：交换了两部分的位置 -->
          <section class="right-top-left">
            <h3>四诊诊断与川人体质结合</h3>
            <p>四诊法是中医诊断学的四个基本方法，分别是：望诊、闻诊、问诊和切诊。通过这四个诊断手段，可以深入了解川人体质。</p>
            <div class="diagnosis-methods">
              <button @click="toggleDiagnosis('望诊')">望诊</button>
              <button @click="toggleDiagnosis('闻诊')">闻诊</button>
              <button @click="toggleDiagnosis('问诊')">问诊</button>
              <button @click="toggleDiagnosis('切诊')">切诊</button>
            </div>
  
            <!-- 望诊具体图表 -->
            <div v-if="currentDiagnosis === '望诊'" class="diagnosis-detail">
              <h4>望诊结果</h4>
              <div class="charts-container">
                <div class="chart-item">
                  <div id="face-color-chart" style="width: 100%; height: 250px;"></div>
                  <p>面色分布</p>
                </div>
                <div class="chart-item">
                  <div id="tongue-color-chart" style="width: 100%; height: 250px;"></div>
                  <p>舌苔分布</p>
                </div>
                <div class="chart-item">
                  <div id="body-type-chart" style="width: 100%; height: 250px;"></div>
                  <p>体型分布</p>
                </div>
              </div>
            </div>
  
            <!-- 闻诊具体图表 -->
            <div v-if="currentDiagnosis === '闻诊'" class="diagnosis-detail">
              <h4>闻诊结果</h4>
              <div class="charts-container">
                <div class="chart-item">
                  <div id="voice-chart" style="width: 100%; height: 250px;"></div>
                  <p>声音分布</p>
                </div>
                <div class="chart-item">
                  <div id="body-odor-chart" style="width: 100%; height: 250px;"></div>
                  <p>体味分布</p>
                </div>
              </div>
            </div>
  
            <!-- 问诊具体图表 -->
            <div v-if="currentDiagnosis === '问诊'" class="diagnosis-detail">
              <h4>问诊结果</h4>
              <div class="charts-container">
                <div class="chart-item">
                  <div id="diet-chart" style="width: 100%; height: 250px;"></div>
                  <p>饮食偏好</p>
                </div>
                <div class="chart-item">
                  <div id="living-habits-chart" style="width: 100%; height: 250px;"></div>
                  <p>生活习惯</p>
                </div>
                <div class="chart-item">
                  <div id="emotion-chart" style="width: 100%; height: 250px;"></div>
                  <p>情绪状态</p>
                </div>
              </div>
            </div>
  
            <!-- 切诊具体图表 -->
            <div v-if="currentDiagnosis === '切诊'" class="diagnosis-detail">
              <h4>切诊结果</h4>
              <div class="charts-container">
                <div class="chart-item">
                  <div id="pulse-chart" style="width: 100%; height: 250px;"></div>
                  <p>脉象分布</p>
                </div>
                <div class="chart-item">
                  <div id="abdominal-chart" style="width: 100%; height: 250px;"></div>
                  <p>腹部触诊</p>
                </div>
              </div>
            </div>
          </section>
          
          <!-- 右上部分：川人体质特点 -->
          <section class="right-top-right">
            <h3>川人体质特点</h3>
            <p>川人常见的体质类型受到气候湿气、饮食偏好及情绪的多方面影响。常见的体质类型有湿气体质、气虚体质、血虚体质等。</p>
            <div id="wordcloud" class="wordcloud-box fade-in-wordcloud"></div>
          </section>
        </div>
  
        <!-- 右下部分 -->
        <section class="right-bottom">
          <h3>川人体质调理建议</h3>
          <p>根据四诊结果，提供以下调理建议：</p>
          <ul>
            <li>饮食调理：减少辛辣、油腻食物的摄入，多吃健脾祛湿的食物，例如薏苡仁、赤小豆等。</li>
            <li>生活习惯：避免长时间处于潮湿环境，适当进行户外活动，保持干燥。</li>
            <li>情绪管理：保持良好的心态，避免因湿邪困脾导致的情绪低落，适当进行冥想等放松活动。</li>
            <li>中医治疗：根据四诊结果，采用中药调理、针灸、推拿等中医治疗方法。</li>
          </ul>
          <!-- 饮食调理效果图 -->
          <div id="diet-suggestion-chart" style="width: 100%; height: 300px;"></div>
  
          <!-- 底部四个饼图 -->
          <div class="bottom-charts">
            <div class="chart" id="chart1"></div>
            <div class="chart" id="chart2"></div>
            <div class="chart" id="chart3"></div>
            <div class="chart" id="chart4"></div>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, nextTick } from 'vue';
  import * as echarts from 'echarts'; // 用于绘制图表
  import 'echarts-wordcloud' // 引入词云插件
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const currentDiagnosis = ref('望诊'); // 默认显示望诊
  const diagnosisInfo = ref('');
  const currentImage = ref('/img/doctors/lishizhen.png'); // 默认气候图片
  
  // 四诊诊断数据
  const diagnosisData = {
    '望诊': '通过观察面色、舌象等外在表现。面色偏黄、晦暗，多为湿气重、脾虚的表现；舌苔厚腻多为湿邪内盛。',
    '闻诊': '通过闻气味来诊断。若身体有异味，如口臭、体臭，可能为湿热质；若无明显异味，多为平和质或气虚质。',
    '问诊': '询问患者的日常习惯和症状。多食辛辣、油腻食物，容易导致湿热内生，出现口苦、口干、便秘等症状。',
    '切诊': '通过脉诊了解体质。湿热质的川人多见滑数脉，气虚质多见缓弱脉，阳虚质多见沉迟脉，阴虚质多见细数脉。',
  };
  
  // 存储图表实例
  const charts = {};
  
  // 切换四诊诊断内容
  const toggleDiagnosis = async (diagnosis) => {
    currentDiagnosis.value = diagnosis;
    diagnosisInfo.value = diagnosisData[diagnosis];
  
    // 确保 DOM 元素已渲染
    await nextTick();
  
    // 初始化图表
    initCharts();
  };
  
  // 初始化所有图表
  const initCharts = () => {
    if (currentDiagnosis.value === '望诊') {
      initFaceColorChart();
      initTongueColorChart();
      initBodyTypeChart();
    } else if (currentDiagnosis.value === '闻诊') {
      initVoiceChart();
      initBodyOdorChart();
    } else if (currentDiagnosis.value === '问诊') {
      initDietChart();
      initLivingHabitsChart();
      initEmotionChart();
    } else if (currentDiagnosis.value === '切诊') {
      initPulseChart();
      initAbdominalChart();
    }
  };
  
  // 初始化单个图表
  const initChart = (chartId, chartData) => {
    if (!charts[chartId]) {
      charts[chartId] = echarts.init(document.getElementById(chartId));
    }
    charts[chartId].setOption(chartData);
  };
  
  // 初始化望诊图表
  const initFaceColorChart = () => {
    initChart('face-color-chart', {
      title: {
        text: '面色分布',
        left: 'center',
        textStyle: { fontSize: 14, color: '#00eaff' }
      },
      tooltip: { trigger: 'item' },
      series: [ {
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { name: '黄晦', value: 30 },
          { name: '红润', value: 70 }
        ]
      } ]
    });
  };
  
  const initTongueColorChart = () => {
    initChart('tongue-color-chart', {
      title: {
        text: '舌苔分布',
        left: 'center',
        textStyle: { fontSize: 14, color: '#00eaff' }
      },
      tooltip: { trigger: 'item' },
      series: [ {
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { name: '厚腻', value: 40 },
          { name: '薄白', value: 60 }
        ]
      } ]
    });
  };
  
  const initBodyTypeChart = () => {
    initChart('body-type-chart', {
      title: {
        text: '体型分布',
        left: 'center',
        textStyle: { fontSize: 14, color: '#00eaff' }
      },
      tooltip: { trigger: 'item' },
      series: [ {
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { name: '肥胖', value: 25 },
          { name: '匀称', value: 75 }
        ]
      } ]
    });
  };
  
  // 初始化闻诊图表
  const initVoiceChart = () => {
    initChart('voice-chart', {
      title: {
        text: '声音分布',
        left: 'center',
        textStyle: { fontSize: 14, color: '#00eaff' }
      },
      tooltip: { trigger: 'item' },
      series: [ {
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { name: '低微', value: 30 },
          { name: '洪亮', value: 70 }
        ]
      } ]
    });
  };
  
  const initBodyOdorChart = () => {
    initChart('body-odor-chart', {
      title: {
        text: '体味分布',
        left: 'center',
        textStyle: { fontSize: 14, color: '#00eaff' }
      },
      tooltip: { trigger: 'item' },
      series: [ {
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { name: '异味', value: 20 },
          { name: '无异味', value: 80 }
        ]
      } ]
    });
  };
  
  // 初始化问诊图表
  const initDietChart = () => {
    initChart('diet-chart', {
      title: {
        text: '饮食偏好',
        left: 'center',
        textStyle: { fontSize: 14, color: '#00eaff' }
      },
      tooltip: { trigger: 'item' },
      series: [ {
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { name: '辛辣', value: 60 },
          { name: '清淡', value: 40 }
        ]
      } ]
    });
  };
  
  const initLivingHabitsChart = () => {
    initChart('living-habits-chart', {
      title: {
        text: '生活习惯',
        left: 'center',
        textStyle: { fontSize: 14, color: '#00eaff' }
      },
      tooltip: { trigger: 'item' },
      series: [ {
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { name: '潮湿环境', value: 30 },
          { name: '干燥环境', value: 70 }
        ]
      } ]
    });
  };
  
  const initEmotionChart = () => {
    initChart('emotion-chart', {
      title: {
        text: '情绪状态',
        left: 'center',
        textStyle: { fontSize: 14, color: '#00eaff' }
      },
      tooltip: { trigger: 'item' },
      series: [ {
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { name: '急躁', value: 20 },
          { name: '平和', value: 80 }
        ]
      } ]
    });
  };
  
  // 初始化切诊图表
  const initPulseChart = () => {
    initChart('pulse-chart', {
      title: {
        text: '脉象分布',
        left: 'center',
        textStyle: { fontSize: 14, color: '#00eaff' }
      },
      tooltip: { trigger: 'item' },
      series: [ {
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { name: '滑数', value: 25 },
          { name: '缓弱', value: 30 },
          { name: '沉迟', value: 20 },
          { name: '细数', value: 25 }
        ]
      } ]
    });
  };
  
  const initAbdominalChart = () => {
    initChart('abdominal-chart', {
      title: {
        text: '腹部触诊',
        left: 'center',
        textStyle: { fontSize: 14, color: '#00eaff' }
      },
      tooltip: { trigger: 'item' },
      series: [ {
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { name: '胀满', value: 30 },
          { name: '柔软', value: 70 }
        ]
      } ]
    });
  };
  onMounted(() => {
    const chart = echarts.init(document.getElementById('wordcloud'));
    chart.setOption({
      backgroundColor: 'transparent',
      title: {
        text: '川人体质关键词词云',
        left: 'center',
        textStyle: {
          color: '#0ff',
          fontSize: 18,
        }
      },
      tooltip: {
        show: true
      },
      series: [{
        type: 'wordCloud',
        shape: 'circle',
        sizeRange: [16, 40],
        rotationRange: [-30, 30],
        gridSize: 6,
        drawOutOfBound: false,
        textStyle: {
          fontFamily: '霞鹜文楷, 楷体',
          fontWeight: 'bold',
          color: function () {
            const colors = ['#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#f39c12', '#1abc9c'];
            return colors[Math.floor(Math.random() * colors.length)];
          },
          shadowColor: '#000',
          shadowBlur: 2
        },
        data: [
          { name: '气虚', value: 120 },
          { name: '湿气', value: 100 },
          { name: '阴虚', value: 90 },
          { name: '阳虚', value: 80 },
          { name: '痰湿', value: 70 },
          { name: '血虚', value: 60 },
          { name: '湿热', value: 50 },
          { name: '脾胃虚弱', value: 40 },
          { name: '肾气不足', value: 30 },
          { name: '肝郁', value: 20 }
        ]
      }]
    });
  });
  // 页面加载时初始化图表
  onMounted(() => {
    initCharts();
  });
  
  const goBack = () => {
    router.go(-1);
  };
  </script>
  
  <style scoped>
  .page-container {
    display: flex;
    height: 100vh;
    margin: 0;
    padding: 0;
    background-color: #121212;
    color: #fff;
    font-family: 'KaiTi', 'FangSong', serif;
  }
  
  .left-panel {
    width: 20%;
    padding: 20px;
    background-color: #1c1c1c;
    box-sizing: border-box;
    border-right: 1px solid #00eaff;
    border-radius: 10px 0 0 10px;
  }
  
  .right-panel {
    width: 80%;
    display: flex;
    flex-direction: column;
  }
  
  .right-top {
    flex: 3;
    display: flex;
    border-bottom: 1px solid #00eaff;
    border-radius: 10px 10px 0 0;
  }
  
  .right-top-left {
    flex: 2;
    padding: 20px;
    background-color: #222;
    border-right: 1px solid #00eaff;
    border-radius: 10px 0 0 10px;
  }
  
  .right-top-right {
    flex: 1;
    padding: 20px;
    background-color: #333;
    border-radius: 0 10px 10px 0;
  }
  
  .right-bottom {
    flex: 1;
    padding: 20px;
    background-color: #222;
    border-top: 1px solid #00eaff;
    border-radius: 0 0 10px 10px;
  }
  
  h3 {
    color: #00eaff;
    font-size: 1.6em;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 0.6em;
  }
  
  .diagnosis-methods button {
    padding: 12px 25px;
    margin: 5px;
    background-color: #1a1a1a;
    color: #00eaff;
    border: 1px solid #00eaff;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .diagnosis-methods button:hover {
    background-color: #00eaff;
    color: #1c1c1c;
  }
  
  .diagnosis-detail {
    margin-top: 20px;
  }
  
  .diagnosis-detail p {
    font-size: 1.2em;
    color: #ccc;
  }
  
  .right-top, .right-bottom {
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
  }
  
  .right-top-left, .right-top-right {
    border-radius: 10px;
  }
  
  .right-bottom ul {
    list-style-type: none;
    padding-left: 0;
  }
  
  .right-bottom ul li {
    font-size: 0.8em;
    margin: 10px 0;
  }
  
  .right-bottom ul li::before {
    content: "✓ ";
    color: #00eaff;
  }
  
  /* 可适应小屏幕设备 */
  @media (max-width: 768px) {
    .page-container {
      flex-direction: column;
    }
  
    .left-panel, .right-panel {
      width: 100%;
    }
  
    .right-top {
      flex-direction: column;
    }
  
    .right-top-left, .right-top-right {
      flex: 1;
    }
  }
  
  .climate-map {
    max-width: 100%;
    height: 200px;
    margin-top: 6px;
  }
  
  .info-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #111;
    border: 2px solid #0ff;
    border-radius: 10px;
    margin-top: 20px;
  }
  
  .image-container {
    width: 100%;
    max-width: 400px; /* 限制图片容器的最大宽度 */
    margin-bottom: 20px;
  }
  
  .image-container img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  }
  
  .text-container {
    width: 100%;
    max-width: 600px; /* 限制文字容器的最大宽度 */
    text-align: center;
    color: #0ff;
    font-size: 1.2em;
    line-height: 1.6;
  }
  
  .text-container p {
    margin: 0;
    padding: 0 20px;
  }
  
  .buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }
  
  .buttons button {
    padding: 10px 20px;
    font-size: 14px;
    color: #0ff;
    background-color: #222;
    border: 1px solid #0ff;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .buttons button:hover {
    background-color: #0ff;
    color: #000;
  }
  
  /* 底部四个饼图 */
  .bottom-charts {
    display: flex;
    justify-content: space-around;
    padding: 20px;
    background-color: #111;
    border-top: 1px solid #00eaff;
    border-radius: 10px;
  }
  
  .chart {
    width: 200px;
    height: 200px;
  }
  .charts-container {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
  
  .chart-item {
    flex: 1;
    margin: 0 10px;
    text-align: center;
  }
  
  .chart-item p {
    margin-top: 10px;
    font-size: 14px;
    color: #00eaff;
  }
  .wordcloud-box{
      background: #111;
      height: 200px;
      border: 1px dashed #0ff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  .navigation-buttons {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 100;
  }
  
  .return-button {
    padding: 8px 16px;
    background-color: #0ff;
    color: #000;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;
  }
  
  .return-button:hover {
    background-color: rgba(0, 255, 255, 0.7);
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  }
  </style>