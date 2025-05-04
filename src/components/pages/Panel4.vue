
<template>
    <div class="four-diagnosis-platform">
      <!-- 顶部标题栏 -->
      <header class="header">
        <h1>切诊--将脉象、按压、触感数据化表达，“指下知病”的经验量化可视</h1>
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
    <!-- 中间扩展区域 -->
    <section class="left-extension">
        <div class="chart-grid">
<div class="chart-border">
          <div class="chart-cell" id="pulseChart1"></div>
          <div class="chart-cell" id="pulseChart2"></div>
          <div class="chart-cell" id="pulseChart3"></div>
          <div class="chart-cell" id="pulseChart4"></div>
</div>
<div class="chart-border">
          <div class="chart-cell" id="pulseChart5"></div>
          <div class="chart-cell" id="pulseChart6"></div>
          <div class="chart-cell" id="pulseChart7"></div>
          <div class="chart-cell" id="pulseChart8"></div>
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
  <li>脉浮而紧，为表寒之象。</li>
  <li>脉细而数，属阴虚内热。</li>
  <li>脉滑而实，痰热内盛之征。</li>
  <li>脉沉迟无力，为阳虚寒凝。</li>
  <li>脉弦而长，多属肝郁气滞。</li>
  <li>脉洪大有力，属实热内盛。</li>
  <li>脉虚无力，气血两亏之象。</li>
  <li>脉细涩不畅，为瘀血阻络。</li>
  <li>脉滑数，属热痰扰络。</li>
  <li>脉沉细迟，为寒湿内盛。</li>
  <li>脉浮数无根，为虚火上炎。</li>
  <li>脉缓无力，为脾虚运化失职。</li>
  <li>脉沉细而数，属虚热内扰。</li>
  <li>脉大无力，为气虚失摄。</li>
  <li>脉弦细为主，属肝肾阴虚。</li>
  <li>脉涩带结，多属血瘀痹阻。</li>
  <li>脉迟有力，为寒凝中实。</li>
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
    height: 400px;
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
  height: 850px;
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
    text: '脉象关键词词云',
    left: 'center',
    textStyle: { color: '#0ff', fontSize: 18 ,fontFamily:'微软雅黑'}
  },
  textStyle: {
      fontFamily: '霞鹜文楷, 楷体',
      fontWeight: 'bold',
      color: () => `hsl(${Math.random() * 360}, 90%, 70%)`
    },
  tooltip: {},
  series: [{
    type: 'wordCloud',
    shape: 'circle',
    sizeRange: [14, 38],
    rotationRange: [-45, 45],
    gridSize: 6,
    drawOutOfBound: false,
    layoutAnimation: true,
    textStyle: {
      color: () => `hsl(${Math.random() * 360}, 100%, 70%)`
    },
    fontFamily: '霞鹜文楷, 楷体',
    data: [
      { name: '浮脉', value: 110 },
      { name: '沉脉', value: 100 },
      { name: '迟脉', value: 90 },
      { name: '数脉', value: 85 },
      { name: '滑脉', value: 75 },
      { name: '涩脉', value: 70 },
      { name: '虚脉', value: 65 },
      { name: '实脉', value: 60 },
      { name: '弦脉', value: 55 },
      { name: '洪脉', value: 50 },
      { name: '细脉', value: 48 },
      { name: '结脉', value: 45 },
      { name: '代脉', value: 42 },
      { name: '弱脉', value: 40 },
      { name: '紧脉', value: 38 }
    ]
  }]
})

  })
  
  
  onMounted(() => {
  const chart = echarts.init(document.getElementById('heatmap'))
  chart.setOption({
    title: {
      text: '古籍中症状与脉象共现热力图',
      left: 'center',
      textStyle: { color: '#0ff', fontSize: 16 }
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['头痛', '发热', '咳嗽', '盗汗', '失眠'],
      axisLabel: { color: '#fff', fontSize: 8 },
      splitArea: { show: true }
    },
    yAxis: {
      type: 'category',
      data: ['浮脉', '沉脉', '数脉', '迟脉', '滑脉', '细脉'],
      axisLabel: { color: '#fff', fontSize: 8 },
      splitArea: { show: true }
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'vertical',
      right: 0,
      top: 'center',
      textStyle: { color: '#fff' }
    },
    series: [{
      type: 'heatmap',
      data: [
        [0, 0, 80], [1, 0, 30], [2, 0, 50], [3, 0, 40], [4, 0, 30],
        [0, 1, 20], [1, 1, 70], [2, 1, 10], [3, 1, 20], [4, 1, 15],
        [0, 2, 40], [1, 2, 60], [2, 2, 90], [3, 2, 20], [4, 2, 30],
        [0, 3, 30], [1, 3, 50], [2, 3, 40], [3, 3, 80], [4, 3, 50],
        [0, 4, 60], [1, 4, 30], [2, 4, 50], [3, 4, 60], [4, 4, 90]
      ],
      label: { show: true, color: '#fff', fontSize: 8 },
      emphasis: {
        itemStyle: {
          shadowBlur: 5,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  })
})
onMounted(() => {
  const chart = echarts.init(document.getElementById('donut-left'));
  chart.setOption({
    title: {
      text: '脉象与体质彩色关联图',
      left: 'center',
      textStyle: { color: '#0ff', fontSize: 14 }
    },
    tooltip: {},
    series: [{
      type: 'graph',
      layout: 'force',
      roam: true,
      force: {
        repulsion: 120,
        edgeLength: 100
      },
      data: [
        { name: '气虚', symbolSize: 60, itemStyle: { color: '#FF9F1C' } },
        { name: '血虚', symbolSize: 60, itemStyle: { color: '#2EC4B6' } },
        { name: '阳虚', symbolSize: 60, itemStyle: { color: '#3D348B' } },
        { name: '虚脉', symbolSize: 40, itemStyle: { color: '#FF6B6B' } },
        { name: '细脉', symbolSize: 40, itemStyle: { color: '#70C1B3' } },
        { name: '沉脉', symbolSize: 40, itemStyle: { color: '#B5838D' } }
      ],
      links: [
        { source: '气虚', target: '虚脉' },
        { source: '血虚', target: '细脉' },
        { source: '阳虚', target: '沉脉' }
      ],
      label: {
        show: true,
        color: '#fff'
      },
      lineStyle: {
        color: '#0ff'
      }
    }]
  });
});

onMounted(() => {
  const chart = echarts.init(document.getElementById('donut-right'));
  chart.setOption({
    title: {
      text: '常见脉象类型玫瑰图',
      left: 'center',
      textStyle: { color: '#0ff', fontSize: 14 } // 减小标题字体大小
    },
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie',
      roseType: 'area',
      radius: ['20%', '50%'], // 缩小图表的半径范围
      label: {
        show: true,
        color: '#fff',
        fontSize: 8 // 减小标签字体大小
      },
      data: [
        { value: 85, name: '弦脉', itemStyle: { color: '#FF6B6B' } },
        { value: 72, name: '滑脉', itemStyle: { color: '#4ECDC4' } },
        { value: 60, name: '细脉', itemStyle: { color: '#FFD93D' } },
        { value: 45, name: '沉脉', itemStyle: { color: '#845EC2' } },
        { value: 30, name: '虚脉', itemStyle: { color: '#00C9A7' } }
      ]
    }]
  });
});
onMounted(() => {
  const chart = echarts.init(document.getElementById('donut-left'));
  chart.setOption({
    title: {
      text: '体质与脉象映射圆环图',
      left: 'center',
      textStyle: { color: '#0ff', fontSize: 14 }
    },
    tooltip: { trigger: 'item' },
    legend: {
      bottom: 0,
      textStyle: { color: '#fff', fontSize: 10 }
    },
    series: [
      {
        name: '体质',
        type: 'pie',
        radius: ['20%', '35%'],
        label: { show: false },
        data: [
          { value: 30, name: '气虚', itemStyle: { color: '#FF9F1C' } },
          { value: 30, name: '血虚', itemStyle: { color: '#2EC4B6' } },
          { value: 30, name: '阳虚', itemStyle: { color: '#3D348B' } }
        ]
      },
      {
        name: '脉象',
        type: 'pie',
        radius: ['40%', '60%'],
        label: {
          formatter: '{b}',
          color: '#fff',
          fontSize: 10
        },
        labelLine: { show: true },
        data: [
          { value: 15, name: '虚脉', itemStyle: { color: '#FF6B6B' } },
          { value: 15, name: '细脉', itemStyle: { color: '#70C1B3' } },
          { value: 15, name: '沉脉', itemStyle: { color: '#B5838D' } }
        ]
      }
    ]
  });
});

  onMounted(() => {
    // initLineChart('line1', '脉象类型分布', ['弦脉', '滑脉', '细脉', '沉脉', '虚脉'], [85, 72, 60, 45, 30])
    initGraphChart('line2', '体质与脉象关系图', [
  { name: '气虚', symbolSize: 60 },
  { name: '血虚', symbolSize: 60 },
  { name: '阳虚', symbolSize: 60 },
  { name: '虚脉', symbolSize: 40 },
  { name: '细脉', symbolSize: 40 },
  { name: '沉脉', symbolSize: 40 }
], [
  { source: '气虚', target: '虚脉' },
  { source: '血虚', target: '细脉' },
  { source: '阳虚', target: '沉脉' }
])

  })
  
  onMounted(() => {
  const chart = echarts.init(document.getElementById('line1'));
  chart.setOption({
    title: {
      text: '脉象类型分布',
      left: 'center',
      textStyle: { color: '#0ff', fontSize: 8 }
    },
    tooltip: { trigger: 'axis' },
    legend: {
      bottom: 0,
      textStyle: { color: '#fff', fontSize: 8 }
    },
    xAxis: {
      type: 'category',
      data: ['弦脉', '滑脉', '细脉', '沉脉', '虚脉'],
      axisLabel: { color: '#fff', fontSize: 8 }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#fff', fontSize: 8 }
    },
    series: [
      {
        name: '气虚',
        type: 'bar',
        stack: '总量',
        data: [20, 25, 35, 15, 5],
        barWidth: 10
      },
      {
        name: '血虚',
        type: 'bar',
        stack: '总量',
        data: [10, 15, 5, 20, 25],
        barWidth: 10
      },
      {
        name: '阴虚',
        type: 'bar',
        stack: '总量',
        data: [15, 20, 10, 5, 15],
        barWidth: 10
      }
    ]
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
onMounted(() => {
  const chart = echarts.init(document.getElementById('pulseChart1'));
  chart.setOption({
    title: {
      text: '古籍脉象分类结构图',
      left: 'center',
      textStyle: { color: '#0ff', fontSize: '8' } // 进一步减小标题字体大小
    },
    series: [{
      type: 'sunburst',
      data: [
        {
          name: '脉象',
          children: [
            {
              name: '正常脉',
              children: [
                { name: '平脉', value: 1 }
              ]
            },
            {
              name: '异常脉',
              children: [
                {
                  name: '表证脉',
                  children: [
                    { name: '浮脉', value: 1 },
                    { name: '紧脉', value: 1 }
                  ]
                },
                {
                  name: '里证脉',
                  children: [
                    { name: '沉脉', value: 1 },
                    { name: '迟脉', value: 1 }
                  ]
                },
                {
                  name: '寒证脉',
                  children: [
                    { name: '迟脉', value: 1 },
                    { name: '沉迟', value: 1 }
                  ]
                },
                {
                  name: '热证脉',
                  children: [
                    { name: '数脉', value: 1 },
                    { name: '滑数', value: 1 }
                  ]
                }
              ]
            }
          ]
        }
      ],
      radius: [0, '80%'], // 缩小图表的半径范围
      label: {
        color: '#000',
        fontSize: 6 // 进一步减小标签字体大小
      },
      itemStyle: {
        borderColor: '#0ff',
        borderWidth: 0.5 // 减小边框宽度
      }
    }]
  });
});
onMounted(() => {
  const chart = echarts.init(document.getElementById('pulseChart2'));
  chart.setOption({
    title: {
      text: '寒热脉象极性分布',
      left: 'center',
      textStyle: { color: '#0ff', fontSize: '8' } // 进一步减小标题字体大小
    },
    angleAxis: {
      type: 'category',
      data: ['迟脉', '沉脉', '滑脉', '数脉'],
      axisLabel: { color: '#fff', fontSize: 6 } // 进一步减小轴标签字体大小
    },
    radiusAxis: {
      type: 'value',
      max: 40, // 缩小最大值范围
      axisLabel: { color: '#fff', fontSize: 8 } // 进一步减小轴标签字体大小
    },
    polar: {
      radius: ['10%', '60%'] // 缩小极坐标系的半径范围
    },
    tooltip: {},
    series: [
      {
        type: 'bar',
        data: [15, 12, 17, 14], // 缩小数据值
        coordinateSystem: 'polar',
        name: '脉象频率',
        itemStyle: {
          color: function (params) {
            // 根据数据索引设置颜色
            if (params.dataIndex < 2) {
              return '#007bff'; // 寒脉（迟脉、沉脉）为蓝色
            } else {
              return '#dc3545'; // 热脉（滑脉、数脉）为红色
            }
          }
        }
      }
    ]
  });
});

onMounted(() => {
  const chart = echarts.init(document.getElementById('pulseChart3'));
  chart.setOption({
    title: {
      text: '古籍脉象频次统计',
      textStyle: { color: '#0ff', fontSize: '8' },
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: [
        '灵枢 - 浮脉', '灵枢 - 沉脉', '灵枢 - 数脉',
        '难经 - 滑脉', '难经 - 迟脉', '难经 - 细脉',
        '脉经 - 弦脉', '脉经 - 涩脉', '脉经 - 虚脉',
        '素问 - 实脉', '素问 - 紧脉', '素问 - 缓脉',
        '外台秘要 - 浮脉', '外台秘要 - 沉脉', '外台秘要 - 数脉'
      ],
      axisLabel: { color: '#fff', fontSize: 6 } // 减小字体大小以适应更多标签
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#fff', fontSize: '8' }
    },
    series: [
      {
        name: '频次',
        type: 'bar',
        data: [80, 60, 50, 70, 40, 30, 65, 55, 45, 75, 65, 55, 85, 75, 65],
        itemStyle: { color: '#0ff' }
      }
    ]
  });
});
onMounted(() => {
  const chart = echarts.init(document.getElementById('pulseChart4'));
  chart.setOption({
    title: {
      text: '脉象与五脏对应强度图',
      left: 'center',
      textStyle: { color: '#0ff', fontSize: 8 }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    legend: {
      bottom: 0,
      textStyle: { color: '#fff',fontSize:'8' },
      top:'140',
      itemHeight:'5',
      itemWidth:'5'
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '30%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: { color: '#fff' },
      splitLine: { lineStyle: { color: '#333' } }
    },
    yAxis: {
      type: 'category',
      data: ['浮脉', '沉脉', '迟脉', '数脉'],
      axisLabel: { color: '#fff',fontSize:'8' }
    },
    series: [
      {
        name: '肺',
        type: 'bar',
        stack: '脏腑',
        data: [1, 0, 0, 0],
        itemStyle: { color: '#00ffff' }
      },
      {
        name: '肾',
        type: 'bar',
        stack: '脏腑',
        data: [0, 1, 0, 0],
        itemStyle: { color: '#00ccff' }
      },
      {
        name: '脾',
        type: 'bar',
        stack: '脏腑',
        data: [0, 0, 1, 0],
        itemStyle: { color: '#0099ff' }
      },
      {
        name: '心',
        type: 'bar',
        stack: '脏腑',
        data: [0, 0, 0, 1],
        itemStyle: { color: '#0066ff' }
      }
    ]
  });
});



onMounted(() => {
  const chart = echarts.init(document.getElementById('pulseChart5'));
  chart.setOption({
    title: {
      text: '《脉经》脉象频次雷达图',
      left: 'center',
      textStyle: { color: '#0ff',fontSize:'8' }
    },
    tooltip: {},
    radar: {
      indicator: [
        { name: '浮脉', max: 50 },
        { name: '滑脉', max: 50 },
        { name: '弦脉', max: 50 }
      ],
      radius:'40',
      name: { textStyle: { color: '#fff' } },
      splitLine: { lineStyle: { color: '#0ff' } },
      axisLine: { lineStyle: { color: '#0ff' } }
    },
    series: [{
      type: 'radar',
      data: [{
        value: [40, 35, 25],
        name: '频次',
        lineStyle: { color: '#0ff' },
        itemStyle: { color: '#0ff' },
        areaStyle: { color: 'rgba(0,255,255,0.2)' }
      }]
    }]
  });
});

onMounted(() => {
  const chart = echarts.init(document.getElementById('pulseChart6'));
  chart.setOption({
    title: {
      text: '脉象与疾病关联网络图',
      left: 'center',
      textStyle: { color: '#0ff' ,fontSize:'8'}
    },
    series: [{
      type: 'graph',
      layout: 'force',
      data: [
        { name: '滑脉', symbolSize: 40 },
        { name: '弦脉', symbolSize: 40 },
        { name: '痰饮', symbolSize: 30 },
        { name: '实热', symbolSize: 30 },
        { name: '肝郁', symbolSize: 30 },
        { name: '疼痛', symbolSize: 30 }
      ],
      links: [
        { source: '滑脉', target: '痰饮' },
        { source: '滑脉', target: '实热' },
        { source: '弦脉', target: '肝郁' },
        { source: '弦脉', target: '疼痛' }
      ],
      label: { show: true, color: '#fff' },
      lineStyle: { color: '#0ff' }
    }]
  });
});
onMounted(() => {
  const chart = echarts.init(document.getElementById('pulseChart7'));
  chart.setOption({
    title: {
      text: '《难经》脉象极分析',
      left: 'center',
      textStyle: { color: '#0ff', fontSize: '6' } // 进一步减小标题字体大小
    },
    angleAxis: {
      type: 'category',
      data: ['浮', '沉', '滑', '涩', '细'],
      axisLabel: { color: '#fff', fontSize: 6 }, // 进一步减小轴标签字体大小
      axisLine: { lineStyle: { color: '#0ff' } }
    },
    radiusAxis: {
      axisLine: { lineStyle: { color: '#0ff' } },
      axisLabel: { color: '#fff', fontSize: 6 }, // 进一步减小轴标签字体大小
      max: 30 // 缩小径向范围
    },
    polar: {
      radius: ['10%', '60%'] // 缩小极坐标系的半径范围
    },
    tooltip: { trigger: 'item' },
    series: [{
      type: 'bar',
      data: [
        { value: 15, name: '浮', itemStyle: { color: '#FF6B6B' } },
        { value: 12, name: '沉', itemStyle: { color: '#FFD93D' } },
        { value: 10, name: '滑', itemStyle: { color: '#6BCB77' } },
        { value: 7, name: '涩', itemStyle: { color: '#4D96FF' } },
        { value: 5, name: '细', itemStyle: { color: '#C780FA' } }
      ],
      coordinateSystem: 'polar',
      name: '频次',
      label: {
        show: true,
        position: 'inside',
        color: '#000',
        fontSize: 6 // 进一步减小标签字体大小
      }
    }]
  });
});

onMounted(() => {
  const chart = echarts.init(document.getElementById('pulseChart8'));
  chart.setOption({
    title: {
      text: '脉象与体质关联性桑基图',
      textStyle: { color: '#0ff', fontSize: '8' },
      left: 'center',
      top: '-4'
    },
    series: [{
      type: 'sankey',
      data: [
        { name: '滑脉' },
        { name: '细脉' },
        { name: '浮脉' },
        { name: '沉脉' },
        { name: '气虚' },
        { name: '血虚' },
        { name: '阴虚' },
        { name: '阳虚' },
        { name: '湿热' },
        { name: '痰湿' }
      ],
      links: [
        { source: '滑脉', target: '气虚', value: 10 },
        { source: '滑脉', target: '痰湿', value: 6 },
        { source: '细脉', target: '血虚', value: 8 },
        { source: '细脉', target: '阴虚', value: 5 },
        { source: '浮脉', target: '阳虚', value: 7 },
        { source: '浮脉', target: '湿热', value: 4 },
        { source: '沉脉', target: '气虚', value: 5 },
        { source: '沉脉', target: '血虚', value: 3 }
      ],
      lineStyle: { color: 'source', curveness: 0.4 },
      label: { color: '#fff' },
      itemStyle: { borderColor: '#0ff' }
    }]
  });
});
  </script>