<template>
  <div class="intro-page" ref="introPage" @click="activateSystem">
    <div class="particle-container" ref="particleContainer"></div>

    <div class="title-container">
      <h1 class="main-title" ref="mainTitle">五行医鉴</h1>
      <div class="binary-subtitle" ref="binarySubtitle">
        基于传统中医智慧与川派中医特色的数字化探索
      </div>
    </div>

    <div class="five-elements-ring" ref="fiveElementsRing" v-show="showRing">
      <button class="enter-button" @click.stop="enterSystem">进入系统</button>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useRouter } from 'vue-router';

// 引用元素
const introPage = ref(null);
const particleContainer = ref(null);
// const taijiCore = ref(null);
const mainTitle = ref(null);
const binarySubtitle = ref(null);
const fiveElementsRing = ref(null);
const showRing = ref(false);

// 场景相关变量
let scene, camera, renderer, particles;
let animationFrameId = null;

// 初始化Three.js场景
const initScene = () => {
  // 创建场景
  scene = new THREE.Scene();
  
  // 相机设置
  camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
  );
  camera.position.z = 5;
  
  // 渲染器设置
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  particleContainer.value.appendChild(renderer.domElement);
  
  // 创建粒子系统
  createParticles();
  
  // 开始动画循环
  animate();
  
  // 窗口大小变化时调整画布大小
  window.addEventListener('resize', onWindowResize);
};

// 创建粒子
const createParticles = () => {
  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  const geometry = new THREE.BufferGeometry();
  
  // 生成随机的粒子位置和颜色
  for (let i = 0; i < particleCount; i++) {
    // 位置 - 经络网络形状
    const x = (Math.random() - 0.5) * 10;
    const y = (Math.random() - 0.5) * 10;
    const z = (Math.random() - 0.5) * 10;
    
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    
    // 颜色 - 冷蓝和银白
    const r = 0.5 + Math.random() * 0.3; // 银白
    const g = 0.7 + Math.random() * 0.3; // 银白
    const b = 0.9 + Math.random() * 0.1; // 蓝色偏向
    
    colors[i * 3] = r;
    colors[i * 3 + 1] = g;
    colors[i * 3 + 2] = b;
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
  });
  
  particles = new THREE.Points(geometry, material);
  scene.add(particles);
};

// 窗口大小改变事件处理
const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

// 动画循环
const animate = () => {
  animationFrameId = requestAnimationFrame(animate);
  
  // 旋转粒子
  particles.rotation.x += 0.0005;
  particles.rotation.y += 0.001;
  
  // 更新粒子位置，创建流动效果
  const positions = particles.geometry.attributes.position.array;
  
  for (let i = 0; i < positions.length; i += 3) {
    // 光轨流动效果
    positions[i + 1] += Math.sin(Date.now() * 0.001 + positions[i] * 0.1) * 0.002;
  }
  
  particles.geometry.attributes.position.needsUpdate = true;
  
  renderer.render(scene, camera);
};

// 激活五行能量环
const activateSystem = () => {
  // 防止多次点击
  if (showRing.value) return;
  
  showRing.value = true;

  // 粒子旋转重置动画
  gsap.to(particles.rotation, {
    duration: 1.5,
    x: 0,
    y: 0,
    ease: "power2.inOut"
  });

  // 粒子聚拢动画
  const positions = particles.geometry.attributes.position.array;
  const originalPositions = [...positions];

  for (let i = 0; i < positions.length; i += 3) {
    const x = originalPositions[i];
    const y = originalPositions[i + 1];
    const z = originalPositions[i + 2];

    const radius = 3;
    const angle = Math.random() * Math.PI * 2;
    const targetX = Math.cos(angle) * radius;
    const targetY = Math.sin(angle) * radius;
    const targetZ = (Math.random() - 0.5) * 0.5;

    gsap.to([positions], {
      duration: 2,
      [i]: targetX,
      [i + 1]: targetY,
      [i + 2]: targetZ,
      ease: "power2.out",
      onUpdate: () => {
        particles.geometry.attributes.position.needsUpdate = true;
      }
    });
  }
};

