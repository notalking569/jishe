<template>
  <div class="zangxiang-page">
    <!-- 背景粒子效果 -->
    <div class="particle-background" ref="particleBackground"></div>
    
    <!-- 3D脏腑能量网络 -->
    <div class="organ-network" ref="organNetwork"></div>
    
    <!-- 数据面板 -->
    <div class="data-panel" :class="{ 'show': showDataPanel }">
      <div class="panel-header">
        <h3>{{ getOrganData(currentOrgan).title }}</h3>
        <button class="close-btn" @click="showDataPanel = false">×</button>
      </div>
      
      <div class="panel-content">
        <div class="section">
          <h4>五行制化分析</h4>
          <div class="algorithm-box">
            <div class="formula">
              <span class="element">{{ getOrganData(currentOrgan).formula.element1 }}</span>
              <span class="operator">{{ getOrganData(currentOrgan).formula.operator }}</span>
              <span class="element">{{ getOrganData(currentOrgan).formula.element2 }}</span>
            </div>
            <!-- <div class="probability">
              <div class="progress-bar">
                <div class="progress" :style="{ width: getOrganData(currentOrgan).probability + '%' }"></div>
              </div>
              <span class="percentage">{{ getOrganData(currentOrgan).probability }}%</span>
            </div> -->
            <div class="result">{{ getOrganData(currentOrgan).result }}</div>
          </div>
        </div>
        
        <div class="section">
          <h4>经典文献</h4>
          <div class="text-box">
            <div class="source">{{ getOrganData(currentOrgan).classic.source }}</div>
            <div class="content">
              {{ getOrganData(currentOrgan).classic.content }}
            </div>
          </div>
        </div>
        
        <div class="section">
          <h4>医宗金鉴</h4>
          <div class="text-box">
            <div class="source">{{ getOrganData(currentOrgan).modern.source }}</div>
            <div class="content">
              {{ getOrganData(currentOrgan).modern.content }}
            </div>
          </div>
        </div>
        
      </div>
      
    </div>
    
    <div class="section quote-section">
  <div class="text-box">
    <!-- <div class="source">《周礼·考工记》</div> -->
    <div class="content">
      “画绩之事，杂五色。东方谓之青，南方谓之赤，西方谓之白，北方谓之黑，天谓之玄，地谓之黄。”
    </div>
  </div>
</div>

    <!-- 返回按钮 -->
    <button class="back-btn" @click="router.push('/main')">
      返回主界面
    </button>



  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useRouter } from 'vue-router';

// 引用元素
const particleBackground = ref(null);
const organNetwork = ref(null);
const showDataPanel = ref(false);
const router = useRouter();

// Three.js相关变量
let scene, camera, renderer;
let organs = {};
let raycaster, mouse;
let animationFrameId = null;

// 在script setup部分添加新的响应式变量
const currentOrgan = ref('liver');

// 初始化Three.js场景
const initScene = () => {
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.03);
  
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 20;
  camera.position.y = 5;
  camera.lookAt(0, 0, 0);
  
  renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  organNetwork.value.appendChild(renderer.domElement);
  
  // 增强光源效果
  const ambientLight = new THREE.AmbientLight(0x112233);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  
  const pointLight1 = new THREE.PointLight(0x00ffff, 1, 20);
  pointLight1.position.set(10, 0, 0);
  scene.add(pointLight1);
  
  const pointLight2 = new THREE.PointLight(0xff00ff, 1, 20);
  pointLight2.position.set(-10, 0, 0);
  scene.add(pointLight2);
  
  createOrgans();
  createEnergyConnections();
  createParticles();
  
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('click', onMouseClick);
  
  animate();
};

