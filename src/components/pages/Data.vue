<template>
      <header class="header">
      <h1 class="title">五行理论--四诊合参</h1>
      <button class="data-button" @click="goData">数据分析</button>
      <button class="back-button" @click="goHome">返回首页</button>
    </header>
  <div class="container">


    <div class="diagnostic-container">
      <div class="diagnostic-square-container">
        <div
          v-for="item in types"
          :key="item.type"
          class="diagnostic-square"
          :class="{ active: activeType === item.type }"
          @click="activeType = item.type"
        >
          <div class="square-icon">{{ item.icon }}</div>
          <h3 class="square-title">{{ item.type }}</h3>
        </div>
      </div>

      <div class="diagnostic-detail">
        <div v-if="activeType === '望诊'" class="diagnostic-detail-content">
          <h2>望诊 - 观察法</h2>
          <p class="intro-quote">“色之变化，皆属于五脏。” ——《灵枢·本脏》</p>
          <div class="detail-section">
            <h3>望神</h3>
            <p><strong>古籍释义：</strong>神者，生命活动之总称。得神者生，失神者死。——《灵枢·大惑论》</p>
            <p><strong>现代解释：</strong>观察患者的精神面貌、意识清晰度和反应能力，以判断正气强弱。</p>
          </div>
          <div class="detail-section">
            <h3>望形</h3>
            <p><strong>古籍释义：</strong>察其形体以知其病，壮者多实，瘦者多虚。——《素问·阴阳应象大论》</p>
            <p><strong>现代解释：</strong>通过体型、姿态和活动能力了解疾病的寒热虚实属性。</p>
          </div>
          <div class="detail-section">
            <h3>望色</h3>
            <p><strong>古籍释义：</strong>青赤黄白黑，五色各有所主，青属肝，赤属心，黄属脾，白属肺，黑属肾。——《素问·五色》</p>
            <p><strong>现代解释：</strong>面色的异常变化反映了五脏的病理状态，是判断疾病部位的重要依据。</p>
          </div>
          <div class="detail-section">
            <h3>望舌</h3>
            <p><strong>古籍释义：</strong>舌为心之苗，苔乃脾之余气。察舌知病在脏腑。——《难经·五十六难》</p>
            <p><strong>现代解释：</strong>通过舌质与舌苔的颜色、形态判断体内寒热、虚实和脏腑功能状态。</p>
          </div>
        </div>

        <div v-if="activeType === '闻诊'" class="diagnostic-detail-content">
          <h2>闻诊 - 听嗅法</h2>
          <p class="intro-quote">“听其声音，察其臭气。” ——《素问·气厥论》</p>
          <div class="detail-section">
            <h3>听声音</h3>
            <ul>
              <li><strong>古籍：</strong>声高而有力者实，声低而无力者虚。——《难经·二十六难》</li>
              <li><strong>现代：</strong>声音的强弱可判断体质虚实，如咳嗽有力属实证，无力属虚证。</li>
              <li><strong>古籍：</strong>哮喘多由肺寒、肺热。——《素问·咳论》</li>
              <li><strong>现代：</strong>呼吸急促伴声音变化提示呼吸系统病变。</li>
            </ul>
          </div>
          <div class="detail-section">
            <h3>嗅气味</h3>
            <ul>
              <li><strong>古籍：</strong>肝病则口苦，心病则口甘，脾病则口淡，肺病则口腥，肾病则口咸。——《素问·异法方宜论》</li>
              <li><strong>现代：</strong>异常口气或体味常与脏腑功能失调相关，如糖尿病酮症可见口中异味。</li>
            </ul>
          </div>
        </div>

        <div v-if="activeType === '问诊'" class="diagnostic-detail-content">
          <h2>问诊 - 询问法</h2>
          <p class="intro-quote">“问其所苦，以知其因。” ——《素问·脉要精微论》</p>
          <div class="detail-section">
            <h3>十问歌（源自《景岳全书》）</h3>
            <ol>
              <li>一问寒热二问汗，三问头身四问便；</li>
              <li>五问饮食六问胸，七聋八渴俱当辨；</li>
              <li>九问旧病与家因，十问医曾何药见。</li>
            </ol>
            <p><strong>现代解释：</strong>十问法涵盖发热、排泄、饮食、疼痛、睡眠、听力、口渴等，是全面收集症状与生活史的方式。</p>
          </div>
        </div>

        <div v-if="activeType === '切诊'" class="diagnostic-detail-content">
          <h2>切诊 - 触摸法</h2>
          <p class="intro-quote">“按寸口以知五脏六腑之病。” ——《素问·脉要精微论》</p>
          <div class="detail-section">
            <h3>脉诊</h3>
            <p><strong>古籍释义：</strong>“脉有阴阳，浮沉迟数皆有所主。” ——《脉经》</p>
            <p><strong>现代解释：</strong>通过手指感触脉搏的强弱、快慢、深浅等特征判断病情。</p>
            <h4>常见脉象（据《濒湖脉学》）</h4>
            <ul>
              <li><strong>浮脉：</strong>主表证，多为外感或气虚。</li>
              <li><strong>沉脉：</strong>主里证，多与脏腑实热或寒凝有关。</li>
              <li><strong>迟脉：</strong>主寒证。</li>
              <li><strong>数脉：</strong>主热证。</li>
              <li><strong>虚脉：</strong>主气血不足。</li>
              <li><strong>实脉：</strong>主实邪壅盛。</li>
            </ul>
          </div>
          <div class="detail-section">
            <h3>按诊</h3>
            <p><strong>古籍释义：</strong>“寒热之分，按而知之。” ——《素问·诊要经终论》</p>
            <p><strong>现代解释：</strong>通过触摸皮肤温度、压痛反应、腹部弹性等手段进一步辅助诊断。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeType = ref('望诊')
