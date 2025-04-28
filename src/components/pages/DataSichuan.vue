<template>

<header class="dashboard-header">
  <div class="title">
    <h1>川人体质分析</h1>
  </div>
    <button class="top-right-button" @click="router.push('/main')">返回首页</button>

</header>

    <div class="page-container">

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
      </aside>
  <!-- 右侧部分 -->
  <div class="right-panel">
      <!-- 上半部分 -->
      <div class="right-top">
        <!-- 按钮组 -->
        <div class="case-buttons">
          <button
            v-for="(c, idx) in caseList"
            :key="idx"
            :class="{ active: selectedCase === idx }"
            @click="selectCase(idx)"
          >
            {{ c.name }}
          </button>
        </div>
        <!-- 走马灯 & 文本 -->
        <div class="case-content">
          <div class="carousel">
            <button class="prev" @click="prevImage">‹</button>
            <img
              :src="caseImages[selectedCase][currentImageIndex]"
              alt="案例图片"
              style="width: 100%; height: 500px;"
            />
            <button class="next" @click="nextImage">›</button>
          </div>
          <!-- 对应文字描述 -->
          <div class="case-text">
  <h4>{{ caseTitles[selectedCase][currentImageIndex] }}</h4>
  <p>{{ caseDescriptions[selectedCase][currentImageIndex] }}</p>
</div>

        </div>
      </div>
      
      <div class="right-bottom">
        <h3>川人体质调理建议</h3>
        <p>根据古籍《素问·上古真天论》和《类经·藏象类》的记载，以及巴蜀地区名医的经验，以下是一些针对川人体质的调理建议：</p>
        <ul>
          <li>饮食调理：减少辛辣、油腻食物的摄入，多吃健脾祛湿的食物，例如薏苡仁、赤小豆等。遵循《素问》中“五谷为养，五果为助，五畜为益，五菜为充”的饮食原则。</li>
          <li>生活习惯：避免长时间处于潮湿环境，适当进行户外活动，保持干燥。劳逸结合，保证充足的睡眠，避免过度劳累。</li>
                </ul>
      </div>

    </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, nextTick } from 'vue';
  import { useRouter } from 'vue-router';

const caseList = [
  { name: '望诊' },
  { name: '闻诊' },
  { name: '问诊' },
  { name: '切诊' },
];

// 每个案例的图片数组
const caseImages = [
[
  '/img/sizhen/shexiang1.png',
  '/img/sizhen/shexiang2.png',
  '/img/sizhen/shexiang3.png'
],
[
  '/img/sizhen/wenzhen1.png',
  '/img/sizhen/wenzhen2.png',
  '/img/sizhen/wenzhen3.png'
],
[
  '/img/sizhen/ask1.png',
  '/img/sizhen/ask2.png',
  '/img/sizhen/ask3.png'
],
[
  '/img/sizhen/qie1.png',
  '/img/sizhen/qie2.png',
  // '/img/sizhen/qie3.png'
]
];


const caseTitles = [
  ['舌苔厚腻（湿阻脾胃）', '舌质淡白（脾气虚弱）', '舌裂纹（津液不足）'],
  ['口气腥臭（湿热郁滞）', '声音低沉（肺气虚弱）', '呼吸粘滞（痰湿阻肺）'],
  ['食欲亢进（脾虚生湿）', '畏寒嗜睡（阳虚内寒）', '纳呆便溏（脾胃虚弱）'],
  ['脉象沉细（气血两虚）', '脉弦滑（痰湿凝滞）', '脉数断续（阴虚火旺）']
];

