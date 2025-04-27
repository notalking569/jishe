<template>
  <div class="main-page">
    <!-- 背景粒子效果 -->
    <div class="particle-background" ref="particleBackground"></div>
    <div class="five-elements-timeline">
  <div v-for="(item, index) in fiveElementTimeline" :key="index" class="timeline-item">
    <div class="timeline-dot" :style="{ backgroundColor: item.color }"></div>
    <div class="timeline-content">
      <h4>{{ item.period }}</h4>
      <p>{{ item.content }}</p>
    </div>
  </div>
</div>
    <!-- 经络线装饰 -->
    <div class="meridian-lines">
      <div v-for="i in 8" :key="i" :class="`meridian-line line-${i}`"></div>
    </div>
  <!-- 四张中医相关图片（装饰图） -->
  <div class="top-banner">
    <!-- <div class="banner-frame">
        替换图片为图表容器 -->
        <!-- <div id="flavorChart" style="width: 120px; height: 120px" ></div>
        <div id="elementChart" style="width: 120px; height: 120px" ></div>
        <div id="seasonChart" style="width: 120px; height: 120px" ></div>
        <div id="organChart" style="width: 120px; height: 120px" ></div>
        <div id="toneChart" style="width: 120px; height: 120px" ></div>
      </div> -->
<!-- 五行元素动画跳转按钮 -->
<!-- 右上角：进入五行动画按钮 -->
<button class="top-wuxing-button" @click="navigateTo('zangxiang')">
  五行动画
</button>
<button class="top-jingyue-button" @click="navigateTo('diagnosis')">
  景岳十问
</button>
<!-- <button class="top-test-button" @click="navigateTo('test')">
  测试
</button> -->


</div>
<!-- 放大图层（点击图片后出现） -->
<div v-if="activeImage" class="image-viewer" @click="closeImage">
  <img :src="activeImage" class="viewer-image" />
</div>
<!-- 右上角按钮 -->
<button class="top-right-button" @click="router.push('/')">
  返回首页
</button>
<!-- 介绍文字区 -->
<div class="section-intro">
  <h2><span class="highlight-title">中医三宝，共筑岐黄大智</span></h2>
  <p>中草药以植物之力调和阴阳，针灸疏通经络以助气血，望闻问切则从整体出发辨证论治。这三大体系共同构建了中医的智慧与实用，体现“未病先防，已病防变”的核心理念。</p>
</div>

    <!-- 导航中枢 - 中央五行能量立方体 -->
    <div class="cube-container">
      <div class="cube-glow"></div>
      <div class="cube" ref="cube">
        <div class="cube-face front" @click="navigateTo('zcy')">
          <span>中草药</span>
        </div>
        <div class="cube-face back" @click="navigateTo('pin')">
          <span>针灸</span>
        </div>
        <div class="cube-face right" @click="navigateTo('data')">
          <span>望闻问切</span>
        </div>
        <div class="cube-face left" @click="navigateTo('schools')">
          <span>人物流派</span>
        </div>
      </div>
      <div class="right-panel">
              <!-- 中医名言滚动区域 -->
<!-- 修改后 -->
<div class="quote-marquee-right">
<h2>《黄帝内经·素问》</h2>
        <transition-group name="fade" tag="div" class="quote-list">
        <div v-for="(quote, index) in displayedQuotes" :key="index" class="quote-item">
          {{ quote }}
        </div>
      </transition-group>
    </div>
    </div>

    </div>

    <!-- 装饰性中医图谱 -->
    <div class="tcm-diagrams">
      <div class="diagram-acupoints"></div>
      <div class="diagram-herbs"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { gsap } from 'gsap';
import * as echarts from 'echarts';
import 'echarts-wordcloud'; // 导入词云扩展
import { useRouter } from 'vue-router';
const activeImage = ref(null)

const showImage = (src) => {
  activeImage.value = src
}

const closeImage = () => {
  activeImage.value = null
}
// 引用元素
const cube = ref(null);
const herbsChart = ref(null);
const wordcloudContainer = ref(null);
const particleBackground = ref(null);
const schoolsChart = ref(null);
const herbsRadarChart = ref(null);
const router = useRouter(); // 获取路由实例

// 立方体动画相关变量
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let rotationSpeed = { x: 0, y: 0 };
let rotateInterval;

// 背景粒子系统相关变量
let bgScene, bgCamera, bgRenderer, bgParticles;
let bgAnimationFrameId = null;
const goToHerbalPage = () => {
  window.location.href = '/herbal.html';
};
const fiveElementTimeline = ref([
  {
    period: '战国时期',
    content: '五行萌芽，始用于解释天地自然变化，哲学框架初成，奠定中医宇宙观基础。',
    color: '#66cc66' // 木：生发之始
  },
  {
    period: '秦汉时期',
    content: '五行首次与脏腑系统融合，构建“木肝火心土脾金肺水肾”之体系，中医理论雏形确立。',
    color: '#ff6666' // 火：融合之盛
  },
  {
    period: '唐代',
    content: '五行对应七情六欲，创立“情志致病”理论，身心一体思想首次系统化，医学进入人文关怀时代。',
    color: '#cccc66' // 土：内外兼顾
  },
  {
    period: '宋代',
    content: '五德合一，五行延展为五常（仁义礼智信），医学与伦理哲学深度交融，开启思辨与和合之道。',
    color: '#cccccc' // 金：精炼升华
  },
  {
    period: '明清时期',
    content: '五行与八纲辨证互参，治疗系统愈加完整，理论走向高度成熟，预防、调养、治未病思想成型。',
    color: '#66cccc' // 水：沉静而深远
  }
])


