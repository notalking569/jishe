<template>
  <div class="zangxiang-page">
    <!-- 背景粒子效果 -->
    <div class="particle-background" ref="particleBackground"></div>
    
    <!-- 3D脏腑能量网络 -->
    <div class="organ-network" ref="organNetwork"></div>
    
    <!-- 导航栏 -->
    <!-- <nav class="navbar">
      <ul class="nav-list">
        <li class="nav-item dropdown">
          <button @click="navigateTo('zangxiang')">巴蜀针灸学派</button>
          <div class="dropdown-menu">
            <div class="dropdown-section">
              <h3>华佗</h3>
              <h3>张仲景</h3>
              <h3>邓铁涛</h3>
              <h3>冯伯渊</h3>
              <h3>余有金</h3>
            </div>
          </div>
        </li>
         <li class="nav-item dropdown">
          <button @click="navigateTo('school_2')">巴蜀针灸学派</button>
          <div class="dropdown-menu">
            <div class="dropdown-section">
              <h3>张仲景</h3>
              <h3>李时珍</h3>
              <h3>孙思邈</h3>
              <h3>王叔和</h3>
              <h3>陈修园</h3>
            </div>
          </div>
        </li>
        <li class="nav-item dropdown">
          <button @click="navigateTo('school_3')">巴蜀针灸学派</button>
          <div class="dropdown-menu">
            <div class="dropdown-section">
              <h3>张仲景</h3>
              <h3>李时珍</h3>
              <h3>孙思邈</h3>
              <h3>邓铁涛</h3>
              <h3>屠大力</h3>
            </div>
          </div>
        </li>
        <li class="nav-item dropdown">
          <button @click="navigateTo('school_4')">巴蜀针灸学派</button>
          <div class="dropdown-menu">
            <div class="dropdown-section">
              <h3>华佗</h3>
              <h3>张仲景</h3>
              <h3>孙思邈</h3>
              <h3>朱丹溪</h3>
              <h3>李时珍</h3>
            </div>
          </div>
        </li> -->
      <!-- </ul>
    </nav>  -->

    <div class="title">
      <h1>巴蜀历史名医</h1>
    </div>

    <!-- 图片轮播栏 -->
    <div id="banner">
      <div class="img-list img-wrapper" :style="{ width: `${imgListLength}vw` }">
        <div
          v-for="(img, index) in imgBoxList"
          :key="index"
          class="img-box"
          :style="{ transform: img.style.transform }"
          :ref="`imgBox${index}`" 
          @click="() => {
            index = index;
          }"
        >
          <img :src="img.src" alt="" @error="handleImageError" />
          <div class="info">
    <h2>{{ img.text }}</h2>
    <hr> <!-- 添加水平线 -->
    <p>{{ img.description }}</p>
  </div>
        </div>
      </div>
    </div>

    <!-- 按钮 -->
<div class="btn-group">
  <button class="last btn" @click="navigate('last')">
    <svg class="icon left" viewBox="0 0 1024 1024">
      <path d="M862.485 481.154H234.126l203.3-203.3c12.497-12.497 12.497-32.758 0-45.255s-32.758-12.497-45.255 0L135.397 489.373c-12.497 12.497-12.497 32.758 0 45.254l256.774 256.775c6.249 6.248 14.438 9.372 22.627 9.372s16.379-3.124 22.627-9.372c12.497-12.497 12.497-32.759 0-45.255l-203.3-203.301h628.36c17.036 0 30.846-13.81 30.846-30.846s-13.81-30.846-30.846-30.846z"></path>
    </svg>
  </button>
  <button class="next btn" @click="navigate('next')">
    <svg class="icon right" viewBox="0 0 1024 1024">
      <path d="M862.485 481.154H234.126l203.3-203.3c12.497-12.497 12.497-32.758 0-45.255s-32.758-12.497-45.255 0L135.397 489.373c-12.497 12.497-12.497 32.758 0 45.254l256.774 256.775c6.249 6.248 14.438 9.372 22.627 9.372s16.379-3.124 22.627-9.372c12.497-12.497 12.497-32.759 0-45.255l-203.3-203.301h628.36c17.036 0 30.846-13.81 30.846-30.846s-13.81-30.846-30.846-30.846z"></path>
    </svg>
  </button>