// 进入系统
const enterSystem = () => {
  // 爆炸式扩散动画
  const positions = particles.geometry.attributes.position.array;
  
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];
    const z = positions[i + 2];
    
    // 向外扩散
    const direction = new THREE.Vector3(x, y, z).normalize();
    const targetX = direction.x * 30;
    const targetY = direction.y * 30;
    const targetZ = direction.z * 30;
    
    gsap.to([positions], {
      duration: 2,
      [i]: targetX,
      [i + 1]: targetY,
      [i + 2]: targetZ,
      ease: "power3.out",
      onUpdate: () => {
        particles.geometry.attributes.position.needsUpdate = true;
      }
    });
  }
  
  // 淡出动画
  gsap.to(introPage.value, {
    duration: 2,
    opacity: 0,
    ease: "power2.inOut",
    onComplete: () => {
      // 使用路由导航到主页面
      router.push('/main');
    }
  });
};

// 标题动效
const animateTitle = () => {
  // 分解标题为单个字符
  const titleText = mainTitle.value.textContent;
  mainTitle.value.textContent = '';
  
  // 创建每个字符的span
  [...titleText].forEach((char, index) => {
    const charSpan = document.createElement('span');
    charSpan.textContent = char;
    charSpan.style.opacity = 0;
    charSpan.style.display = 'inline-block';
    mainTitle.value.appendChild(charSpan);
    
    // 应用动画
    gsap.to(charSpan, {
      duration: 0.8,
      opacity: 1,
      scale: 1,
      delay: 0.5 + index * 0.15,
      ease: "power1.out",
      onStart: () => {
        charSpan.style.textShadow = "0 0 20px rgba(0, 200, 255, 0.8)";
      }
    });
  });
  
  // 副标题动效 - 悬浮代码流形式从底部升起
  // 先将文本分成每个字
  const quoteText = binarySubtitle.value.textContent.trim();
  binarySubtitle.value.textContent = '';
  
  // 按字符分割文本
  const characters = [...quoteText];
  
  // 为每个字创建span
  characters.forEach((char, index) => {
    // 空格使用普通空格，其他字符使用span
    if (char === ' ') {
      binarySubtitle.value.appendChild(document.createTextNode(' '));
      return;
    }
    
    const charSpan = document.createElement('span');
    charSpan.className = 'binary-word';
    charSpan.textContent = char;
    charSpan.style.opacity = 0;
    charSpan.style.display = 'inline-block';
    charSpan.style.transform = 'translateY(20px)';
    binarySubtitle.value.appendChild(charSpan);
    
    // 应用交错动画
    gsap.to(charSpan, {
      duration: 0.5,
      opacity: 1,
      y: 0,
      delay: 1.8 + index * 0.12,
      ease: "power2.out",
      onComplete: () => {
        // 添加轻微的浮动效果
        gsap.to(charSpan, {
          duration: 2 + Math.random(),
          y: '-=3',
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: Math.random() * 0.5
        });
      }
    });
  });
};

// 生命周期钩子
onMounted(() => {
  initScene();
  animateTitle();
});

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  
  window.removeEventListener('resize', onWindowResize);
  
  // 清理Three.js资源
  if (scene) {
    scene.clear();
  }
  
  if (renderer) {
    renderer.dispose();
  }
});

// 导出事件
const emit = defineEmits(['enter-main-page']);

// 获取路由实例
const router = useRouter();
</script>