const goToPulsePage = () => {
  window.location.href = '/pulse.html';
};
const famousQuotes = [
  // 金 - 肺
  "肺之合皮也，其荣毛也，其主心也。", // 《五藏生成篇第十》
  "多食辛则筋急而爪枯。", // 《五藏生成篇第十》
  "诸气者皆属于肺。", // 《五藏生成篇第十》
  "肺主皮毛，开窍于鼻。", // 《五藏生成篇第十》
  "肺主一身之气，气化则能行水。", // 《五藏生成篇第十》
  "肺为水之上源。", // 《五藏生成篇第十》
  "肺主皮毛，开窍于鼻。", // 《五藏生成篇第十》
  "肺朝百脉，主治节。", // 《五藏生成篇第十》
  "肺主宣发肃降，宣发则气化，肃降则水行。", // 《五藏生成篇第十》
  "肺为气之主，肾为气之根。", // 《五藏生成篇第十》

  // 木 - 肝
  "肝之合筋也，其荣爪也，其主肺也。", // 《五藏生成篇第十》
  "多食酸则肉胝而唇揭。", // 《五藏生成篇第十》
  "肝藏血，血舍魂。", // 《五藏生成篇第十》
  "肝主筋，其华在爪。", // 《五藏生成篇第十》
  "肝为将军之官，谋虑出焉。", // 《灵兰秘典论》
  "肝与胆相表里，胆为中正之官，决断出焉。", // 《灵兰秘典论》
  "肝主升，肺主降，一升一降，阴阳自和。", // 《玉机真藏论篇第十九》
  "肝藏血，心行之，人动则血运于诸经，人静则血归于肝脏。", // 《五藏生成篇第十》
  "肝为木，木生火，肝气足则心火旺。", // 《五藏生成篇第十》
  "肝主藏血，心主用血，肝藏血而心用之。", // 《五藏生成篇第十》

  // 水 - 肾
  "肾之合骨也，其荣发也，其主脾也。", // 《五藏生成篇第十》
  "多食咸则脉凝泣而变色。", // 《五藏生成篇第十》
  "肾藏精，精生髓，髓养脑。", // 《五藏生成篇第十》
  "肾为先天之本，主生长、发育、生殖。", // 《五藏生成篇第十》
  "肾主水，司二便。", // 《五藏生成篇第十》
  "肾为封藏之本，精之处也。", // 《五藏生成篇第十》
  "肾主骨，其华在发。", // 《五藏生成篇第十》
  "肾为水脏，主藏精，精足则肾气旺。", // 《五藏生成篇第十》
  "肾为气之根，主纳气。", // 《五藏生成篇第十》
  "肾为先天之本，脾为后天之本，先天不足，后天补之。", // 《五藏生成篇第十》

  // 火 - 心
  "心之合脉也，其荣色也，其主肾也。", // 《五藏生成篇第十》
  "多食苦则皮槁而毛拔。", // 《五藏生成篇第十》
  "心主血脉，其华在面。", // 《五藏生成篇第十》
  "心主神明，神明则心安。", // 《五藏生成篇第十》
  "心为火脏，主神明，神明则心安。", // 《五藏生成篇第十》
  "心主血脉，肺主气，气血相依。", // 《五藏生成篇第十》
  "心为君主之官，神明出焉，主不明则十二官危。", // 《灵兰秘典论》
  "心主神明，神明则心安，心安则神明。", // 《五藏生成篇第十》
  "心为火脏，主神明，神明则心安。", // 《五藏生成篇第十》
  "心主血脉，其华在面，开窍于舌。", // 《五藏生成篇第十》

  // 土 - 脾胃
  "脾之合肉也，其荣唇也，其主肝也。", // 《五藏生成篇第十》
  "多食甘则骨痛而发落。", // 《五藏生成篇第十》
  "脾胃为后天之本，气血生化之源。", // 《五藏生成篇第十》
  "脾主运化，胃主受纳。", // 《五藏生成篇第十》
  "脾胃为仓廪之官，五味出焉。", // 《五藏生成篇第十》
  "脾主升清，胃主降浊。", // 《五藏生成篇第十》
  "脾胃为后天之本，气血生化之源。", // 《五藏生成篇第十》
  "脾主运化，胃主受纳，一升一降，阴阳自和。", // 《五藏生成篇第十》
  "脾胃为仓廪之官，五味出焉。", // 《五藏生成篇第十》
  "脾主升清，胃主降浊，一升一降，阴阳自和。", // 《五藏生成篇第十》
];
const displayedQuotes = ref([])
let currentQuoteIndex = 0
let quoteInterval = null
/*展示条数*/
const cycleQuotes = () => {
  displayedQuotes.value = famousQuotes.slice(0, 11)
  quoteInterval = setInterval(() => {
    currentQuoteIndex = (currentQuoteIndex + 1) % famousQuotes.length
    displayedQuotes.value = []
    for (let i = 0; i < 11; i++) {
      const idx = (currentQuoteIndex + i) % famousQuotes.length
      displayedQuotes.value.push(famousQuotes[idx])
    }
  }, 4000)
}


// 导航到特定部分
const navigateTo = (module) => {
  console.log('Navigating to:', module);
  switch(module) {
    case 'zangxiang':
      router.push('/zangxiang');
      break;
    case 'diagnosis':
      router.push('/diagnosis');
      break;
    case 'herbs':
      router.push('/herbs');
      break;
    case 'schools':
      router.push('/schools');
      break;
    case 'test':
       router.push('/test');
       break;
    case 'pin':
      router.push('/acupuncture');
      break;
    case 'pulse':
      router.push('/pulse');
      break;
    case 'zcy':
      router.push('/zcy');
      break;
    case 'data':
      router.push('/data');
      break;
    case 'panel1':
      router.push('/panel11');
      break;
    default:
      console.log('Unknown module:', module);
  }
};

// 初始化背景粒子系统
const initBackgroundParticles = () => {
  bgScene = new THREE.Scene();
  
  bgCamera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
  );
  bgCamera.position.z = 5;
  
  bgRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  bgRenderer.setSize(window.innerWidth, window.innerHeight);
  bgRenderer.setPixelRatio(window.devicePixelRatio);
  bgRenderer.setClearColor(0x000000, 0);
  particleBackground.value.appendChild(bgRenderer.domElement);
  
  // 创建粒子系统
  createBackgroundParticles();
  
  // 开始动画循环
  animateBackground();
  
  // 窗口大小变化时调整画布大小
  window.addEventListener('resize', onBgWindowResize);
};

// 创建背景粒子
const createBackgroundParticles = () => {
  const particleCount = 300;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);
  
  const geometry = new THREE.BufferGeometry();
  
  // 生成随机的粒子位置和颜色
  for (let i = 0; i < particleCount; i++) {
    // 位置 - 分散在整个场景中
    const x = (Math.random() - 0.5) * 20;
    const y = (Math.random() - 0.5) * 20;
    const z = (Math.random() - 0.5) * 10 - 5; // 让粒子在相机后面
    
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    
    // 颜色 - 冷蓝和青色调
    const r = 0.1 + Math.random() * 0.2;
    const g = 0.4 + Math.random() * 0.3;
    const b = 0.7 + Math.random() * 0.3;
    
    colors[i * 3] = r;
    colors[i * 3 + 1] = g;
    colors[i * 3 + 2] = b;
    
    // 大小 - 变化的粒子大小
    sizes[i] = 0.05 + Math.random() * 0.15;
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  
  const material = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true
  });
  
  bgParticles = new THREE.Points(geometry, material);
  bgScene.add(bgParticles);
};

