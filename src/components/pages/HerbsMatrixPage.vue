<template>
  <div class="herbs-matrix-page">
    <!-- 背景装饰 -->
    <div class="background-pattern"></div>
    
    <!-- 标题区域 -->
    <div class="header">
      <h1>本草·矩阵</h1>
      <p class="subtitle">《本草纲目》药材的多维数据宇宙</p>
    </div>
    
    <!-- 4D药性超立方体容器 -->
    <div class="hypercube-container" ref="hypercubeContainer">
      <canvas ref="hypercubeCanvas"></canvas>
      
      <!-- 坐标轴说明 -->
      <div class="axis-labels">
        <div class="axis x-axis">
          <span>药性</span>
          <div class="gradient-bar">
            <span>大寒</span>
            <span>平</span>
            <span>大热</span>
          </div>
        </div>
        <div class="axis y-axis">
          <span>归经</span>
          <div class="meridian-colors">
            <div v-for="(color, meridian) in meridianColors" 
                 :key="meridian" 
                 class="meridian-dot"
                 :style="{ backgroundColor: color }">
              <span class="meridian-name">{{ meridian }}</span>
            </div>
          </div>
        </div>
        <div class="axis z-axis">
          <span>毒性</span>
          <div class="toxicity-levels">
            <div v-for="(opacity, level) in toxicityLevels" 
                 :key="level"
                 class="toxicity-level"
                 :style="{ opacity: opacity }">
              <span>{{ level }}</span>
            </div>
          </div>
        </div>
        <div class="axis t-axis">
          <span>朝代</span>
          <div class="dynasty-timeline">
            <div v-for="dynasty in dynastyTimeline" 
                 :key="dynasty.name"
                 class="dynasty-point"
                 :style="{ left: dynasty.position * 100 + '%' }">
              <span class="dynasty-year">{{ dynasty.year }}</span>
              <span class="dynasty-name">{{ dynasty.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 药材信息面板 -->
    <div class="herb-info-panel" v-if="selectedHerb">
      <div class="panel-header">
        <h2>{{ selectedHerb.name }}</h2>
        <button class="close-btn" @click="selectedHerb = null">×</button>
      </div>
      <div class="panel-content">
        <div class="info-section">
          <h3>基本信息</h3>
          <p><strong>药性：</strong>{{ selectedHerb.property }}</p>
          <p><strong>归经：</strong>{{ selectedHerb.meridians.join('、') }}</p>
          <p><strong>毒性：</strong>{{ selectedHerb.toxicity }}</p>
          <p><strong>首次记载：</strong>{{ selectedHerb.firstRecord }}</p>
          <p><strong>出处：</strong>《{{ selectedHerb.source }}》</p>
        </div>
        <div class="info-section">
          <h3>功效主治</h3>
          <p>{{ selectedHerb.description }}</p>
        </div>
      </div>
    </div>
    
    <!-- 控制面板 -->
    <div class="control-panel">
      <div class="control-group">
        <label>旋转速度</label>
        <input type="range" v-model="rotationSpeed" min="0" max="2" step="0.1">
      </div>
      <div class="control-group">
        <label>时间轴</label>
        <input type="range" v-model="timePosition" min="0" max="100" step="1">
        <span class="time-value">{{ currentYear }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';

// 引用元素
const hypercubeContainer = ref(null);
const hypercubeCanvas = ref(null);

// 场景相关变量
let scene, camera, renderer, controls;
let hypercube, particles;
let animationFrameId;

// 药性数据（寒→热）
const propertyScale = {
  '大寒': -1.0,
  '寒': -0.6,
  '微寒': -0.3,
  '平': 0,
  '微温': 0.3,
  '温': 0.6,
  '大热': 1.0
};

// 归经颜色映射（按十二经络）
const meridianColors = {
  '手太阴肺经': '#E6E6FA', // 淡紫
  '手阳明大肠经': '#FFE4E1', // 淡粉
  '足阳明胃经': '#FFE4B5', // 淡黄
  '足太阴脾经': '#F0E68C', // 淡金
  '手少阴心经': '#FF6B6B', // 鲜红
  '手太阳小肠经': '#FFA07A', // 橙红
  '足太阳膀胱经': '#87CEEB', // 天蓝
  '足少阴肾经': '#2F4F4F', // 深蓝
  '手厥阴心包经': '#FF69B4', // 粉红
  '手少阳三焦经': '#FF8C00', // 橙色
  '足少阳胆经': '#98FB98', // 淡绿
  '足厥阴肝经': '#228B22'  // 深绿
};

// 毒性等级与透明度映射
const toxicityLevels = {
  '无毒': 1.0,
  '小毒': 0.7,
  '有毒': 0.4,
  '大毒': 0.2
};

// 朝代时间轴
const dynastyTimeline = [
  { name: '战国', year: -475, position: 0 },
  { name: '秦汉', year: -221, position: 0.1 },
  { name: '三国', year: 220, position: 0.2 },
  { name: '晋', year: 265, position: 0.3 },
  { name: '南北朝', year: 420, position: 0.4 },
  { name: '隋唐', year: 581, position: 0.5 },
  { name: '宋', year: 960, position: 0.6 },
  { name: '元', year: 1271, position: 0.7 },
  { name: '明', year: 1368, position: 0.8 },
  { name: '清', year: 1644, position: 0.9 }
];

// 药材数据
const herbsData = [
  {
    name: '人参',
    property: '微温',
    meridians: ['手太阴肺经', '足阳明胃经', '足太阴脾经'],
    toxicity: '无毒',
    firstRecord: '战国',
    source: '神农本草经',
    description: '大补元气，复脉固脱，补脾益肺，生津，安神。',
    position: {
      x: propertyScale['微温'],
      y: 0.5,
      z: toxicityLevels['无毒'],
      t: dynastyTimeline[0].position
    }
  },
  {
    name: '附子',
    property: '大热',
    meridians: ['手少阴心经', '足少阴肾经'],
    toxicity: '大毒',
    firstRecord: '秦汉',
    source: '神农本草经',
    description: '回阳救逆，补火助阳，散寒除湿。',
    position: {
      x: propertyScale['大热'],
      y: 0.8,
      z: toxicityLevels['大毒'],
      t: dynastyTimeline[1].position
    }
  },
  {
    name: '黄连',
    property: '大寒',
    meridians: ['手少阴心经', '足阳明胃经', '足厥阴肝经'],
    toxicity: '无毒',
    firstRecord: '战国',
    source: '神农本草经',
    description: '清热燥湿，泻火解毒，清心除烦。',
    position: {
      x: propertyScale['大寒'],
      y: 0.6,
      z: toxicityLevels['无毒'],
      t: dynastyTimeline[0].position
    }
  },
  {
    name: '甘草',
    property: '平',
    meridians: ['手太阴肺经', '足太阴脾经', '足阳明胃经'],
    toxicity: '无毒',
    firstRecord: '战国',
    source: '神农本草经',
    description: '补脾益气，清热解毒，调和诸药。',
    position: {
      x: propertyScale['平'],
      y: 0.4,
      z: toxicityLevels['无毒'],
      t: dynastyTimeline[0].position
    }
  },
  {
    name: '乌头',
    property: '大热',
    meridians: ['手少阴心经', '足少阴肾经'],
    toxicity: '大毒',
    firstRecord: '战国',
    source: '神农本草经',
    description: '祛风除湿，温经止痛，回阳救逆。',
    position: {
      x: propertyScale['大热'],
      y: 0.7,
      z: toxicityLevels['大毒'],
      t: dynastyTimeline[0].position
    }
  },
  {
    name: '黄芩',
    property: '寒',
    meridians: ['手太阴肺经', '手少阳三焦经', '足阳明胃经'],
    toxicity: '无毒',
    firstRecord: '战国',
    source: '神农本草经',
    description: '清热燥湿，泻火解毒，止血安胎。',
    position: {
      x: propertyScale['寒'],
      y: 0.3,
      z: toxicityLevels['无毒'],
      t: dynastyTimeline[0].position
    }
  },
  {
    name: '大黄',
    property: '寒',
    meridians: ['手阳明大肠经', '足厥阴肝经', '足太阳膀胱经'],
    toxicity: '无毒',
    firstRecord: '战国',
    source: '神农本草经',
    description: '攻积导滞，清热泻火，凉血解毒，逐瘀通经。',
    position: {
      x: propertyScale['寒'],
      y: 0.2,
      z: toxicityLevels['无毒'],
      t: dynastyTimeline[0].position
    }
  },
  {
    name: '芍药',
    property: '微寒',
    meridians: ['足厥阴肝经', '足太阴脾经'],
    toxicity: '无毒',
    firstRecord: '战国',
    source: '神农本草经',
    description: '养血调经，柔肝止痛，平抑肝阳。',
    position: {
      x: propertyScale['微寒'],
      y: 0.4,
      z: toxicityLevels['无毒'],
      t: dynastyTimeline[0].position
    }
  },
  {
    name: '半夏',
    property: '温',
    meridians: ['足阳明胃经', '手太阴肺经'],
    toxicity: '有毒',
    firstRecord: '战国',
    source: '神农本草经',
    description: '燥湿化痰，降逆止呕，消痞散结。',
    position: {
      x: propertyScale['温'],
      y: 0.6,
      z: toxicityLevels['有毒'],
      t: dynastyTimeline[0].position
    }
  },
  {
    name: '桂枝',
    property: '温',
    meridians: ['手太阴肺经', '手少阴心经', '足太阳膀胱经'],
    toxicity: '无毒',
    firstRecord: '战国',
    source: '神农本草经',
    description: '发汗解表，温通经脉，助阳化气。',
    position: {
      x: propertyScale['温'],
      y: 0.5,
      z: toxicityLevels['无毒'],
      t: dynastyTimeline[0].position
    }
  },
  {
    name: '麻黄',
    property: '温',
    meridians: ['手太阴肺经', '足太阳膀胱经'],
    toxicity: '小毒',
    firstRecord: '战国',
    source: '神农本草经',
    description: '发汗解表，宣肺平喘，利水消肿。',
    position: {
      x: propertyScale['温'],
      y: 0.3,
      z: toxicityLevels['小毒'],
      t: dynastyTimeline[0].position
    }
  },
  {
    name: '细辛',
    property: '温',
    meridians: ['手太阴肺经', '足少阴肾经'],
    toxicity: '有毒',
    firstRecord: '战国',
    source: '神农本草经',
    description: '散寒止痛，通窍，祛风除湿。',
    position: {
      x: propertyScale['温'],
      y: 0.4,
      z: toxicityLevels['有毒'],
      t: dynastyTimeline[0].position
    }
  }
];

// 响应式状态
const rotationSpeed = ref(0.5);
const timePosition = ref(50);
const selectedHerb = ref(null);
const currentYear = ref('三国');

// 初始化场景
const initScene = () => {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  
  renderer = new THREE.WebGLRenderer({
    canvas: hypercubeCanvas.value,
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  // 添加控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  
  // 创建超立方体
  createHypercube();
  
  // 创建粒子系统
  createParticles();
  
  // 添加光源
  addLights();
  
  // 开始动画循环
  animate();
  
  // 响应窗口大小变化
  window.addEventListener('resize', onWindowResize);
};

// 创建超立方体
const createHypercube = () => {
  // 创建超立方体框架
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.LineBasicMaterial({
    color: 0x00ff88,
    transparent: true,
    opacity: 0.3,
    linewidth: 1
  });
  
  const edges = new THREE.EdgesGeometry(geometry);
  hypercube = new THREE.LineSegments(edges, material);
  scene.add(hypercube);
  
  // 创建坐标轴
  const axesHelper = new THREE.AxesHelper(1.2);
  axesHelper.material.transparent = true;
  axesHelper.material.opacity = 0.5;
  scene.add(axesHelper);
  
  // 添加药材点
  herbsData.forEach(herb => {
    // 创建药丸形状
    const pillGeometry = new THREE.CapsuleGeometry(0.1, 0.2, 8, 16); // 增大药丸尺寸
    const pillMaterial = new THREE.MeshPhongMaterial({
      color: getMeridianColor(herb.meridians[0]),
      transparent: true,
      opacity: toxicityLevels[herb.toxicity],
      metalness: 0.5,
      roughness: 0.5,
      emissive: getMeridianColor(herb.meridians[0]),
      emissiveIntensity: 0.2
    });
    
    const pill = new THREE.Mesh(pillGeometry, pillMaterial);
    
    // 设置位置（将-1到1的范围映射到立方体内）
    pill.position.set(
      herb.position.x,
      herb.position.y * 2 - 1,
      herb.position.z * 2 - 1
    );
    
    // 添加发光效果
    const glow = new THREE.PointLight(getMeridianColor(herb.meridians[0]), 0.5, 0.2);
    glow.position.copy(pill.position);
    scene.add(glow);
    
    // 添加药材信息到userData
    pill.userData = herb;
    scene.add(pill);
  });
};

// 获取归经颜色
const getMeridianColor = (meridian) => {
  return new THREE.Color(meridianColors[meridian]);
};

// 创建粒子系统
const createParticles = () => {
  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    
    colors[i * 3] = Math.random();
    colors[i * 3 + 1] = Math.random();
    colors[i * 3 + 2] = Math.random();
  }
  
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const material = new THREE.PointsMaterial({
    size: 0.02,
    vertexColors: true,
    transparent: true,
    opacity: 0.5
  });
  
  particles = new THREE.Points(geometry, material);
  scene.add(particles);
};

// 添加光源
const addLights = () => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);
  
  const pointLight = new THREE.PointLight(0x00ffff, 1, 10);
  pointLight.position.set(-5, -5, -5);
  scene.add(pointLight);
};

// 更新时间轴位置
const updateTimePosition = () => {
  const currentPosition = timePosition.value / 100;
  
  // 更新药材显示
  scene.traverse((object) => {
    if (object.userData && object.userData.position) {
      const herb = object.userData;
      const timeDiff = Math.abs(herb.position.t - currentPosition);
      
      // 根据时间差调整透明度
      if (object.material) {
        object.material.opacity = timeDiff < 0.1 
          ? toxicityLevels[herb.toxicity]
          : toxicityLevels[herb.toxicity] * 0.3;
      }
      
      // 更新当前年代显示
      const currentDynasty = dynastyTimeline.find(d => 
        currentPosition >= d.position && 
        currentPosition < (d.position + 0.1)
      );
      if (currentDynasty) {
        currentYear.value = currentDynasty.name;
      }
    }
  });
};

// 动画循环
const animate = () => {
  animationFrameId = requestAnimationFrame(animate);
  
  // 旋转超立方体
  if (hypercube) {
    hypercube.rotation.x += 0.001 * rotationSpeed.value;
    hypercube.rotation.y += 0.001 * rotationSpeed.value;
  }
  
  // 更新时间轴位置
  updateTimePosition();
  
  // 更新控制器和渲染
  controls.update();
  renderer.render(scene, camera);
};

// 窗口大小变化处理
const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

// 射线检测
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoveredObject = null;

const onMouseMove = (event) => {
  const rect = hypercubeCanvas.value.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  
  // 重置之前悬停的对象
  if (hoveredObject) {
    hoveredObject.material.emissiveIntensity = 0.2;
    hoveredObject.scale.set(1, 1, 1);
    document.body.style.cursor = 'default';
  }
  
  // 处理新的悬停对象
  for (const intersect of intersects) {
    if (intersect.object.userData && intersect.object.material) {
      hoveredObject = intersect.object;
      hoveredObject.material.emissiveIntensity = 0.8;
      hoveredObject.scale.set(1.2, 1.2, 1.2);
      document.body.style.cursor = 'pointer';
      break;
    }
  }
};

const onMouseClick = (event) => {
  if (hoveredObject) {
    selectedHerb.value = hoveredObject.userData;
  }
};

// 生命周期钩子
onMounted(() => {
  initScene();
  hypercubeCanvas.value.addEventListener('mousemove', onMouseMove);
  hypercubeCanvas.value.addEventListener('click', onMouseClick);
});

onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize);
  hypercubeCanvas.value.removeEventListener('mousemove', onMouseMove);
  hypercubeCanvas.value.removeEventListener('click', onMouseClick);
  cancelAnimationFrame(animationFrameId);
  
  // 清理Three.js资源
  scene.traverse((object) => {
    if (object.geometry) {
      object.geometry.dispose();
    }
    if (object.material) {
      if (Array.isArray(object.material)) {
        object.material.forEach(material => material.dispose());
      } else {
        object.material.dispose();
      }
    }
  });
  
  renderer.dispose();
});
</script>

