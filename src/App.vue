<script setup>
// 使用路由视图
</script>

<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<style>
/* 引入字体 */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap');

/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: "Orbitron", "PingFang SC", "Microsoft YaHei", sans-serif;
  background-color: #000;
  color: rgba(0, 200, 255, 0.9);
}

.app-container {
  width: 100%;
  height: 100vh;
  position: relative;
}
</style>