</div>

  </div>
</template>
<script>
import { reactive, computed, toRefs } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    // 数据定义
    const router = useRouter(); // 获取路由实例
    const state = reactive({
      imgBoxList: [
    {
      src: '/img/doctors/tangshenwei.jpg',
      text: '唐慎微',
      description: '四川崇州人，北宋著名医学家。其主要成就为编撰《经史证类备急本草》。该书规模巨大、内容详博、药物众多、方药并举，首创“方药对照”编写方法，集宋代以前中药学成就之大成，是研究中药学的重要历史文献，也是现存最早的内容完整的本草文献。',
      style: {}
    },
    {
      src: '/img/doctors/yangzijian.jpg',
      text: '杨子建',
      description: '杨子建生卒年不详，北宋眉州青神（今四川青神）人。其所著《十产论》是中国妇产科医学史上第一部较详细的助产学专著，也是世界上第一部论述难产的著作，在医学史上具有重要地位。书中记述的异常胎位转位术，早于欧洲500年。',
      style: {}
    },
    {
      src: '/img/doctors/zanyin.jpg',
      text: '昝殷',
      description: '约(797-860年)四川成都人，唐代著名妇产科学家，曾任成都医博士，著有《产宝》，对经、带、胎、产等疾病均有所论述，是我国尚能查到的第一部妇产科专书。',
      style: {}
    },
    {
      src: '/img/doctors/fuweng.jpg',
      text: '涪翁',
      description: '西汉末、东汉初，涪县(今绵阳市区)人，中医针灸鼻祖，蜀之医学先贤。著有《针经》、《诊脉法》，其中《针经》时中国学史上较早的针灸专书。',
      style: {}
    },
    {
      src: '/img/doctors/guoyu.jpg',
      text: '郭玉',
      description: '公元1-2世纪、东汉，字通直，广汉郡(今四川新都县)人，是汉和帝时最负盛名的医学家。郭玉医术高明，医德高尚， 病者虽贫贱，亦必尽其心力诊治。年少时拜程高为师，“学方诊六征之计”、“阴阳不测之术”。其医术、医德和对针灸与诊法的贡献，为朝野所叹服。《后汉书》、《东观汉记》、《华阳国志》有传。',
      style: {}
    }
  ],
      index: 0,
      imgBoxCount: 5, // 修改为5张图片
      postSpacing: 1.78,
      postSize: 25,
      showButtons: true,
    });

    // 计算 imgListLength 的值
    const imgListLength = computed(() => {
      return (state.postSize + state.postSpacing) * state.imgBoxCount;
    });
    // 导航到特定部分
    const navigateTo = (module) => {
      console.log('Navigating to:', module);
      switch(module) {
        case 'zangxiang':
          router.push('/zangxiang');
          break;
          case 'school_2':
          router.push('/school_2');
          break;
          case 'school_3':
          router.push('/school_3');
          break;
          case 'school_4':
          router.push('/school_4');
          break;
        default:
          console.log('Unknown module:', module);
      }
    };
    const navigate = (direction) => {
    updateImages(direction);
    state.showInfo[state.index] = true; // 更新 showInfo 对象
};
const updateImages = (direction) => {
  if (state.imgBoxList.length === 0) return;

  // 创建图片列表的副本
  const newList = [...state.imgBoxList];

  // 找到中间图片的索引
  const middleIndex = Math.floor(state.imgBoxCount / 2);

  // 根据方向更新图片顺序
  if (direction === 'next') {
    // 将第一张图片移动到数组的最后
    const [firstItem] = newList.splice(0, 1);
    newList.push(firstItem);
  } else if (direction === 'last') {
    // 将最后一张图片移动到数组的开头
    const [lastItem] = newList.splice(-1, 1);
    newList.unshift(lastItem);
  }

  // 更新 imgBoxList 的顺序
  state.imgBoxList = newList;

  // 更新每个图片的 transform 样式，保持 3D 效果
  state.imgBoxList.forEach((item, idx) => {
    let transformValue = '';
    if (idx === 0) {
      transformValue = 'rotateY(-30deg) translateX(-20px) scale(0.8)';
    } else if (idx === 1) {
      transformValue = 'rotateY(-20deg) translateX(-50px) scale(0.95)';
    } else if (idx === 2) {
      transformValue = 'rotateY(0deg) translateX(0px) scale(1)';
    } else if (idx === 3) {
      transformValue = 'rotateY(20deg) translateX(50px) scale(0.95)';
    } else if (idx === 4) {
      transformValue = 'rotateY(30deg) translateX(-10px) scale(0.8)';
    }

    item.style.transform = transformValue;

    // 保证 z-index 相同，避免遮挡
    item.style.zIndex = 1; // 让所有图片都保持在同一层显示
  });

  // 更新中间图片的索引
  state.index = middleIndex;
};