const types = [
  { type: '望诊', icon: '👁️' },
  { type: '闻诊', icon: '👃' },
  { type: '问诊', icon: '💬' },
  { type: '切诊', icon: '👆' }
]

const goHome = () => {
  router.push('/main')
}
const goData = () => {
  router.push('/panel11')
}
</script>

<style scoped>
/* 你可以将原来的 style.css 和 diagnostic.css 合并进来，或用现有的类名保留原有样式 */
.container {
  /* width: 200vh;
  max-width: 960px;
  margin: auto; */
  padding: 20px;
}
.diagnostic-square-container {
  display: flex;
  gap: 20px;
  margin: 20px 0;
}

.diagnostic-square.active {
  border-color: #00aaff;
  background-color: #e0f7ff;
}
.diagnostic-detail-content {
  background: #111;
  color: #0ff;
  padding: 20px;
  border-radius: 8px;
  animation: fadeIn 0.5s ease forwards;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
}


.detail-section {
  margin-bottom: 16px;
  text-align: left;
}
.tongue-diagram img,
.pulse-diagram img {
  max-width: 100%;
  border-radius: 6px;
}
.container {
    width: 100%;
    height: 100%;
    background-color: #000; /* 改为纯黑 */
    color: #0ff;            /* 统一青绿色文字 */
    flex-direction: column;
    display: flex;
    overflow: hidden;
}

.content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.diagnostic-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 2rem;
}

.diagnostic-square-container {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 2rem;
}

.diagnostic-square {
    width: 180px;
    height: 180px;
    background-color: #111;
    border: 1px solid #0ff;
    color: #0ff;
    backdrop-filter: blur(5px);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.2);
}
/*滑动的*/
.diagnostic-square::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: #38bdf8;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
}

.diagnostic-square:hover {
    transform: translateY(-10px);
    background-color: #1a2a3a;
    box-shadow: 0 0 10px rgba(56, 189, 248, 0.4);
}

.diagnostic-square:hover::before {
    transform: scaleX(1);
}

.diagnostic-square.active {
  background-color: #002c3e;
  border-color: #0ff;
}

.diagnostic-square.active::before {
    transform: scaleX(1);
}

.square-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    transition: transform 0.3s ease;
}

.diagnostic-square:hover .square-icon {
    transform: scale(1.2);
}

.square-title {
    font-size: 1.5rem;
    font-weight: 500;
}
/* 外框 */
.diagnostic-detail {
  flex: 1;
  padding: 20px;
  border-radius: 8px;
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
  background-color: #111;
  border: 1px solid #0ff;
  color: #0ff;
}

.diagnostic-detail-content {
    /* display: none; */
    animation: fadeIn 0.5s ease forwards;
}

.diagnostic-detail-content.active {
    display: block;
}

.detail-section {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.detail-section h3 {
  color: #38bdf8;
    margin-bottom: 0.8rem;
    font-size: 1.3rem;
}

.detail-section h4 {
  color: #38bdf8;
    margin: 1rem 0 0.5rem;
    font-size: 1.1rem;
}

.detail-section p {
    line-height: 1.6;
    margin-bottom: 1rem;
}

.detail-section ul, 
.detail-section ol {
    padding-left: 1.5rem;
    margin-bottom: 1rem;
}

.detail-section li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
}

.tongue-diagram,
.pulse-diagram {
    margin: 1.5rem 0;
    text-align: center;
}

.tongue-diagram img,
.pulse-diagram img {
    max-width: 100%;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Microsoft YaHei', '微软雅黑', 'PingFang SC', 'Hiragino Sans GB', 'Heiti SC', sans-serif;
}

html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #0a0f1c;
  color: #e0f7ff;
}

@font-face {
  font-family: 'KaiTi';
  src: local('KaiTi'), local('楷体');
  font-weight: normal;
  font-style: normal;
}

h1, h2, h3 {
  font-family: 'KaiTi', '楷体', serif;
}

a {
  color: inherit;
  text-decoration: none;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}
/*滑动的*/
::-webkit-scrollbar-thumb {
  background: rgba(121, 195, 244, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(56, 189, 248, 0.8);
}
/* 返回按钮 */
.back-button {
  background-color: transparent;
  color: #79c3f4;
  border: 1px solid #79c3f4;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.back-button:hover {
  background-color: rgba(121, 195, 244, 0.1);
  box-shadow: 0 0 6px #79c3f4;
}

/* 数据分析按钮 */
.data-button {
  background-color: transparent;
  color: #79c3f4;
  border: 1px solid #79c3f4;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.data-button:hover {
  background-color: rgba(121, 195, 244, 0.1);
  box-shadow: 0 0 6px #79c3f4;
}

/* 页面标题区域 */
.header {
  position: relative;
  width: 100%;
  height: 60px;
  background: linear-gradient(to right, #000000, #001111, #000000);
  border-bottom: 2px solid #00ffff;
  box-shadow: 0 4px 10px rgba(0, 255, 255, 0.4);
  overflow: hidden;
  display: flex;
  justify-content: space-between; /* 修改为两端对齐 */
  align-items: center;
  padding: 0 20px; /* 添加内边距，避免内容紧贴边缘 */
}

/* 标题 */
.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-family: 'Microsoft YaHei', serif;
  font-size: 30px;
  color: #00ffff;
  letter-spacing: 3px;
  margin: 0;
  white-space: nowrap;
}


@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
} 
</style>
