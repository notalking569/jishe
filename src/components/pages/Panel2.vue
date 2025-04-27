
<template>
    <div class="four-diagnosis-platform">
      <!-- 顶部标题栏 -->
      <header class="header">
        <h1>闻诊--让身体的声音和气味成为诊断线索，以数据揭示“无形之症”</h1>
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
     <!-- 左侧八图优化布局为两列四行 -->
     <section class="left-extension">
        <div class="chart-grid">
<div class="chart-border">
          <div class="chart-cell" id="wenChart1"></div>
          <div class="chart-cell" id="wenChart2"></div>
          <div class="chart-cell" id="wenChart3"></div>
          <div class="chart-cell" id="wenChart4"></div>
</div>
<div class="chart-border">
          <div class="chart-cell" id="wenChart5"></div>
          <div class="chart-cell" id="wenChart6"></div>
          <div class="chart-cell" id="donut-left"></div>
          <div class="chart-cell" id="wenChart8"></div>
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
            <div class="donut-chart" id="wenChart7"></div>
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
  <li>咳声低沉，痰稀白，属肺寒之象。</li>
  <li>语声低微，神疲乏力，属气虚体质。</li>
  <li>干咳少痰，声音嘶哑，为肺阴亏虚之征。</li>
  <li>咳嗽声重，喉中痰鸣，属痰热阻肺。</li>
  <li>气促喘息，声高而急，肺热犯肺。</li>
  <li>语言不清，舌强难言，风痰阻络之象。</li>
  <li>喉间嘶响，痰稠色黄，热痰郁结于肺。</li>
  <li>夜间咳剧，声音短促，属肾不纳气。</li>
  <li>声音突然嘶哑，属风热袭肺。</li>
  <li>鼻息粗重，痰鸣如吼，属肺热壅盛。</li>
  <li>病人呻吟声重，属实证剧痛之象。</li>
  <li>干咳无痰，声嘶舌红，属肺阴虚火旺。</li>
  <li>语声低弱，脉微细，气血两虚。</li>
  <li>咳声频频，喉间不清，属痰湿中阻。</li>
  <li>语迟声低，脉细无力，属神疲气衰。</li>
  <li>痰多声重，属寒湿困肺。</li>
  <li>咽喉嘶哑，吐痰不利，为痰结阻咽。</li>
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
    text: '病声关键词词云',
    left: 'center',
    textStyle: { color: '#0ff', fontSize: 18 }
  },
  tooltip: {},
  series: [{
    type: 'wordCloud',
    shape: 'circle',
    sizeRange: [14, 40],
    rotationRange: [-30, 30],
    gridSize: 8,
    layoutAnimation: true,
    textStyle: {
      fontWeight: 'bold',
      fontFamily: '霞鹜文楷, 楷体',
      color: () => `hsl(${Math.random() * 360}, 100%, 70%)`
    },
    data: [
      { name: '咳嗽', value: 120 },
      { name: '痰鸣', value: 100 },
      { name: '喘息', value: 95 },
      { name: '呻吟', value: 80 },
      { name: '失声', value: 70 },
      { name: '气促', value: 60 },
      { name: '咽痛', value: 55 },
      { name: '声嘶', value: 50 },
      { name: '干咳', value: 45 },
      { name: '呕吐声', value: 42 },
      { name: '咽痒', value: 38 },
      { name: '咳痰', value: 35 },
      { name: '鼻音重', value: 30 },
      { name: '咯血', value: 28 },
      { name: '咳而无声', value: 25 }
    ]
  }]
})

  })
  
  onMounted(() => {
    const chart = echarts.init(document.getElementById('heatmap'));
    chart.setOption({
        title: {
            text: '声音症状与体质类型热力图',
            left: 'center',
            textStyle: { color: '#0ff' }
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: ['气虚', '阳虚', '阴虚', '湿热', '痰湿'],
            axisLabel: { color: '#fff' }
        },
        yAxis: {
            type: 'category',
            data: ['咳嗽', '喘息', '痰鸣', '失声', '呻吟'],
            axisLabel: { color: '#fff' }
        },
        visualMap: {
            min: 0, max: 50, calculable: true,
            orient: 'vertical', right: '0', top: 'center',
            textStyle: { color: '#fff' }
        },
        series: [{
            type: 'heatmap',
            data: [
                [0, 0, 40], [1, 0, 25], [2, 0, 20], [3, 0, 10], [4, 0, 5], // 咳嗽
                [0, 1, 35], [1, 1, 30], [2, 1, 25], [3, 1, 15], [4, 1, 10], // 喘息
                [0, 2, 30], [1, 2, 20], [2, 2, 35], [3, 2, 20], [4, 2, 15], // 痰鸣
                [0, 3, 25], [1, 3, 15], [2, 3, 30], [3, 3, 10], [4, 3, 20], // 失声
                [0, 4, 20], [1, 4, 10], [2, 4, 25], [3, 4, 15], [4, 4, 30]  // 呻吟
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
    // 病声类型分布
    initPieChart('donut-left', '病声类型分布', [
        { value: 40, name: '咳嗽' }, // 咳嗽在中医古籍中常被提及，频率较高
        { value: 25, name: '喘息' }, // 喘息多见于肺气不利，频率次之
        { value: 20, name: '痰鸣' }, // 痰鸣多因痰湿阻肺，频率较高
        { value: 10, name: '失声' }, // 失声多因肺肾阴虚，频率较低
        { value: 5, name: '呻吟' }  // 呻吟多因疼痛或不适，频率最低
    ]);

    // 声音性质分类
    initPieChart('donut-right', '声音性质分类', [
        { value: 50, name: '虚性音' }, // 虚性音多见于久病体虚，频率较高
        { value: 30, name: '实性音' }, // 实性音多见于外感风寒或痰湿阻肺，频率次之
        { value: 20, name: '寒性音' } // 寒性音多见于寒邪犯肺，频率较低
    ]);
});

function initPieChart(id, title, data) {
    const chart = echarts.init(document.getElementById(id));
    chart.setOption({
        title: {
            text: title,
            left: 'center',
            textStyle: { color: '#0ff', fontSize: 8 }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
            {
                name: title,
                type: 'pie',
                radius: ['20%', '30%'], // 缩小饼图大小
                data: data,
                label: {
                    show: true,
                    color: '#fff',
                    fontSize: 10
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0,0,0,0.5)'
                    }
                }
            }
        ],
        backgroundColor: 'transparent'
    });
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
      data,
      links,
      lineStyle: {
        color: '#0ff'
      }
    }]
  })
}

