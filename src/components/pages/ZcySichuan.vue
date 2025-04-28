<template>
        <header class="dashboard-header">
  <div class="title">
    <h1>川派"药食同源"</h1>
  </div>
  <div class="right-buttons">
    <button class="top-right-button" @click="router.push('/main')">返回首页</button>
  </div>
</header>
    <div class="container">

      <!-- 上半部分 -->
      <div class="top-section">
        <div class="left-side">
  <h2>巴蜀地区“药食同源”与“五行”</h2>
  <div class="chart-section">
    <div class="chart-container">
      <div v-show="selectedChart === 1" id="chart1" class="echart" ></div>
      <div v-show="selectedChart === 2" id="chart2" class="echart"></div>
      <div v-show="selectedChart === 3" id="chart3" class="echart"></div>
    </div>
    
    </div>

    <div class="chart-description">
  <p v-for="(line, index) in chartDescriptions[selectedChart]" :key="index">
    {{ line }}
  </p>
</div>
  <!-- 按钮移动到图表下面 -->
  <div class="chart-buttons">
    <button :class="{ active: selectedChart === 1 }" @click="selectedChart = 1">饼图</button>
    <button :class="{ active: selectedChart === 2 }" @click="selectedChart = 2">雷达图</button>
    <button :class="{ active: selectedChart === 3 }" @click="selectedChart = 3">柱状图</button>
  </div>
  <div class="herb-gallery">
  <h3>常用草药</h3>
  <div class="herb-images">
    <button class="prev-button" @click="prevHerb">
      <svg t="1745773162949" class="icon" viewBox="0 0 1289 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11751" width="10" height="10"><path d="M19.491175 464.515074L453.26532 19.360245C465.430879 6.933061 481.782438 0 499.311308 0c16.874808 0 32.833929 6.409811 44.868677 18.182933l0.915687 0.915687c24.985181 25.508431 25.115994 66.975984 0.130813 92.615228l-326.507921 334.879918h1004.90138c36.104241 0 65.406234 29.301993 65.406234 65.406234s-29.301993 65.406234-65.406234 65.406234h-1004.639755l326.246296 334.749106c25.246806 25.900869 25.246806 66.583546 0 92.484415-12.16556 12.427184-28.517118 19.360245-46.045989 19.360245-16.874808 0-32.833929-6.540623-44.868677-18.182933l-1.177312-1.177312L19.360363 559.484926c-25.900869-26.685743-25.770056-68.414921 0.130812-94.969852z" p-id="11752"></path></svg>
    </button>
    <img :src="currentHerb.image" :alt="currentHerb.name" />
    <button class="next-button" @click="nextHerb">
      <svg t="1745773268945" class="icon" viewBox="0 0 1289 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11911" width="10" height="10"><path d="M1269.665815 464.515074L835.760858 19.360245C823.595299 6.933061 807.24374 0 789.845682 0c-16.874808 0-32.833929 6.409811-44.868676 18.182933l-0.915688 0.915687c-24.985181 25.508431-25.115994 66.975984-0.130812 92.615228l326.50792 334.879918H65.406234c-36.104241 0-65.406234 29.301993-65.406234 65.406234s29.301993 65.406234 65.406234 65.406234h1004.770567L743.930506 912.15534c-25.246806 25.900869-25.246806 66.583546 0 92.484415 12.16556 12.427184 28.517118 19.360245 46.045989 19.360245 16.874808 0 32.833929-6.540623 44.868676-18.182933l1.177312-1.177312 433.774144-445.154829c25.770056-26.685743 25.770056-68.414921-0.130812-94.969852z" p-id="11912"></path></svg>
    </button>
  </div>
</div>