// 背景窗口大小改变事件处理
const onBgWindowResize = () => {
  bgCamera.aspect = window.innerWidth / window.innerHeight;
  bgCamera.updateProjectionMatrix();
  bgRenderer.setSize(window.innerWidth, window.innerHeight);
};

// 背景动画循环
const animateBackground = () => {
  bgAnimationFrameId = requestAnimationFrame(animateBackground);
  
  // 旋转粒子
  bgParticles.rotation.x += 0.0002;
  bgParticles.rotation.y += 0.0003;
  
  // 更新粒子位置，创建流动效果
  const positions = bgParticles.geometry.attributes.position.array;
  
  for (let i = 0; i < positions.length; i += 3) {
    // 光轨流动效果
    positions[i] += Math.sin(Date.now() * 0.0001 + positions[i + 1] * 0.05) * 0.001;
    positions[i + 1] += Math.cos(Date.now() * 0.0001 + positions[i] * 0.05) * 0.001;
  }
  
  bgParticles.geometry.attributes.position.needsUpdate = true;
  
  bgRenderer.render(bgScene, bgCamera);
};

// 初始化立方体旋转
const initCubeRotation = () => {
  document.addEventListener('mousedown', startDragging);
  document.addEventListener('mousemove', dragCube);
  document.addEventListener('mouseup', stopDragging);
  
  // 添加触摸事件支持
  document.addEventListener('touchstart', handleTouchStart);
  document.addEventListener('touchmove', handleTouchMove);
  document.addEventListener('touchend', handleTouchEnd);
  
  // 自动缓慢旋转
  rotateInterval = setInterval(() => {
    if (!isDragging) {
      cube.value.style.transform = `${cube.value.style.transform} rotateY(${0.2}deg) rotateX(${0.1}deg)`;
    }
  }, 50);
};

// 拖动事件处理
const startDragging = (e) => {
  isDragging = true;
  previousMousePosition = {
    x: e.clientX,
    y: e.clientY
  };
};

const dragCube = (e) => {
  if (!isDragging) return;
  
  const deltaMove = {
    x: e.clientX - previousMousePosition.x,
    y: e.clientY - previousMousePosition.y
  };
  
  rotationSpeed = {
    x: deltaMove.y * 0.5,
    y: deltaMove.x * 0.5
  };
  
  const currentTransform = cube.value.style.transform || 'rotateX(0deg) rotateY(0deg)';
  cube.value.style.transform = `${currentTransform} rotateX(${rotationSpeed.x}deg) rotateY(${rotationSpeed.y}deg)`;
  
  previousMousePosition = {
    x: e.clientX,
    y: e.clientY
  };
};

const stopDragging = () => {
  isDragging = false;
};

// 触摸事件处理
const handleTouchStart = (e) => {
  e.preventDefault();
  if (e.touches.length === 1) {
    isDragging = true;
    previousMousePosition = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  }
};

const handleTouchMove = (e) => {
  e.preventDefault();
  if (isDragging && e.touches.length === 1) {
    dragCube({
      clientX: e.touches[0].clientX,
      clientY: e.touches[0].clientY
    });
  }
};

const handleTouchEnd = (e) => {
  e.preventDefault();
  isDragging = false;
};

// 初始化本草药材图表
const initHerbsChart = () => {
  const chart = echarts.init(herbsChart.value);
  
  // 历史朝代数据
  const dynasties = ['战国', '秦汉', '三国', '晋', '南北朝', '隋唐', '宋', '元', '明', '清', '民国'];
  
  // 模拟药材数量数据
  const herbsCount = [365, 720, 850, 920, 1100, 1500, 1800, 2200, 3000, 3500, 4000];
  
  const option = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    textStyle: {
      color: 'rgba(0, 200, 255, 0.8)'
    },
    grid: {
      left: '5%',
      right: '5%',
      top: '10%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: dynasties,
      axisLine: {
        lineStyle: {
          color: 'rgba(0, 200, 255, 0.5)'
        }
      },
      axisLabel: {
        rotate: 45,
        color: 'rgba(0, 200, 255, 0.8)'
      }
    },
    yAxis: {
      type: 'value',
      name: '药材数量',
      nameTextStyle: {
        color: 'rgba(0, 200, 255, 0.8)'
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(0, 200, 255, 0.5)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 200, 255, 0.1)'
        }
      },
      axisLabel: {
        color: 'rgba(0, 200, 255, 0.8)'
      }
    },
    series: [
      {
        data: herbsCount,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 12,
        itemStyle: {
          color: '#00BFFF'
        },
        lineStyle: {
          width: 3,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#00BFFF' },
              { offset: 1, color: '#7FFFD4' }
            ]
          }
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 191, 255, 0.5)' },
              { offset: 1, color: 'rgba(0, 191, 255, 0)' }
            ]
          }
        }
      }
    ],
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: {c} 种药材',
      backgroundColor: 'rgba(0, 15, 50, 0.7)',
      borderColor: 'rgba(0, 200, 255, 0.5)',
      textStyle: {
        color: 'rgba(0, 200, 255, 1)'
      }
    },
    animation: true,
    animationDuration: 2000,
    animationEasing: 'cubicOut'
  };
  
  chart.setOption(option);
  
  // 响应窗口大小变化
  window.addEventListener('resize', () => {
    chart.resize();
  });
};

// 初始化词云
const initWordCloud = () => {
  const chart = echarts.init(wordcloudContainer.value);
  
  // 模拟《黄帝内经》高频术语数据
  const data = [
    { name: '阴阳', value: 150 },
    { name: '五行', value: 120 },
    { name: '气血', value: 100 },
    { name: '经络', value: 90 },
    { name: '脏腑', value: 85 },
    { name: '津液', value: 80 },
    { name: '寒热', value: 75 },
    { name: '表里', value: 70 },
    { name: '虚实', value: 65 },
    { name: '气机', value: 60 },
    { name: '神明', value: 55 },
    { name: '脉象', value: 50 },
    { name: '生化', value: 45 },
    { name: '营卫', value: 40 },
    { name: '藏象', value: 35 },
    { name: '精气', value: 30 },
    { name: '精神', value: 25 },
    { name: '元气', value: 20 },
    { name: '病机', value: 18 },
    { name: '阴阳平衡', value: 15 }
  ];
  
  const option = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    series: [{
      type: 'wordCloud',
      shape: 'circle',
      left: 'center',
      top: 'center',
      width: '90%',
      height: '90%',
      right: null,
      bottom: null,
      sizeRange: [14, 60],
      rotationRange: [-45, 45],
      rotationStep: 15,
      gridSize: 8,
      drawOutOfBound: false,
      textStyle: {
        fontFamily: 'FangSong, SimSun, serif',
        fontWeight: 'bold',
        color: function () {
          // 随机生成蓝色系的颜色
          return 'rgb(' + 
            Math.round(Math.random() * 50) + ',' + 
            Math.round(Math.random() * 150 + 100) + ',' + 
            Math.round(Math.random() * 100 + 155) + ')';
        }
      },
      emphasis: {
        textStyle: {
          color: '#00FFFF',
          shadowBlur: 10,
          shadowColor: 'rgba(0, 255, 255, 0.5)'
        }
      },
      data: data
    }],
    animation: true,
    animationDuration: 2000,
    animationEasing: 'cubicOut'
  };
  
  chart.setOption(option);
  
  // 响应窗口大小变化
  window.addEventListener('resize', () => {
    chart.resize();
  });
};