onMounted(() => {
    initLineChart('line1', '五音病声分布', ['咳嗽', '喘鸣', '呻吟', '喉痹', '哮吼'], [80, 60, 40, 30, 50]);
    initGraphChart('line2', '声音与体质关系图', [
        { name: '阴虚', symbolSize: 60 },
        { name: '阳虚', symbolSize: 60 },
        { name: '气虚', symbolSize: 60 },
        { name: '咳嗽', symbolSize: 40 },
        { name: '喘鸣', symbolSize: 40 },
        { name: '哮吼', symbolSize: 40 }
    ], [
        { source: '阴虚', target: '咳嗽' },
        { source: '阳虚', target: '喘鸣' },
        { source: '气虚', target: '咳嗽' },
        { source: '气虚', target: '哮吼' }
    ]);
});

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
    });
}
  
  onMounted(() => {
  const chart = echarts.init(document.getElementById('wenChart1'))
  chart.setOption({
    title: {
      text: '四季咳嗽发作节律图',
      left: 'center',
      textStyle: { color: '#0ff', fontSize: 8 }
    },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['春', '夏', '长夏', '秋', '冬'],
      axisLabel: { color: '#fff' },
      axisLine: { lineStyle: { color: '#0ff' } }
    },
    yAxis: {
      type: 'value',
      name: '发作频率',
      axisLabel: { color: '#fff' },
      nameTextStyle: { fontSize: 8, color: '#fff' }, // 设置“发作频率”的字体大小
      // splitLine: { lineStyle: { color: '#333'} }
      axisLabel: { color: '#fff', fontSize: 6} // 设置Y轴标签字体大小
    },
    series: [{
      name: '咳嗽频次',
      type: 'line',
      data: [80, 45, 50, 70, 90], // 模拟古籍中春秋冬发作高、夏低
      smooth: true,
      lineStyle: { color: '#0ff' },
      itemStyle: { color: '#0ff' },
      areaStyle: {
        color: 'rgba(0, 255, 255, 0.1)'
      },
      label: {
        show: true,
        color: '#fff',
        position: 'top'
      }
    }]
  })
})


