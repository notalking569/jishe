
<template>
    <div class="four-diagnosis-platform">
      <!-- 顶部标题栏 -->
      <header class="header">
        <h1>问诊--通过言语诉说还原病情逻辑，主观症状成为可分析的结构化信息</h1>
        <div class="header-buttons">
          <button class="top-right-button" @click="router.push('/data-sichuan')">川域流派</button>
          <button class="top-right-button" @click="router.push('/data')">返回</button>
        </div>
      </header>
      <!-- inquiry -->
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
          <div class="chart-cell" id="inquiryChart1"></div>
          <div class="chart-cell" id="inquiryChart2"></div>
          <div class="chart-cell" id="inquiryChart3"></div>
          <div class="chart-cell" id="inquiryChart4"></div>
</div>
<div class="chart-border">
          <div class="chart-cell" id="inquiryChart5"></div>
          <div class="chart-cell" id="inquiryChart6"></div>
          <div class="chart-cell" id="inquiryChart7"></div>
          <div class="chart-cell" id="inquiryChart8"></div>
        </div>
        </div>
      </section>
        <!-- 中间主要内容 -->
        <main class="center-panel">
          <div class="video-box">
            <video src="/wwwq2.mp4" autoplay muted loop controls></video>
          </div>
          <div id="wordcloud" class="wordcloud-box"></div>
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
  <li>常觉腹胀，嗳气频频，属脾胃不和。</li>
  <li>入夜难寐，多梦易醒，为心神不宁。</li>
  <li>畏寒肢冷，喜热饮，属阳虚体质。</li>
  <li>口苦咽干，夜热早凉，为肝火内盛。</li>
  <li>大便稀溏，完谷不化，属脾虚泄泻。</li>
  <li>小便频数，夜尿多，属肾气不固。</li>
  <li>胸闷不舒，易怒善叹，为肝气郁结。</li>
  <li>食少纳呆，腹中隐痛，属脾胃虚寒。</li>
  <li>口干舌燥，大便秘结，为肠腑积热。</li>
  <li>四肢麻木，筋骨酸软，为气血不足。</li>
  <li>耳鸣如蝉，头晕健忘，属肝肾亏损。</li>
  <li>咽干目涩，五心烦热，为阴虚火旺。</li>
  <li>心悸失眠，舌红少苔，属心阴不足。</li>
  <li>形寒怕冷，精神萎靡，为脾肾阳虚。</li>
  <li>口渴引饮，小便短赤，为胃热炽盛。</li>
  <li>嗳气频作，胸闷胁痛，属肝郁气滞。</li>
  <li>经期紊乱，腹痛经血暗，为瘀阻胞宫。</li>
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
    margin-left: 8px;
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
     padding: 10px;
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
      case 'main':
        router.push('/main')
        break
      default:
        router.push('/')
    }
  }
  onMounted(() => {
    const chart = echarts.init(document.getElementById('wordcloud'))
    chart.setOption({
  title: {
    text: '主诉关键词词云',
    left: 'center',
    textStyle: {
      color: '#0ff',
      fontSize: 18,
      fontWeight: 'bold',
    }
  },
  tooltip: {},
  series: [{
    type: 'wordCloud',
    shape: 'diamond',
    sizeRange: [16, 42],
    rotationRange: [-45, 45],
    gridSize: 6,
    layoutAnimation: true,
    textStyle: {
      fontFamily: '霞鹜文楷, 楷体',
      fontWeight: 'bold',
      color: () => `hsl(${Math.random() * 360}, 90%, 70%)`
    },
    data: [
      { name: '头痛', value: 120 },
      { name: '咳嗽', value: 110 },
      { name: '失眠', value: 105 },
      { name: '口干', value: 95 },
      { name: '乏力', value: 90 },
      { name: '腹胀', value: 85 },
      { name: '盗汗', value: 80 },
      { name: '心悸', value: 75 },
      { name: '便秘', value: 70 },
      { name: '焦虑', value: 65 },
      { name: '纳差', value: 60 },
      { name: '月经不调', value: 58 },
      { name: '鼻塞', value: 55 },
      { name: '胸闷', value: 50 },
      { name: '腹泻', value: 45 },
      { name: '畏寒', value: 40 }
    ]
  }]
})

  })
  
  onMounted(() => {
  const chart = echarts.init(document.getElementById('heatmap'));
  chart.setOption({
    title: {
      text: '古籍中症状与诱因热力图',
      left: 'center',
      textStyle: { color: '#0ff', fontSize: 14 } // 减小标题字体大小
    },
    tooltip: {
      position: 'top'
    },
    grid: {
      height: '50%', // 缩小图表高度
      width: '80%', // 缩小图表宽度
      top: '15%', // 调整顶部距离
      left: '15%', // 调整左侧距离
      right: '10%' // 调整右侧距离
    },
    xAxis: {
      type: 'category',
      data: ['腹胀', '胸闷', '失眠', '头痛', '口苦'],
      axisLabel: { color: '#fff', fontSize: 8 } // 减小 X 轴标签字体大小
    },
    yAxis: {
      type: 'category',
      data: ['饮食所伤', '情志不遂', '湿热内蕴', '气机郁滞', '阴虚火旺'],
      axisLabel: { color: '#fff', fontSize: 8 } // 减小 Y 轴标签字体大小
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'vertical',
      right: 0,
      top: 'center',
      textStyle: { color: '#fff', fontSize: 8 } // 减小视觉映射字体大小
    },
    series: [{
      name: '症状-诱因',
      type: 'heatmap',
      data: [
        [0, 0, 80], [1, 0, 60], [2, 0, 40], [3, 0, 30], [4, 0, 20],
        [0, 1, 30], [1, 1, 75], [2, 1, 55], [3, 1, 40], [4, 1, 35],
        [0, 2, 45], [1, 2, 50], [2, 2, 80], [3, 2, 60], [4, 2, 30],
        [0, 3, 25], [1, 3, 35], [2, 3, 40], [3, 3, 70], [4, 3, 50],
        [0, 4, 20], [1, 4, 30], [2, 4, 50], [3, 4, 60], [4, 4, 80]
      ],
      label: {
        show: true,
        color: '#fff',
        fontSize: 8 // 减小标签字体大小
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 8,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  });
});


onMounted(() => {
  // 第一个饼图：古籍问诊证候分布图
  const chart1 = echarts.init(document.getElementById('donut-left'));
  chart1.setOption({
    title: {
      text: '古籍问诊证候分布图',
      left: 'center',
      textStyle: { color: '#0ff', fontSize: 14 }
    },
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie',
      radius: ['10%', '50%'], // 缩小饼图大小
      roseType: 'radius',
      itemStyle: { borderRadius: 5 },
      label: {
        show: true,
        color: '#fff',
        fontSize: 8 // 减小标签字体大小
      },
      data: [
        { value: 40, name: '寒热往来' },
        { value: 35, name: '心悸怔忡' },
        { value: 30, name: '五心烦热' },
        { value: 28, name: '潮热盗汗' },
        { value: 26, name: '口渴咽干' },
        { value: 22, name: '胁痛胸闷' },
        { value: 20, name: '脘腹胀满' },
        { value: 18, name: '大便溏泄' }
      ]
    }]
  });

  // 第二个饼图：主诉归类占比图
  const chart2 = echarts.init(document.getElementById('donut-right'));
  chart2.setOption({
    title: {
      text: '主诉归类占比图',
      left: 'center',
      textStyle: { color: '#0ff', fontSize: 14 } // 减小标题字体大小
    },
    tooltip: { trigger: 'item' },
    legend: {
      bottom: 0,
      textStyle: { color: '#fff', fontSize: 8 }, // 减小图例字体大小
      itemWidth: 10, // 调整图例标记的宽度
      itemHeight: 10, // 调整图例标记的高度
    },
    series: [{
      type: 'pie',
      radius: ['20%', '40%'], // 缩小饼图大小
      avoidLabelOverlap: false,
      label: {
        show: true,
        color: '#fff',
        fontSize: 8, // 减小标签字体大小
        formatter: '{b}：{d}%'
      },
      labelLine: {
        show: true
      },
      data: [
        { value: 45, name: '外感六淫' }, // 风寒暑湿燥火
        { value: 30, name: '情志内伤' }, // 忧思恼怒
        { value: 15, name: '饮食不节' },
        { value: 10, name: '劳倦过度' }
      ]
    }]
  });
});
  
  onMounted(() => {
    // initLineChart('line1', '常见症状频率', ['头痛', '失眠', '口干', '心悸', '盗汗'], [98, 88, 72, 60, 54])
    initGraphChart('line2', '体质与问诊症状关系图', [
  { name: '阴虚', symbolSize: 60 },
  { name: '阳虚', symbolSize: 60 },
  { name: '气郁', symbolSize: 60 },
  { name: '失眠', symbolSize: 40 },
  { name: '盗汗', symbolSize: 40 },
  { name: '心悸', symbolSize: 40 }
], [
  { source: '阴虚', target: '失眠' },
  { source: '阴虚', target: '盗汗' },
  { source: '阳虚', target: '心悸' },
  { source: '气郁', target: '失眠' }
])

  })
  onMounted(() => {
  const chart = echarts.init(document.getElementById('line1'));
  chart.setOption({
    title: {
      text: '古籍主诉症状频率图',
      left: 'center',
      textStyle: { color: '#0ff', fontSize: 14 }
    },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['心悸', '怔忡', '夜不寐', '胸痹', '腹胀', '潮热', '口渴', '五心烦热'],
      axisLabel: { color: '#fff', fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#fff' },
      splitLine: { lineStyle: { color: '#333' } }
    },
    series: [{
      data: [85, 78, 73, 65, 62, 58, 54, 50],
      type: 'line',
      smooth: true,
      lineStyle: { color: '#0ff' },
      itemStyle: { color: '#0ff' },
      areaStyle: { color: 'rgba(0, 255, 255, 0.2)' }
    }],
    backgroundColor: 'transparent'
  });
});


  function initLineChart(id, title, xData, yData) {
    const chart = echarts.init(document.getElementById(id))
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
          type: 'line',
          smooth: true,
          lineStyle: { color: '#0ff' },
          itemStyle: { color: '#0ff' },
          areaStyle: {
            color: 'rgba(0, 255, 255, 0.2)'
          }
        }
      ],
      backgroundColor: 'transparent'
    })
  }
  function initGraphChart(id, title, data, links) {
  const chart = echarts.init(document.getElementById(id))
  chart.setOption({
    title: {
      text: title,
      left: 'center',
      textStyle: { color: '#0ff', fontSize: 14 }
    },
    tooltip: {},
    series: [
      {
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
        data,
        links,
        lineStyle: {
          color: '#0ff'
        }
      }
    ]
  })
}
// 问诊图表初始化 - inquiryChart1：玫瑰图 展示古籍中常见证候分布
// onMounted(() => {
//   const chart = echarts.init(document.getElementById('inquiryChart1'))
//   chart.setOption({
//     title: {
//       text: '古籍问诊证候分布图',
//       left: 'center',
//       textStyle: { color: '#0ff', fontSize: 14 }
//     },
//     tooltip: { trigger: 'item' },
//     series: [{
//       type: 'pie',
//       radius: ['20%', '70%'],
//       roseType: 'radius',
//       itemStyle: { borderRadius: 5 },
//       label: { color: '#fff', fontSize: 10 },
//       data: [
//         { value: 40, name: '寒热往来' },
//         { value: 35, name: '心悸怔忡' },
//         { value: 30, name: '五心烦热' },
//         { value: 28, name: '潮热盗汗' },
//         { value: 26, name: '口渴咽干' },
//         { value: 22, name: '胁痛胸闷' },
//         { value: 20, name: '脘腹胀满' },
//         { value: 18, name: '大便溏泄' }
//       ]
//     }]
//   })
// })

