<template>
    <div class="flavor-chart-container">
 
      <div ref="flavorChart" class="flavor-chart"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import * as echarts from 'echarts'
  
  const flavorChart = ref(null)
  
  onMounted(() => {
    const chart = echarts.init(flavorChart.value)
  
    chart.setOption({
      backgroundColor: 'transparent',
      title: {
        text: '',
        textStyle: {
          color: '#00eaff',
          fontSize: 22,
          fontWeight: 'bold',
          shadowColor: 'rgba(0,255,255,0.3)',
          shadowBlur: 10
        },
        left: 'center',
        top: 10
      },
      tooltip: {
        show: true,
        formatter: ({ data }) => data.name || '',
        backgroundColor: 'rgba(0,20,40,0.8)',
        borderColor: '#00eaff',
        textStyle: { color: '#00eaff' }
      },
      series: [{
        type: 'graph',
        layout: 'circular',
        symbolSize: 80,
        roam: false,
        focusNodeAdjacency: true,
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: 10,
        lineStyle: {
          width: 2,
          color: 'source',
          curveness: 0.25,
          shadowColor: 'rgba(0,255,255,0.4)',
          shadowBlur: 10
        },
        label: {
          show: true,
          fontSize: 16,
          color: '#ffffff',
          fontWeight: 'bold',
          shadowColor: '#00f0ff',
          shadowBlur: 10
        },
        emphasis: {
          scale: true,
          itemStyle: {
            shadowBlur: 25,
            shadowColor: '#00f0ff'
          },
          label: {
            fontSize: 20,
            color: '#00ffff'
          }
        },
        data: [
          { name: '酸', itemStyle: { color: '#00ffcc' } },
          { name: '苦', itemStyle: { color: '#ff5c5c' } },
          { name: '甘', itemStyle: { color: '#e6b877' } },
          { name: '辛', itemStyle: { color: '#fff799' } },
          { name: '咸', itemStyle: { color: '#66ccff' } }
        ],
        edges: [
          // 相生（实线，蓝绿光）
          { source: '酸', target: '苦', label: { formatter: '生', color: '#00ffcc' }, lineStyle: { color: '#00ffc6' } },
          { source: '苦', target: '甘', label: { formatter: '生', color: '#00ffcc' }, lineStyle: { color: '#00ffd0' } },
          { source: '甘', target: '辛', label: { formatter: '生', color: '#00ffcc' }, lineStyle: { color: '#00ffee' } },
          { source: '辛', target: '咸', label: { formatter: '生', color: '#00ffcc' }, lineStyle: { color: '#00faff' } },
          { source: '咸', target: '酸', label: { formatter: '生', color: '#00ffcc' }, lineStyle: { color: '#00dfff' } },
  
          // 相克（虚线，粉红光）
          { source: '酸', target: '甘', lineStyle: { type: 'dashed', color: '#ff99cc' }, label: { formatter: '克', color: '#ff99cc' } },
          { source: '苦', target: '辛', lineStyle: { type: 'dashed', color: '#ff99cc' }, label: { formatter: '克', color: '#ff99cc' } },
          { source: '甘', target: '咸', lineStyle: { type: 'dashed', color: '#ff99cc' }, label: { formatter: '克', color: '#ff99cc' } },
          { source: '辛', target: '酸', lineStyle: { type: 'dashed', color: '#ff99cc' }, label: { formatter: '克', color: '#ff99cc' } },
          { source: '咸', target: '苦', lineStyle: { type: 'dashed', color: '#ff99cc' }, label: { formatter: '克', color: '#ff99cc' } }
        ]
      }]
    })
  
    window.addEventListener('resize', () => {
      chart.resize()
    })
  })
  </script>
  
  <style scoped>
  .flavor-chart-container {
    width: 100%;
    height: 100%;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .description-box {
  color: #00f0ff;
  font-size: 16px;
  margin-bottom: 20px;
  text-align: center;
  font-family: "Orbitron", "STKaiti", "KaiTi", "FangSong", sans-serif;
  background: rgba(0, 30, 60, 0.5);
  border: 1px solid rgba(0, 255, 255, 0.3);
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
  line-height: 1.8;
  text-shadow: 0 0 6px rgba(0, 255, 255, 0.4), 0 0 2px #00eaff;
}

.description-box .label {
  font-weight: bold;
  color: #00ffe0;
  font-size: 18px;
  text-shadow: 0 0 8px rgba(0, 255, 200, 0.6);
}

  .flavor-chart {
    width: 600px;
    height: 500px;
    box-shadow: 0 0 30px rgba(0, 200, 255, 0.3);
    border-radius: 12px;
    backdrop-filter: blur(2px);
  }
  </style>
  