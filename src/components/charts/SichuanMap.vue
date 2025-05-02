<!-- filepath: SichuanTCMMap.vue -->
<template>
    <div class="map-container">
      <div id="map" ref="mapContainer"></div>
      <div class="map-source">
        <!-- https://cloudcenter.tianditu.gov.cn/administrativeDivision -->
        地图来源：天地图 | 审图号：GS（2024）0650号
      </div>
    </div>
  </template>
  
  <!-- 平均海拔数据来源： https://zh-cn.topographic-map.com/ -->
  <script>
  import * as echarts from 'echarts'
  import 'echarts-gl'
  
  const heightData = {
        '成都市': 913,
        '攀枝花市': 1994 ,
        '雅安市': 2240,
        '乐山市': 1158,
        '眉山市': 673,
        '绵阳市': 1392,
        '广元市': 900,
        '巴中市': 574,
        '南充市': 422,
        '达州市': 700,
        '广安市': 391,
        '遂宁市': 365,
        '资阳市': 389,
        '内江市': 387,
        '自贡市': 392,
        '宜宾市': 388,
        '泸州市': 679,
        '甘孜藏族自治州': 3050,
        '阿坝藏族羌族自治州': 3542,
        '凉山彝族自治州': 2434,
        '德阳市': 770,
    }

  export default {
    name: 'SichuanTCMMap',
    data() {
      return {
        chart: null,
        activeMarkers: [],
        tcmData: []
      }
    },
    mounted() {
      this.initChart()
      window.addEventListener('resize', this.handleResize)
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.handleResize)
      if (this.chart) {
        this.chart.dispose()
      }
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$refs.mapContainer)
        this.loadMapData()
      },
      loadMapData() {
        // 地图审阅号 GS（2024）0650号
        fetch('./src/assets/sichuanpro.geojson')
          .then(response => response.json())
          .then(geoJson => {
            echarts.registerMap('Sichuan', geoJson)
            
            // 生成区域数据
            const data = geoJson.features.map(feature => ({
              name: feature.properties.name,
              value: heightData[feature.properties.name] || 0
            }))
            
            const option = {
              title: {
                text: '',
                subtext: '',
                left: 'center',
                textStyle: {
                  color: '#333',
                  fontSize: 18
                }
              },
              tooltip: {
                trigger: 'item',
                formatter: params => {
                  return `${params.name}<br/>平均海拔: ${params.value}m`
                }
              },
              visualMap: {
                min: 0,
                max: 3600,
                show: false,
                text: ['高', '低'],
                realtime: false,
                calculable: false,
                inRange: {
                  color: ['#edf8e9', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#005a32']
                }
              },
              series: [{
                name: '四川省',
                type: 'map3D',
                map: 'Sichuan',
                regionHeight: 3,
                shading: 'lambert',
                label: {
                  show: false
                },
                itemStyle: {
                  color: '#1E90FF',
                  opacity: 0.8,
                  borderWidth: 0.8,
                  borderColor: '#fff'
                },
                emphasis: {
                  itemStyle: {
                    color: '#ff4500'
                  }
                },
                light: {
                  main: {
                    intensity: 1.2,
                    shadow: true,
                    shadowQuality: 'high',
                    alpha: 30
                  },
                  ambient: {
                    intensity: 0.3
                  }
                },
                viewControl: {
                  autoRotate: true,
                  autoRotateSpeed: 10,
                  distance: 120,
                  alpha: 40,
                  beta: 0,
                  animation: true,
                  animationDurationUpdate: 1000
                },
                data: data
              }]
            }
            
            this.chart.setOption(option)
            
            // 监听地图渲染完成事件
            this.chart.on('rendered', () => {
              this.renderMarkers()
            })
            
            // 3D地图视角变化事件
            this.chart.on('viewchanged', () => {
              this.updateMarkersPosition()
            })
          })
          .catch(error => {
            console.error('加载地图数据失败:', error)
          })
      },
      renderMarkers() {
        // 清除现有标记
        this.activeMarkers.forEach(marker => marker.remove())
        this.activeMarkers = []

        if (!Array.isArray(this.tcmData)) return
        
        // 创建新标记
        this.tcmData.forEach(item => {
          const point = this.chart.convertToPixel('series', item.coordinate)
          if (point) {
            const marker = document.createElement('div')
            marker.className = `tcm-marker ${item.type}`
            marker.style.left = point[0] + 'px'
            marker.style.top = point[1] + 'px'
            
            // 添加图标
            const icon = document.createElement('i')
            if (item.type === 'herb') {
              icon.className = 'fas fa-leaf'
            } else if (item.type === 'hospital') {
              icon.className = 'fas fa-hospital-alt'
            } else if (item.type === 'research') {
              icon.className = 'fas fa-flask'
            }
            marker.appendChild(icon)
            
            // 存储数据
            marker.dataset.info = JSON.stringify(item)
            
            // 添加事件
            marker.addEventListener('mouseover', this.showTooltip)
            marker.addEventListener('mouseout', this.hideTooltip)
            
            this.$refs.mapContainer.appendChild(marker)
            this.activeMarkers.push(marker)
          }
        })
      },
      updateMarkersPosition() {
        this.activeMarkers.forEach(marker => {
          const info = JSON.parse(marker.dataset.info)
          const point = this.chart.convertToPixel('series', info.coordinate)
          if (point) {
            marker.style.left = point[0] + 'px'
            marker.style.top = point[1] + 'px'
          }
        })
      },
      showTooltip(e) {
        const info = JSON.parse(e.currentTarget.dataset.info)
        const tooltip = document.createElement('div')
        tooltip.className = 'tcm-tooltip visible'
        tooltip.innerHTML = `
          <h4>${info.name}</h4>
          <p><strong>位置:</strong> ${info.location}</p>
          <p>${info.description}</p>
        `
        
        const rect = e.currentTarget.getBoundingClientRect()
        const mapRect = this.$refs.mapContainer.getBoundingClientRect()
        
        tooltip.style.left = (rect.left - mapRect.left + 30) + 'px'
        tooltip.style.top = (rect.top - mapRect.top - 10) + 'px'
        
        // 如果已存在提示框，先移除
        const existingTooltip = this.$refs.mapContainer.querySelector('.tcm-tooltip')
        if (existingTooltip) {
          existingTooltip.remove()
        }
        
        this.$refs.mapContainer.appendChild(tooltip)
      },
      hideTooltip() {
        const tooltip = this.$refs.mapContainer.querySelector('.tcm-tooltip')
        if (tooltip) {
          tooltip.remove()
        }
      },
      handleResize() {
        if (this.chart) {
          this.chart.resize()
          this.updateMarkersPosition()
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .map-container {
    width: 100%;
    height: 100%;
    background-color: transparent;
    position: relative;
  }
  #map {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  .tcm-marker {
    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 1000;
    cursor: pointer;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 12px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
  }
  .tcm-marker.herb {
    background-color: #4caf50;
  }
  .tcm-marker.hospital {
    background-color: #f44336;
  }
  .tcm-marker.research {
    background-color: #9c27b0;
  }
  .tcm-tooltip {
    position: absolute;
    background: white;
    border-radius: 5px;
    padding: 10px;
    max-width: 250px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 1001;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
  }
  .tcm-tooltip.visible {
    opacity: 1;
    visibility: visible;
  }
  .tcm-tooltip h4 {
    margin: 0 0 5px 0;
    color: #333;
  }
  .tcm-tooltip p {
    margin: 5px 0;
    font-size: 14px;
    color: #666;
  }
  .map-source {
    position: absolute;
    left: 1px;
    bottom: 1px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    color: #666;
    z-index: 1000;
  }
  </style>