onMounted(() => {
  const chart = echarts.init(document.getElementById('inquiryChart1'))
  chart.setOption({
    title: {
      text: '古籍问诊证候频率路径图',
      left: 'center',
      textStyle: { color: '#0ff', fontSize: 8 }
    },
    tooltip: { trigger: 'item', formatter: '{b}：{c} 次' },
    series: [{
      type: 'funnel',
      left: '10%',
      top: 20,
      bottom: 20,
      width: '80%',
      min: 0,
      max: 100,
      label: {
        show: true,
        position: 'inside',
        color: '#fff',
        fontSize: 8
      },
      itemStyle: { borderColor: '#0ff', borderWidth: 1 },
      data: [
        { value: 95, name: '头痛' },
        { value: 85, name: '寒热' },
        { value: 70, name: '咳嗽' },
        { value: 60, name: '虚实' },
        { value: 50, name: '表里' }
      ]
    }]
  })
})

onMounted(() => {
  const chart = echarts.init(document.getElementById('inquiryChart2'));
  chart.setOption({
    title: {
      text: '古籍主诉归因网络图',
      left: 'center',
      textStyle: { color: '#0ff', fontSize: 8 }
    },
    tooltip: { trigger: 'item' },
    series: [{
      type: 'graph',
      layout: 'force',
      roam: true,
      force: {
        repulsion: 100,
        edgeLength: [30, 80]
      },
      label: {
        show: true,
        color: '#fff',
        fontSize: 10
      },
      data: [
        { name: '腹胀', category: 0, symbolSize: 40 },
        { name: '胸闷', category: 0, symbolSize: 40 },
        { name: '失眠', category: 0, symbolSize: 40 },
        { name: '饮食所伤', category: 1, symbolSize: 30 },
        { name: '情志不遂', category: 1, symbolSize: 30 },
        { name: '湿热内蕴', category: 1, symbolSize: 30 }
      ],
      links: [
        { source: '腹胀', target: '饮食所伤' },
        { source: '胸闷', target: '情志不遂' },
        { source: '失眠', target: '湿热内蕴' }
      ],
      categories: [
        { name: '症状' },
        { name: '归因' }
      ],
      lineStyle: {
        color: '#0ff'
      },
      emphasis: {
        lineStyle: {
          width: 3
        }
      }
    }]
  });
});