// 初始化经络线动画
const initMeridianLines = () => {
  const lines = document.querySelectorAll('.meridian-line');
  
  lines.forEach((line, index) => {
    // 使用GSAP为每条线添加不同的动画
    gsap.to(line, {
      backgroundPosition: '200% 0',
      duration: 15 + index * 2,
      ease: 'linear',
      repeat: -1
    });
  });
};

// 初始化中医符号动画
const initSymbols = () => {
  const symbols = document.querySelectorAll('.symbol');
  
  symbols.forEach((symbol, index) => {
    // 初始化符号位置
    gsap.set(symbol, {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      opacity: 0.5 + Math.random() * 0.5,
      scale: 0.5 + Math.random() * 1
    });
    
    // 添加漂浮动画
    gsap.to(symbol, {
      y: `-=${20 + Math.random() * 50}`,
      x: `+=${Math.random() * 20 - 10}`,
      opacity: 0.7 + Math.random() * 0.3,
      duration: 5 + Math.random() * 5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: Math.random() * 2
    });
    
    // 添加旋转动画给一些符号
    if (index % 2 === 0) {
      gsap.to(symbol, {
        rotation: 360,
        duration: 20 + Math.random() * 10,
        ease: 'linear',
        repeat: -1
      });
    }
  });
};

// 初始化装饰图谱
const initDiagrams = () => {
  // 针灸穴位图加载
  const acupointsElement = document.querySelector('.diagram-acupoints');
  acupointsElement.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\' viewBox=\'0 0 200 200\'%3E%3Cpath d=\'M100,20 C140,20 170,50 170,100 C170,150 140,180 100,180 C60,180 30,150 30,100 C30,50 60,20 100,20 Z\' fill=\'none\' stroke=\'rgba(0,200,255,0.3)\' stroke-width=\'1\'/%3E%3Ccircle cx=\'100\' cy=\'60\' r=\'2\' fill=\'rgba(0,255,255,0.7)\'/%3E%3Ccircle cx=\'130\' cy=\'80\' r=\'2\' fill=\'rgba(0,255,255,0.7)\'/%3E%3Ccircle cx=\'80\' cy=\'100\' r=\'2\' fill=\'rgba(0,255,255,0.7)\'/%3E%3Ccircle cx=\'110\' cy=\'120\' r=\'2\' fill=\'rgba(0,255,255,0.7)\'/%3E%3Ccircle cx=\'70\' cy=\'140\' r=\'2\' fill=\'rgba(0,255,255,0.7)\'/%3E%3Cpath d=\'M50,80 Q100,40 150,80\' fill=\'none\' stroke=\'rgba(0,200,255,0.2)\' stroke-width=\'1\' stroke-dasharray=\'3,3\'/%3E%3Cpath d=\'M50,120 Q100,160 150,120\' fill=\'none\' stroke=\'rgba(0,200,255,0.2)\' stroke-width=\'1\' stroke-dasharray=\'3,3\'/%3E%3C/svg%3E")';
  
  // 药草图案加载
  const herbsElement = document.querySelector('.diagram-herbs');
  herbsElement.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\' viewBox=\'0 0 200 200\'%3E%3Cpath d=\'M100,40 Q120,20 140,40 T180,60 Q200,80 180,100 T140,140 Q120,160 100,140 T60,100 Q40,80 60,60 T100,40 Z\' fill=\'none\' stroke=\'rgba(0,255,150,0.3)\' stroke-width=\'1\'/%3E%3Cpath d=\'M100,50 L100,130\' stroke=\'rgba(0,255,150,0.4)\' stroke-width=\'1\'/%3E%3Cpath d=\'M80,70 Q100,60 120,70\' fill=\'none\' stroke=\'rgba(0,255,150,0.4)\' stroke-width=\'1\'/%3E%3Cpath d=\'M75,90 Q100,80 125,90\' fill=\'none\' stroke=\'rgba(0,255,150,0.4)\' stroke-width=\'1\'/%3E%3Cpath d=\'M70,110 Q100,100 130,110\' fill=\'none\' stroke=\'rgba(0,255,150,0.4)\' stroke-width=\'1\'/%3E%3C/svg%3E")';
  
  // 添加动画
  gsap.to('.diagram-acupoints', {
    rotation: 360,
    duration: 120,
    ease: 'linear',
    repeat: -1,
    transformOrigin: 'center center'
  });
  
  gsap.to('.diagram-herbs', {
    rotation: -360,
    duration: 150,
    ease: 'linear',
    repeat: -1,
    transformOrigin: 'center center'
  });
};