</div>
      <div class="right-side">
        <h2>川派中医药食同源的核心特点</h2>
        <div class="button-group">
  <button
    :class="{ active: activeModule==='gauge' }"
    @click="setCoreFeature('注重湿气与脾胃调理')"
  >注重湿气与脾胃调理</button>

  <button
    :class="{ active: activeModule==='radar' }"
    @click="setCoreFeature('气血津液的平衡调理')"
  >气血津液的平衡调理</button>

  <button
    :class="{ active: activeModule==='bar' }"
    @click="setCoreFeature('阴阳平衡与食材性味')"
  >阴阳平衡与食材性味</button>

  <button
    :class="{ active: activeModule==='calendar' }"
    @click="setCoreFeature('强调治未病的理念')"
  >强调“治未病”理念</button>
</div>

        <div class="core-feature">
          <h3>当前核心特点:</h3>
          <p>{{ currentFeature }}</p>
          <div class="visual-modules">
  <!-- 湿气与脾胃调理：三张并排 -->
  <div v-show="activeModule==='gauge'" class="module-row">
    <div id="gaugeHumidity" class="module-chart"></div>
    <div id="gaugeTrend"     class="module-chart"></div>
    <div id="gaugeCompare"   class="module-chart"></div>
  </div>

  <!-- 气血津液平衡：三张并排 -->
  <div v-show="activeModule==='radar'" class="module-row">
    <div id="radarQiXue" class="module-chart"></div>
    <div id="radarCompare" class="module-chart"></div>
    <div id="radarTrend"   class="module-chart"></div>
  </div>

  <!-- 性味性格：三张并排 -->
  <div v-show="activeModule==='bar'" class="module-row">
    <div id="barYinYang"   class="module-chart"></div>
    <div id="barSeasonal"  class="module-chart"></div>
    <div id="barTasteMix"  class="module-chart"></div>
  </div>

  <!-- 治未病日历：三张并排 -->
  <div v-show="activeModule==='calendar'" class="module-row">
    <div id="calendarDiet"   class="module-chart"></div>
    <div id="calendarWarning" class="module-chart"></div>
    <div id="calendarTrend"   class="module-chart"></div>
  </div>
