<template>
  <div class="herb-dashboard">
    <!-- 页面标题 -->
    <header class="dashboard-header">
      <div class="title"><h1>中药数据可视化大屏</h1></div>
      <button class="jump-button" @click="goToHerbal">星云图</button>
      <div class="header-buttons">
        <button class="data-switch-button" @click="goToSichuan">{{ dataSourceButtonText }}</button>
        <button class="top-right-button" @click="router.push('/main')">返回首页</button>
      </div>
    </header>

    <!-- 主体区域：三列布局 -->
    <div class="dashboard-main">
      <!-- 左侧图表列 -->
      <section class="dashboard-column">
        <div class="chart-box small">
          <mtStackbar :data="currentData.stackbarData" />
        </div>
        <div class="chart-box">
          <mySparkBar :data="currentData.sparkBarData" />
        </div>
      </section>

      <!-- 中间图表列 -->
      <section class="dashboard-column center">
        <div class="chart-box large circle-pack-container">
          <VueUiCirclePack :config="config" :dataset="currentData.circlePackData" class="circle-pack" />
        </div>
        <div class="table-box">
          <table>
            <thead>
              <tr>
                <th>类别（典籍）</th>
                <th>数量</th>
                <th>代表药</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in currentData.herbTypes" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.value }}</td>
                <td>{{ currentData.exampleDrugs[index] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      
      <!-- 右侧图表列 - 重新调整布局 -->
      <section class="dashboard-column right-column">
        <!-- 右侧图表容器，分为上下结构 -->
        <div class="right-container">
          <!-- 饼图部分 -->
          <div class="charts-section">
            <div class="chart-panel">
              <div class="panel-title">归经分布</div>
              <div class="chart-content">
                <myUiDonut :data="isShowingSichuanData ? sichuanJingluoData : defaultJingluoData" />
              </div>
            </div>
            <div class="chart-panel">
              <div class="panel-title">五味分布</div>
              <div class="chart-content">
                <tasteDonut :data="isShowingSichuanData ? sichuanTasteData : defaultTasteData" />
              </div>
            </div>
          </div>
          
          <!-- 词云部分 -->
          <div class="map-section">
            <div class="panel-title">产地分布</div>
            <div class="map-content">
              <myworldcloud :data="isShowingSichuanData ? sichuanRegionData : defaultRegionData" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed, nextTick } from 'vue'
import * as echarts from 'echarts'

import { useRouter } from 'vue-router'
import { VueUiCirclePack } from 'vue-data-ui'
import myUiDonut from '../charts/myUiDonut.vue'
import tasteDonut from '../charts/tasteDonut.vue'
import myworldcloud from '../charts/myworldcloud.vue'
import mySparkBar from '../charts/mySparkBar.vue'
import mtStackbar from '../charts/mtStackbar.vue'

const router = useRouter(); // 获取路由实例
const goToHerbal = () => {
  window.location.href = 'herbal.html'
}

const goToSichuan = () => {
  router.push('/zcy-sichuan');
}

const navigateTo = (module) => {
  console.log('Navigating to:', module);
  switch(module) {
    case 'main':
      router.push('/main');
      break;
    default:
      console.log('Unknown module:', module);
  }
};

// 数据源切换状态
const isShowingSichuanData = ref(false);
const dataSourceButtonText = computed(() => {
  return isShowingSichuanData.value ? '全国数据' : '川域流派';
});

// 默认数据 - 使用原始数据，不要响应式转换这些源数据
const defaultDataSource = {
  circlePackData: [
    { name: '战国', value: 247, color: '#891515' },
    { name: '秦汉', value: 365 },
    { name: '三国', value: 730 },
    { name: '晋', value: 800 },
    { name: '隋唐', value: 850 },
    { name: '宋元', value: 1748 },
    { name: '明', value: 1892 },
    { name: '清', value: 2600 }
  ],
  herbTypes: [
    { name: '清热药（《伤寒论》）', value: 81 },
    { name: '补虚药（《金匮要略》）', value: 46 },
    { name: '祛风湿药（《证治准绳》）', value: 29 },
    { name: '止咳药（《温病条辨》）', value: 15 },
    { name: '理气药（《医学启源》）', value: 24 },
    { name: '温里药（《本草纲目》）', value: 9 },
    { name: '活血化瘀药（《医林改错》）', value: 35 },
    { name: '安神药（《本草经集注》）', value: 20 },
    { name: '利水渗湿药（《丹溪心法》）', value: 30 },
    { name: '消食药（《脾胃论》）', value: 18 },
    { name: '驱虫药（《本草纲目》）', value: 12 }
  ],
  exampleDrugs: [
    '黄连、栀子',
    '人参、黄芪',
    '独活、羌活',
    '杏仁、百部',
    '陈皮、木香',
    '附子、干姜',
    '丹参、川芎',
    '酸枣仁、柏子仁',
    '茯苓、泽泻',
    '山楂、神曲',
    '槟榔、使君子'
  ]
};

// 川域流派数据
const sichuanYunnanDataSource = {
  circlePackData: [
    { name: '成都派', value: 456, color: '#8B0000' },
    { name: '绵阳派', value: 389, color: '#006400' },
    { name: '乐山派', value: 278, color: '#4B0082' },
    { name: '宜宾派', value: 245, color: '#FF8C00' },
    { name: '自贡派', value: 310, color: '#9932CC' },
    { name: '泸州派', value: 198, color: '#8A2BE2' },
    { name: '南充派', value: 223, color: '#008B8B' },
    { name: '德阳派', value: 267, color: '#B8860B' }
  ],
  herbTypes: [
    { name: '温通药（《四川中药志》）', value: 73 },
    { name: '川产药材（《川药考》）', value: 64 },
    { name: '芳香化湿药（《川域药用植物》）', value: 42 },
    { name: '祛风除湿药（《峨眉药志》）', value: 38 },
    { name: '理气活血药（《巴蜀本草》）', value: 56 },
    { name: '清热解毒药（《川中药物志》）', value: 47 },
    { name: '滋补药（《川药炮制考》）', value: 29 },
    { name: '驱虫药（《川域民间方药集》）', value: 18 },
    { name: '止咳药（《川域草药》）', value: 35 },
    { name: '泻下药（《川中药录》）', value: 22 },
    { name: '川产名贵药材（《巴蜀药学》）', value: 26 }
  ],
  exampleDrugs: [
    '川芎、川椒',
    '党参、黄柏',
    '藿香、佩兰',
    '独活、川乌',
    '川楝子、枳壳',
    '黄连、板蓝根',
    '川贝母、川牛膝',
    '使君子、雷丸',
    '川贝、五味子',
    '大黄、芒硝',
    '天麻、川山甲'
  ]
};


// 当前显示的数据集 - 初始化为默认数据的深拷贝
const currentData = reactive(JSON.parse(JSON.stringify(defaultDataSource)));

// 切换数据源
const toggleDataSource = () => {
  if (isShowingSichuanData.value) {
    // 如果当前是川域流派数据，切换回全国数据
    Object.keys(currentData).forEach(key => {
      currentData[key] = JSON.parse(JSON.stringify(defaultDataSource[key]));
    });
    config.value.style.chart.title.text = '各朝代中药记载数';
  } else {
    // 如果当前是全国数据，切换到川域流派数据
    Object.keys(currentData).forEach(key => {
      currentData[key] = JSON.parse(JSON.stringify(sichuanYunnanDataSource[key]));
    });
    config.value.style.chart.title.text = '川域流派中药记载数';
  }
  // 切换状态标志
  isShowingSichuanData.value = !isShowingSichuanData.value;
  
  // 数据切换后，确保下一个渲染周期布局不变
  nextTick(() => {
    // 可以在这里添加额外的布局调整逻辑
    const container = document.querySelector('.circle-pack-container');
    if (container) {
      container.style.minHeight = '320px';
      container.style.maxHeight = '320px';
    }
  });
};

const ruleData = [
  { rule: '清热→凉血', support: 0.07, confidence: 1 },
  { rule: '活血→舒筋→止痛', support: 0.07, confidence: 1 },
  { rule: '通淋→通经', support: 0.07, confidence: 1 },
]

const config = ref({
style: {
  fontFamily: 'inherit',
  chart: {
    backgroundColor: '#111111ff',
    color: '#111111ff',
    title: {
      text: '各朝代中药记载数',
      color: '#00ffff',
      //subtitle: { text: 'CirclePack 示例' }
    },
    circles: {
      stroke: '#fff',
      strokeWidth: 1,
      gradient: { show: true, intensity: 40 },
      labels: {
        name: { show: true },
        value: { show: true}
      }
    }
  }
}
})

// 以下数据保留但不使用
const dataset = ref([
  { name: '战国', value: 247, color: '#891515' },
  { name: '秦汉', value: 365 },
  { name: '三国', value: 730 },
  { name: '晋', value: 800 },
  { name: '隋唐', value: 850 },
  { name: '宋元', value: 1748 },
  { name: '明', value: 1892 },
  { name: '清', value: 2600 }
])

const herbTypes = [
  { name: '清热药（《伤寒论》）', value: 81 },
  { name: '补虚药（《金匮要略》）', value: 46 },
  { name: '祛风湿药（《证治准绳》）', value: 29 },
  { name: '止咳药（《温病条辨》）', value: 15 },
  { name: '理气药（《医学启源》）', value: 24 },
  { name: '温里药（《本草纲目》）', value: 9 },
  { name: '活血化瘀药（《医林改错》）', value: 35 },
  { name: '安神药（《本草经集注》）', value: 20 },
  { name: '利水渗湿药（《丹溪心法》）', value: 30 },
  { name: '消食药（《脾胃论》）', value: 18 },
  { name: '驱虫药（《本草纲目》）', value: 12 }
];

const exampleDrugs = [
  '黄连、栀子',
  '人参、黄芪',
  '独活、羌活',
  '杏仁、百部',
  '陈皮、木香',
  '附子、干姜',
  '丹参、川芎',
  '酸枣仁、柏子仁',
  '茯苓、泽泻',
  '山楂、神曲',
  '槟榔、使君子'
];

const quotes = [
  '"药之所治者，病也；病之所由生者，脏腑也。" ——《灵枢·本脏》',
  '"夫药者，诸病之攻也。" ——《伤寒杂病论》',
  '"审因论治，各得其宜。" ——《素问·至真要大论》',
  '"上工治未病，中工治欲病，下工治已病。" ——《黄帝内经》',
  '"用药如用兵，兵贵神速，药贵中病。" ——《本草纲目》',
  '"药不执方，合宜则用。" ——《医学心悟》',
  '"药能愈病，亦能致病。" ——《本草备要》',
  '"用药如用兵，兵贵神速，药贵中病。" ——《本草纲目》',
  '"药不执方，合宜则用。" ——《医学心悟》',
  '"药能愈病，亦能致病。" ——《本草备要》',
  '"用药如用兵，兵贵神速，药贵中病。" ——《本草纲目》'
];
onMounted(() => {
  //echarts.init(document.getElementById('partUsageChart')).setOption({ /* 柱状图数据 */ })
  //echarts.init(document.getElementById('herbCategoryChart')).setOption({ /* 药科柱图 */ })
  //echarts.init(document.getElementById('relationSunburst')).setOption({ /* 旭日图 */ })
  //echarts.init(document.getElementById('propertyChart')).setOption({ /* 药性饼图 */ })
  //echarts.init(document.getElementById('originWordCloud')).setOption({ /* wordCloud */ })
  //echarts.init(document.getElementById('tastePieChart')).setOption({ /* 药味分布图 */ })
})
</script>

<style scoped>
/* 调整整体容器高度 */
.herb-dashboard {
  background: #000c2b;
  color: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.dashboard-header {
  text-align: center;
  color: rgb(0, 0, 0);
  padding: 10px;
  width: 300vh;
  border-bottom: 2px solid rgb(0, 0, 0);
}

.header-buttons {
  display: flex;
  gap: 10px;
  position: absolute;
  right: 20px;
}
.right-top-row {
  display: flex;
  gap: 10px;
  width: 100%;
  height: 160px; /* 增加高度确保甜甜圈图表完全显示 */
}

.chart-box.half {
  flex: 1;
  border: none;
  min-height: 160px;  /* 增加高度 */
  max-height: 160px;  /* 设置固定高度 */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible; /* 允许内容溢出，确保甜甜圈完整显示 */
}

.chart-box.full {
  flex: 1;
  width: 100%;
  min-height: calc(100vh - 290px); /* 动态计算高度 */
  max-height: calc(100vh - 290px); /* 限制最大高度 */
}

.dashboard-main {
  display: flex;
  flex: 1;
  width: 100%;
  gap: 10px;
  padding: 10px;
  height: calc(100vh - 70px);
  overflow: hidden;
}

.dashboard-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0; /* 防止内容撑开 */
  width: 30%; /* 固定宽度占比 */
}

.dashboard-column.center {
  flex: 1.5; /* 左右是 1，中间加大为 1.5 或 2 */
  width: 40%; /* 固定宽度占比 */
  max-width: 40%; /* 限制最大宽度 */
  min-width: 40%; /* 确保最小宽度一致 */
}

.chart-box {
  flex: 1;
  background: #111;
  border: 1px solid #0ff;
  border-radius: 4px;
  overflow: hidden; /* 确保内容不溢出 */
  position: relative; /* 为绝对定位做准备 */
}

.chart-box.large {
  height: 320px;
  min-height: 320px; /* 确保最小高度 */
  max-height: 320px; /* 确保最大高度 */
}

.table-box {
  flex: 1;
  overflow: auto;
  background: #111;
  border: 1px solid #0ff;
  padding: 5px 10px; /* 减小内边距 */
  font-size: 11px; /* 稍微减小字体 */
  max-height: calc(100vh - 410px);
}

table {
  width: 100%;
  border-collapse: collapse;
  color: #0ff;
}
table th, table td {
  padding: 6px;
  border-bottom: 1px solid #333;
}
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #0ff;
  padding: 10px 20px;
  border-bottom: 2px solid #0ff;
  height: 60px; /* 固定高度 */
}
.top-right-button, .data-switch-button {
  padding: 6px 12px;
  font-size: 14px;
  background-color: #0ff;
  color: #000;
  border: 1px solid rgba(0, 200, 255, 0.4);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.top-right-button:hover, .data-switch-button:hover {
  background-color: rgba(0, 200, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 200, 255, 0.3);
  color: #0ff;
}
.jump-button {
  background-color: #0ff;
  color: #000;
  border: none;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}
.jump-button:hover {
  background-color: #00d8ff;
}
.chart-box.small {
  width: 100%;
  /* height: 40%; */
}
.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.title h1 {
  font-size: 28px;
  color: #0ff;
  margin: 0;
}

.circle-pack-container {
  height: 320px !important;
  max-height: 320px !important;
  min-height: 320px !important;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.circle-pack {
  height: 320px !important;
  width: 100% !important;
  max-width: 100% !important;
}

/* 确保中间列的固定宽度不随内容变化 */
.dashboard-column.center {
  width: 40% !important;
  max-width: 40% !important;
  min-width: 40% !important;
  flex: 1.5 0 auto !important;
}

/* 左右列的固定宽度 */
.dashboard-column:not(.center) {
  width: 30% !important;
  max-width: 30% !important;
  min-width: 30% !important;
  flex: 1 0 auto !important;
}

/* 修复右侧列布局 */
.dashboard-column:last-child {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dashboard-column:last-child .chart-box {
  flex: 0 0 auto;
  margin-bottom: 10px;
}

.dashboard-column:last-child .chart-box:first-child {
  min-height: 180px; /* 给甜甜圈图表的容器增加高度 */
  height: 180px;
}

.dashboard-column:last-child .chart-box.full {
  flex: 1;
  min-height: 200px;
}

/* 确保甜甜圈图表有足够空间 */
.right-top-row .chart-box.half > * {
  width: 100%;
  height: 150px;
  margin-top: 10px; /* 向下偏移，避免顶部被切断 */
}

/* 添加右侧新布局样式 */
.donut-row {
  display: flex;
  width: 100%;
  height: 180px; /* 减小高度 */
  gap: 10px;
  margin-bottom: 5px; /* 减小底部间距 */
}

.donut-box {
  flex: 1;
  background: #111;
  border: 1px solid #0ff;
  border-radius: 4px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden; /* 防止内容溢出 */
}

.donut-title {
  color: #0ff;
  font-size: 12px;
  margin: 0 0 2px 0; /* 减小底部间距 */
  text-align: center;
  line-height: 1;
}

/* 调整甜甜圈图表尺寸 */
.donut-box > div {
  width: 100%;
  height: 150px; /* 稍微减小高度 */
  transform: scale(0.9); /* 稍微缩小比例 */
}

/* 调整词云图高度 */
.chart-box.full {
  flex: 1;
  width: 100%;
  min-height: calc(100vh - 290px); /* 动态计算高度 */
  max-height: calc(100vh - 290px); /* 限制最大高度 */
}

/* 确保图表容器的响应式布局 */
@media screen and (max-height: 800px) {
  .donut-row {
    height: 160px;
  }
  
  .donut-box > div {
    height: 140px;
    transform: scale(0.85);
  }
  
  .table-box {
    max-height: calc(100vh - 390px);
  }
  
  .chart-box.full {
    min-height: calc(100vh - 270px);
    max-height: calc(100vh - 270px);
  }
}

/* 修复原有的圆环重叠问题 */
.right-column:last-child {
  padding-bottom: 0; /* 防止底部溢出 */
}

/* 右侧面板的新布局 */
.right-column {
  display: flex;
  flex-direction: column;
}

.right-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px;
}

.charts-section {
  display: flex;
  width: 100%;
  height: 260px;
  gap: 10px;
}

.chart-panel {
  flex: 1;
  background: #111;
  border: 1px solid #0ff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.panel-title {
  background: rgba(0, 255, 255, 0.1);
  color: #0ff;
  font-size: 14px;
  padding: 4px 0;
  text-align: center;
  border-bottom: 1px solid #0ff;
}

.chart-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}

.chart-content > div {
  width: 100%;
  height: 100%;
}

.map-section {
  flex: 1;
  background: #111;
  border: 1px solid #0ff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.map-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 调整donut图表 */
.donut-row, .donut-box {
  display: none; /* 移除旧的donut容器 */
}

/* 禁用旧的可能冲突的样式 */
.dashboard-column:last-child .chart-box:first-child,
.dashboard-column:last-child .chart-box.full {
  display: none; /* 移除旧的chart box */
}

/* 媒体查询适配不同屏幕高度 */
@media screen and (max-height: 800px) {
  .charts-section {
    height: 230px;
  }
}

@media screen and (max-height: 700px) {
  .charts-section {
    height: 210px;
  }
  
  .panel-title {
    font-size: 12px;
    padding: 2px 0;
  }
}
</style>