onMounted(() => {
  const chart = echarts.init(document.getElementById('inquiryChart3'))
  chart.setOption({
    title: {
      text: '主诉与六气属性分布',
      textStyle: { color: '#0ff', fontSize: 8 },
      left: 'center'
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['风', '寒', '暑', '湿', '燥', '火'],
      axisLabel: { color: '#fff' }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#fff' ,fontSize:'8'}
    },
    series: [{
      name: '提及频次',
      type: 'bar',
      data: [25, 40, 18, 33, 22, 28],
      itemStyle: {
        color: '#0ff'
      },
      label: {
        show: true,
        position: 'top',
        color: '#fff'
      }
    }]
  })
})

onMounted(() => {
  const chart = echarts.init(document.getElementById('inquiryChart4'))
  chart.setOption({
    title: {
      text: '主诉与五脏归属分析',
      textStyle: { color: '#0ff', fontSize: 8 },
      left: 'center'
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['肝', '心', '脾', '肺', '肾'],
      axisLabel: { color: '#fff' }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#fff',fontSize:'8' }
    },
    series: [{
      name: '主诉频次',
      type: 'bar',
      data: [22, 35, 28, 40, 30],
      itemStyle: {
        color: '#0ff'
      },
      label: {
        show: true,
        position: 'top',
        color: '#fff'
      }
    }]
  })
})

