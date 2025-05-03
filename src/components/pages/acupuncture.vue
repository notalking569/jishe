<template>
      <header class="dashboard-header">

  <div class="title">
    <h1>五行理论--针刺</h1>
  </div>

  <button class="back-btn" @click="router.push('/main')">
      返回主界面
    </button>
  <button class="history-btn" @click="router.push('/history')">
      川派历史
  </button>

</header>


  
  <!-- 左侧面板 -->
  <div class="left-panel tech-panel">
    <div class="panel-section tcm-origin">
      <h3 class="tech-title">针灸历史</h3>
      <div class="tcm-content tech-content">
        <p>
  针灸是中医学中一种古老而精妙的治疗手段，其历史可追溯至数千年前，最早的文献记载可见于《黄帝内经》，该书成书于战国至西汉时期，为针灸学的发展奠定了坚实的理论基础。
</p>
<p>
  针灸通过在人体特定穴位施用针刺或灸法，以达到调节气血、平衡阴阳、促进经络通畅的目的，进而治疗各种疾病。这种治疗方法不仅在中国传统医学中占有重要地位，而且在全球范围内也得到了广泛的认可和应用。
</p>

      </div>
    </div>
    
    <!-- 穴位列表直接展示 -->
    <div class="panel-section point-selection">
      <h3 class="tech-title">穴位列表</h3>
      <div class="points-container"></div>
    </div>
  </div>

  <div id="canvas"></div>
  <div class="sm tech-loading">
    <div class="sm_inner">
      <div class="loading tech-loading-bar"><div class="inner"></div></div>
      <div class="tips">加载中…</div>
    </div>
  </div>

  <!-- 右侧面板 -->
  <div class="right-panel tech-panel">
    <div class="panel-section point-details">
      <h3 class="tech-title">穴位详情</h3>
      <div v-if="currXueweiDetail" class="point-detail-content tech-content">
        <h4 class="tech-subtitle">{{ currXueweiDetail.name }}</h4>
        <p>
          <strong>位置：</strong>{{ currXueweiDetail.location || "暂无数据" }}
        </p>
        <p>
          <strong>功效：</strong>{{ currXueweiDetail.function || "暂无数据" }}
        </p>
        <p>
          <strong>主治：</strong>{{ currXueweiDetail.indication || "暂无数据" }}
        </p>
      </div>
      <div v-else class="point-detail-content tech-content">
        <p>请从模型中选择一个穴位查看详情</p>
      </div>
    </div>
    <div class="panel-section ancient-needles">
      <h3 class="tech-title">古代九针</h3>
      <div class="needles-content tech-content">
        <p>古代九针是中医针法中的九种针具，最早记载于《黄帝内经》：</p>
        <ul class="tech-list">
          <li><strong>镵针</strong>：用于点刺出血</li>
          <li><strong>圆针</strong>：用于按压</li>
          <li><strong>鍉针</strong>：用于刺络</li>
          <li><strong>锋针</strong>：用于刺痈疡</li>
          <li><strong>铍针</strong>：用于割治</li>
          <li><strong>员利针</strong>：用于急刺</li>
          <li><strong>毫针</strong>：用于一般刺法</li>
          <li><strong>长针</strong>：用于深部刺法</li>
          <li><strong>大针</strong>：用于排水</li>
        </ul>
      </div>
    </div>
  </div>
  <!-- 网格背景装饰 -->
  <div class="tech-grid-overlay"></div>
</template>

<script setup>
import { ref, reactive, onMounted, shallowRef } from "vue";
import { useRouter } from "vue-router";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import acupunctureData from './acupuncture.json';

// 路由
const router = useRouter();
const goToHome = () => {
  router.push('/main');
};

// 添加导航到历史页面的方法
const goToHistory = () => {
  router.push('/history');
};