// 图片加载失败时的处理函数
const handleImageError = (event) => {
  console.error('Image failed to load:', event.target.src);
  event.target.src = '/img/doctors/lishizhen.png'; // 使用默认图片
};


    // 暴露给模板的函数
    return {
      ...toRefs(state), // 返回响应式对象的引用
      imgListLength,    // 返回计算属性 imgListLength
      navigate,         // 导航函数
      updateImages,     // 更新图片函数
      handleImageError, // 错误处理函数
      navigateTo,       // 导航到特定部分的函数
    };
  },
};

</script>

<style scoped>

@font-face {
    font-family: Millik;
    font-weight: 700;
    src: url(/assets/font/Millik.c3f91cb.ttf) format("truetype");
    text-rendering: optimizeLegibility;
}/* 新增的样式 */



:root {
    --greyLight: #d6d6d6;
    --greyDark: #333333;
    --post-spacing: 1.78vw;
    --post-size: 25vw;
    --mask-size: 100vw;
}

* {
    padding: 0;
    margin: 0;
    font-family: Millik, Arial, sans-serif;
    font-size: 62.5%;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

.title h1 {
  font-size: 50px; /* 设置字体大小为50像素 */
  margin-bottom: 30px; /* 底部外边距 */
  margin-top: 30px; /* 顶部外边距 */
  font-family: "KaiTi", sans-serif; /* 修改字体为楷体 */
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3); /* 添加阴影效果 */
  color: rgb(255, 255, 255);
}

.navbar {
    background-color: #333;
    padding: 10px 20px;
    width: 100%;
    height: 45px;
    border-bottom: 1px solid #ddd;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
}

.nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-around;
    width: 100%;
}

.nav-item {
    position: relative;
    height: 100%;
    margin-right: 20px;
}

.nav-item a {
    color: #fff;
    text-decoration: none;
    padding: 5px;
    display: block;
    align-items: center;
    height: 100%;
}

.nav-item a:hover {
    color: #555;
}

.nav-item.dropdown:hover .dropdown-menu {
    display: block;
}

.dropdown-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #333;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 20px;
    min-width: 200px;
    z-index: 1000;
}

.dropdown-menu .dropdown-section {
    margin-bottom: 20px;
}

.dropdown-menu .dropdown-section h3 {
    margin: 0 0 10px 0;
    font-size: 16px;
    color: #fff;
}

.dropdown-menu .dropdown-section a {
    color: #fff;
    text-decoration: none;
    display: block;
    margin-bottom: 5px;
}

.dropdown-menu .dropdown-section a:hover {
    background-color: #555;
}

#banner {
    position: relative;
    width: 100vw;
    height: calc(var(--post-size) / 0.72);
    position: absolute;
    top: 20%;
}
.img-wrapper {
  display: flex;
  position: absolute;
  width: 100%;
  max-width: 100vw;
  height: calc(var(--post-size) / 0.72);
  animation: admission 1.5s;
  transform-style: preserve-3d;
  perspective: 1200px;
  justify-content: center;
  transform: rotateY(0deg);
}


