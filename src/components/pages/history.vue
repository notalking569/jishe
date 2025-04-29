<template>
  <button class="back-btn" @click="router.push('/acupuncture')">
    返回
  </button>

  <div class="history-container">
    <!-- 标题栏 -->
    <header class="history-header">
      <h1 class="tech-main-title">川派针灸历史沿革</h1>
      <div class="tech-subtitle-line"></div>
    </header>

    <!-- 主内容区 -->
    <div class="main">
      <div class="nav-arrow up" id="up-btn" @click="slideToPrev">▲</div>
      <div class="nav-arrow down" id="down-btn" @click="slideToNext">▼</div>
      <div id="content">
        <div class="card">
          <div class="card-time">先秦时期</div>
          <div class="card-title">早期针灸起源</div>
          <div class="card-passage">
            巴蜀地区(今四川)的"巫医文化"开始萌芽，出现了原始的砭石疗法。
          </div>
        </div>
        <div class="card">
          <div class="card-time">汉唐时期</div>
          <div class="card-title">针灸理论奠基</div>
          <div class="card-passage">
            《黄帝内经》形成，巴蜀针灸开始形成独特流派，融合道家养生理念，形成了"动静结合"的针法特色。
          </div>
        </div>
        <div class="card">
          <div class="card-time">宋元时期</div>
          <div class="card-title">川派针灸成熟</div>
          <div class="card-passage">
            川派针灸逐渐成熟，出现铜人针灸经络图，巴蜀医家发展出"温针法"，适应川西高原与盆地湿热环境。
          </div>
        </div>
        <div class="card">
          <div class="card-time">明清时期</div>
          <div class="card-title">黄金发展时期</div>
          <div class="card-passage">
            川派针灸进入黄金时期，杨继洲的《针灸大成》集大成，川派医家发展"循经导引法"，形成独特风格。
          </div>
        </div>
        <div class="card">
          <div class="card-time">近现代</div>
          <div class="card-title">现代针灸创新</div>
          <div class="card-passage">
            成都中医药大学针灸学科形成，川派针灸融合现代医学，形成针灸麻醉等创新技术，走向世界。
          </div>
        </div>
      </div>

      <div id="clock">
        <div id="clock-center"></div>
        <div id="clock-pointer"></div>
        <div id="clock-table"></div>
      </div>
    </div>
  </div>

  <!-- 网格背景装饰 -->
  <div class="tech-grid-overlay"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 定义变量
let offset = 0;
let maxOffset = 0;
let minOffset = -4; // 一共5个卡片，从0开始，所以最小偏移为-4

// 向前切换卡片
function slideToPrev() {
  // 更新偏移量，取最大值
  offset = Math.min(maxOffset, offset + 1);
  const slides = Array.from(document.querySelectorAll(".card"));
  slides.forEach(slide => {
    // 根据偏移量设置卡片垂直偏移效果
    slide.style.transform = `translateY(${offset * 100}%)`;
  });

  // 调用旋转时钟表盘函数
  clockRotate(offset);

  // 更新当前时期高亮
  updateCurrentPeriod();
}

// 向后切换卡片
function slideToNext() {
  offset = Math.max(minOffset, offset - 1);
  const slides = Array.from(document.querySelectorAll(".card"));
  slides.forEach(slide => {
    slide.style.transform = `translateY(${offset * 100}%)`;
  });

  clockRotate(offset);

  // 更新当前时期高亮
  updateCurrentPeriod();
}

// 旋转时钟表盘
function clockRotate(index) {
  // 根据当前索引计算角度，从顶部12点位置开始（-90度），每个时期间隔72度
  const degree = -90 + (Math.abs(index) * 72);
  console.log("index = ", index, "degree = ", degree);

  const clock = document.querySelector("#clock-table");
  if (clock) {
    clock.style.transform = `rotate(${-degree}deg)`;
  }
}

// 添加时钟刻度
function addClockScale(degree) {
  const clock = document.querySelector("#clock-table");
  if (!clock) return;

  // 创建一个隐藏的表格元素
  const invisibleClockTable = document.createElement("div");
  // 添加类名
  invisibleClockTable.className = "invisible-table";
  // 设置旋转角度
  invisibleClockTable.style.transform = `rotate(${degree}deg)`;
  // 创建时钟刻度元素
  const clockScale = document.createElement("div");
  // 添加类名
  clockScale.className = "clock-scale";
  // 将时钟刻度元素添加到表格中
  invisibleClockTable.appendChild(clockScale);
  // 将表格添加到时钟表盘中
  clock.appendChild(invisibleClockTable);
}