// 使用 shallowRef 存储 Three.js 对象
// 这样 Vue 不会深度响应式化 Three.js 的内部属性
const scene = shallowRef(null);
const renderer = shallowRef(null);
const xuewei = shallowRef([]);
const xueweihtml = ref([]);
const currXuewei = shallowRef(null);
const currXueweiName = ref("");
const currXueweiDetail = ref(null);
const loading = ref(0);
const clipping = ref(-12);

// 将所有穴位数据整合到一个扁平对象中，方便查询
const xueweiDetails = reactive({});
const initXueweiDetails = () => {
  // 遍历JSON中的所有类别
  Object.values(acupunctureData.穴位).forEach(category => {
    // 遍历每个类别中的所有穴位
    Object.entries(category).forEach(([key, value]) => {
      xueweiDetails[key] = value;
    });
  });
};

// 初始化穴位数据
initXueweiDetails();

// 选择穴位方法
const selectXuewei = (name) => {
  currXueweiName.value = name;
  currXueweiDetail.value = xueweiDetails[name] || null;

  // 查找并选择对应的3D穴位
  xuewei.value.forEach((point) => {
    if (point.name === name) {
      // 模拟点击穴位的效果
      document.querySelectorAll(".tag").forEach((tag) => {
        if (tag.innerHTML === name) {
          tag.click();
        }
      });
    }
  });
};

// Three.js 初始化
const threeInit = () => {
  scene.value = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
  );
  renderer.value = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.value.setSize(window.innerWidth, window.innerHeight);
  renderer.value.setPixelRatio(window.devicePixelRatio);
  document.getElementById("canvas").appendChild(renderer.value.domElement);

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 35;

  // 二维位置转换函数
  function to2d(pos) {
    let vector = pos.project(camera);
    return {
      x: Math.round((0.5 + vector.x / 2) * window.innerWidth),
      y: Math.round((0.5 - vector.y / 2) * window.innerHeight),
    };
  }

  // 材质定义
  let xueweiMaterial = new THREE.MeshStandardMaterial({
    emissive: "#00ff30",
  });

  let currXueweiMaterial = new THREE.MeshStandardMaterial({
    emissive: "#ff0011",
  });

  let bodyMaterial = new THREE.MeshStandardMaterial({
    color: "#cccccc",
  });

  let dipanMaterial = new THREE.MeshStandardMaterial({
    color: "#cccccc",
  });

  // 裁剪平面
  const plane = new THREE.Plane(new THREE.Vector3(0, -1, 0), clipping.value);

  // 模型加载
  const loader = new GLTFLoader();
  loader.load("./body.gltf", function (gltf) {
    gltf.scene.scale.set(1, 1, 1);
    gltf.scene.position.set(0, 0, 0);
    loading.value += 1;

    // 载入身体材质贴图
    let textureCap = new THREE.TextureLoader().load("matcap.png", () => {
      loading.value += 1;
      let bodyMat = new THREE.MeshMatcapMaterial({
        matcap: textureCap,
      });

      bodyMat.clippingPlanes = [plane];
      renderer.value.localClippingEnabled = true;

      gltf.scene.getObjectByName("body").material = bodyMat;
    });

    // 载入底盘材质贴图
    let textureDipan = new THREE.TextureLoader().load("dipan.png", () => {
      loading.value += 1;
      let dipanMat = new THREE.MeshMatcapMaterial({
        map: textureDipan,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      });
      gltf.scene.getObjectByName("dipan").material = dipanMat;
    });

    scene.value.add(gltf.scene);

    // 遍历场景对象
    gltf.scene.traverse(function (obj) {
      //获取穴位数组
      if (obj.name !== "dipan" && obj.name !== "body") {
        xuewei.value.push(obj);
      }

      if (obj.type === "Mesh") {
        if (obj.name === "body") {
          obj.material = bodyMaterial;
        } else if (obj.name === "dipan") {
          obj.material = dipanMaterial;
        } else {
          obj.material = xueweiMaterial;
          obj.material.clippingPlanes = [plane];
        }

        // 创建穴位标签
        let tag = document.createElement("div");
        tag.classList.add("tag");
        tag.innerHTML = obj.name;

        // 穴位点击事件
        tag.addEventListener("click", () => {
          // 调整相机视角
          let a = obj.position
            .clone()
            .sub(new THREE.Vector3(0, obj.position.clone().y, 0));
          camera.position.set(0, 0, 0);
          camera.translateOnAxis(a.normalize(), 35);
          camera.lookAt(scene.value.position);

          // 更新标签样式
          document.querySelectorAll(".tag").forEach((e) => {
            e.classList.remove("tagCurr");
          });
          tag.classList.add("tagCurr");

          // 重置所有穴位样式
          xuewei.value.forEach((e) => {
            e.material = xueweiMaterial;
            e.scale.set(1, 1, 1);
          });

          // 设置当前选中穴位样式
          obj.material = currXueweiMaterial;
          obj.scale.set(2, 2, 2);
          currXuewei.value = obj;

          // 更新当前选中穴位信息
          currXueweiName.value = obj.name;
          currXueweiDetail.value = xueweiDetails[obj.name] || {
            name: obj.name,
            location: "具体位置暂无数据",
            function: "功效暂无数据",
            indication: "主治暂无数据",
          };
        });

        xueweihtml.value.push(tag);
        if (obj.name !== "dipan" && obj.name !== "body") {
          // 将穴位标签添加到新的容器中
          document.querySelector(".points-container").appendChild(tag);
        }
      }
    });
  });

  // 轨道控制器
  const controls = new OrbitControls(camera, renderer.value.domElement);
  controls.update();
  controls.autoRotate = true;
  controls.enableDamping = true;

  // 动画循环修复
  function animate() {
    requestAnimationFrame(animate);

    // 加载完成后隐藏加载界面并显示模型
    if (loading.value === 3) {
      const smElement = document.querySelector(".sm");
      const innerElement = document.querySelector(".inner");
      
      if (smElement) {
        smElement.style.display = "none";
      }
      
      if (innerElement) {
        innerElement.style.width = (loading.value / 3) * 100 + "%";
      }

      if (clipping.value < 24) {
        setTimeout(() => {
          clipping.value += 0.2;
          plane.constant = clipping.value;
        }, 300);
      }
    }

    controls.update();

    if (scene.value && renderer.value) {
      renderer.value.render(scene.value, camera);
    }
  }

  animate();

  // 窗口大小变化响应
  window.addEventListener("resize", onWindowResize, false);
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.value.setSize(window.innerWidth, window.innerHeight);
    renderer.value.clear();
    renderer.value.render(scene.value, camera);
  }
};