onMounted(() => {
  const chart = echarts.init(document.getElementById('inquiryChart5'));
  chart.setOption({
    title: {
      text: '五行归属与主诉映射',
      left: 'center',
      textStyle: { color: '#0ff', fontSize: '8' }
    },
    radar: {
      indicator: [
        { name: '金', max: 50 }, // 缩小最大值
        { name: '木', max: 50 },
        { name: '水', max: 50 },
        { name: '火', max: 50 },
        { name: '土', max: 50 }
      ],
      name: { textStyle: { color: '#fff', fontSize: 8 } }, // 缩小字体大小
      splitLine: { lineStyle: { color: '#0ff' } },
      axisLine: { lineStyle: { color: '#0ff' } },
      radius: '50%' // 缩小雷达图的半径
    },
    series: [{
      type: 'radar',
      data: [{
        value: [30, 40, 22, 35, 25], // 缩小数值
        name: '主诉五行分布'
      }],
      label: { show: true, fontSize: 8 }, // 缩小标签字体大小
      areaStyle: { color: 'rgba(0, 255, 255, 0.1)' } // 降低透明度
    }]
  });
});


onMounted(() => {
  const chart = echarts.init(document.getElementById('inquiryChart6'))
  chart.setOption({
    title: { text: '情志与主诉的症状流', left: 'center', textStyle: { color: '#0ff' ,fontSize:'8'} },
    series: [{
      type: 'sankey',
      data: [
        { name: '忧' }, { name: '怒' }, { name: '思' },
        { name: '咳嗽' }, { name: '头痛' }, { name: '失眠' }
      ],
      links: [
        { source: '忧', target: '咳嗽', value: 8 },
        { source: '怒', target: '头痛', value: 6 },
        { source: '思', target: '失眠', value: 10 }
      ],
      label: { color: '#fff' },
      lineStyle: { color: 'source' }
    }]
  })
})