// 添加粗刻度
function addThickClockScale(degree, time) {
  const clock = document.querySelector("#clock-table");
  if (!clock) return;

  // 创建一个隐藏的表格元素
  const invisibleClockTable = document.createElement("div");
  invisibleClockTable.className = "invisible-table";
  invisibleClockTable.style.transform = `rotate(${degree}deg)`;

  const thickClockScale = document.createElement("div");
  thickClockScale.className = "clock-thick";

  const scaleContent = document.createElement("span");
  scaleContent.textContent = `${time}`;

  // 添加一个额外的类来标识当前时期（先秦时期）
  if (time === "先秦时期") {
    thickClockScale.classList.add("current-period");
  }

  thickClockScale.appendChild(scaleContent);
  invisibleClockTable.appendChild(thickClockScale);
  clock.appendChild(invisibleClockTable);
}

// 更新当前时期的高亮显示
function updateCurrentPeriod() {
  // 获取所有粗刻度
  const thickScales = document.querySelectorAll(".clock-thick");

  // 移除所有current-period类
  thickScales.forEach(scale => {
    scale.classList.remove("current-period");
  });

  // 根据当前offset计算当前时期索引
  // offset为0时是先秦时期（第一个时期）
  // offset为-4时是近现代（最后一个时期）
  const currentPeriodIndex = Math.abs(offset);

  // 为当前时期添加current-period类
  if (thickScales[currentPeriodIndex]) {
    thickScales[currentPeriodIndex].classList.add("current-period");
  }
}

onMounted(() => {
  // 清空原有时钟表盘内容
  const clockTable = document.querySelector("#clock-table");
  if (clockTable) {
    clockTable.innerHTML = '';
  }

  // 设定历史时期，按照历史顺序排列（从先秦到近现代）
  const periods = ["先秦时期", "汉唐时期", "宋元时期", "明清时期", "近现代"];

  // 均匀分布时钟刻度：计算角度间隔（360度/5个时期 = 72度每个）
  const degreeInterval = 72;

  // 绘制时钟刻度和标签
  for (let i = 0; i < 5; i++) {
    // 主刻度，间隔72度，从顶部12点位置开始（-90度），顺时针旋转
    const degree = -90 + (i * degreeInterval);

    // 添加主刻度和时期标签
    addThickClockScale(degree, periods[i]);

    // 添加小刻度（每个主刻度之间添加4个小刻度）
    for (let j = 1; j < 5; j++) {
      addClockScale(degree + j * (degreeInterval / 5));
    }
  }

  // 初始化显示先秦时期（第一张卡片）
  offset = 0;
  clockRotate(0);

  // 设置卡片初始位置
  const slides = Array.from(document.querySelectorAll(".card"));
  slides.forEach(slide => {
    slide.style.transform = `translateY(${offset * 100}%)`;
  });

  // 初始化高亮当前时期
  updateCurrentPeriod();
});
</script>

<style lang="scss">
:root {
  --tech-primary: #00c8ff;
  /* 科技蓝 */
  --tech-secondary: #7045ff;
  /* 科技紫 */
  --tech-accent: #00ffaa;
  /* 科技青 */
  --tech-dark: #0a1218;
  /* 深背景色 */
  --tech-darker: #060d13;
  /* 更深的背景色 */
  --tech-light: #e9f9ff;
  /* 亮色文字 */
  --tech-panel-bg: rgba(16, 28, 41, 0.85);
  /* 面板背景 */
  --tech-glow: 0 0 10px rgba(0, 200, 255, 0.5);
  /* 发光效果 */
  --tech-gradient: linear-gradient(135deg,
      var(--tech-primary),
      var(--tech-secondary));
  /* 渐变色 */
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--tech-dark);
  color: var(--tech-light);
  font-family: "Helvetica Neue", "Arial", sans-serif;
}

.history-container {
  max-width: 1400px;
  margin: 70px auto 30px;
  padding: 0 20px;
}

.history-header {
  text-align: center;
  margin-bottom: 40px;
  position: relative;

  .tech-main-title {
    color: var(--tech-primary);
    font-size: 32px;
    margin: 0;
    letter-spacing: 2px;
    text-transform: uppercase;
    position: relative;
    display: inline-block;

    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      width: 30px;
      height: 2px;
      background: var(--tech-gradient);
      transform: translateY(-50%);
    }

    &:before {
      left: -50px;
    }

    &:after {
      right: -50px;
    }
  }

  .tech-subtitle-line {
    width: 150px;
    height: 2px;
    background: var(--tech-gradient);
    margin: 15px auto 0;
    position: relative;

    &:before,
    &:after {
      content: '';
      position: absolute;
      width: 6px;
      height: 6px;
      background: var(--tech-primary);
      border-radius: 50%;
      top: -2px;
    }

    &:before {
      left: 0;
    }

    &:after {
      right: 0;
    }
  }
}

.main {
  width: 100%;
  height: 80vh;
  display: flex;
  position: relative;
  background-color: var(--tech-dark);
  overflow: hidden;
}

.nav-arrow {
  width: 60px;
  height: 60px;
  position: absolute;
  left: 27%;
  z-index: 999;
  font-size: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--tech-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 50%;
  background: rgba(16, 28, 41, 0.5);
  box-shadow: 0 0 10px rgba(0, 200, 255, 0.3);
}