// 初始化经络循环图和五行平衡图动画
const initCustomDiagrams = () => {
  // 经络循环图动画
  const meridianPoints = document.querySelectorAll('.meridian-point');
  meridianPoints.forEach((point, index) => {
    // 点的闪烁动画
    gsap.to(point, {
      opacity: 0.2,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      delay: index * 0.3,
      ease: "sine.inOut"
    });
  });
  
  // 连接线动画
  gsap.to('.meridian-connection', {
    backgroundPosition: '200% 0',
    duration: 10,
    repeat: -1,
    ease: "linear"
  });
  
  // 轨道旋转
  gsap.to('.meridian-orbit', {
    rotation: 360,
    duration: 40,
    repeat: -1,
    ease: "linear",
    transformOrigin: 'center center'
  });
  
  // 五行元素动画
  const elementNodes = document.querySelectorAll('.element-node');
  elementNodes.forEach((node, index) => {
    // 元素的脉动动画
    gsap.to(node, {
      scale: 1.1,
      boxShadow: '0 0 15px rgba(0, 200, 255, 0.7)',
      duration: 1.5 + index * 0.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: index * 0.4
    });
  });
  
  // 中心元素动画
  gsap.to('.element-center', {
    rotation: -360,
    duration: 30,
    repeat: -1,
    ease: "linear",
    transformOrigin: 'center center'
  });
  
  // 元素连接动画
  gsap.to('.element-connections', {
    opacity: 0.5,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
};

// 初始化中医理论流派分布图表
const initSchoolsChart = () => {
  const chart = echarts.init(schoolsChart.value);
  
  const option = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    textStyle: {
      color: 'rgba(0, 200, 255, 0.8)'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
      backgroundColor: 'rgba(0, 15, 50, 0.7)',
      borderColor: 'rgba(0, 200, 255, 0.5)',
      textStyle: {
        color: 'rgba(0, 200, 255, 1)'
      }
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: 'rgba(0, 200, 255, 0.8)',
        fontSize: 10
      },
      data: ['经方学派', '温病学派', '伤寒学派', '汤液学派', '针灸学派', '综合学派']
    },
    series: [
      {
        name: '理论流派',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderColor: 'rgba(0, 0, 0, 0.3)',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '12',
            fontWeight: 'bold',
            color: 'rgba(0, 200, 255, 1)'
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 150, 255, 0.5)'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 35, name: '经方学派', itemStyle: { color: 'rgba(0, 120, 215, 0.8)' } },
          { value: 25, name: '温病学派', itemStyle: { color: 'rgba(0, 180, 180, 0.8)' } },
          { value: 20, name: '伤寒学派', itemStyle: { color: 'rgba(70, 130, 180, 0.8)' } },
          { value: 15, name: '汤液学派', itemStyle: { color: 'rgba(70, 200, 230, 0.8)' } },
          { value: 10, name: '针灸学派', itemStyle: { color: 'rgba(30, 160, 255, 0.8)' } },
          { value: 5, name: '综合学派', itemStyle: { color: 'rgba(0, 255, 255, 0.8)' } }
        ],
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200;
        }
      }
    ]
  };
  
  chart.setOption(option);
  
  // 响应窗口大小变化
  window.addEventListener('resize', () => {
    chart.resize();
  });
};

// 初始化药材功效雷达图
const initHerbsRadarChart = () => {
  const chart = echarts.init(herbsRadarChart.value);
  
  const option = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    textStyle: {
      color: 'rgba(0, 200, 255, 0.8)'
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0, 15, 50, 0.7)',
      borderColor: 'rgba(0, 200, 255, 0.5)',
      textStyle: {
        color: 'rgba(0, 200, 255, 1)'
      }
    },
    legend: {
      data: ['人参', '黄芪', '当归', '川芎', '甘草'],
      textStyle: {
        color: 'rgba(0, 200, 255, 0.8)',
        fontSize: 10
      },
      right: 0,
      top: 0
    },
    radar: {
      shape: 'circle',
      radius: '65%',
      center: ['50%', '55%'],
      indicator: [
        { name: '补气', max: 100 },
        { name: '补血', max: 100 },
        { name: '安神', max: 100 },
        { name: '清热', max: 100 },
        { name: '祛湿', max: 100 },
        { name: '活血化瘀', max: 100 }
      ],
      axisName: {
        color: 'rgba(0, 200, 255, 0.8)',
        fontSize: 10
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(0, 50, 100, 0.1)', 'rgba(0, 60, 120, 0.1)'],
          shadowColor: 'rgba(0, 200, 255, 0.1)',
          shadowBlur: 10
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(0, 200, 255, 0.2)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 200, 255, 0.3)'
        }
      }
    },
    series: [{
      name: '药材功效对比',
      type: 'radar',
      emphasis: {
        lineStyle: {
          width: 4
        }
      },
      data: [
        {
          value: [90, 30, 60, 10, 20, 40],
          name: '人参',
          areaStyle: {
            color: 'rgba(0, 120, 215, 0.3)'
          },
          lineStyle: {
            color: 'rgba(0, 120, 215, 0.8)'
          },
          itemStyle: {
            color: 'rgba(0, 120, 215, 0.8)'
          }
        },
        {
          value: [85, 50, 30, 20, 40, 30],
          name: '黄芪',
          areaStyle: {
            color: 'rgba(0, 180, 180, 0.3)'
          },
          lineStyle: {
            color: 'rgba(0, 180, 180, 0.8)'
          },
          itemStyle: {
            color: 'rgba(0, 180, 180, 0.8)'
          }
        },
        {
          value: [20, 90, 40, 30, 20, 70],
          name: '当归',
          areaStyle: {
            color: 'rgba(70, 130, 180, 0.3)'
          },
          lineStyle: {
            color: 'rgba(70, 130, 180, 0.8)'
          },
          itemStyle: {
            color: 'rgba(70, 130, 180, 0.8)'
          }
        },
        {
          value: [30, 60, 20, 40, 30, 85],
          name: '川芎',
          areaStyle: {
            color: 'rgba(70, 200, 230, 0.3)'
          },
          lineStyle: {
            color: 'rgba(70, 200, 230, 0.8)'
          },
          itemStyle: {
            color: 'rgba(70, 200, 230, 0.8)'
          }
        },
        {
          value: [60, 40, 50, 70, 50, 30],
          name: '甘草',
          areaStyle: {
            color: 'rgba(30, 160, 255, 0.3)'
          },
          lineStyle: {
            color: 'rgba(30, 160, 255, 0.8)'
          },
          itemStyle: {
            color: 'rgba(30, 160, 255, 0.8)'
          }
        }
      ]
    }]
  };
  
  chart.setOption(option);
  
  // 响应窗口大小变化
  window.addEventListener('resize', () => {
    chart.resize();
  });
};

// 生命周期钩子
onMounted(() => {
  initBackgroundParticles();
  initCubeRotation();
  initMeridianLines();
  initSymbols();
  initDiagrams();
  initCustomDiagrams();
  cycleQuotes();
  // 等待组件完全渲染后再初始化图表
  setTimeout(() => {
    initHerbsChart();
    initWordCloud();
    initSchoolsChart();
    initHerbsRadarChart();
  }, 100);
  const chartIds = ['flavorChart', 'elementChart', 'seasonChart', 'organChart', 'toneChart'];
  chartIds.forEach((id, index) => {
    const el = document.getElementById(id);
    if (!el) return;
    const chart = echarts.init(el);
    chart.setOption({
      title: { text: ['五味', '五行', '五季', '五脏', '五音'][index], left: 'center', textStyle: { fontSize: 12, color: '#00eaff' } },
      backgroundColor: 'transparent',
      tooltip: { show: false },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: { show: false },
        labelLine: { show: false },
        data: Array.from({ length: 5 }, (_, i) => ({ value: Math.random() * 10 + 10, name: String.fromCharCode(65 + i) }))
      }]
    });
  });
});