onMounted(() => {
  const chart = echarts.init(document.getElementById('inquiryChart7'))
  chart.setOption({
    title: {
      text: '证型与主诉症状对应分析',
      left: 'center',
      textStyle: { color: '#0ff' ,fontSize:'8'}
    },
    tooltip: { trigger: 'axis' },
    legend: {
      bottom: 0,
      textStyle: { color: '#fff' }
    },
    xAxis: {
      type: 'category',
      data: ['咳嗽', '头痛', '胸闷'],
      axisLabel: { color: '#fff' }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#fff',fontSize:'8' }
    },
    series: [
      {
        name: '风寒',
        type: 'bar',
        stack: '总量',
        data: [30, 10, 5]
      },
      {
        name: '湿热',
        type: 'bar',
        stack: '总量',
        data: [10, 25, 15]
      },
      {
        name: '气郁',
        type: 'bar',
        stack: '总量',
        data: [5, 15, 20]
      }
    ]
  })
})
onMounted(() => {
  const chart = echarts.init(document.getElementById('inquiryChart8'));
  chart.setOption({
    title: {
      text: '主诉症状所涉脏腑分布',
      left: 'center',
      textStyle: { color: '#0ff', fontSize: '8' }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      bottom: 0,
      textStyle: { color: '#fff', fontSize: '8' } ,// 缩小字体大小
      itemHeight:'5',
      itemWidth:'5',
      orient: 'vertical' // 设置图例为水平排列
    },
    series: [{
      name: '脏腑归属',
      type: 'pie',
      radius: [10, 50], // 缩小饼图的内外半径
      center: ['50%', '50%'],
      roseType: 'area',
      label: {
        color: '#fff',
        fontSize: 6 // 缩小标签字体大小
      },
      data: [
        { value: 35, name: '肺（咳嗽、气短）' },
        { value: 30, name: '心（失眠、心悸）' },
        { value: 25, name: '肝（头痛、易怒）' },
        { value: 20, name: '脾（腹胀、纳差）' },
        { value: 15, name: '肾（耳鸣、畏寒）' }
      ]
    }],
    grid: {
      left: '5%', // 调整图表的边距
      right: '5%',
      bottom: '10%',
      top: '15%',
      containLabel: true
    }
  });
});


  
  </script>