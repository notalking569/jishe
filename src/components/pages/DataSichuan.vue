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
            <p v-if="currentImage === '/img/doctors/qihou.png'">四川的气候特征对川人体质有重要影响，湿润的环境导致川人体质偏湿。四川的地形复杂，气候湿润，降水量充沛，温暖的气候助长了湿气的积聚。</p>
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
  <p><strong>症状表现：</strong> {{ caseDetails[selectedCase][currentImageIndex].symptom }}</p>
  <p><strong>川人体质特点：</strong> {{ caseDetails[selectedCase][currentImageIndex].constitution }}</p>
  <p><strong>四诊合参：</strong> {{ caseDetails[selectedCase][currentImageIndex].summary }}</p>
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
const caseDetails = [
  [
    {
      symptom: '舌苔厚腻，提示脾运失健，湿浊内停。舌苔是中医望诊的重要内容，厚腻的舌苔通常表明消化系统功能不佳，体内湿气过重，可能伴有消化不良、食欲不振等症状。',
      constitution: '川人因气候湿重，望诊常见舌苔厚腻、舌质湿润。这可能与四川地区潮湿的气候条件有关，长期生活在这样的环境中，人们容易受到湿邪的侵袭，导致脾脏运化功能受损。',
      summary: '结合四诊，属脾失健运、湿邪内停体质，应以健脾祛湿为主。治疗上应注重强化脾脏的运化功能，同时采取祛湿措施，以恢复体内环境的平衡。建议饮食清淡，避免食用油腻、生冷食物，可服用薏苡仁、茯苓等健脾祛湿的中药材。'
    },
    {
      symptom: '舌质淡白，边缘齿痕，气血双虚。舌质淡白可能意味着血液循环不佳，边缘齿痕则可能是气虚的表现，这些都是气血不足的信号，可能伴有乏力、头晕、心悸等症状。',
      constitution: '川人体质多脾虚，望诊易见舌质淡白、齿痕明显。这与地区饮食习惯和生活方式有关，如饮食不规律、过度劳累等，需要通过饮食和生活习惯的调整来改善。',
      summary: '四诊提示气血两虚，兼脾阳不足，应补气养血。建议采用补气养血的治疗方法，如服用当归、黄芪等中药材，同时增加营养摄入，改善生活习惯，保证充足的休息和适当的运动。'
    },
    {
      symptom: '舌裂纹，津液亏损，湿浊内停。舌裂纹可能是由于体内津液不足，无法滋养舌面所致，这在中医中被视为阴虚的表现，可能伴有口干、咽干、便秘等症状。',
      constitution: '巴蜀潮湿体质易现舌裂纹，津液不足。这可能与当地气候和个人体质有关，需要通过滋阴润燥的方法来调理，以补充体内津液，缓解阴虚症状。',
      summary: '四诊结合属湿热伤津，应养阴清热、佐以祛湿。治疗上应注重滋养阴液，清热润燥，同时配合祛湿，以缓解症状。建议服用沙参、麦冬等滋阴润燥的中药材，同时注意饮食清淡，避免辛辣刺激性食物。'
    }
  ],
  [
    {
      symptom: '口气腥臭，胃中湿热郁滞。口气腥臭通常是消化系统问题的标志，可能与胃热或消化不良有关，可能伴有恶心、呕吐、腹痛等症状。',
      constitution: '川人体质偏湿热，闻诊常见口气重、腥臭感。这可能与当地的饮食习惯和气候条件有关，如喜食辛辣、油腻食物，需要通过清热化湿的方法来调理。',
      summary: '四诊合参属湿热中阻，宜清热化湿。建议采用清热化湿的治疗方案，如服用黄连、黄芩等中药材，同时注意饮食清淡，避免辛辣油腻，增加蔬菜水果的摄入，以帮助清热化湿。'
    },
    {
      symptom: '口气酸腐，食积不化。口气酸腐可能是由于食物在胃中停留时间过长，未能及时消化所致，可能伴有腹胀、嗳气等症状。',
      constitution: '川人中此类体质者，多因饮食不节或过食肥甘厚味，导致脾胃受损，需要通过消食导滞的方法来调理。',
      summary: '四诊合参属食积内停，宜消食导滞。建议采用消食导滞的治疗方案，如服用山楂、神曲等中药材，同时调整饮食习惯，避免过饱，定时定量。'
    },
    {
      symptom: '口气无味，脾胃虚弱。口气无味可能表明脾胃功能减弱，无法正常运化水谷，可能伴有食欲不振、面色萎黄等症状。',
      constitution: '川人中脾胃虚弱者，多因长期饮食不规律或过度劳累，导致脾胃受损，需要通过健脾益气的方法来调理。',
      summary: '四诊合参属脾胃虚弱，宜健脾益气。建议采用健脾益气的治疗方案，如服用党参、白术等中药材，同时注意饮食调养，增加易消化食物的摄入，适当休息。'
    }
  ],
  [
    {
      symptom: '食欲亢进但体倦，为脾虚生湿。食欲亢进可能是脾虚导致的消化不良，而体倦则是气虚的表现，可能伴有腹胀、便溏等症状，这在中医中被视为脾虚湿困的表现。',
      constitution: '川人问诊常诉食欲不振或乏力多汗。这可能与当地的气候条件和饮食习惯有关，如气候潮湿、饮食不节等，需要通过健脾利湿的方法来调理。',
      summary: '结合四诊为脾气虚弱，应健脾利湿。建议采用健脾利湿的治疗方案，如服用白术、茯苓等中药材，同时注意饮食调整，增加运动量，以帮助脾气恢复，祛除湿邪。'
    },
    {
      symptom: '食欲不振，脾胃不和。长期食欲不振可能导致营养不良，影响身体健康，可能伴有体重下降、乏力等症状。',
      constitution: '川人中脾胃不和者，多因饮食不当或情绪波动，导致脾胃功能失调，需要通过调和脾胃的方法来调理。',
      summary: '四诊合参属脾胃不和，宜调和脾胃。建议采用调和脾胃的治疗方案，如服用陈皮、半夏等中药材，同时注意情绪管理，避免过度焦虑或压力。'
    },
    {
      symptom: '食后腹胀，消化不良。食后腹胀可能是由于消化不良或胃肠功能紊乱所致，可能伴有嗳气、恶心等症状。',
      constitution: '川人中消化不良者，多因饮食过量或食物不易消化，导致胃肠负担加重，需要通过促进消化的方法来调理。',
      summary: '四诊合参属消化不良，宜促进消化。建议采用促进消化的治疗方案，如服用鸡内金、麦芽等中药材，同时注意饮食控制，避免过量进食，增加运动量。'
    }
  ],
  [
    {
      symptom: '脉象沉细，气血两虚。脉象沉细通常是气血不足的表现，可能伴有面色苍白、乏力、头晕等症状，需要通过补充气血来改善。',
      constitution: '切诊常见脉细弱、按之无力，提示川人体质多气血不足。这可能与当地的气候条件和生活方式有关，如气候潮湿、过度劳累等，需要通过温阳补益的方法来调理。',
      summary: '四诊合参属气血两虚，温阳补益。建议采用温阳补益的治疗方案，如服用人参、肉桂等中药材，同时增加营养摄入，改善生活习惯，保证充足的休息和适当的运动，以帮助补充气血，增强体质。'
    },
    {
      symptom: '脉象弦紧，肝气郁结。脉象弦紧可能是由于情绪不畅，肝气郁结所致，可能伴有胸闷、胁痛、情绪波动等症状。',
      constitution: '川人中肝气郁结者，多因工作压力大或情绪管理不当，导致肝气不畅，需要通过疏肝解郁的方法来调理。',
      summary: '四诊合参属肝气郁结，宜疏肝解郁。建议采用疏肝解郁的治疗方案，如服用柴胡、白芍等中药材，同时注意情绪调节，适当放松，增加户外活动。'
    },
    {
      symptom: '脉象滑数，痰热内蕴。脉象滑数可能是由于体内痰湿过重，郁而化热所致，可能伴有咳嗽、痰多、口干等症状。',
      constitution: '川人中痰热内蕴者，多因饮食不当或环境潮湿，导致痰湿内生，需要通过清热化痰的方法来调理。',
      summary: '四诊合参属痰热内蕴，宜清热化痰。建议采用清热化痰的治疗方案，如服用黄芩、贝母等中药材，同时注意饮食清淡，避免辛辣油腻，增加饮水量。'
    }
  ]

]

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
  const currentImage = ref('/img/doctors/qihou.png'); // 默认气候图片
  
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