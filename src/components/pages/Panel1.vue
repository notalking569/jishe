<template>
    <div class="four-diagnosis-platform">
      <!-- 顶部标题栏 -->
      <header class="header">
        <h1>望诊--从"色""形""态"中洞察脏腑之变，直观视觉征象的数字重建</h1>
        <div class="header-buttons">
          <button class="top-right-button" @click="router.push('/data-sichuan')">川域流派</button>
          <button class="top-right-button" @click="router.push('/data')">返回</button>
        </div>
      </header>
  
      <div class="main-layout">
        <!-- 左侧导航栏 -->
      
    <aside class="sidebar">
      <div class="button-group">
        <button class="top-data-button" @click="navigateTo('panel1')">望诊</button>
        <button class="top-data-button" @click="navigateTo('panel2')">闻诊</button>
        <button class="top-data-button" @click="navigateTo('panel3')">问诊</button>
        <button class="top-data-button" @click="navigateTo('panel4')">切诊</button>
      </div>
    </aside>
     <!-- 左侧八图优化布局为两列四行 -->
     <section class="left-extension">
        <div class="chart-grid">
<div class="chart-border">
          <div class="chart-cell" id="faceRadarChart"></div>
          <div class="chart-cell" id="chart2"></div>
          <div class="chart-cell" id="chart3"></div>
          <div class="chart-cell" id="chart4"></div>
</div>
<div class="chart-border">
          <div class="chart-cell" id="chart5"></div>
          <div class="chart-cell" id="chart6"></div>
          <div class="chart-cell" id="chart7"></div>
          <div class="chart-cell" id="chart8"></div>
        </div>
        </div>
      </section>
        <!-- 中间主要内容 -->
        <main class="center-panel">
          <div class="video-box">
            <video src="/wwwq2.mp4" autoplay muted loop controls></video>
          </div>
          <div id="wordcloud" class="wordcloud-box fade-in-wordcloud"></div>
          <div id="heatmap" class="heatmap-box"></div>
          
        </main>
  
        <!-- 右侧图表合集 -->
        <section class="right-panel">
          <!-- 上两个饼图 -->
          <div class="donut-row">
            <div class="donut-chart" id="donut-left"></div>
            <div class="donut-chart" id="donut-right"></div>
  
          </div>
          <!-- 下部折线图和文字滚动 -->
          <div class="bottom-box">
            <div class="line-charts">
              <div class="line-chart" id="line1"></div>
              <div class="line-chart" id="line2"></div>
  
            </div>
            <div class="text-scroll">
              <ul>
  <li>面色潮红，舌红苔黄，脉数，乃心火炽盛，清心泻火为主。</li>
  <li>体倦乏力，面色苍白，舌淡少华，脉虚弱，属气血亏虚之证。</li>
  <li>咳嗽痰白，苔滑脉缓，属寒痰内伏，应温肺化痰。</li>
  <li>咽干舌红，少苔，脉细数，属肺阴亏耗，宜养阴润燥。</li>
  <li>夜卧盗汗，心悸怔忡，舌红脉细，为阴虚火旺。</li>
  <li>头晕耳鸣，腰膝酸软，舌淡脉沉，为肾虚之象。</li>
  <li>月经后期，色暗有块，脉涩，属瘀血内阻，宜活血化瘀。</li>
  <li>胸闷纳呆，舌苔腻，脉滑，属脾胃湿困。</li>
  <li>小便短赤，口苦舌红，为湿热下注，应清热利湿。</li>
  <li>腹胀嗳气，脘痞不舒，舌苔薄白，脉缓，属肝郁气滞。</li>
  <li>面色晦暗，唇舌色紫，脉涩，属血瘀之象，宜活血通络。</li>
  <li>自汗畏风，舌淡，脉浮，属卫气不固，宜益气固表。</li>
  <li>四肢不温，倦怠嗜卧，脉沉弱，属阳虚体质。</li>
  <li>腹痛喜温，得按痛减，舌淡苔白，为寒凝脉滞。</li>
  <li>便秘数日，口苦口干，舌红苔黄，为肠腑实热。</li>
  <li>小便频数，夜尿多，腰膝酸软，属肾阳不足。</li>
  <li>舌红少苔，脉细数，夜热早凉，为虚热内扰之象。</li>