const caseDescriptions = [
  [
    '舌体肥大，舌苔厚腻，提示脾运失健，湿浊内停，需健脾祛湿。饮食忌辛辣油腻，宜清淡健脾。适宜户外运动以助脾气升腾。',
    '舌质淡白，边缘齿痕明显，舌面湿润，表明气血双虚、脾失健运，需益气养血，佐以温补脾阳之品。',
    '舌中裂纹，干燥，苔色灰白，为津液不足、湿浊内留之象，需清养阴液，佐以化湿之法。'
  ],
  [
    '口气腥臭，伴胃中湿热郁滞，提示脾胃热毒积滞，应以清热解毒、化湿理气为主。',
    '声音低沉，气息微弱，说明肺脾气虚，宣发肃降无力，应补益肺脾、扶正祛邪。',
    '呼吸黏滞带痰声，为痰湿困阻肺气，需健脾祛湿，理气化痰，恢复肺气宣通。'
  ],
  [
    '食欲亢进但体倦乏力，为脾虚不运，湿邪内生，宜健脾渗湿，升清降浊。',
    '畏寒喜暖，四肢冰冷，为阳虚寒盛之象，应温补脾肾，助阳气升发。',
    '纳呆便溏，腹中痞满，为脾胃虚弱、运化失常，宜健脾和胃、化湿运脾。'
  ],
  [
    '脉沉细而无力，属气血两虚兼内寒，宜补气养血，温阳散寒。',
    '脉弦滑如珠滚，提示痰湿凝滞，气机阻滞，宜化痰祛湿，行气宽中。',
    '脉数断续，阴虚火旺，津液亏耗，应养阴清热，兼益气养血。'
  ]
];



const selectedCase = ref(0);
const currentImageIndex = ref(0);

// 切换案例
function selectCase(idx) {
  selectedCase.value = idx;
  currentImageIndex.value = 0;
}

// 走马灯上一张
function prevImage() {
  const imgs = caseImages[selectedCase.value];
  currentImageIndex.value =
    (currentImageIndex.value - 1 + imgs.length) % imgs.length;
}

// 走马灯下一张
function nextImage() {
  const imgs = caseImages[selectedCase.value];
  currentImageIndex.value =
    (currentImageIndex.value + 1) % imgs.length;
}
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
  };


  const goBack = () => {
    router.go(-1);
  };
  </script>
  <style scoped>
  /* 全局重置与字体 */
  @font-face {
    font-family: Millik;
    font-weight: 700;
    src: url(/assets/font/Millik.c3f91cb.ttf) format("truetype");
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Millik, Arial, sans-serif;
  }.dashboard-header {
  position: relative;
  width: 100%;
  height: 60px;
  background: linear-gradient(to right, #000000, #001111, #000000);
  border-bottom: 1px solid #00ffff;
  box-shadow: 0 4px 10px rgba(0, 255, 255, 0.4);
  overflow: hidden;
  display: flex;
  align-items: center;
}

.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  white-space: nowrap;
}

.title h1 {
  font-family: 'Microsoft YaHei', serif;
  font-size: 30px;
  color: #00ffff;
  letter-spacing: 3px;
  margin: 0;
}