onUnmounted(() => {
  // 清理事件监听
  document.removeEventListener('mousedown', startDragging);
  document.removeEventListener('mousemove', dragCube);
  document.removeEventListener('mouseup', stopDragging);
  
  document.removeEventListener('touchstart', handleTouchStart);
  document.removeEventListener('touchmove', handleTouchMove);
  document.removeEventListener('touchend', handleTouchEnd);
  
  clearInterval(rotateInterval);
  clearInterval(quoteInterval)
  // 清理Three.js资源
  if (bgScene) {
    bgScene.clear();
  }
  
  if (bgRenderer) {
    bgRenderer.dispose();
  }
  
  if (bgAnimationFrameId) {
    cancelAnimationFrame(bgAnimationFrameId);
  }
});
</script>

<style scoped>
.main-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #000 0%, #050510 100%);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}


/* 背景粒子容器 */
.particle-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* 经络线装饰 */
.meridian-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.meridian-line {
  position: absolute;
  background: linear-gradient(90deg, transparent, rgba(0, 200, 255, 0.3), transparent);
  background-size: 200% 100%;
  height: 1px;
}

.line-1 {
  top: 15%;
  left: 0;
  width: 100%;
  transform: rotate(5deg);
}

.line-2 {
  top: 35%;
  left: 0;
  width: 80%;
  transform: rotate(-8deg);
}

.line-3 {
  top: 55%;
  right: 0;
  width: 70%;
  transform: rotate(12deg);
}

.line-4 {
  top: 75%;
  left: 10%;
  width: 90%;
  transform: rotate(-5deg);
}

.line-5 {
  top: 25%;
  left: 20%;
  height: 60%;
  width: 1px;
  background: linear-gradient(180deg, transparent, rgba(0, 200, 255, 0.3), transparent);
  background-size: 100% 200%;
}

.line-6 {
  top: 30%;
  right: 30%;
  height: 50%;
  width: 1px;
  background: linear-gradient(180deg, transparent, rgba(0, 200, 255, 0.3), transparent);
  background-size: 100% 200%;
}

.line-7 {
  top: 20%;
  left: 40%;
  height: 70%;
  width: 1px;
  background: linear-gradient(180deg, transparent, rgba(0, 200, 255, 0.3), transparent);
  background-size: 100% 200%;
  transform: rotate(15deg);
}

.line-8 {
  top: 15%;
  right: 25%;
  height: 60%;
  width: 1px;
  background: linear-gradient(180deg, transparent, rgba(0, 200, 255, 0.3), transparent);
  background-size: 100% 200%;
  transform: rotate(-20deg);
}
/* 装饰性中医图谱 */
.tcm-diagrams {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.diagram-acupoints {
  position: absolute;
  top: 20%;
  left: 10%;
  width: 200px;
  height: 200px;
  opacity: 0.5;
  will-change: transform;
}

.diagram-herbs {
  position: absolute;
  bottom: 10%;
  right: 5%;
  width: 200px;
  height: 200px;
  opacity: 0.5;
  will-change: transform;
}
.top-banner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 0;
  background: linear-gradient(to right, rgba(0, 30, 60, 0.6), rgba(0, 10, 30, 0.6));
  z-index: 10;
}

.banner-frame {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.banner-frame img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(0, 200, 255, 0.2);
  transition: transform 0.3s ease;
}

.banner-frame img:hover {
  transform: scale(1.1);
}
.wuxing-button-wrapper {
  text-align: center;
  margin-top: 40px;
  z-index: 10;
  position: relative;
}

.top-wuxing-button {
  position: absolute;
  top: 20px;
  right: 150px; /* 与“返回首页”错开一点距离 */
  padding: 8px 16px;
  font-size: 14px;
  color: #00ffcc;
  background-color: rgba(0, 50, 80, 0.4);
  border: 1px solid rgba(0, 255, 200, 0.4);
  border-radius: 6px;
  cursor: pointer;
  z-index: 20;
  transition: all 0.3s ease;
}

.top-wuxing-button:hover {
  background-color: rgba(0, 255, 200, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 200, 0.3);
}
.top-jingyue-button {
  position: absolute;
  top: 20px;
  right: 270px; /* 与“返回首页”错开一点距离 */
  padding: 8px 16px;
  font-size: 14px;
  color: #00ffcc;
  background-color: rgba(0, 50, 80, 0.4);
  border: 1px solid rgba(0, 255, 200, 0.4);
  border-radius: 6px;
  cursor: pointer;
  z-index: 20;
  transition: all 0.3s ease;
}

.top-jingyue-button:hover {
  background-color: rgba(0, 255, 200, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 200, 0.3);
}
.top-test-button {
  position: absolute;
  top: 20px;
  right: -50px; /* 与“返回首页”错开一点距离 */
  padding: 8px 16px;
  font-size: 14px;
  color: #00ffcc;
  background-color: rgba(0, 50, 80, 0.4);
  border: 1px solid rgba(0, 255, 200, 0.4);
  border-radius: 6px;
  cursor: pointer;
  z-index: 20;
  transition: all 0.3s ease;
}
.top-section {
  position: absolute;
  top: 100px;
  left: 500px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* 添加这一行，使右侧滚动框顶部对齐 */
  padding: 0 40px;
  z-index: 10;
}


.top-test-button:hover {
  background-color: rgba(0, 255, 200, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 200, 0.3);
}
.top-pn-button {
  position: absolute;
  top: 20px;
  left: 500%; /* 与“返回首页”错开一点距离 */
  padding: 8px 16px;
  position: relative;
  font-size: 14px;
  color: #00ffcc;
  background-color: rgba(0, 50, 80, 0.4);
  border: 1px solid rgba(0, 255, 200, 0.4);
  border-radius: 6px;
  cursor: pointer;
  z-index: 20;
  transition: all 0.3s ease;
}

.top-pn-button:hover {
  background-color: rgba(0, 255, 200, 0.2);
  box-shadow: 0 0 10px rgba(0, 255, 200, 0.3);
}
/* 放大层样式 */
.image-viewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 20, 40, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  cursor: zoom-out;
  backdrop-filter: blur(4px);
}

