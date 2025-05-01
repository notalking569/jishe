<script setup>
import { ref, watch } from "vue";
import { VueUiWordCloud } from "vue-data-ui";
import "vue-data-ui/style.css"; // If you are using multiple components, place styles import in your main

// Add props to accept data from parent component
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
});

const config = ref({
        responsive: false,
        theme: '',
        customPalette: [],
        useCssAnimation: true,
        animationDelayMs: 20,
        userOptions: {
            show: true,
            showOnChartHover: false,
            keepStateOnChartLeave: true,
            position: 'right',
            buttons: {
                tooltip: true,
                pdf: true,
                csv: true,
                img: true,
                table: true,
                labels: false,
                fullscreen: true,
                sort: false,
                stack: false,
                animation: false,
                annotator: true
            },
            buttonTitles: {
                open: 'Open options',
                close: 'Close options',
                tooltip: 'Toggle tooltip',
                pdf: 'Download PDF',
                csv: 'Download CSV',
                img: 'Download PNG',
                table: 'Toggle table',
                fullscreen: 'Toggle fullscreen',
                annotator: 'Toggle annotator'
            }
        },
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: '#222222ff',
                color: '#1A1A1Aff',
                height: 300,
                width: 512,
                zoom: {
                    show: true,
                    color: '#CCCCCCff',
                    highlightColor: '#4A4A4A',
                    useResetSlot: false
                },
                words: {
                    maxFontSize: 75,
                    minFontSize: 10,
                    bold: false,
                    proximity: 10,
                    packingWeight: 1,
                    color: '#1A1A1Aff',
                    usePalette: true
                },
                title: {
                    text: '产地分布',
                    color: '#00ffff',
                    fontSize: 17,
                    bold: true,
                    textAlign: 'center',
                    paddingLeft: 0,
                    paddingRight: 0
                    //subtitle: {
                    //    color: '#CCCCCCff',
                    //    text: 'Subtitle',
                    //    fontSize: 16,
                    //    bold: false
                    //}
                },
                tooltip: {
                    show: true,
                    color: '#1A1A1Aff',
                    backgroundColor: '#FFFFFFff',
                    fontSize: 14,
                    customFormat: null,
                    borderRadius: 4,
                    borderColor: '#FFFFFFff',
                    borderWidth: 1,
                    backgroundOpacity: 30,
                    position: 'center',
                    offsetY: 24,
                    roundingValue: 0
                }
            }
        },
        table: {
            show: false,
            responsiveBreakpoint: 300,
            columnNames: {
                series: 'Word',
                value: 'Value'
            },
            th: {
                backgroundColor: '#FFFFFFff',
                color: '#1A1A1Aff',
                outline: 'none'
            },
            td: {
                backgroundColor: '#FFFFFFff',
                color: '#1A1A1Aff',
                outline: 'none',
                roundingValue: 0,
                prefix: '',
                suffix: ''
            }
        }
    });

// Default national dataset
const defaultDataset = [
  // { name: '北京', value: 0 },
  { name: '天津', value: 1 },
  { name: '河北', value: 46 },
  { name: '山西', value: 42 },
  { name: '内蒙古', value: 22 },
  { name: '辽宁', value: 41 },
  { name: '吉林', value: 27 },
  { name: '黑龙江', value: 31 },
  { name: '上海', value: 1 },
  { name: '江苏', value: 34 },
  { name: '浙江', value: 36 },
  { name: '安徽', value: 74 },
  { name: '福建', value: 23 },
  { name: '江西', value: 49 },
  { name: '山东', value: 86 },
  { name: '河南', value: 101 },
  { name: '湖北', value: 96 },
  { name: '湖南', value: 56 },
  { name: '广东', value: 47 },
  { name: '广西', value: 65 },
  { name: '海南', value: 11 },
  { name: '重庆', value: 32 },
  { name: '四川', value: 119 },
  { name: '贵州', value: 60 },
  { name: '云南', value: 90 },
  { name: '西藏', value: 6 },
  { name: '陕西', value: 69 },
  { name: '甘肃', value: 61 },
  { name: '青海', value: 11 },
  { name: '宁夏', value: 7 },
  { name: '新疆', value: 21 },
  { name: '天津', value: 1 }
];

// Sichuan-specific dataset (no Chongqing)
const sichuanDataset = [
  { name: '成都', value: 33 },
  { name: '德阳', value: 11 },
  { name: '自贡', value: 1 },
  { name: '攀枝花', value: 4 },
  { name: '泸州', value: 5 },
  { name: '绵阳', value: 26 },
  { name: '广元', value: 24 },
  { name: '遂宁', value: 1 },
  { name: '内江', value: 0 },
  { name: '乐山', value: 12 },
  { name: '南充', value: 10 },
  { name: '眉山', value: 6 },
  { name: '宜宾', value: 11 },
  { name: '广安', value: 3 },
  { name: '达州', value: 24 },
  { name: '雅安', value: 12 },
  { name: '巴中', value: 8 },
  { name: '资阳', value: 1 },
  { name: '阿坝', value: 9 },
  { name: '甘孜', value: 8 },
  { name: '凉山', value: 20 },
];

// Create reactive dataset that will be used in the chart
const dataset = ref(defaultDataset);

// Watch for changes to the data prop
watch(() => props.data, (newData) => {
  if (newData && newData.length > 0) {
    // If data includes "成都" as a top entry, use Sichuan dataset
    if (newData.some(item => item.name === '成都')) {
      dataset.value = sichuanDataset;
    } else {
      dataset.value = defaultDataset;
    }
  }
}, { immediate: true });

</script>
<template>
    <div :style="{ width: '100%', height: '100%', marginTop: '5px' }">
      <VueUiWordCloud
        :config="config"
        :dataset="dataset"
      />
    </div>
  </template>