<style scoped>
.herbs-matrix-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #000 0%, #050510 100%);
  overflow: hidden;
  color: #fff;
}

.background-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 10% 20%, rgba(0, 255, 100, 0.1) 0%, transparent 20%),
    radial-gradient(circle at 90% 80%, rgba(0, 100, 255, 0.1) 0%, transparent 20%);
  pointer-events: none;
}

.header {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 10;
}

.header h1 {
  font-size: 2.5em;
  margin: 0;
  background: linear-gradient(90deg, #00ff88, #00cc66);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(0, 255, 100, 0.5);
}

.subtitle {
  font-size: 1.2em;
  color: rgba(0, 255, 100, 0.8);
  margin: 10px 0 0;
}

.hypercube-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 80%;
  perspective: 1000px;
}

.hypercube-container canvas {
  width: 100%;
  height: 100%;
}

.axis-labels {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  font-family: "STKaiti", "KaiTi", "FangSong", serif;
}

.axis {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(0, 255, 100, 0.8);
}

.x-axis {
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
}

.y-axis {
  left: -40px;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
}

.z-axis {
  right: -40px;
  top: 50%;
  transform: translateY(-50%);
}

.t-axis {
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
}

.gradient-bar {
  width: 200px;
  height: 4px;
  background: linear-gradient(90deg, #00ffff, #ffffff, #ff0000);
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
}

.meridian-colors {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
}

.meridian-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position: relative;
  box-shadow: 0 0 5px currentColor;
}