/* 修改 .img-box 的 transform 属性以实现 3D 弯曲效果 */
.img-box:nth-child(1) {
  transform: rotateY(-30deg) translateX(-20px) scale(0.8); /* More pronounced left-side curvature */
}
.img-box:nth-child(2) {
  transform: rotateY(-20deg) translateX(-50px) scale(0.95); /* More subtle left-side curvature */
}
.img-box:nth-child(3) {
  transform: rotateY(0deg) translateX(0px) scale(1); /* Center image */
}

.img-box:nth-child(4) {
  transform: rotateY(20deg) translateX(50px) scale(0.95); /* More subtle right-side curvature */
}

.img-box:nth-child(5) {
  transform: rotateY(30deg) translateX(-10px) scale(0.8); /* More pronounced right-side curvature */
}
@keyframes admission {
  0% {
    transform: translate(140vw, 0);
  }
  100% {
    transform: translate(13.39vw, 0);
  }
}


.btn-group {
    height: 15vh;
    position: absolute;
    left: 50%;
    bottom: -10%;
    transform: translate(-50%, -50%);
    transition: 1s;
}

.btn-group .btn {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1px solid #171717;
    background-color: #fff;
    margin: 10px;
    cursor: pointer;
    transition: 0.4s;
    box-sizing: border-box;
}

.btn-group .btn:hover {
    transform: scale(1.2);
    background-color: #000;
}

.btn-group .btn .icon {
    width: 30px;
    height: 30px;
}

.btn-group .btn .right {
    transform: rotate(180deg);
}

.img-list {
    left: 0;
}


.organ-network {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100px;
}
.particle-background{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100px; 
}
.zangxiang-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/public/img/doctors/herbs/bgdoc.png') no-repeat center center fixed; /* 设置背景图片 */
  background-size: cover; /* 确保背景图片覆盖整个容器 */
  overflow: hidden;
  z-index: 0;
}

@keyframes admission {
    0% {
        transform: translate(140vw, 0);
    }
    100% {
        transform: translate(13.39vw, 0);
    }
}
.img-box {
    position: relative;
    width: 300px;
    height: 450px;
    margin: 20px;
    background-color: #758a99;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    flex-shrink: 0;
    transition: background-color 0.5s ease; /* 平滑背景颜色变化 */
}
.img-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.7s ease, width 0.7s ease, height 0.7s ease, border-radius 0.7s ease, box-shadow 0.7s ease; /* 增加持续时间 */
    transform-origin: center; /* 确保变换以中心为基准 */
}
.img-box:hover {
    background-color: #758a99; /* 鼠标悬浮时背景变灰 */
}

.img-box:hover img {
    width: 300px; /* 设置小图的宽度 */
    height: 300px; /* 设置小图的高度 */
    border-radius: 50%; /* 设置小图为圆形 */
    top: -50px; /* 调整小图的位置 */
    left: 50%; /* 水平居中 */
    transform: translateX(-50%) scale(0.6); /* 细调小图的位置并缩小 */
    cursor: pointer; /* 改变鼠标指针样式 */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5); /* 添加阴影效果 */
}
.img-box .info {
    position: absolute;
    bottom: 0; /* 保持在底部 */
    width: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    color: #fff;
    padding: 20px; /* 增加内边距 */
    box-sizing: border-box;
    opacity: 0;
    transition: opacity 0.5s ease; /* 平滑显示 */
}

.img-box:hover .info {
    opacity: 1; /* 鼠标悬浮时显示信息 */
}

.img-box .info h2 {
    font-size: 30px; /* 减小字体大小 */
    margin: 0 0 10px 0; /* 减少与横线的距离 */
}
.img-box .info p {
    font-size: 14px; /* 保持字体大小 */
    margin: 0; /* 保持与横线的距离 */
}
.img-box .info hr {
    border: 0;
    height: 1px;
    background: #fff; /* 横线颜色 */
    margin: 0 0 10px 0; /* 保持与名字和简介的距离 */
}

</style>