</ul>


            </div>
          </div>
        </section>
      </div>
    </div>
  </template>
  <style scoped>
  .four-diagnosis-platform {
    background-color: #000;
    color: #0ff;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    font-family: 'Microsoft YaHei', sans-serif;
    left: 0;
    bottom: 0;
  }
  
  .header {
    background: #111;
    padding: 12px;
    text-align: center;
    font-size: 6px;
    color: #0ff;
    border-bottom: 2px solid #0ff;
    width: 100%;
    left: 0;
  }
  
  .main-layout {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
  
  /* 左侧导航栏 */
  .sidebar {
    width: 100px;
    background-color: #1a1a1a;
    padding: 20px;
  }
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  .sidebar li {
    margin: 15px 0;
    cursor: pointer;
  }
  /* 右上角按钮 */
  .top-right-button {
    padding: 8px 16px;
    font-size: 14px;
    color: #00d0ff;
    background-color: rgba(0, 50, 80, 0.4);
    border: 1px solid rgba(0, 200, 255, 0.4);
    border-radius: 6px;
    cursor: pointer;
    z-index: 20;
    transition: all 0.3s ease;
    /* margin-left: 1000px; */
  }
  .top-right-button:hover {
    background-color: rgba(0, 200, 255, 0.2);
    box-shadow: 0 0 10px rgba(0, 200, 255, 0.3);
  }
  .header-buttons {
    position: absolute;
    top: 6px;
    left: 20px;
    display: flex;
    gap: 10px;
  }
  .middle-extension {
    width: 190px;
    background-color: #111;
    border-right: 1px solid #0ff;
    padding: 10px;
    color: #0ff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  
  .extension-box {
    width: 100%;
    border: 1px dashed #0ff;
    padding: 5px;
    text-align: center;
    font-size: 12px;
  }
  .middle-extension_2 {
    width: 190px;
    background-color: #111;
    border-right: 1px solid #0ff;
    padding: 10px;
    color: #0ff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  
  .extension-box_2 {
    width: 100%;
    border: 1px dashed #0ff;
    padding: 10px;
    text-align: center;
    font-size: 12px;
  }
  
  .button-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .button-group button {
    background-color: #222;
    color: #0ff;
    border: 1px solid #0ff;
    padding: 10px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .button-group button:hover {
    background-color: #0ff;
    color: #000;
  }
  
  .button-group button.active {
    background-color: #0ff;
    color: #000;
    font-weight: bold;
  }
  
  
  /* 中间内容区域 */
  .center-panel {
    flex: 3;
    /* width: 40% !important; */
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
  }
  .video-box video {
    width: 100%;
    height: 350px;
    object-fit: cover;
  }
  .wordcloud-box,
  .heatmap-box {
    background: #111;
    height: 200px;
    border: 1px dashed #0ff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .left-extension {
  width: 420px;
  background-color: #111;
  border-right: 1px solid #0ff;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  width: 100%;
}

.chart-cell {
  width: 100%;
  height: 180px;
  background: #111;
  /* border: 1px dashed #0ff; */
}
.chart-border {
  width: 100%;
  height: 800px;
  background: #111;
  border: 1px dashed #0ff;
}
  /* 右侧图表合集 */
  .right-panel {
    flex: 5;
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
  }
  .donut-row {
    display: flex;
    gap: 10px;
  }
  .donut-chart {
    flex: 1;
    height: 280px;
    border: 1px dashed #0ff;
    background: #111;
  }
  .bottom-box {
    flex: 1;
    display: flex;
    gap: 10px;
  }
  .line-charts {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .line-chart {
    flex: 1;
    background: #111;
    border: 1px dashed #0ff;
  }
  .text-scroll {
  flex: 1.8;
  max-height: 100%; /* 或者 height: 180px 具体定值 */
  background: #111;
  border: 1px dashed #0ff;
  overflow: hidden;
  position: relative;
}


.text-scroll ul {
  list-style: none;
  padding: 10px;
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
  100% { transform: translateY(-50%); }
}

  /* .text-scroll {
    flex: 1;
    background: #111;
    border: 1px dashed #0ff;
    overflow-y: auto;
    font-size: 6px;
    color: #fff;
  }

  .text-scroll ul {
    list-style: none;
    margin: 0;
    padding: 10px;
  }
  .text-scroll li {
    margin-bottom: 10px;
  } */
  </style>
  <script setup>
  import { onMounted } from 'vue'
  import * as echarts from 'echarts'
  import 'echarts-wordcloud' // 引入词云插件
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const navigateTo = (module) => {
    switch (module) {
      case 'panel1':
        router.push('/Panel11')
        break
      case 'panel2':
        router.push('/Panel22')
        break
      case 'panel3':
        router.push('/Panel33')
        break
      case 'panel4':
        router.push('/Panel44')
        break
      case 'data':
        router.push('/data')
        break
      default:
        router.push('/')
    }
  }
  onMounted(() => {
  const chart = echarts.init(document.getElementById('wordcloud'))
  chart.setOption({
    backgroundColor: 'transparent',
    title: {
      text: '舌象关键词词云',
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
          const colors = ['#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#f39c12', '#1abc9c']
          return colors[Math.floor(Math.random() * colors.length)]
        },
        shadowColor: '#000',
        shadowBlur: 2
      },
      data: [
        { name: '舌红', value: 120 },
        { name: '苔黄', value: 100 },
        { name: '齿痕', value: 90 },
        { name: '裂纹舌', value: 80 },
        { name: '苔白', value: 70 },
        { name: '舌淡', value: 60 },
        { name: '剥苔', value: 50 },
        { name: '舌紫', value: 40 },
        { name: '苔腻', value: 30 },
        { name: '瘦薄舌', value: 20 }
      ]
    }]
  })
})

onMounted(() => {
  const chart = echarts.init(document.getElementById('heatmap'));
  chart.setOption({
    title: {
      text: '舌象分类热力图',
      left: 'center',
      textStyle: { color: '#0ff' }
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['白苔', '黄苔', '灰黑苔', '裂纹舌', '齿痕舌', '胖大舌'],
      axisLabel: { color: '#fff' }
    },
    yAxis: {
      type: 'category',
      data: ['健康', '疾病'],
      axisLabel: { color: '#fff' }
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'vertical',
      right: '0',
      top: 'center',
      textStyle: { color: '#fff' }
    },
    series: [{
      type: 'heatmap',
      data: [
        [0, 0, 90], [1, 0, 80], [2, 0, 70], [3, 0, 60], [4, 0, 50], [5, 0, 40],
        [0, 1, 10], [1, 1, 20], [2, 1, 30], [3, 1, 40], [4, 1, 50], [5, 1, 60]
      ],
      label: { show: true },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.5)'
        }
      }
    }]
  });
});
onMounted(() => {
  // 面色分布图（使用清代医案中的舌色数据）
  initPieChart('donut-left', '舌色分布图', [
    { value: 40, name: '红舌' }, // 红舌和绛舌比例最高
    { value: 25, name: '白舌' },
    { value: 20, name: '绛舌' },
    { value: 10, name: '青舌' },
    { value: 5, name: '紫舌' }
  ]);

  // 舌质偏性分布（使用清代医案中的苔质数据）
  initPieChart('donut-right', '舌苔分布图', [
    { value: 35, name: '黄苔' }, // 黄苔的比重最高
    { value: 30, name: '白苔' },
    { value: 20, name: '腻苔' }, // 腻苔记录上升到苔质记录的第一位
    { value: 10, name: '黑苔' }
  ]);
});
  