// 组件挂载完成后初始化
onMounted(() => {
  threeInit();
});
</script>

<style scoped>

.dashboard-header {
  position: relative;
  width: 100%;
  height: 70px;
  background: linear-gradient(to right,  rgba(16, 28, 41, 0.85),  rgba(16, 28, 41, 0.85), rgba(16, 28, 41, 0.85));
  border-bottom: 1px solid #00ffff;
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


/* 返回按钮 */
.back-btn {
  background-color: transparent;
  color: #79c3f4;
  border: 1px solid #79c3f4;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.back-btn:hover {
  background-color: rgba(121, 195, 244, 0.1);
  box-shadow: 0 0 6px #79c3f4;
}

/* 数据分析按钮 */
.history-btn {
  background-color: transparent;
  color: #79c3f4;
  border: 1px solid #79c3f4;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.history-btn:hover {
  background-color: rgba(121, 195, 244, 0.1);
  box-shadow: 0 0 6px #79c3f4;
}
@media (min-width: 701px) {
  .left-panel,
  .right-panel {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    width: 350px;
    max-height: 80vh;
    overflow-y: auto;
    z-index: 900;
  }

  .left-panel {
    left: 20px;
  }

  .right-panel {
    right: 20px;
  }
}
</style>

<style lang="scss">
:root {
  --height: 0;
  --tech-primary: #00c8ff; /* 科技蓝 */
  --tech-secondary: #7045ff; /* 科技紫 */
  --tech-accent: #00ffaa; /* 科技青 */
  --tech-dark: #0a1218; /* 深背景色 */
  --tech-darker: #060d13; /* 更深的背景色 */
  --tech-light: #e9f9ff; /* 亮色文字 */
  --tech-panel-bg: rgba(16, 28, 41, 0.85); /* 面板背景 */
  --tech-glow: 0 0 10px rgba(0, 200, 255, 0.5); /* 发光效果 */
  --tech-gradient: linear-gradient(
    135deg,
    var(--tech-primary),
    var(--tech-secondary)
  ); /* 渐变色 */
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--tech-dark);
  color: var(--tech-light);
  font-family: "Helvetica Neue", "Arial", sans-serif;
  background-image: 
    radial-gradient(circle at 50% 50%, rgba(0, 40, 60, 0.3) 0%, transparent 80%),
    radial-gradient(circle at 85% 30%, rgba(0, 166, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 15% 70%, rgba(112, 69, 255, 0.1) 0%, transparent 50%),
    linear-gradient(to bottom, var(--tech-darker) 0%, #091824 100%);
  background-attachment: fixed;
  background-size: cover;
  overflow-x: hidden;
}

/* 穴位列表样式 */
.points-container {
  display: flex;
  text-align: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
  max-height: 300px;
  overflow-y: auto;
  margin-top: 10px;
  padding-right: 5px;
  
  /* 自定义滚动条 - 科技风格 */
  &::-webkit-scrollbar {
    width: 6px;
    background: rgba(10, 18, 24, 0.4);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--tech-gradient);
    border-radius: 3px;
    box-shadow: var(--tech-glow);
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 200, 255, 0.05);
    border-radius: 3px;
  }
  
  /* Firefox 滚动条 */
  scrollbar-width: thin;
  scrollbar-color: var(--tech-primary) rgba(10, 18, 24, 0.4);
}