onMounted(() => {
  const chart = echarts.init(document.getElementById('wenChart2'));
  chart.setOption({
    title: {
      text: '声音性质与症状对应图',
      left: 'center',
      textStyle: { color: '#0ff', fontSize: 8 }
    },
    tooltip: { trigger: 'axis' },
    legend: {
      bottom: 0,
      textStyle: { color: '#fff', fontSize: 8 } // 设置图例字体大小
    },
    xAxis: {
      type: 'category',
      data: ['干咳', '痰咳', '咽痛', '喘息'],
      axisLabel: { color: '#fff', fontSize: 8 } // 设置X轴标签字体大小
    },
    yAxis: {
      type: 'value',
      name: '频次',
      nameTextStyle: { color: '#fff', fontSize: 8 }, // 设置Y轴名称字体大小
      axisLabel: { color: '#fff', fontSize: 6} // 设置Y轴标签字体大小
    },
    series: [
      {
        name: '虚性音',
        type: 'bar',
        stack: '总量',
        data: [30, 10, 15, 25]
      },
      {
        name: '实性音',
        type: 'bar',
        stack: '总量',
        data: [10, 25, 20, 30]
      },
      {
        name: '寒性音',
        type: 'bar',
        stack: '总量',
        data: [20, 15, 10, 5]
      },
      {
        name: '热性音',
        type: 'bar',
        stack: '总量',
        data: [15, 30, 25, 35]
      }
    ]
  });
});
onMounted(() => {
  const chart = echarts.init(document.getElementById('wenChart3'))
  chart.setOption({
    title: {
      text: '五音偏盛与脏腑失衡分析',
      left: 'center',
      top:'-2',
      textStyle: { color: '#0ff', fontSize: 8 }
    },
    tooltip: { show: true },
    legend: {
      bottom: 20,
      data: ['失衡程度'],
      textStyle: { color: '#fff' },
      itemWidth: 10, // 调整图例标记的宽度
      itemHeight: 10, // 调整图例标记的高度
    },
    radar: {
      radius: 40,
      indicator: [
        { name: '宫（脾）', max: 100 },
        { name: '商（肺）', max: 100 },
        { name: '角（肝）', max: 100 },
        { name: '徵（心）', max: 100 },
        { name: '羽（肾）', max: 100 }
      ],
      name: {
        textStyle: { color: '#fff', fontSize: 10 }
      },
      splitLine: { lineStyle: { color: '#555' } },
      axisLine: { lineStyle: { color: '#0ff' } },
      splitArea: { areaStyle: { color: 'transparent' } }
    },
    series: [{
      type: 'radar',
      radius:'20%',
      symbolSize: 6,
      areaStyle: { opacity: 0.2 },
      lineStyle: { width: 2 },
      data: [
        {
          value: [65, 85, 70, 60, 50],
          name: '失衡程度',
          itemStyle: { color: '#0ff' }
        }
      ]
    }]
  })
})
onMounted(() => {
  const chart = echarts.init(document.getElementById('wenChart4'));
  chart.setOption({
    title: {
      text: '病声类型与临床症状桑基图',
      left: 'center',
      top: '-5', // 下移标题
      textStyle: { color: '#0ff', fontSize: 8 }
    },
    tooltip: {},
    grid: {
      left: '10', // 左边距
      right: '10', // 右边距
      bottom: '-200', // 下边距增加，使图表整体下移
      containLabel: true // 确保标签在网格内
    },
    series: [{
      type: 'sankey',
      layout: 'none',
      data: [
        { name: '剧咳' }, { name: '痰鸣' }, { name: '喘息' }, { name: '干咳' },
        { name: '喉痒' }, { name: '胸痛' }, { name: '痰湿' }, { name: '气急' }, { name: '咽干' }
      ],
      links: [
        { source: '剧咳', target: '喉痒', value: 8 },
        { source: '剧咳', target: '胸痛', value: 6 },
        { source: '痰鸣', target: '痰湿', value: 7 },
        { source: '痰鸣', target: '胸痛', value: 5 },
        { source: '喘息', target: '气急', value: 9 },
        { source: '干咳', target: '咽干', value: 6 }
      ],
      label: {
        color: '#fff',
        fontSize: 8 // 减小标签字体大小
      },
      lineStyle: {
        color: 'source',
        curveness: 0.5
      },
      itemStyle: {
        borderWidth: 1,
        borderColor: '#0ff'
      },
      nodeWidth: 20, // 减小节点宽度
      nodeGap: 8, // 减小节点间距
      lineOpacity: 0.7 // 减小线条透明度
    }]
  });


});
onMounted(() => {
  const chart = echarts.init(document.getElementById('wenChart5'));
  chart.setOption({
    title: {
      text: '体质类型下的典型病音频率分布',
      left: 'center',
      textStyle: { color: '#0ff', fontSize: 8 }
    },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: {
      bottom: -1,
      textStyle: { color: '#fff', fontSize: 6 }, // 减小图例文字大小
      itemWidth: 5, // 调整图例标记的宽度
      itemHeight: 5, // 调整图例标记的高度
    },
    xAxis: {
      type: 'category',
      data: ['阳虚', '阴虚', '气虚'],
      axisLabel: { color: '#fff', fontSize: 8 } // 确保X轴标签大小一致
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#fff', fontSize: 6 } // 减小纵坐标数字大小
    },
    series: [
      {
        name: '轻咳',
        type: 'bar',
        stack: '阳虚',
        data: [40, 0, 0]
      },
      {
        name: '语声低微',
        type: 'bar',
        stack: '阳虚',
        data: [30, 0, 0]
      },
      {
        name: '气短',
        type: 'bar',
        stack: '阳虚',
        data: [25, 0, 0]
      },
      {
        name: '干咳',
        type: 'bar',
        stack: '阴虚',
        data: [0, 50, 0]
      },
      {
        name: '声音嘶哑',
        type: 'bar',
        stack: '阴虚',
        data: [0, 35, 0]
      },
      {
        name: '咳喘乏力',
        type: 'bar',
        stack: '气虚',
        data: [0, 0, 45]
      },
      {
        name: '喉中痰鸣',
        type: 'bar',
        stack: '气虚',
        data: [0, 0, 28]
      }
    ]
  });
});