function initPieChart(id, title, data) {
  const chart = echarts.init(document.getElementById(id))
  chart.setOption({
    title: {
      text: title,
      left: 'center',
      textStyle: { color: '#0ff', fontSize: 14 }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}：{d}%'
    },
    legend: {
      bottom: '0',
      textStyle: { color: '#fff' }
    },
    animation: true,
    animationDuration: 1000,
    series: [
      {
        name: title,
        type: 'pie',
        radius: ['20%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          color: '#fff'
        },
        labelLine: {
          show: true
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 255, 255, 0.5)'
          }
        },
        data
      }
    ]
  })
}

  
onMounted(() => {
    // 舌象类型统计（使用清代温病医案中的舌象数据）
    initLineChart('line1', '清代温病医案舌象类型统计', ['红舌', '绛舌', '白苔', '黄苔', '腻苔', '黑苔'], [130, 117, 125, 83, 45, 38]);

  initGraphChart('line2') // 用原来的 line2 区域挂载体质舌象关系图
})

function initLineChart(id, title, xData, yData) {
  const chart = echarts.init(document.getElementById(id));
  chart.setOption({
    title: {
      text: title,
      left: 'center',
      textStyle: { color: '#0ff', fontSize: 14 }
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: xData,
      axisLine: { lineStyle: { color: '#fff' } },
      axisLabel: { color: '#fff' }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#fff' } },
      axisLabel: { color: '#fff' },
      splitLine: { lineStyle: { color: '#333' } }
    },
    series: [
      {
        data: yData,
        type: 'bar',
        itemStyle: {
          color: '#00fdfa'
        },
        label: {
          show: true,
          position: 'top',
          color: '#fff'
        }
      }
    ],
    backgroundColor: 'transparent'
  });
}
function initGraphChart(id) {
  const chart = echarts.init(document.getElementById(id))
  chart.setOption({
    title: {
      text: '舌象与体质关系图',
      left: 'center',
      textStyle: { color: '#0ff', fontSize: 14 }
    },
    tooltip: {},
    series: [{
      type: 'graph',
      layout: 'force',
      force: {
        repulsion: 120,
        edgeLength: [60, 100]
      },
      roam: true,
      label: {
        show: true,
        color: '#fff'
      },
      edgeSymbol: ['none', 'arrow'],
      edgeSymbolSize: [4, 10],
      data: [
        { name: '阳虚', category: 0, symbolSize: 60 },
        { name: '阴虚', category: 0, symbolSize: 60 },
        { name: '气虚', category: 0, symbolSize: 60 },
        { name: '苔黄', category: 1, symbolSize: 40 },
        { name: '苔白', category: 1, symbolSize: 40 },
        { name: '舌红', category: 1, symbolSize: 40 },
        { name: '齿痕舌', category: 1, symbolSize: 40 },
        { name: '裂纹舌', category: 1, symbolSize: 40 }
      ],
      links: [
        { source: '阳虚', target: '苔白' },
        { source: '阳虚', target: '齿痕舌' },
        { source: '阴虚', target: '舌红' },
        { source: '阴虚', target: '裂纹舌' },
        { source: '气虚', target: '齿痕舌' },
        { source: '气虚', target: '苔白' },
        { source: '气虚', target: '苔黄' }
      ],
      lineStyle: {
        color: '#0ff'
      }
    }]
  })
}onMounted(() => {
  const chart = echarts.init(document.getElementById('faceRadarChart'))
  chart.setOption({
    title: {
      text: '面色与五志五脏关系',
      left: 'center',
      top: '5px',
      textStyle: {
        color: '#0ff',
        fontSize: 8
      }
    },
    tooltip: {},
    legend: {
      data: ['面赤', '面青', '面黄', '面白', '面黑'],
      bottom: 0,
      textStyle: { color: '#fff', fontSize: 10 }, // 减小文字大小
      itemWidth: 10, // 减小图例项的宽度
      itemHeight: 10, // 减小图例项的高度
      itemGap: 5 // 减小图例项之间的间距
    },
    radar: {
      radius: 45, // 将雷达图的半径减小
      indicator: [
        { name: '喜（心）', max: 10 },
        { name: '怒（肝）', max: 10 },
        { name: '思（脾）', max: 10 },
        { name: '悲（肺）', max: 10 },
        { name: '恐（肾）', max: 10 }
      ],
      name: {
        textStyle: { color: '#fff', fontSize: 8 }
      },
      splitLine: { lineStyle: { color: '#555' } },
      axisLine: { lineStyle: { color: '#0ff' } },
      splitArea: { areaStyle: { color: 'transparent' } }
    },
    series: [
      {
        type: 'radar',
        symbolSize: 6,
        lineStyle: { width: 2 }, // 减小线条宽度
        areaStyle: { opacity: 0.1 }, // 减小区域透明度
        data: [
          {
            value: [10, 1, 1, 1, 1],
            name: '面赤',
            itemStyle: { color: '#ff4d4f' }
          },
          {
            value: [1, 10, 1, 1, 1],
            name: '面青',
            itemStyle: { color: '#36cfc9' }
          },
          {
            value: [1, 1, 10, 1, 1],
            name: '面黄',
            itemStyle: { color: '#ffc53d' }
          },
          {
            value: [1, 1, 1, 10, 1],
            name: '面白',
            itemStyle: { color: '#bae7ff' }
          },
          {
            value: [1, 1, 1, 1, 10],
            name: '面黑',
            itemStyle: { color: '#595959' }
          }
        ]
      }
    ]
  })
})
onMounted(() => {
  const chart = echarts.init(document.getElementById('chart2'))
  chart.setOption({
    title: {
      text: '舌象与器官的关系',
      left: 'center',
      top: '-1px',
      textStyle: {
        color: '#0ff',
        fontSize: 8
      }
    },
    color: ['#00fdfa', '#ff77ff'],
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: 0,
      data: ['舌红', '苔白'],
      textStyle: { color: '#fff' }
    },
    radar: {
      radius: 50,
      indicator: [
        { name: '肝', max: 100 },
        { name: '心', max: 100 },
        { name: '脾', max: 100 },
        { name: '肺', max: 100 },
        { name: '肾', max: 100 }
      ],
      name: {
        textStyle: { color: '#fff', fontSize: 12 }
      },
      splitLine: { lineStyle: { color: '#444' } },
      axisLine: { lineStyle: { color: '#0ff' } },
      splitArea: { areaStyle: { color: ['#111'] } }
    },
    series: [{
      type: 'radar',
      symbolSize: 6,
      areaStyle: { opacity: 0.3 },
      itemStyle: {
        borderWidth: 2
      },
      data: [
        {
          value: [80, 60, 65, 75, 70],
          name: '舌红'
        },
        {
          value: [50, 40, 60, 45, 80],
          name: '苔白'
        }
      ]
    }]
  })
})
onMounted(() => {
  const chart = echarts.init(document.getElementById('chart3'))
  chart.setOption({
    title: {
      text: '面色类型与体质分布',
      left: 'center',
      top:'40px',
      textStyle: { color: '#0ff', fontSize: 8 } // 减小标题字体大小
    },
    tooltip: { trigger: 'axis' },
    legend: {
      bottom: 0,
      textStyle: { color: '#fff', fontSize: 10 } // 减小图例字体大小
    },
    xAxis: {
      type: 'category',
      data: ['面红', '面黄', '面白', '面青', '面黑'],
      axisLabel: { color: '#fff', fontSize: 10 } // 减小X轴标签字体大小
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#fff', fontSize: 10 } // 减小Y轴标签字体大小
    },
    series: [
      {
        name: '气虚',
        type: 'bar',
        stack: '总量',
        data: [20, 25, 35, 15, 5],
        barWidth: 10 // 减小柱状图的宽度
      },
      {
        name: '血瘀',
        type: 'bar',
        stack: '总量',
        data: [10, 15, 5, 20, 25],
        barWidth: 10 // 减小柱状图的宽度
      },
      {
        name: '阴虚',
        type: 'bar',
        stack: '总量',
        data: [15, 20, 10, 5, 15],
        barWidth: 10 // 减小柱状图的宽度
      }
    ]
  })
})
onMounted(() => {
  const chart = echarts.init(document.getElementById('chart4'))
  chart.setOption({
    title: {
      text: '舌象随治疗的变化趋势',
      left: 'center',
      top:'30px',
      textStyle: { color: '#0ff', fontSize: 8 }
    },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['初诊', '三日后', '七日后', '两周后'],
      axisLabel: { color: '#fff' }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#fff',
      fontSize: 8  // 设置你想要的字体大小，单位为像素
       }
    
    },
    series: [
      {
        name: '苔黄（湿热）',
        type: 'line',
        data: [80, 60, 40, 20], // 湿热逐渐消退
        smooth: true,
        lineStyle: { color: '#ffcc00' }
      },
      {
        name: '齿痕舌（脾虚）',
        type: 'line',
        data: [20, 30, 40, 50], // 脾虚逐渐改善
        smooth: true,
        lineStyle: { color: '#f0f' }
      }
    ],
    graphic: {
  elements: [
    {
      type: 'text',
      left: 'center',
      top: 'bottom',
      style: {
        rich: {
          a: {
            fontSize: 8,
            fill: '#0ff',
            lineHeight: 20
          }
        },
        text: '{a|苔黄（湿热）：初诊时湿热较重，随着治疗逐渐减轻。}\n{a|齿痕舌（脾虚）：初诊时脾虚较明显，随着调养逐渐改善。}',
        width: 150,
        overflow: 'break'
      }
    }
  ]
}

  })
})
// chart5：舌象与症状桑基图
onMounted(() => {
  const chart = echarts.init(document.getElementById('chart5'))
  chart.setOption({
    tooltip: {},
    series: [{
      type: 'sankey',
      layout: 'none',
      data: [
        { name: '舌红' }, { name: '苔白' },
        { name: '失眠' }, { name: '腹胀' },
        { name: '咽干' }, { name: '口黏' }
      ],
      links: [
        { source: '舌红', target: '失眠', value: 8 },
        { source: '舌红', target: '咽干', value: 6 },
        { source: '苔白', target: '腹胀', value: 7 },
        { source: '苔白', target: '口黏', value: 5 }
      ],
      lineStyle: { color: 'source', curveness: 0.5 },
      label: { color: '#fff' },
      itemStyle: { borderWidth: 1, borderColor: '#0ff' }
    }]
  })
})