.meridian-name {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  font-size: 0.8em;
  color: rgba(255, 255, 255, 0.8);
}

.toxicity-levels {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
}

.toxicity-level {
  display: flex;
  align-items: center;
  gap: 10px;
}

.toxicity-level::before {
  content: '';
  width: 30px;
  height: 4px;
  background: #fff;
}

.dynasty-timeline {
  width: 200px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  position: relative;
  margin-top: 20px;
}

.dynasty-point {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
}

.dynasty-year {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7em;
  color: rgba(255, 255, 255, 0.6);
}

.dynasty-name {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 0.8em;
  color: rgba(255, 255, 255, 0.8);
}

.herb-info-panel {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 300px;
  background: rgba(0, 15, 30, 0.8);
  border: 1px solid rgba(0, 255, 100, 0.3);
  border-radius: 10px;
  padding: 20px;
  backdrop-filter: blur(10px);
  z-index: 20;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.panel-header h2 {
  margin: 0;
  color: #00ff88;
}

.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  padding: 0 5px;
}

.info-section {
  margin-bottom: 15px;
}

.info-section h3 {
  color: #00ff88;
  margin: 0 0 10px;
}

.control-panel {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  background: rgba(0, 15, 30, 0.8);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid rgba(0, 255, 100, 0.3);
  backdrop-filter: blur(10px);
  z-index: 20;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.control-group label {
  color: #00ff88;
  font-size: 0.9em;
}

.control-group input[type="range"] {
  width: 150px;
}

.time-value {
  color: #fff;
  font-size: 0.9em;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2em;
  }
  
  .subtitle {
    font-size: 1em;
  }
  
  .control-panel {
    flex-direction: column;
    gap: 10px;
  }
  
  .herb-info-panel {
    width: 90%;
    right: 5%;
  }
}
</style> 