// 创建脏腑模型
const createOrgans = () => {
  const organConfigs = {
    liver: {
      geometry: new THREE.IcosahedronGeometry(2, 1),
      color: 0x00ff00, // 木 - 青色
      position: new THREE.Vector3(-8, 0, 0),
      rotation: new THREE.Vector3(0, Math.PI / 6, 0)
    },
    heart: {
      geometry: new THREE.OctahedronGeometry(2, 1),
      color: 0xff0000, // 火 - 赤色
      position: new THREE.Vector3(0, 8, 0),
      rotation: new THREE.Vector3(Math.PI / 6, 0, 0)
    },
    spleen: {
      geometry: new THREE.DodecahedronGeometry(2, 1),
      color: 0xffff00, // 土 - 黄色
      position: new THREE.Vector3(8, 0, 0),
      rotation: new THREE.Vector3(0, -Math.PI / 6, 0)
    },
    lung: {
      geometry: new THREE.TetrahedronGeometry(2, 1),
      color: 0xffffff, // 金 - 白色
      position: new THREE.Vector3(0, -8, 0),
      rotation: new THREE.Vector3(-Math.PI / 6, 0, 0)
    },
    kidney: {
      geometry: new THREE.BoxGeometry(2, 2, 2),
      color: 0x000000, // 水 - 黑色
      position: new THREE.Vector3(0, 0, 8),
      rotation: new THREE.Vector3(0, 0, Math.PI / 6)
    }
  };
  
  Object.entries(organConfigs).forEach(([key, config]) => {
    const material = new THREE.MeshPhongMaterial({
      color: config.color,
      transparent: true,
      opacity: 0.8,
      emissive: config.color,
      emissiveIntensity: 0.5,
      shininess: 50,
      specular: 0xffffff
    });
    
    organs[key] = new THREE.Mesh(config.geometry, material);
    organs[key].position.copy(config.position);
    organs[key].rotation.setFromVector3(config.rotation);
    organs[key].castShadow = true;
    organs[key].receiveShadow = true;
    
    // 添加光晕效果
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        c: { type: 'f', value: 0.5 },
        p: { type: 'f', value: 6 },
        glowColor: { type: 'c', value: new THREE.Color(config.color) },
        viewVector: { type: 'v3', value: camera.position }
      },
      vertexShader: `
        uniform vec3 viewVector;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize(normalMatrix * normal);
          vec3 vNormel = normalize(normalMatrix * viewVector);
          intensity = pow(0.5 - dot(vNormal, vNormel), 2.0);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() {
          vec3 glow = glowColor * intensity;
          gl_FragColor = vec4(glow, 1.0);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    
    const glowMesh = new THREE.Mesh(config.geometry.clone(), glowMaterial);
    glowMesh.scale.multiplyScalar(1.2);
    organs[key].add(glowMesh);
    
    scene.add(organs[key]);
  });
};

// 创建能量连接线
const createEnergyConnections = () => {
  const connections = [
    ['liver', 'heart'],
    ['heart', 'spleen'],
    ['spleen', 'lung'],
    ['lung', 'kidney'],
    ['kidney', 'liver']
  ];
  
  connections.forEach(([start, end]) => {
    const startPos = organs[start].position;
    const endPos = organs[end].position;
    
    const curve = new THREE.QuadraticBezierCurve3(
      startPos,
      new THREE.Vector3(
        (startPos.x + endPos.x) * 0.5,
        (startPos.y + endPos.y) * 0.5,
        ((startPos.z + endPos.z) * 0.5) + 5
      ),
      endPos
    );
    
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    
    // 创建流动纹理
    const textureLoader = new THREE.TextureLoader();
    const flowTexture = textureLoader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==');
    flowTexture.wrapS = THREE.RepeatWrapping;
    flowTexture.wrapT = THREE.RepeatWrapping;
    
    const material = new THREE.LineDashedMaterial({
      color: 0x00ffff,
      linewidth: 1,
      scale: 1,
      dashSize: 3,
      gapSize: 1,
      transparent: true,
      opacity: 0.6
    });
    
    const line = new THREE.Line(geometry, material);
    line.computeLineDistances();
    scene.add(line);
  });
};

// 添加粒子系统
let particles;
const createParticles = () => {
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const sizes = [];
  const colors = [];
  
  for (let i = 0; i < 1000; i++) {
    vertices.push(
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 50
    );
    
    sizes.push(Math.random() * 2);
    
    const color = new THREE.Color();
    color.setHSL(Math.random() * 0.2 + 0.5, 0.8, 0.5);
    colors.push(color.r, color.g, color.b);
  }
  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  
  const material = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true
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

// 鼠标移动事件处理
const onMouseMove = (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  
  // 重置所有器官的发光强度
  Object.values(organs).forEach(organ => {
    organ.material.emissiveIntensity = 0.5;
  });
  
  // 高亮显示鼠标指向的器官
  if (intersects.length > 0) {
    const intersectedObject = intersects[0].object;
    const organEntry = Object.entries(organs).find(([_, organ]) => organ === intersectedObject);
    if (organEntry) {
      intersectedObject.material.emissiveIntensity = 1;
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'default';
    }
  } else {
    document.body.style.cursor = 'default';
  }
};

// 鼠标点击事件处理
const onMouseClick = (event) => {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  
  if (intersects.length > 0) {
    const intersectedObject = intersects[0].object;
    const organEntry = Object.entries(organs).find(([_, organ]) => organ === intersectedObject);
    if (organEntry) {
      currentOrgan.value = organEntry[0];
      showDataPanel.value = true;
    }
  }
};

// 动画循环
const animate = () => {
  animationFrameId = requestAnimationFrame(animate);
  
  const time = Date.now() * 0.001;
  
  // 缓慢旋转场景
  scene.rotation.y += 0.001;
  
  // 粒子动画
  if (particles) {
    particles.rotation.y += 0.001;
    const positions = particles.geometry.attributes.position.array;
    const sizes = particles.geometry.attributes.size.array;
    
    for (let i = 0; i < positions.length; i += 3) {
      const y = positions[i + 1];
      positions[i + 1] = y + Math.sin(time + i) * 0.01;
      sizes[i/3] = Math.sin(time + i) * 0.5 + 1.5;
    }
    
    particles.geometry.attributes.position.needsUpdate = true;
    particles.geometry.attributes.size.needsUpdate = true;
  }
  
  // 器官呼吸动画
  Object.values(organs).forEach((organ, index) => {
    const scale = 1 + Math.sin(time * 2 + index) * 0.05;
    organ.scale.set(scale, scale, scale);
    
    // 更新光晕效果
    organ.children[0].material.uniforms.viewVector.value = new THREE.Vector3().subVectors(
      camera.position,
      organ.position
    );
  });
  
  renderer.render(scene, camera);
};

// 添加获取器官数据的方法
const getOrganData = (organ) => {
  const data = {
    liver: {
      title: '肝脏能量分析',
      formula: { element1: '木', operator: '克', element2: '土' },
      probability: 75,
      result: '肝气犯脾',
      classic: {
        source: '《素问·五脏生成篇》',
        content: '肝者，将军之官，谋虑出焉。肝气通于目，肝和则目能辨五色矣。'
      },
      modern: {
        source: '《医宗金鉴·脏腑经络》',
        content: '肝主疏泄，喜条达而恶抑郁。肝气郁结，则胸胁胀满，情志不舒。'
      }
    },
    heart: {
      title: '心脏能量分析',
      formula: { element1: '火', operator: '克', element2: '金' },
      probability: 80,
      result: '心火亢盛',
      classic: {
        source: '《素问·灵兰秘典论》',
        content: '心者，君主之官，神明出焉。心藏神，主血脉，其华在面。'
      },
      modern: {
        source: '《医宗金鉴·心脏功能》',
        content: '心主血脉，藏神志，喜温而恶寒。心火过旺，则烦躁不安，失眠多梦。'
      }
    },
    spleen: {
      title: '脾脏能量分析',
      formula: { element1: '土', operator: '克', element2: '水' },
      probability: 70,
      result: '脾困肾虚',
      classic: {
        source: '《素问·太阴阳明论》',
        content: '脾者，仓廪之官，化物出焉。脾主运化，升清降浊。'
      },
      modern: {
        source: '《医宗金鉴·脾胃功能》',
        content: '脾主运化，喜燥恶湿。脾阳不足，则运化失司，水湿内停。'
      }
    },
    lung: {
      title: '肺脏能量分析',
      formula: { element1: '金', operator: '克', element2: '木' },
      probability: 65,
      result: '金郁伤肝',
      classic: {
        source: '《素问·宣明五气篇》',
        content: '肺者，相傅之官，治节出焉。肺主气，朝百脉，通调水道。'
      },
      modern: {
        source: '《医宗金鉴·肺系功能》',
        content: '肺主气，司呼吸，主宣发肃降。肺气不宣，则气机郁滞，胸闷气短。'
      }
    },
    kidney: {
      title: '肾脏能量分析',
      formula: { element1: '水', operator: '克', element2: '火' },
      probability: 85,
      result: '水寒侮心',
      classic: {
        source: '《素问·上古天真论》',
        content: '肾者，作强之官，伎巧出焉。肾藏精，主骨生髓。'
      },
      modern: {
        source: '《医宗金鉴·肾脏功能》',
        content: '肾藏精，主水火，纳气生长。肾阳虚衰，则命门火衰，阳气不足。'
      }
    }
  };
  
  return data[organ];
};

// 生命周期钩子
onMounted(() => {
  initScene();
});

onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize);
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('click', onMouseClick);
  
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  
  // 清理Three.js资源
  if (scene) {
    scene.clear();
  }
  
  if (renderer) {
    renderer.dispose();
  }
});
</script>

<style scoped>
.zangxiang-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #101020 0%, #060606 100%); /* 调整背景颜色 */
  overflow: hidden;
}
.particle-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.organ-network {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.data-panel {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  width: 80%;
  max-width: 800px;
  background: rgba(0, 15, 30, 0.9);
  border: 1px solid rgba(0, 200, 255, 0.3);
  border-radius: 15px;
  padding: 20px;
  color: rgba(0, 200, 255, 0.9);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 10;
  backdrop-filter: blur(10px);
}

.data-panel.show {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, -50%) scale(1);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 200, 255, 0.3);
}

.panel-header h3 {
  margin: 0;
  font-family: "Orbitron", sans-serif;
  color: rgba(0, 220, 255, 1);
  text-shadow: 0 0 5px rgba(0, 150, 255, 0.8);
}

.close-btn {
  background: none;
  border: none;
  color: rgba(0, 200, 255, 0.8);
  font-size: 24px;
  cursor: pointer;
  padding: 0 10px;
  transition: all 0.3s ease;
}

.close-btn:hover {
  color: rgba(0, 220, 255, 1);
  transform: scale(1.1);
}

.section {
  margin-bottom: 25px;
}

.section h4 {
  color: rgba(0, 220, 255, 1);
  margin-bottom: 15px;
  font-family: "Orbitron", sans-serif;
}

.algorithm-box {
  background: rgba(0, 30, 60, 0.5);
  border: 1px solid rgba(0, 200, 255, 0.3);
  border-radius: 10px;
  padding: 15px;
  text-align: center;
}

.formula {
  font-size: 24px;
  margin-bottom: 15px;
}

.element {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: rgba(0, 200, 255, 0.2);
  border-radius: 50%;
  margin: 0 10px;
}

.operator {
  color: rgba(0, 200, 255, 0.8);
  margin: 0 10px;
}

.probability {
  margin: 15px 0;
}

.progress-bar {
  height: 6px;
  background: rgba(0, 200, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #00ff00, #00ffff);
  border-radius: 3px;
  transition: width 1s ease;
}

.percentage {
  display: block;
  margin-top: 5px;
  color: rgba(0, 200, 255, 0.8);
}

.result {
  font-size: 20px;
  color: rgba(0, 220, 255, 1);
  margin-top: 15px;
}

/* .text-box {
  background: rgba(0, 30, 60, 0.5);
  border: 1px solid rgba(0, 200, 255, 0.3);
  border-radius: 10px;
  padding: 15px;
} */

/* .source {
  color: rgba(0, 220, 255, 1);
  margin-bottom: 10px;
  font-family: "STKaiti", "KaiTi", "FangSong", serif;
} */
/* 
.content {
  /* color: rgba(0, 200, 255, 0.8); */
  /* line-height: 1.6;
  font-family: "STKaiti", "KaiTi", "FangSong", serif;
} */ 

.back-btn {
  position: fixed;
  top: 15px;
  right: 20px;
  transform: none;
  background: transparent;
  border: 1px solid rgba(0, 200, 255, 0.8);
  color: rgba(0, 200, 255, 1);
  padding: 6px 16px;          /* 调整按钮内边距 */
  font-size: 0.9rem;          /* 调整字体大小 */
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  width: 8%;
}

.back-btn:hover {
  background: rgba(0, 100, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 150, 255, 0.4);  /* 稍微减弱阴影 */
}


.quote-section .text-box {
  border-left: 4px solid rgba(255, 255, 255, 0.3);
  background: rgba(0, 20, 40, 0.4);
  padding: 15px;
  font-style: italic;
}

.quote-section .content {
  font-family: "STKaiti", "KaiTi", serif;
  font-size: 15px;
  position: relative;
  top: 750px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.8;
}

@media (max-width: 768px) {
  .data-panel {
    width: 90%;
    padding: 15px;
  }
  
  .formula {
    font-size: 20px;
  }
  
  .element {
    width: 35px;
    height: 35px;
    line-height: 35px;
  }
  
  .result {
    font-size: 18px;
  }
}
</style> 