<style scoped>
.intro-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.particle-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  /* padding: 50px; */
}
/* 太极按钮
.taiji-core {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  /* background: radial-gradient(circle at 40% 40%, white 10%, #000 40%); */
  /* box-shadow: 0 0 20px 5px rgba(0, 150, 255, 0.5);
  z-index: 3;
  left: 380px; /* 向右移动20像素 */
  /* cursor: pointer;
  transition: transform 0.3s ease;
} */  
.taiji-core {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M902.07 353.39c-9.67-18.79-14.5-39.2-26.31-56.91-22.55-42.95-53.69-82.68-90.2-116.51-19.33-12.35-35.44-27.92-54.76-40.27-17.18-11.28-35.98-20.4-53.69-30.07-27.38-10.74-53.69-22.01-82.15-28.99-11.27-1.07-20.94-6.44-32.21-6.44L516.02 68.83c-24.16-2.68-49.4-0.54-74.1 1.07-55.3 4.3-104.16 22.55-153.02 44.03-84.3 41.88-160 114.36-201.34 200.27-31.14 64.97-48.32 139.06-46.18 209.94 0 9.13 2.69 22.55 1.61 31.14 4.29 16.65 3.76 32.21 8.05 47.79C76.82 722.79 153.6 834.47 266.36 897.29c20.4 15.03 44.02 21.48 66.58 30.61 79.46 30.06 179.87 35.43 263.63 12.89 119.73-27.39 230.34-113.83 285.64-227.12 1.08-1.07 2.69-1.07 1.61-3.22 25.07-128.1 34.19-260.18-10.36-376.69zM389.85 266.95c13.96-11.81 31.14-21.48 52.08-16.65 15.04 3.76 27.93 14.5 35.98 28.46 7.51 13.96 10.2 37.05 0 51.01-9.13 15.57-26.85 28.46-45.1 29-20.94-1.08-43.49-10.2-51.54-31.68-5.91-15.57 0.54-38.66 13.96-55.84zm482.69 419.87c-35.44 82.15-109 161.08-190.07 199.74-25.24 13.42-51.01 25.77-78.93 30.07-12.35 0-23.09 3.22-35.44 3.22l-32.21-3.22c-6.97-1.61-13.42-6.45-20.94-4.83-36.51-5.91-70.34-25.77-98.26-52.08-51.01-52.62-71.41-130.47-51.01-198.66 10.2-33.83 30.6-66.04 57.45-90.2 32.75-23.09 66.05-44.57 97.73-70.87 38.12-27.38 80.54-56.91 98.79-100.94 15.03-22.01 17.72-48.86 22.55-75.17 8.05-78.39-30.6-159.46-101.48-200.27-13.96-9.66-30.6-13.96-45.1-22.01-16.64-2.69-31.14-9.66-47.24-9.66-1.62-1.08 0.54-1.08-0.54-1.61 38.66-6.44 88.59-2.15 129.4 6.44 109.53 23.09 213.69 96.11 271.68 193.83l16.64 29.53c51.6 119.7 54.28 268.96 1.13 377.95zM605.15 704.54c6.98 20.94 2.15 45.64-14.49 61.21-15.57 11.28-35.44 20.94-55.31 13.96-15.03-5.37-30.6-16.65-38.12-30.61-6.98-15.03-4.83-34.36 2.15-48.86 10.2-19.86 32.22-27.38 51.01-34.36 23.09-5.91 45.64 16.65 54.76 38.13z' fill='%232c2c2c'/%3E%3C/svg%3E") 
              center/135% no-repeat,
              radial-gradient(circle at 10% 10%, rgb(205, 200, 200) 10%, rgb(227, 219, 219) 40%);;
  box-shadow: 0 0 25px rgba(0, 200, 255, 0.5);
  z-index: 3;
  right: -400px; 
  top: 210px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.taiji-core:hover {
  transform: scale(1.1);
}

.title-container {
  position: relative;
  text-align: center;
  margin-bottom: 50px;
  z-index: 2;
}

.main-title {
  font-family: "Orbitron", sans-serif;
  font-size: 5rem;
  color: white;
  text-shadow: 0 0 10px rgba(0, 200, 255, 0.5);
  letter-spacing: 0.5rem;
  margin-bottom: 1.5rem;
}

.binary-subtitle {
  font-family: "STKaiti", "KaiTi", "FangSong", serif;
  font-size: 1.2rem;
  color: rgba(0, 200, 255, 0.8);
  letter-spacing: 0.5rem;
  max-width: 100%;
  margin: 0 auto;
  margin-top: 1rem;
  overflow: hidden;
  text-align: center;
  min-height: 3em;
}

.binary-word {
  display: inline-block;
  margin: 0 6px;
  text-shadow: 0 0 8px rgba(0, 200, 255, 0.7);
}
/* 外层圆圈 */
.five-elements-ring {
  position: absolute;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  /* border: 2px solid rgba(0, 200, 255, 0.5); */
  box-shadow: 0 0 30px 5px rgba(0, 0, 0, 0.3), inset 0 0 30px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
/* 进入系统 */
.enter-button {
  background: transparent;
  border: 1px solid rgba(0, 200, 255, 0.8);
  color: rgba(0, 200, 255, 1);
  padding: 10px 30px;
  font-size: 1.2rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Orbitron", sans-serif;
  letter-spacing: 2px;
  text-shadow: 0 0 5px rgba(0, 200, 255, 0.8);
  box-shadow: 0 0 15px rgba(0, 150, 255, 0.5);
  margin-top: 210px;
}
/* 进入系统 */
.enter-button:hover {
  background-color: rgba(0, 150, 255, 0.2);
  box-shadow: 0 0 20px rgba(0, 150, 255, 0.8);
  transform: scale(1.05);
}

/* 添加一些基本的动画 */
@keyframes pulse {
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style> 