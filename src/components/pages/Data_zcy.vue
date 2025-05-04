<template>
  <div class="herb-dashboard">
    <header class="dashboard-header">
  <div class="left-buttons">
    <button class="jump-button" @click="goToHerbal">星云图</button>
    <button class="data-switch-button" @click="goToSichuan">{{ dataSourceButtonText }}</button>
  </div>
  <div class="title">
    <h1>五行理论--中草药</h1>
  </div>
  <div class="right-buttons">
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
        <div class="table-box">
          <table>
            <thead>
              <tr>
                <th>类别（典籍）</th>
                <!-- <th>数量</th> -->
                <th>代表药</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in currentData.herbTypes" :key="index">
                <td>{{ item.name }}</td>
                <!-- <td>{{ item.value }}</td> -->
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
        <div class="chart-box large circle-pack-container">
          <VueUiCirclePack :config="config" :dataset="currentData.circlePackData" class="circle-pack" />
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
    { name: '川药', value: 50, color: '#891515' },
    { name: '北药', value: 15 },
    { name: '南药', value: 25 },
    { name: '关药', value: 10 },
    { name: '秦药', value: 15 },
    { name: '浙药', value: 15 },
    { name: '淮药', value: 10 },
    { name: '维药', value: 1 },
    { name: '蒙药', value: 7 },
    { name: '宁夏药', value: 1 }
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
</script>

<style scoped>
/* 大屏整体背景与字体 */
.herb-dashboard {
  background: linear-gradient(180deg, #000000 0%, #0a0a0a 100%);
  color: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: 'Microsoft YaHei', serif;
}
.dashboard-header {
  position: relative;
  width: 100%;
  height: 60px;
  background: linear-gradient(to right, #000000, #001111, #000000);
  border-bottom: 2px solid #00ffff;
  box-shadow: 0 4px 10px rgba(0, 255, 255, 0.4);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.title h1 {
  font-family: 'Microsoft YaHei', serif;
  font-size: 30px;
  color: #00ffff;
  letter-spacing: 3px;
  margin: 0;
  white-space: nowrap;
}

.left-buttons {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 12px;
}

.right-buttons {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}

.jump-button, .data-switch-button, .top-right-button {
  background: rgba(0, 255, 255, 0.1);
  color: #00ffff;
  border: 1px solid #00ffff;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
}

.jump-button:hover, .data-switch-button:hover, .top-right-button:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 12px rgba(0, 255, 255, 0.5);
  color: #ffffff;
}


/* 主体区域 */
.dashboard-main {
  display: flex;
  flex: 1;
  padding: 10px;
  gap: 10px;
  height: calc(100vh - 90px);
  overflow: hidden;
}

/* 三列布局 */
.dashboard-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}

.dashboard-column.center {
  flex: 1.5;
  min-width: 40%;
  max-width: 40%;
}

.dashboard-column:not(.center) {
  min-width: 30%;
  max-width: 30%;
}

/* 卡片盒子样式 */
.chart-box, .map-section, .chart-panel, .table-box {
  background: #1a1a1a;
  border: 1px solid #0ff;
  border-radius: 8px;
  margin-top: 4%;
  overflow: hidden;
}

/* 大图表区尺寸 */
.chart-box.large {
  height: 320px;
  min-height: 320px;
  max-height: 320px;
}

/* 小图表区 */
.chart-box.small {
  width: 100%;
}

/* 表格 */
.table-box {
  flex: 1;
  padding: 10px;
  font-size: 12px;
  overflow: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  color: #0ff;
}

table th, table td {
  padding: 8px;
  border-bottom: 1px solid #333;
}

/* 饼图区域 */
.charts-section {
  display: flex;
  height: 400px;
  gap: 10px;
}

.chart-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #1a1a1a;
  border: 1px solid #0ff;
  border-radius: 8px;
}

/* 饼图标题 */
.panel-title {
  background: rgba(0, 255, 255, 0.08);
  color: #0ff;
  font-size: 16px;
  padding: 6px 0;
  text-align: center;
  border-bottom: 1px solid #0ff;
}

/* 饼图内容 */
.chart-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 朝代分布CirclePack */
.circle-pack-container {
  height: 320px;
  max-height: 320px;
  min-height: 320px;
  background: #1a1a1a;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.circle-pack {
  width: 100%;
  height: 100%;
}

/* 地图词云区 */
.map-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.map-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 自适应小屏幕优化 */
@media screen and (max-height: 800px) {
  .charts-section {
    height: 280px;
  }
  .circle-pack-container {
    height: 260px;
  }
}

@media screen and (max-height: 700px) {
  .charts-section {
    height: 230px;
  }
  .panel-title {
    font-size: 13px;
  }
  .circle-pack-container {
    height: 240px;
  }
}

</style>