onMounted(() => {
  const chart = echarts.init(document.getElementById('chart6'))
  chart.setOption({
    title: {
      text: '五行面色经典归属图',
      left: 'center',
      textStyle: { color: '#0ff', fontSize: 8 }
    },
    tooltip: { trigger: 'item' },
    legend: {
      bottom: -5,
      textStyle: { color: '#fff', fontSize: 8 }, // 减小图例文字大小
      itemWidth: 8, // 减小图例项的宽度
      itemHeight: 6, // 减小图例项的高度
      itemGap: 5 // 减小图例项之间的间距
    },
    series: [
      {
        type: 'pie',
        radius: ['10%', '40%'],
        roseType: 'area',
        itemStyle: { borderRadius: 5 },
        label: { color: '#fff', fontSize: 8 }, // 减小标签文字大小
        data: [
          { value: 1, name: '木 - 青（肝）' },
          { value: 1, name: '火 - 赤（心）' },
          { value: 1, name: '土 - 黄（脾）' },
          { value: 1, name: '金 - 白（肺）' },
          { value: 1, name: '水 - 黑（肾）' }
        ]
      }
    ]
  })
})
// chart7：舌象与体质矩形树图
onMounted(() => {
  const chart = echarts.init(document.getElementById('chart7'))
  chart.setOption({
    title: {
      text: '体质舌象频率柱状图',
      left: 'center',
      top:'30',
      textStyle: { color: '#0ff', fontSize: 8 }
    },
    tooltip: { trigger: 'axis' },
    legend: {
      bottom: 0,
      textStyle: { color: '#fff', fontSize: 8 }, // 减小图例文字大小
      itemWidth: 8, // 减小图例项的宽度
      itemHeight: 6, // 减小图例项的高度
      itemGap: 5 // 减小图例项之间的间距
    },
    xAxis: {
      type: 'category',
      data: ['阳虚', '阴虚', '气虚'],
      axisLabel: { color: '#fff' }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#fff' ,fontSize:'8'}
    },
    series: [
      {
        name: '舌淡胖大',
        type: 'bar',
        data: [50, 0, 0]
      },
      {
        name: '齿痕舌',
        type: 'bar',
        data: [40, 0, 0]
      },
      {
        name: '舌红少苔',
        type: 'bar',
        data: [0, 45, 0]
      },
      {
        name: '裂纹舌',
        type: 'bar',
        data: [0, 35, 0]
      },
      {
        name: '舌淡',
        type: 'bar',
        data: [0, 0, 40]
      },
      {
        name: '苔薄白',
        type: 'bar',
        data: [0, 0, 30]
      }
    ]
  })
})
onMounted(() => {
  const chart = echarts.init(document.getElementById('chart8'))
  chart.setOption({
    title: {
      text: '舌象与体质关联频率',
      left: 'center',
      top:'30',
      textStyle: { color: '#0ff', fontSize: 8 }
    },
    tooltip: {},
    legend: {
      bottom: 0,
      textStyle: { color: '#fff' }
    },
    xAxis: {
      type: 'category',
      data: ['阳虚', '阴虚', '气虚'],
      axisLabel: { color: '#fff' }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#fff' ,fontSize:'8'}
    },
    series: [
      {
        name: '舌红',
        type: 'bar',
        stack: '总量',
        data: [40, 60, 20]
      },
      {
        name: '齿痕舌',
        type: 'bar',
        stack: '总量',
        data: [50, 20, 60]
      },
      {
        name: '苔白',
        type: 'bar',
        stack: '总量',
        data: [30, 10, 55]
      }
    ]
  })
})
  </script>

<style scoped>
@media (max-width: 701px) {
  .left-panel,
  .right-panel {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    width: 250px;
    max-height: 80vh;
    overflow-y: auto;
    z-index: 900;
  }

  .left-panel {
    left: 20px;
  }

  .right-panel {
    right: 20px;
  }
}
.text-scroll {
  overflow: hidden;
  height: 100%;
  position: relative;
}

.text-scroll ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
  animation: scroll-up 30s linear infinite;
}

@keyframes scroll-up {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}
.text-scroll li {
  padding: 6px 0;
  font-family: "仿宋", "楷体", "霞鹜文楷", serif;
  font-size: 10px;
  color: #e0fdfa;
  white-space: nowrap;
}

.mini-chart {
  width: 100%;
  height: 100px;
  margin-bottom: 50px;
  /* border: 1px dashed #0ff; */
  background: #111;
}

</style>