.viewer-image {
  max-width: 80%;
  max-height: 80%;
  border: 2px solid rgba(0, 200, 255, 0.4);
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(0, 200, 255, 0.4);
  transition: transform 0.3s ease;
}
/* 右上角按钮 */
.top-right-button {
  position: absolute;
  top: 20px;
  right: 30px;
  padding: 8px 16px;
  font-size: 14px;
  color: #00d0ff;
  background-color: rgba(0, 50, 80, 0.4);
  border: 1px solid rgba(0, 200, 255, 0.4);
  border-radius: 6px;
  cursor: pointer;
  z-index: 20;
  transition: all 0.3s ease;
}
.top-right-button:hover {
  background-color: rgba(0, 200, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 200, 255, 0.3);
}

/* 中医三宝介绍区 */
.section-intro {
  position: relative;
  z-index: 10;
  margin-top: -500px;
  padding: 20px 40px;
  max-width: 700px;
  text-align: center;
  color: rgba(200, 255, 255, 0.9);
  font-family: "STKaiti", "KaiTi", "FangSong", serif;
  /* background: rgba(0, 30, 60, 0.3);
  border: 1px solid rgba(0, 200, 255, 0.2); */
  border-radius: 12px;
  backdrop-filter: blur(2px);
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.section-intro h2 {
  font-size: 1.6em;
  margin-bottom: 10px;
  color: #00e0ff;
  text-shadow: 0 0 6px rgba(0, 200, 255, 0.3);
}

.section-intro p {
  font-size: 1.3em;
  line-height: 2;
  max-width: 700px;
}

/* 修改后的导航面板：三个等距圆形模块 */
.nav-panels {
  position: absolute;
  left: 50%;
  top: 60%; /* 原来是 50%，现在整体下移一点 */
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  width: 60%;
}


.nav-panel {
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%; /* 变成圆形 */
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  padding: 20px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.2); /* 可选半透明背景 */
}

.nav-panel span {
  font-family: "STKaiti", "KaiTi", "FangSong", serif;
  font-size: 1.5em;
  font-weight: bold;
  writing-mode: vertical-lr;
  text-orientation: upright;
  letter-spacing: 0.3em;
  transition: all 0.3s ease;
  text-align: center;
}

/* 中草药 */
.nav-panel.herb {
  background: linear-gradient(180deg, rgba(0, 100, 50, 0.3), rgba(0, 50, 25, 0.1)); /* 绿色系渐变 */
  border: 1px solid rgba(0, 255, 100, 0.3); /* 绿色边框 */
}

.nav-panel.herb span {
  background: linear-gradient(180deg, #00ff88, #00cc66); /* 绿色渐变 */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(0, 255, 100, 0.5); /* 绿色阴影 */
}

/* 针灸 */
.nav-panel.pin {
  background: linear-gradient(180deg, rgba(255, 165, 0, 0.3), rgba(200, 100, 0, 0.1)); /* 橙色系渐变 */
  border: 1px solid rgba(255, 215, 0, 0.3); /* 金色边框 */
}

.nav-panel.pin span {
  background: linear-gradient(180deg, #ffd700, #ff8800); /* 金色渐变 */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5); /* 金色阴影 */
}
/* 望闻问切：整体更柔和淡雅的蓝色系视觉 */
.nav-panel.pulse {
  background: linear-gradient(180deg, rgba(163, 201, 255, 0.25), rgba(209, 221, 255, 0.1)); /* 浅蓝柔和渐变 */
  border: 1px solid rgba(163, 201, 255, 0.4); /* 更浅的蓝色边框 */
  box-shadow: 0 4px 12px rgba(173, 200, 255, 0.2); /* 柔和阴影效果 */
}

.nav-panel.pulse span {
  background: linear-gradient(180deg, #b3d4ff, #e1ecff); /* 更明亮清新的蓝白渐变 */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 6px rgba(173, 200, 255, 0.3); /* 更轻柔的蓝色光晕 */
}


.nav-panel:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 30px rgba(0, 150, 255, 0.3);
}

.nav-panel:hover span {
  transform: scale(1.1);
}

/* 立方体容器和光晕效果 */
.cube-container {
  position: absolute;
  width: 200px;
  height: 200px;
  perspective: 1000px;
  z-index: 10;
  top: 43%;
}

.cube-glow {
  position: absolute;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 150, 255, 0.3) 0%, transparent 70%);
  transform: translate(-25px, -25px);
  z-index: 9;
  animation: pulse 8s infinite alternate ease-in-out;
  pointer-events: none;
}

.cube {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: rotateX(-15deg) rotateY(15deg);
  transition: transform 0.2s;
}

.cube-face {
  position: absolute;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 30, 60, 0.3);
  border: 1px solid rgba(0, 150, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  backdrop-filter: blur(5px);
}

.cube-face span {
  font-family: "STKaiti", "KaiTi", "FangSong", serif;
  font-size: 1.8em;
  font-weight: bold;
  transition: all 0.3s ease;
}

.cube-face.front {
  transform: translateZ(100px);
  background: linear-gradient(135deg, rgba(0, 255, 100, 0.2), rgba(0, 200, 100, 0.1));
  border: 1px solid rgba(0, 255, 100, 0.3);
}