</div>

        </div>
        <div class="bottom-section">
  <div class="application-cases">
    <div class="description">
      <p>川派药食同源结合了中医理论与地方特色食材，通过合理搭配食材和中药材，达到养生保健、疾病预防和康复治疗的效果。不同季节和体质的人群可以通过药膳调理身体，增强免疫力。</p>
    </div>
    <div class="cases">
      <div class="case">
        <h3>湿气重的药膳案例</h3>
        <p><strong>药膳名称：</strong>薏苡仁山药粥</p>
        <p><strong>食材：</strong>薏苡仁、山药、红枣</p>
        <p><strong>功效：</strong>健脾祛湿</p>
        <p><strong>制作方法：</strong>将薏苡仁、山药切片，与红枣一起煮成粥，每日食用一次。</p>
      </div>
      <div class="case">
        <h3>气血不足的药膳案例</h3>
        <p><strong>药膳名称：</strong>红枣桂圆炖鸡汤</p>
        <p><strong>食材：</strong>红枣、桂圆、鸡肉</p>
        <p><strong>功效：</strong>滋补气血</p>
        <p><strong>制作方法：</strong>将红枣、桂圆与鸡肉一起炖煮，加入适量的水和盐，炖至鸡肉熟透。</p>
      </div>
      <div class="case">
        <h3>秋季润燥的药膳案例</h3>
        <p><strong>药膳名称：</strong>银耳百合汤</p>
        <p><strong>食材：</strong>银耳、百合、冰糖</p>
        <p><strong>功效：</strong>润燥养颜</p>
        <p><strong>制作方法：</strong>将银耳和百合提前泡发，加入冰糖，炖煮至银耳软糯。</p>
      </div>
      <div class="case">
        <h3>冬季温补的药膳案例</h3>
        <p><strong>药膳名称：</strong>羊肉枸杞汤</p>
        <p><strong>食材：</strong>羊肉、枸杞、姜片</p>
        <p><strong>功效：</strong>温补肾阳</p>
        <p><strong>制作方法：</strong>将羊肉切块，与枸杞和姜片一起炖煮，加入适量的盐和料酒，炖至羊肉熟透。</p>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  
    
    </div>
  </template>
  <script setup>
  import { ref, computed, onMounted,watch, nextTick  } from 'vue'
  import { useRouter } from 'vue-router'
  import * as echarts from 'echarts'
  const charts = {}  // 存放三个 ECharts 实例
  const router = useRouter()
  // 返回上一页
  function goBack() {
    router.push('/data-zcy')
  }
  
  const selectedChart = ref(1) 

  function setSelectedChart(idx) {
  console.log('setSelectedChart 调用，idx =', idx)
  selectedChart.value = idx
}

  
  // 图表说明文字
  const chartDescriptions = {
    1: [
      "酸-木-肝脏：具有收敛固涩、疏肝解郁的作用。",
      "苦-火-心脏：具有清热泻火、燥湿固表的作用。",
      "甘-土-脾脏：具有补益中焦、和中缓急、健脾祛湿的作用。",
      "辛-金-肺脏：具有发散风寒、宣肺行气的作用。",
      "咸-水-肾脏：具有软坚散结、滋阴润下的作用。"
    ],
    2: [
      "健脾祛湿-甘-土-脾脏：山药、莲子等甘平，帮助健脾利湿。",
      "燥湿散寒-辛-金-肺脏：川椒、姜等辛散，用于散寒除湿。",
      "清热解毒-苦-火-心脏：苦丁、黄连等苦寒，用于夏季清热。",
      "收敛固涩-酸-木-肝脏：山楂、乌梅等酸味，用于健胃消食。",
      "滋补肾阴-咸-水-肾脏：海带、昆布等咸味，用于滋阴润燥。"
    ],
    3: [
      "春-木-肝脏：酸味，如山楂，帮助肝气舒畅。",
      "夏-火-心脏：苦味，如苦瓜，用于清心火、燥湿热。",
      "长夏-土-脾脏：甘味，如山药薏仁粥，用于健脾祛湿。",
      "秋-金-肺脏：辛味，如川椒，用于宣肺燥湿。",
      "冬-水-肾脏：咸味，如海带，用于滋肾润燥。"
    ]
  }