/* 加载页科技风格 */
.tech-loading {
  background: var(--tech-darker);
  .loading-bar {
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    overflow: hidden;
    box-shadow: var(--tech-glow);

    .inner {
      background: var(--tech-gradient);
      height: 100%;
      border-radius: 2px;
    }
  }

  .tips {
    color: var(--tech-primary);
    font-size: 14px;
    letter-spacing: 1px;
  }
}

/* 科技风格标题 */
.tech-title {
  color: var(--tech-primary);
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1px;
  margin: 0 0 15px 0;
  padding-bottom: 10px;
  position: relative;
  text-transform: uppercase;
  border-bottom: none;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: var(--tech-gradient);
    box-shadow: var(--tech-glow);
  }
}

.tech-subtitle {
  color: var(--tech-primary);
  font-size: 16px;
  margin: 0 0 15px 0;
  letter-spacing: 0.5px;
}

/* 科技风格列表 */
.tech-list {
  list-style: none;
  padding: 0;

  li {
    position: relative;
    padding-left: 20px;
    margin-bottom: 8px;
    font-size: 14px;

    &:before {
      content: "⟡";
      color: var(--tech-primary);
      position: absolute;
      left: 0;
      top: 0;
    }

    strong {
      color: var(--tech-primary);
    }
  }
}

/* 科技风格面板 */
.tech-panel {
  background: var(--tech-panel-bg);
  backdrop-filter: blur(12px); /* 增加模糊效果 */
  border: 1px solid rgba(0, 200, 255, 0.2);
  border-radius: 10px;
  box-shadow: var(--tech-glow), inset 0 0 20px rgba(0, 200, 255, 0.05);
  padding: 20px;
  position: relative;
  overflow: hidden;
  
  /* 面板内发光线 */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--tech-gradient);
    opacity: 0.7;
    box-shadow: 0 0 15px var(--tech-primary);
  }
  
  /* 边角效果 */
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    border-top: 2px solid var(--tech-accent);
    border-right: 2px solid var(--tech-accent);
    opacity: 0.7;
  }
  
  .panel-section {
    border-bottom: 1px solid rgba(0, 200, 255, 0.2);
    margin-bottom: 20px;
    padding-bottom: 15px;
    position: relative;

    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }
  }
}