.cube-face.front span {
  background: linear-gradient(90deg, #00ff88, #00cc66);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(0, 255, 100, 0.5);
}

.cube-face.back {
  transform: rotateY(180deg) translateZ(100px);
  background: linear-gradient(135deg, rgba(255, 50, 50, 0.2), rgba(255, 100, 100, 0.1));
  border: 1px solid rgba(255, 100, 100, 0.3);
}

.cube-face.back span {
  background: linear-gradient(90deg, #ff3366, #ff6666);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(255, 50, 50, 0.5);
}

.cube-face.right {
  transform: rotateY(90deg) translateZ(100px);
  background: linear-gradient(135deg, rgba(255, 200, 0, 0.2), rgba(255, 150, 0, 0.1));
  border: 1px solid rgba(255, 200, 0, 0.3);
}

.cube-face.right span {
  background: linear-gradient(90deg, #ffcc00, #ff9900);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(255, 200, 0, 0.5);
}

.cube-face.left {
  transform: rotateY(-90deg) translateZ(100px);
  background: linear-gradient(135deg, rgba(200, 200, 200, 0.2), rgba(150, 150, 150, 0.1));
  border: 1px solid rgba(200, 200, 200, 0.3);
}

.cube-face.left span {
  background: linear-gradient(90deg, #ffffff, #cccccc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(200, 200, 200, 0.5);
}

.cube-face.top {
  transform: rotateX(90deg) translateZ(100px);
  background: linear-gradient(135deg, rgba(0, 100, 255, 0.2), rgba(0, 150, 255, 0.1));
  border: 1px solid rgba(0, 100, 255, 0.3);
}

.cube-face.top span {
  background: linear-gradient(90deg, #0066ff, #0099ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(0, 100, 255, 0.5);
}

.cube-face.bottom {
  transform: rotateX(-90deg) translateZ(100px);
  background: linear-gradient(135deg, rgba(100, 0, 255, 0.2), rgba(150, 0, 255, 0.1));
  border: 1px solid rgba(100, 0, 255, 0.3);
}

.cube-face.bottom span {
  background: linear-gradient(90deg, #6600ff, #9933ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(100, 0, 255, 0.5);
}

/* .cube-face:hover {
  transform-origin: center;
  transform: scale(1.05) translateZ(100px);
}

.cube-face.front:hover {
  background: linear-gradient(135deg, rgba(0, 255, 100, 0.3), rgba(0, 200, 100, 0.2));
  border: 1px solid rgba(0, 255, 100, 0.5);
  box-shadow: 0 0 30px rgba(0, 255, 100, 0.3);
} */
.cube-face:hover {
  /* 去掉 translateZ 和 scale，只保留视觉效果 */
  border-color: rgba(0, 255, 200, 0.6);
  box-shadow: 0 0 20px rgba(0, 255, 200, 0.3);
  background-color: rgba(0, 255, 200, 0.1);
  z-index: 11;
}

.cube-face:hover span {
  transform: scale(1.05);
  text-shadow: 0 0 12px rgba(0, 255, 200, 0.7);
}

.cube-face.back:hover {
  background: linear-gradient(135deg, rgba(255, 50, 50, 0.3), rgba(255, 100, 100, 0.2));
  border: 1px solid rgba(255, 100, 100, 0.5);
  box-shadow: 0 0 30px rgba(255, 50, 50, 0.3);
}
.cube-face.right:hover {
  background: linear-gradient(135deg, rgba(255, 200, 0, 0.3), rgba(255, 150, 0, 0.2));
  border: 1px solid rgba(255, 200, 0, 0.5);
  box-shadow: 0 0 30px rgba(255, 200, 0, 0.3);
}

.cube-face.left:hover {
  background: linear-gradient(135deg, rgba(200, 200, 200, 0.3), rgba(150, 150, 150, 0.2));
  border: 1px solid rgba(200, 200, 200, 0.5);
  box-shadow: 0 0 30px rgba(200, 200, 200, 0.3);
}

.cube-face.top:hover {
  background: linear-gradient(135deg, rgba(0, 100, 255, 0.3), rgba(0, 150, 255, 0.2));
  border: 1px solid rgba(0, 100, 255, 0.5);
  box-shadow: 0 0 30px rgba(0, 100, 255, 0.3);
}

.cube-face.bottom:hover {
  background: linear-gradient(135deg, rgba(100, 0, 255, 0.3), rgba(150, 0, 255, 0.2));
  border: 1px solid rgba(100, 0, 255, 0.5);
  box-shadow: 0 0 30px rgba(100, 0, 255, 0.3);
}

.cube-face:hover span {
  transform: scale(1.1);
}

/* 响应式布局 */
@media (max-width: 900px) {
  .nav-panels {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .nav-panel {
    width: 100px;
    height: 160px;
  }
  
  .nav-panel span {
    font-size: 1.5em;
  }
}


h3 {
  font-family: "Orbitron", sans-serif;
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.2rem;
  color: rgba(0, 220, 255, 1);
  text-shadow: 0 0 5px rgba(0, 150, 255, 0.8);
  text-align: center;
}

.highlight-title {
  font-size: 2.1em;
  font-weight: bold;
  font-family: "STKaiti", "KaiTi", "FangSong", serif;
  color: #00eaff;
  text-shadow: 0 0 10px rgba(0, 200, 255, 0.5);
}

/* 动画定义 */
@keyframes pulse {
  0% { transform: translate(-25px, -25px) scale(1); opacity: 0.3; }
  50% { transform: translate(-25px, -25px) scale(1.1); opacity: 0.5; }
  100% { transform: translate(-25px, -25px) scale(1); opacity: 0.3; }
}

/* 响应式调整 */

@media (max-width: 600px) {
  .main-page {
    flex-direction: column;
    overflow-y: auto;
    justify-content: flex-start;
    padding-top: 100px;
  }
  
  .tcm-diagrams {
    display: none;
  }
}
/* 中医名言滚动区域样式 */
/* 中医名言滚动区域样式（右侧） */
.quote-marquee-right {
  position: absolute;
  top: -180px;
  right: -600px; /* ✅ 原来是 -500px，改成对称的 40px */
  width: 280px;
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  font-family: "STKaiti", "KaiTi", "FangSong", serif;
  text-align: center;
  z-index: 10;
}

.quote-item {
  transition: all 0.5s ease-in-out;
  margin-bottom: 10px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.five-elements-timeline {
  position: absolute;
  top: 20%;
  left: 40px; /* ✅ 原来是 2%，改成固定像素更精准 */
  width: 240px;
  max-height: 70%;
  overflow-y: auto;
  z-index: 10;
  padding-left: 20px;
  border-left: 2px solid rgba(0, 200, 255, 0.2);
}

.timeline-item {
  position: relative;
  margin-bottom: 24px;
  padding-left: 10px;
}

.timeline-dot {
  position: absolute;
  left: -10px;
  top: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.4);
  box-shadow: 0 0 10px rgba(0, 200, 255, 0.3);
}

.timeline-content h4 {
  font-size: 1em;
  color: #00eaff;
  margin: 0 0 4px;
  font-family: "STKaiti", "KaiTi", serif;
}

.timeline-content p {
  font-size: 0.9em;
  color: rgba(200, 255, 255, 0.8);
  line-height: 1.4;
  font-family: "FangSong", serif;
}

/* 响应式调整 */
@media (max-width: 900px) {
  .meridian-cycle-diagram, .five-elements-balance {
    transform: scale(0.8);
  }
  
  .meridian-cycle-diagram {
    left: 5%;
  }
  
  .five-elements-balance {
    top: 10%;
    transform: translateX(-50%) scale(0.8);
  }
}

@media (max-width: 600px) {
  .meridian-cycle-diagram, .five-elements-balance {
    display: none;
  }
  
  .five-elements-balance {
    top: 5%;
    transform: translateX(-50%) scale(0.7);
  }
}

</style> 