// —— 右侧核心特点切换 —— 
const activeModule = ref('gauge')
const currentFeature = ref('点击按钮查看川派药食同源的核心特点')
const featureModules = {
  '注重湿气与脾胃调理':   'gauge',
  '气血津液的平衡调理':   'radar',
  '阴阳平衡与食材性味':  'bar',
  '强调治未病的理念':     'calendar'
}
function setCoreFeature(feature) {
  console.log('setCoreFeature 调用，feature =', feature)
  currentFeature.value = feature
  activeModule.value = featureModules[feature]
}
  
  // ------------------------------------------------------
  // 5. 药材走马灯 —— 常用草药轮播
  // ------------------------------------------------------
  const herbs = ref([
    { name: '茯苓',   image: '/img/doctors/herbs/fuling.png' },
    { name: '薏苡仁', image: '/img/doctors/herbs/yiyiren.png' },
    { name: '山药',   image: '/img/doctors/herbs/shanyao.png' },
    { name: '黄连',   image: '/img/doctors/herbs/huanglian.png' }
  ])
  const currentHerbIndex = ref(0)
  const currentHerb = computed(() => herbs.value[currentHerbIndex.value])
  
  // 下一个
  function nextHerb() {
    currentHerbIndex.value = (currentHerbIndex.value + 1) % herbs.value.length
  }
  
  // 上一个
  function prevHerb() {
    currentHerbIndex.value =
      (currentHerbIndex.value - 1 + herbs.value.length) % herbs.value.length
  }
  

  onMounted(() => {
    // -------------------------------
    // 6.1 左侧三张图
    // -------------------------------
    // 6.1.1 饼图 chart1
    charts[1] = echarts.init(document.getElementById('chart1'))
    charts[1].setOption({
      title: {
        text: '药材五味—五行—五脏',
        left: 'center',
        textStyle: { color: '#0ff' }
      },
      tooltip: { trigger: 'item' },
      series: [{
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1, name: '酸—木—肝' },
          { value: 1, name: '苦—火—心' },
          { value: 1, name: '甘—土—脾' },
          { value: 1, name: '辛—金—肺' },
          { value: 1, name: '咸—水—肾' }
        ],
        label: {
          show: true,
          formatter: '{b}',
          fontSize: 10,
          color: '#fff'
        }
      }]
    })
  
    // 6.1.2 雷达图 chart2
    charts[1] = echarts.init(document.getElementById('chart2'))
    charts[1].setOption({
      title: {
        text: '五味在巴蜀地区的药性对比',
        left: 'center',
        textStyle: { color: '#0ff' }
      },
      tooltip: { trigger: 'axis' },
      legend: {
        data: ['酸(收敛)','苦(清热)','甘(健脾)','辛(温散)','咸(滋阴)'],
        top: '10%',
        textStyle: { color: '#fff' }
      },
      grid: {
        top: '40%', left: '3%', right: '4%', bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['健脾祛湿','燥湿散寒','清热解毒','收敛固涩','滋补肾阴'],
        axisLabel: { color: '#fff' }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#fff' },
        splitLine: { lineStyle: { color: '#333' } }
      },
      series: [
        { name: '酸(收敛)', type: 'bar', data: [8,3,5,4,2] },
        { name: '苦(清热)', type: 'bar', data: [2,9,3,2,1] },
        { name: '甘(健脾)', type: 'bar', data: [10,4,2,8,5] },
        { name: '辛(温散)', type: 'bar', data: [3,2,9,1,4] },
        { name: '咸(滋阴)', type: 'bar', data: [1,1,2,3,10] }
      ]
    })
  
    // 6.1.3 柱状图 chart3
    charts[1] = echarts.init(document.getElementById('chart3'))
    charts[1].setOption({
      title: {
        text: '四季五味应用与五行结合',
        left: 'center',
        textStyle: { color: '#0ff' }
      },
      tooltip: { trigger: 'axis' },
      legend: {
        data: ['酸','苦','甘','辛','咸'],
        top: '10%'
      },
      xAxis: {
        type: 'category',
        data: ['春·肝木','夏·心火','长夏·脾土','秋·肺金','冬·肾水']
      },
      yAxis: { type: 'value' },
      series: [
        { name:'酸', type:'bar', data:[8,2,3,7,1] },
        { name:'苦', type:'bar', data:[2,9,4,3,1] },
        { name:'甘', type:'bar', data:[5,4,10,6,3] },
        { name:'辛', type:'bar', data:[3,2,5,9,4] },
        { name:'咸', type:'bar', data:[1,1,2,3,10] }
      ]
      
    })

    
  // --- 右侧 “湿气与脾胃调理” 模块 ---
  charts.gaugeHumidity = echarts.init(document.getElementById('gaugeHumidity'))
  charts.gaugeHumidity.setOption({
    series:[{
      name:'脾胃湿度',type:'gauge',min:0,max:10,
      data:[{value:7,name:'中焦湿盛'}],
      axisLine:{lineStyle:{width:15,color:[[0.3,'#55aaff'],[0.7,'#ffaa00'],[1,'#ff5555']]}}
    }]
  })
  charts.gaugeTrend = echarts.init(document.getElementById('gaugeTrend'))
  charts.gaugeTrend.setOption({
    title:{text:'湿度趋势',left:'center',textStyle:{color:'#0ff'}},
    xAxis:{type:'category',data:['5天前','4天前','3天前','2天前','1天前'],axisLabel:{color:'#fff'}},
    yAxis:{type:'value',axisLabel:{color:'#fff'}},
    series:[{type:'line',data:[6,7,8,7,7],smooth:true}]
  })
  charts.gaugeCompare = echarts.init(document.getElementById('gaugeCompare'))
  charts.gaugeCompare.setOption({
    title:{text:'湿度对比',left:'center',textStyle:{color:'#0ff'}},
    xAxis:{type:'category',data:['去年','上月','本月'],axisLabel:{color:'#fff'}},
    yAxis:{type:'value',axisLabel:{color:'#fff'}},
    series:[{type:'bar',data:[5,6,7]}]
  })

  // --- 右侧 “气血津液平衡” 模块 ---
  charts.radarQiXue = echarts.init(document.getElementById('radarQiXue'))
  charts.radarQiXue.setOption({
    title:{text:'气血津液五维平衡',left:'center',textStyle:{color:'#0ff'}},
    radar:{indicator:[
      {name:'气',max:10},{name:'血',max:10},
      {name:'津',max:10},{name:'液',max:10},{name:'卫',max:10}
    ]},
    series:[{type:'radar',data:[{value:[6,4,5,3,7],name:'当前'}]}]
  })
  charts.radarCompare = echarts.init(document.getElementById('radarCompare'))
  charts.radarCompare.setOption({
    title:{text:'气血对比',left:'center',textStyle:{color:'#0ff'}},
    radar:{indicator:[
      {name:'气',max:10},{name:'血',max:10},
      {name:'津',max:10},{name:'液',max:10},{name:'卫',max:10}
    ]},
    series:[{type:'radar',data:[
      {value:[6,4,5,3,7],name:'当前'},
      {value:[5,5,4,4,6],name:'理想'}
    ]}]
  })
  charts.radarTrend = echarts.init(document.getElementById('radarTrend'))
  charts.radarTrend.setOption({
    title:{text:'气血趋势',left:'center',textStyle:{color:'#0ff'}},
    xAxis:{type:'category',data:['3周前','2周前','1周前'],axisLabel:{color:'#fff'}},
    yAxis:{type:'value',axisLabel:{color:'#fff'}},
    series:[{type:'line',data:[6,5,6]}]
  })

  // --- 右侧 “阴阳性味” 模块 ---
  charts.barYinYang = echarts.init(document.getElementById('barYinYang'))
  charts.barYinYang.setOption({
    title:{text:'性味归经',left:'center',textStyle:{color:'#0ff'}},
    xAxis:[
      {type:'value',inverse:true,axisLine:{lineStyle:{color:'#fff'}}},
      {type:'value',axisLine:{lineStyle:{color:'#fff'}}}
    ],
    yAxis:[{type:'category',data:['绿豆粥','银耳雪梨','羊肉汤','干姜花椒'],axisLine:{lineStyle:{color:'#fff'}}}],
    series:[
      {name:'寒凉性',type:'bar',stack:'all',data:[5,3,0,0]},
      {name:'温热性',type:'bar',stack:'all',data:[0,0,4,6]}
    ]
  })
  charts.barSeasonal = echarts.init(document.getElementById('barSeasonal'))
  charts.barSeasonal.setOption({
    title:{text:'四季食补',left:'center',textStyle:{color:'#0ff'}},
    xAxis:{type:'category',data:['春','夏','长夏','秋','冬'],axisLabel:{color:'#fff'}},
    yAxis:{type:'value',axisLabel:{color:'#fff'}},
    series:[{type:'bar',data:[8,6,7,5,9]}]
  })
  charts.barTasteMix = echarts.init(document.getElementById('barTasteMix'))
  charts.barTasteMix.setOption({
    title:{text:'性味混合',left:'center',textStyle:{color:'#0ff'}},
    xAxis:{type:'category',data:['酸','苦','甘','辛','咸'],axisLabel:{color:'#fff'}},
    yAxis:{type:'value',axisLabel:{color:'#fff'}},
    series:[{type:'bar',data:[4,7,5,6,3]}]
  })

  // --- 右侧 “治未病日历” 模块 ---
  charts.calendarDiet = echarts.init(document.getElementById('calendarDiet'))
  charts.calendarDiet.setOption({
    visualMap:{min:0,max:5,orient:'horizontal',left:'center',inRange:{color:['#305f72','#7cc1f7','#e0fdfa']}},
    calendar:{range:'2025',cellSize:['20','20'],yearLabel:{show:false},dayLabel:{color:'#fff'}},
    series:[{type:'heatmap',coordinateSystem:'calendar',data:[
      ['2025-03-05',3],['2025-06-21',4],['2025-07-10',2],['2025-09-23',3],['2025-12-22',5]
    ]}]
  })
  charts.calendarWarning = echarts.init(document.getElementById('calendarWarning'))
  charts.calendarWarning.setOption({
    title:{text:'预警日历',left:'center',textStyle:{color:'#0ff'}},
    visualMap:{min:0,max:3,orient:'horizontal',left:'center',inRange:{color:['#ffbbbb','#ff5555','#aa0000']}},
    calendar:{range:'2025',cellSize:['20','20'],yearLabel:{show:false},dayLabel:{color:'#fff'}},
    series:[{type:'heatmap',coordinateSystem:'calendar',data:[
      ['2025-04-15',1],['2025-05-01',2],['2025-08-08',3]
    ]}]
  })
  charts.calendarTrend = echarts.init(document.getElementById('calendarTrend'))
  charts.calendarTrend.setOption({
    title:{text:'饮食趋势',left:'center',textStyle:{color:'#0ff'}},
    tooltip:{}, xAxis:{type:'category',data:['1月','2月','3月','4月'],axisLabel:{color:'#fff'}},
    yAxis:{type:'value',axisLabel:{color:'#fff'}},
    series:[{type:'line',data:[2,3,4,3]}]
  })

  console.log('所有 ECharts 实例初始化完成：', Object.keys(charts))
})
  watch(selectedChart, async (newIdx, oldIdx) => {
  console.log(`selectedChart 从 ${oldIdx} 变为 ${newIdx}`)
  // 等待 DOM 更新，让对应容器显示
  await nextTick()
  const chart = charts[newIdx]
  console.log('要 resize 的图表实例：', chart)
  if (chart) {
    chart.resize()
    console.log(`图表 ${newIdx} resize 完成`)
  }
})
// 右侧模块切换
watch(activeModule, async (newMod, oldMod) => {
  console.log(`activeModule 从 ${oldMod} 变为 ${newMod}`)
  await nextTick()
  const map = {
    gauge:    ['gaugeHumidity','gaugeTrend','gaugeCompare'],
    radar:    ['radarQiXue','radarCompare','radarTrend'],
    bar:      ['barYinYang','barSeasonal','barTasteMix'],
    calendar: ['calendarDiet','calendarWarning','calendarTrend']
  }
  const ids = map[newMod] || []
  ids.forEach(id => {
    const c = charts[id]
    console.log('即将 resize 右侧实例：', id, c)
    if (c) {
      c.resize()
      console.log('resize 完成：', id)
    }
  })
})

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
}