.header-buttons {
  position: absolute;
  display: flex;
  gap: 12px;
  align-items: center;
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

.top-right-button:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 12px rgba(0, 255, 255, 0.5);
  color: #ffffff;
}

  /* 页面整体布局 */
  .page-container {
  display: flex;
  height: 92vh;
  width: 100%;
  border-radius: 10px;
  background-color: #121212;
  color: #e0fdfa;
  overflow: hidden;
  border: 2px solid #0ff; /* 添加边框，颜色为 #0ff，宽度为 2px */
  padding: 10px; /* 添加内边距，避免内容紧贴边界 */
  box-sizing: border-box; /* 确保边框和内边距不会影响整体高度 */
  align-items: stretch; /* 确保左右两部分高度一致 */
}
  /* 返回按钮区域 */
  .navigation-buttons {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 10;
  }
  .return-button {
    padding: 8px 16px;
    background-color: #0ff;
    color: #000;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s, box-shadow 0.3s;
  }
  .return-button:hover {
    background-color: rgba(0,255,255,0.7);
    box-shadow: 0 0 10px rgba(0,255,255,0.5);
  }
  
  .left-panel {
  margin-top: 0%;
  width: 20%;
  height: 100%; /* 或者直接设置为 100% */
  border-radius: 10px;
  background-color: #1c1c1c;
  border: 1px solid #0ff; /* 四个边都有边框 */
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  gap: 30px; /* 模块之间垂直间距 */
  box-sizing: border-box; /* 确保边框不会影响整体宽度 */
}
  .left-panel h3 {
    font-size: 1.4em;
    color: #0ff;
    margin-bottom: 10px;
  }
  
  /* 气候地理 info-box */
  .info-box {
    background-color: #222;
    border: 2px solid #0ff;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    margin-top: -40px;
    flex-direction: column;
    gap: 20px;
  }
  .image-container {
    text-align: center;

  }
  .image-container img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,255,255,0.5);
  }
  .text-container {
    color: #e0fdfa;
    font-size: 0.9em;
    line-height: 1.6;
  }
  .buttons {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
  .buttons button {
    flex: 1;
    padding: 10px;
    background: #111;
    color: #0ff;
    border: 1px solid #0ff;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s, color 0.3s;
  }
  .buttons button:hover {
    background: #0ff;
    color: #111;
  }
  
  /* 数据可视化图表 */
  .charts {
    display: flex;
    flex-direction: column;
    gap: 20px; /* 图表之间垂直间距 */
  }
  #climate-map,
  #constitution-pie-chart {
    background: #111;
    border: 1px solid #0ff;
    border-radius: 8px;
  }

  .right-panel {
  flex: 1;
  height: 100%; /* 确保高度填满父容器 */
  padding: 20px;
  margin-left: 30px;
  background: #222;
  border: 1px solid #0ff;
  border-radius: 8px;
  padding: 16px;
}
  /* 按钮组 */
  .case-buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  .case-buttons button {
    flex: 1;
    padding: 10px;
    background: #111;
    color: #0ff;
    border: 1px solid #0ff;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s, color 0.3s;
  }
  .case-buttons button.active,
  .case-buttons button:hover {
    background: #0ff;
    color: #111;
  }

  /* 走马灯 + 文本布局 */
  .case-content {
    display: flex;
    gap: 20px;
  }
  .carousel {
    position: relative;
    /* left: 30%; */
    width: 500px;
    height: 500px;
    background: #222;
    border: 1px solid #0ff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .carousel img {
    max-width: 500px;
    min-height: 500px;
    border-radius: 4px;
  }
  .carousel .prev,
  .carousel .next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0,0,0,0.5);
    color: #0ff;
    border: none;
    font-size: 1.5em;
    padding: 0 8px;
    cursor: pointer;
  }
  .carousel .prev { left: 5px; }
  .carousel .next { right: 5px; }

  .case-text {
  flex: 1;
  background: #222;
  border: 1px solid #0ff;
  border-radius: 8px;
  padding: 20px;
  color: #e0fdfa;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.case-text h4 {
  color: #00eaff;
  font-size: 1.2em;
}

.case-text p {
  font-size: 0.9em;
  line-height: 1.8;
}

  .right-panel {
    flex: 1;
    padding: 20px;
    background: #222;
    border: 1px solid #0ff;
    border-radius: 8px;
    padding: 16px;
  }
  
/* 下半部分：川人体质调理建议 */
.right-bottom {
  background-color: #222;
  border: 1px solid #0ff;
  border-radius: 8px;
  padding: 20px;
  height: 130px;
  margin-top: 20px; /* 与上半部分的间距 */
}

.right-bottom h3 {
  font-size: 1em;
  color: #0ff;
  margin-bottom: 10px;
}

.right-bottom p {
  font-size: 0.5em;
  color: #e0fdfa;
  margin-bottom: 10px;
}

.right-bottom ul {
  list-style-type: none;
  padding-left: 0;
}

.right-bottom ul li {
  font-size: 0.2em;
  color: #e0fdfa;
  margin-bottom: 5px;
}

.right-bottom ul li::before {
  content: "✓ ";
  color: #0ff;
}

</style>