.nav-arrow:hover {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(0, 200, 255, 0.6);
}

.nav-arrow.up {
  top: 5%;
}

.nav-arrow.down {
  bottom: 5%;
}

#content {
  width: 30%;
  height: 100%;
  position: absolute;
  left: 15%;
  overflow: hidden;
}

.card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  transition: transform .8s ease-in-out, opacity .5s ease-in-out;
  padding: 0 15px 0 25px;
  position: relative;
  opacity: 1;
}

.card::after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 70%;
  background: var(--tech-gradient);
  box-shadow: var(--tech-glow);
}

.card-time {
  font-size: 40px;
  font-weight: 700;
  color: var(--tech-primary);
  text-shadow: 0 0 10px rgba(0, 200, 255, 0.5);
}

.card-title {
  font-size: 50px;
  font-weight: 500;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--tech-primary);
  margin-bottom: 10px;
}

.card-passage {
  font-size: 24px;
  font-weight: 300;
  line-height: 1.6;
}

#clock {
  height: 130%;
  /* 纵横比为1:1 */
  aspect-ratio: 1 / 1;
  position: absolute;
  right: -28%;
  top: -15%;
  border-radius: 50%;
  background-color: rgba(16, 28, 41, 0.6);
  border: var(--tech-primary) 4px solid;
  box-shadow: var(--tech-glow);
  animation: pulse-glow 4s infinite alternate;
  backdrop-filter: blur(5px);
}

#clock-center {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--tech-primary);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 15px rgba(0, 200, 255, 0.8);
  z-index: 2;
  animation: pulse-center 2s infinite alternate;
}

@keyframes pulse-glow {
  0% {
    box-shadow: 0 0 10px rgba(0, 200, 255, 0.3);
  }

  100% {
    box-shadow: 0 0 25px rgba(0, 200, 255, 0.8);
  }
}

@keyframes pulse-center {
  0% {
    box-shadow: 0 0 8px var(--tech-primary);
    background: rgba(0, 200, 255, 0.8);
  }

  100% {
    box-shadow: 0 0 20px var(--tech-primary);
    background: rgba(0, 200, 255, 1);
  }
}

@media(max-width:1000px) {
  #clock {
    right: -90%;
  }
}

#clock-table {
  width: 96%;
  height: 96%;
  border-radius: 50%;
  position: absolute;
  top: 2%;
  left: 2%;
  transition: transform .8s ease-in-out;
}

.invisible-table {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform-origin: 50% 50%;
  position: absolute;
}

.clock-thick {
  width: 12%;
  height: 4px;
  background-color: var(--tech-primary);
  position: absolute;
  top: calc(50% - 2px);
  left: 0px;
  box-shadow: var(--tech-glow);
}

.clock-thick span {
  position: absolute;
  font-size: 28px;
  color: var(--tech-primary);
  text-shadow: 0 0 8px rgba(0, 200, 255, 0.8);
  font-weight: 700;
  white-space: nowrap;
  left: 110%;
  top: 50%;
  transform: translateY(-50%);
}

.clock-scale {
  width: 6%;
  height: 1px;
  background-color: var(--tech-primary);
  opacity: 0.6;
  position: absolute;
  top: calc(50% - 0.5px);
  left: 0px;
}

.clock-thick.current-period {
  width: 15%;
  height: 6px;
  background-color: var(--tech-accent);
  box-shadow: 0 0 15px var(--tech-accent);
}

.clock-thick.current-period span {
  color: var(--tech-accent);
  text-shadow: 0 0 10px var(--tech-accent);
  font-size: 32px;
}

/* 返回按钮 */
.back-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  background: var(--tech-panel-bg);
  color: var(--tech-primary);
  padding: 10px 15px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(0, 200, 255, 0.3);
  box-shadow: 0 0 10px rgba(0, 200, 255, 0.2);

  &:hover {
    background: rgba(0, 200, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(0, 200, 255, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 900px) {
  #content {
    width: 50%;
    left: 5%;
  }

  .nav-arrow {
    left: 60%;
  }

  .history-header .tech-main-title {
    font-size: 24px;

    &:before,
    &:after {
      width: 20px;
    }

    &:before {
      left: -30px;
    }

    &:after {
      right: -30px;
    }
  }

  .card-time {
    font-size: 30px;
  }

  .card-title {
    font-size: 36px;
  }

  .card-passage {
    font-size: 18px;
  }

  .instruction-text {
    left: 60%;
  }
}

/* 科技风格网格背景 */
.tech-grid-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 200, 255, 0.05) 1px,
      transparent 1px),
    linear-gradient(90deg, rgba(0, 200, 255, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  z-index: -1;
}

.instruction-text {
  position: absolute;
  left: 27%;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(0, 200, 255, 0.6);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: 14px;
  letter-spacing: 2px;
  z-index: 10;
}
</style>