onMounted(() => {
  const chart = echarts.init(document.getElementById('wenChart6'));
  chart.setOption({
    title: {
      text: '治疗过程中典型病音的演变趋势',
      left: 'center',
      top: '10', // 调整标题位置，使图表整体上移
      textStyle: { color: '#0ff', fontSize: 8 }
    },
    tooltip: { trigger: 'axis' },
    legend: {
      bottom: 10, // 调整图例位置，使其更紧凑
      textStyle: { color: '#fff', fontSize: 8 } // 减小图例文字大小
    },
    xAxis: {
      type: 'category',
      data: ['初诊', '三日后', '七日后'],
      axisLabel: { color: '#fff' }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#fff', fontSize: 6 } // 减小纵坐标数字大小
    },
    series: [
      {
        name: '干咳（肺阴虚）',
        type: 'line',
        smooth: true,
        data: [70, 40, 20],
        lineStyle: { color: '#00ffff' },
        itemStyle: { color: '#00ffff' }
      },
      {
        name: '痰鸣（痰湿内阻）',
        type: 'line',
        smooth: true,
        data: [30, 50, 65],
        lineStyle: { color: '#ff00ff' },
        itemStyle: { color: '#ff00ff' }
      }
    ],
    graphic: {
      elements: [
        {
          type: 'text',
          left: 'center',
          top: 'bottom',
          style: {
            // text: '干咳（肺阴虚）随治疗缓解，痰鸣（痰湿）则随病势加重。\n源自清代《温热条辨》“初干后痰”为典型病势转变。',
            fontSize: 10,
            fill: '#0ff',
            width: 300,
            overflow: 'break',
            lineHeight: 20
          }
        }
      ]
    }
  });
});
onMounted(() => {
  const chart = echarts.init(document.getElementById('wenChart7'));
  chart.setOption({
    title: {
      text: '体质与病音对应分布图',
      left: 'center',
      textStyle: { color: '#0ff', fontSize: 14 }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      bottom: 0,
      textStyle: { color: '#fff' }
    },
    series: [
      {
        name: '干咳',
        type: 'pie',
        radius: ['20%', '30%'], // 减小饼图大小
        center: ['30%', '50%'], // 调整位置
        label: { color: '#fff', fontSize: 8 }, // 减小标签字体大小
        data: [
          { value: 60, name: '气虚' },
          { value: 40, name: '阴虚' }
        ]
      },
      {
        name: '痰咳',
        type: 'pie',
        radius: ['20%', '30%'], // 减小饼图大小
        center: ['50%', '50%'], // 调整位置
        label: { color: '#fff', fontSize: 8 }, // 减小标签字体大小
        data: [
          { value: 20, name: '气虚' },
          { value: 50, name: '阳虚' },
          { value: 30, name: '湿热' }
        ]
      },
      {
        name: '失声',
        type: 'pie',
        radius: ['20%', '30%'], // 减小饼图大小
        center: ['80%', '50%'], // 调整位置
        label: { color: '#fff', fontSize: 8 }, // 减小标签字体大小
        data: [
          { value: 30, name: '气虚' },
          { value: 40, name: '阴虚' },
          { value: 10, name: '阳虚' },
          { value: 20, name: '湿热' }
        ]
      }
    ]
  });
});
onMounted(() => {
  const chart = echarts.init(document.getElementById('wenChart8'));
  chart.setOption({
    title: {
      text: '病音与中医病因对应图',
      left: 'center',
      textStyle: { color: '#0ff', fontSize: 8 }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    legend: {
      bottom: 0,
      textStyle: { color: '#fff' }
    },
    xAxis: {
      type: 'category',
      data: ['咳声重', '咳声低', '咳声虚弱'],
      axisLabel: { color: '#fff' }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#fff' ,fontSize:'8'}
    },
    series: [
      {
        name: '寒证',
        type: 'bar',
        stack: '总量',
        data: [10, 40, 20]
      },
      {
        name: '热证',
        type: 'bar',
        stack: '总量',
        data: [60, 5, 10]
      },
      {
        name: '虚证',
        type: 'bar',
        stack: '总量',
        data: [5, 45, 60]
      },
      {
        name: '实证',
        type: 'bar',
        stack: '总量',
        data: [25, 10, 10]
      }
    ]
  });
});

  </script>