/* 科技风格按钮 */
.tech-button {
  background: rgba(10, 18, 24, 0.8);
  color: var(--tech-primary);
  border: 1px solid var(--tech-primary);
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 200, 255, 0.2),
      transparent
    );
    transition: all 0.5s ease;
  }

  &:hover {
    box-shadow: 0 0 15px rgba(0, 200, 255, 0.5);
    transform: translateY(-2px);

    &:before {
      left: 100%;
    }
  }

  &.active {
    background: var(--tech-primary);
    color: var(--tech-darker);
    font-weight: bold;
    box-shadow: 0 0 15px rgba(0, 200, 255, 0.7);
  }
}

/* 科技风格内容 */
.tech-content {
  color: var(--tech-light);
  line-height: 1.6;

  p {
    margin: 10px 0;
    font-size: 14px;
  }

  strong {
    color: var(--tech-primary);
    font-weight: 600;
  }
}

/* 科技网格背景 */
.tech-grid-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(
      rgba(0, 200, 255, 0.05) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(0, 200, 255, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  z-index: -1;
}

/* 原有样式，有选择性地保留 */
.sm {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999999;
  .sm_inner {
    text-align: center;
    width: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .loading {
    width: 200px;
    height: 3px;
    .inner {
      width: 0;
      height: 100%;
    }
  }
  .tips {
    font-size: 12px;
    font-weight: bold;
    margin-top: 10px;
  }
}

/* 穴位标签样式 */
.tag {
  background: rgba(10, 18, 24, 0.8);
  color: var(--tech-primary);
  border: 1px solid rgba(0, 200, 255, 0.4);
  border-radius: 4px;
  transition: all 0.3s ease;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 12px;
  margin: 2px;
  position: relative;
  overflow: hidden;
  
  /* 悬停发光效果 */
  &:hover {
    background: rgba(0, 200, 255, 0.1);
    box-shadow: 0 0 10px rgba(0, 200, 255, 0.3);
    transform: translateY(-1px);
    
    &:before {
      opacity: 1;
    }
  }
  
  /* 动态扫描线效果 */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg, 
      transparent, 
      rgba(0, 200, 255, 0.2), 
      transparent
    );
    transition: 0.5s;
    opacity: 0;
  }
  
  /* 点击动画 */
  &:active {
    transform: scale(0.98);
  }
}

.tagCurr {
  background: var(--tech-gradient);
  color: var(--tech-darker);
  box-shadow: 0 0 10px rgba(0, 200, 255, 0.5);
  font-weight: bold;
  
  &:before {
    opacity: 0; /* 取消选中状态的扫描效果 */
  }
}

#canvas {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 0;
}

/* 响应式设计 */
@media (max-width: 700px) {
  .left-panel,
  .right-panel {
    position: static;
    transform: none;
    width: 100%;
    max-height: none;
    margin-bottom: 15px;
  }

  #canvas {
    margin-top: 250px; /* 为上面的面板留出空间 */
  }

  /* 移动端布局调整 */
  body {
    display: flex;
    flex-direction: column;
  }

  .left-panel {
    order: 1;
  }

  #canvas {
    order: 2;
  }

  .right-panel {
    order: 3;
  }
  
  .points-container {
    max-height: 200px;
  }
}

/* 添加返回按钮样式 */
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
  
  .back-icon {
    margin-right: 8px;
    font-size: 18px;
  }
  
  span {
    font-size: 14px;
    letter-spacing: 1px;
  }
  
  &:hover {
    background: rgba(0, 200, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(0, 200, 255, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
}

/* 添加历史按钮样式 */
.history-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  background: var(--tech-panel-bg);
  color: var(--tech-accent);
  padding: 10px 15px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(0, 255, 170, 0.3);
  box-shadow: 0 0 10px rgba(0, 255, 170, 0.2);
  
  &:hover {
    background: rgba(0, 255, 170, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(0, 255, 170, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
}
</style>
