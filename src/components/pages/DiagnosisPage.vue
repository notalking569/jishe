<template>
  <div class="diagnosis-page">
    <!-- 背景 -->
    <div class="bg-pattern"></div>
    
    <!-- 标题区域 -->
    <div class="header">
      <h1>诊断体验</h1>
      <p class="subtitle"></p>
       <!-- 返回按钮 -->
       <button class="back-btn" @click="router.push('/main')">
      返回主界面
    </button>
    </div>
    
    <!-- 问诊系统主体 -->
    <div class="diagnosis-container">
      <!-- 左侧问诊树 -->
      <div class="question-tree">
        <h2>景岳十问</h2>
        <div class="tree-content">
          <template v-for="(category, index) in questionCategories" :key="index">
            <div class="question-category">
              <div class="category-header" @click="toggleCategory(index)">
                <span class="category-icon" :class="{ 'expanded': expandedCategories[index] }">▶</span>
                <span class="category-title">{{ category.title }}</span>
              </div>
              <div class="category-items" v-show="expandedCategories[index]">
                <label v-for="(item, itemIndex) in category.items" 
                       :key="itemIndex" 
                       class="question-item">
                  <input type="checkbox" 
                         v-model="selectedSymptoms" 
                         :value="item.id"
                         @change="updateDiagnosis">
                  <span class="checkbox-custom"></span>
                  <span class="item-text">{{ item.text }}</span>
                </label>
              </div>
            </div>
          </template>
        </div>
      </div>
      
      <!-- 右侧诊断结果 -->
      <div class="diagnosis-result">
        <h2>辨证结果</h2>
        <div class="result-container">
          <div v-for="(result, index) in diagnosisResults" 
               :key="index" 
               class="result-item"
               :style="{ '--progress': result.probability + '%' }">
            <div class="result-header">
              <span class="result-name">{{ result.name }}</span>
              <span class="result-probability">{{ result.probability }}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill"></div>
            </div>
            <div class="result-reference" v-if="result.reference">
              <div class="reference-title">相关条文：</div>
              <div class="reference-content">{{ result.reference }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 展开状态管理
const expandedCategories = ref(Array(10).fill(false));
const toggleCategory = (index) => {
  expandedCategories.value[index] = !expandedCategories.value[index];
};

// 选中的症状
const selectedSymptoms = ref([]);

// 问诊分类数据
const questionCategories = reactive([
  {
    title: "一问气色",
    items: [
      { id: "q1_1", text: "面色苍白" },
      { id: "q1_2", text: "面色晦暗" },
      { id: "q1_3", text: "面色潮红" },
      { id: "q1_4", text: "面色青紫" }
    ]
  },
  {
    title: "二问寒热",
    items: [
      { id: "q2_1", text: "发热恶寒" },
      { id: "q2_2", text: "但热不寒" },
      { id: "q2_3", text: "但寒不热" },
      { id: "q2_4", text: "寒热往来" }
    ]
  },
  {
    title: "三问汗液",
    items: [
      { id: "q3_1", text: "自汗" },
      { id: "q3_2", text: "盗汗" },
      { id: "q3_3", text: "无汗" },
      { id: "q3_4", text: "冷汗" }
    ]
  },
  {
    title: "四问疼痛",
    items: [
      { id: "q4_1", text: "胸胁痛" },
      { id: "q4_2", text: "头痛" },
      { id: "q4_3", text: "腹痛" },
      { id: "q4_4", text: "腰背痛" }
    ]
  },
  {
    title: "五问饮食",
    items: [
      { id: "q5_1", text: "食欲不振" },
      { id: "q5_2", text: "口渴" },
      { id: "q5_3", text: "口不渴" },
      { id: "q5_4", text: "食后胀满" }
    ]
  },
  {
    title: "六问二便",
    items: [
      { id: "q6_1", text: "便秘" },
      { id: "q6_2", text: "腹泻" },
      { id: "q6_3", text: "小便短赤" },
      { id: "q6_4", text: "小便清长" }
    ]
  },
  {
    title: "七问耳目",
    items: [
      { id: "q7_1", text: "目赤肿痛" },
      { id: "q7_2", text: "耳鸣" },
      { id: "q7_3", text: "视物昏花" },
      { id: "q7_4", text: "目眩" }
    ]
  },
  {
    title: "八问睡眠",
    items: [
      { id: "q8_1", text: "失眠" },
      { id: "q8_2", text: "多梦" },
      { id: "q8_3", text: "嗜睡" },
      { id: "q8_4", text: "睡眠不安" }
    ]
  },
  {
    title: "九问舌象",
    items: [
      { id: "q9_1", text: "舌红" },
      { id: "q9_2", text: "舌淡" },
      { id: "q9_3", text: "苔黄" },
      { id: "q9_4", text: "苔白" }
    ]
  },
  {
    title: "十问脉象",
    items: [
      { id: "q10_1", text: "脉浮" },
      { id: "q10_2", text: "脉沉" },
      { id: "q10_3", text: "脉数" },
      { id: "q10_4", text: "脉迟" }
    ]
  }
]);

// 诊断结果
const diagnosisResults = ref([]);

// 症状与证候的关联规则
const diagnosisRules = {
  taiyang: {
    symptoms: ["q2_1", "q3_3", "q4_2", "q10_1"],
    reference: "《伤寒论》第1条：太阳之为病，脉浮，头项强痛，而恶寒。"
  },
  yangming: {
    symptoms: ["q2_2", "q5_2", "q6_1", "q9_1"],
    reference: "《伤寒论》第180条：阳明之为病，胃家实是也。"
  },
  shaoyang: {
    symptoms: ["q2_4", "q4_1", "q5_1", "q10_3"],
    reference: "《伤寒论》第263条：少阳之为病，口苦，咽干，目眩也。"
  },
  taiyin: {
    symptoms: ["q5_1", "q6_2", "q9_2", "q10_2"],
    reference: "《伤寒论》第273条：太阴之为病，腹满而吐，食不下，自利益甚。"
  },
  shaoyin: {
    symptoms: ["q2_3", "q3_2", "q8_1", "q10_4"],
    reference: "《伤寒论》第302条：少阴之为病，脉微细。"
  },
  jueyin: {
    symptoms: ["q3_4", "q5_3", "q7_2", "q10_2"],
    reference: "《伤寒论》第326条：厥阴之为病，消渴，气上撞心。"
  }
};

// 更新诊断结果
const updateDiagnosis = () => {
  const results = [];
  
  // 计算每个证候的匹配概率
  for (const [syndrome, rule] of Object.entries(diagnosisRules)) {
    const matchedSymptoms = rule.symptoms.filter(s => selectedSymptoms.value.includes(s));
    const probability = Math.round((matchedSymptoms.length / rule.symptoms.length) * 100);
    
    if (probability > 0) {
      results.push({
        name: getSyndromeName(syndrome),
        probability,
        reference: rule.reference
      });
    }
  }
  
  // 按概率排序
  diagnosisResults.value = results.sort((a, b) => b.probability - a.probability);
};

// 获取证候名称
const getSyndromeName = (syndrome) => {
  const names = {
    taiyang: "太阳病",
    yangming: "阳明病",
    shaoyang: "少阳病",
    taiyin: "太阴病",
    shaoyin: "少阴病",
    jueyin: "厥阴病"
  };
  return names[syndrome] || syndrome;
};
</script>

<style scoped>
.diagnosis-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #000510 0%, #001020 100%);
  color: #e1f5ff;
  overflow: hidden;
}

.bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle at 50% 50%, rgba(0, 100, 255, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.3;
  z-index: 1;
}

.header {
  text-align: center;
  padding: 20px;
  z-index: 2;
  position: relative;
}

.header h1 {
  font-size: 2.5em;
  margin: 0;
  background: linear-gradient(120deg, #00ffff, #0066ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(0, 150, 255, 0.5);
}

.subtitle {
  color: rgba(0, 200, 255, 0.8);
  margin-top: 5px;
}

.diagnosis-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  height: calc(100% - 150px);
  z-index: 2;
  position: relative;
}

.question-tree, .diagnosis-result {
  background: rgba(0, 20, 40, 0.7);
  border: 1px solid rgba(0, 150, 255, 0.3);
  border-radius: 15px;
  padding: 20px;
  width: 45%;
  height: 100%;
  overflow-y: auto;
  backdrop-filter: blur(10px);
}

.question-tree h2, .diagnosis-result h2 {
  color: #00ffff;
  margin-top: 0;
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.5em;
}

.question-category {
  margin-bottom: 15px;
}

.category-header {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  background: rgba(0, 100, 255, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.category-header:hover {
  background: rgba(0, 100, 255, 0.2);
}

.category-icon {
  display: inline-block;
  transition: transform 0.3s ease;
  margin-right: 10px;
  color: #00ffff;
}

.category-icon.expanded {
  transform: rotate(90deg);
}

.category-title {
  color: #00ffff;
  font-weight: bold;
}

.category-items {
  padding: 10px 0 10px 25px;
}

.question-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  position: relative;
  padding-left: 30px;
}

.question-item input[type="checkbox"] {
  display: none;
}

.checkbox-custom {
  position: absolute;
  left: 0;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(0, 150, 255, 0.5);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.question-item input[type="checkbox"]:checked + .checkbox-custom {
  background-color: rgba(0, 150, 255, 0.8);
  border-color: rgba(0, 150, 255, 0.8);
}

.question-item input[type="checkbox"]:checked + .checkbox-custom::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
}

.item-text {
  margin-left: 10px;
  color: rgba(255, 255, 255, 0.9);
}

.result-item {
  background: rgba(0, 30, 60, 0.5);
  border: 1px solid rgba(0, 150, 255, 0.3);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.result-name {
  color: #00ffff;
  font-weight: bold;
}

.result-probability {
  color: rgba(0, 255, 255, 0.9);
}

.progress-bar {
  height: 6px;
  background: rgba(0, 50, 100, 0.3);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-fill {
  height: 100%;
  width: var(--progress);
  background: linear-gradient(90deg, #0066ff, #00ffff);
  border-radius: 3px;
  transition: width 0.5s ease;
}

.result-reference {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(0, 150, 255, 0.2);
}

.reference-title {
  color: rgba(0, 200, 255, 0.9);
  margin-bottom: 5px;
  font-size: 0.9em;
}

.reference-content {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9em;
  line-height: 1.5;
  font-family: "STKaiti", "KaiTi", "FangSong", serif;
}

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


/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 30, 60, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 150, 255, 0.5);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 150, 255, 0.8);
}

@media (max-width: 768px) {
  .diagnosis-container {
    flex-direction: column;
    height: auto;
    padding: 10px;
  }
  
  .question-tree, .diagnosis-result {
    width: 100%;
    margin-bottom: 20px;
    height: auto;
    max-height: 50vh;
  }
}
</style> 