.left-side {
  flex: 0.4;
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
  height: 260px;
  background-color: #222;
  border: 1px solid #0ff;
  border-radius: 8px;
  flex: 1; /* 使下半部分自适应填充空间 */
  margin-top: 5%;
}

.chart-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  padding: 5%;
}

.chart-buttons button {
  flex: 1;
  padding: 8px;
  background: #333;
  color: #0ff;
  border: 1px solid #0ff;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.chart-buttons button.active {
  background: #0ff;
  color: #000;
}

.chart-container {
  flex: 1;
  height: 500px;
  /* margin-top: 0%; */
}

.echart {
  width: 300px;
  height: 300px;
  left: 10%;
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

button.top-right-button:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 12px rgba(0, 255, 255, 0.5);
  color: #ffffff;
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
.chart-section {
  display: flex;
  flex-direction: column; /* 垂直排列图表和描述文字 */
  gap: 10px; /* 图表和描述文字之间的间距 */
  background-color: #222; /* 背景颜色 */
  border: 1px solid #0ff; /* 边框颜色 */
  border-radius: 8px; /* 圆角 */
  padding: 10px; /* 内边距 */
  height: 300px;
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

.top-right-button {
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

.chart-description {
  /* 排版 */
  font-family: 'Microsoft YaHei', serif;
  font-size: 14px;
  line-height: 1.8;
  color: #e0fdfa;

  /* 尺寸与滚动 */
  max-height: 160px;
  overflow-y: auto;
  padding: 16px;
  margin-top: 12px;

  /* 背景与边框 */
  background: #1c1c1c;
  border: 1px solid #0ff;
  border-radius: 8px;

  /* 投影、内阴影 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6),
              inset 0 0 6px rgba(255, 255, 255, 0.1);

  /* 滚动条 (仅 Webkit 浏览器有效) */
  scrollbar-width: thin;
  scrollbar-color: #0ff transparent;
}
.chart-description::-webkit-scrollbar {
  width: 6px;
}
.chart-description::-webkit-scrollbar-track {
  background: transparent;
}
.chart-description::-webkit-scrollbar-thumb {
  background-color: #0ff;
  border-radius: 3px;
}
.herb-gallery {
  background-color: #222;
  border: 1px solid #0ff;
  border-radius: 8px;
  padding: 20px;
  margin-top: 10px;
  position: relative;
  overflow: hidden; /* 确保按钮不会超出容器 */
}

.herb-images {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.herb-images img {
  width: 150px; /* 设置图片宽度 */
  height: 100px; /* 保持图片比例 */
  border-radius: 4px;
}
.herb-gallery h3 {
  color: #0ff; /* 设置标题颜色为亮蓝色 */
  font-size: 15px; /* 设置字体大小 */
  margin-bottom: 20px; /* 设置标题与内容的间距 */
  text-align: center; /* 居中对齐标题 */
  text-shadow: 0 2px 4px rgba(0, 255, 255, 0.5); /* 添加文字阴影 */
}
.prev-button, .next-button {
  background-color: #333;
  color: #0ff;
  border: 1px solid #0ff;
  border-radius: 50%; /* 设置为圆形按钮 */
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.prev-button {
  left: 10px; /* 距离左边界的距离 */
}

.next-button {
  right: 10px; /* 距离右边界的距离 */
}

.prev-button:hover, .next-button:hover {
  background-color: #0ff;
}

.prev-button:active, .next-button:active {
  transform: scale(0.95);
}

.module-row {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
.module-chart {
  flex: 1;
  height: 240px; /* 或你想要的高度 */
}.bottom-section {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  background-color: #222;
  border: 1px solid #0ff;
  border-radius: 8px;
  color: #e0fdfa;
  margin-top: 20px;
}

.bottom-section h2 {
  font-size: 24px;
  margin-bottom: 15px;
  text-align: center;
  color: #0ff;
  text-shadow: 0 2px 4px rgba(0, 255, 255, 0.5);
}

.bottom-section p {
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 20px;
  text-align: center;
}

.application-cases {
  display: flex;
  width: 100%;
  gap: 20px;
}

.description {
  margin-top: 3%;
  margin-left: 3%;
  flex: 0.4; /* 占据 40% 的宽度 */
  /* background-color: #1c1c1c; */
  /* border: 1px solid #0ff; */
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
}

.description p {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 5px;
}

.cases {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  flex: 2;
}

.cases .case {
  margin-top: 3%;
  background-color: #1c1c1c;
  border: 1px solid #0ff;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
}

.cases .case h3 {
  font-size: 10px;
  margin-bottom: 8px;
  color: #0ff;
}

.cases .case p {
  font-size: 8px;
  line-height: 1.6;
  margin-bottom: 5px;
}

.cases .case p strong {
  color: #0ff;
  font-weight: bold;
}
  </style>