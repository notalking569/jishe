<script setup>
import { ref, defineProps, watch } from "vue";
import { VueUiSparkbar } from "vue-data-ui";
import "vue-data-ui/style.css"; // If you are using multiple components, place styles import in your main

// Add props to accept data from parent component
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
});

const config = ref({
        theme: '',
        customPalette: [],
        style: {
            fontFamily: 'inherit',
            backgroundColor: '#000000ff',
            animation: {
                show: true,
                animationFrames: 60
            },
            layout: {
                independant: true,
                percentage: true,
                target: 0,
                showTargetValue: false,
                targetValueText: ''
            },
            gutter: {
                backgroundColor: '#e1e5e8ff',
                opacity: 100
            },
            bar: {
                gradient: {
                    show: true,
                    intensity: 40,
                    underlayerColor: '#FFFFFF'
                }
            },
            labels: {
                fontSize: 12,
                name: {
                    position: 'top-left',
                    width: '100%',
                    color: '#FFFFFFff',
                    bold: true
                },
                value: {
                    show: true,
                    bold: true
                }
            },
            title: {
                text: '中草药使用频率',
                color: '#00ffff',
                fontSize: 16,
                bold: true,
                textAlign: 'center',
                margin: '0 0 6px 0',
                subtitle: {
                    color: '#CCCCCCff',
                    text: '',
                    fontSize: 0,
                    bold: false
                }
            },
            gap: 4
        }
    });

// Default dataset for all-China data
const defaultDataset = [
    {
        name: '甘草',
        value: 62,
        color: '#6376DD',
        prefix: '',
        suffix: '%',
        rounding: 1
    },
    {
        name: '人参',
        value: 43,
        color: '#42d392',
        prefix: '',
        suffix: '%',
        rounding: 1
    },
    {
        name: '当归',
        value: 35,
        color: '#ff6400',
        prefix: '',
        suffix: '%',
        rounding: 1
    },
    {
        name: '黄芪',
        value: 33,
        color: '#b90909',
        prefix: '',
        suffix: '%',
        rounding: undefined
    },
    {
        name: '黄芩',
        value: 28,
        color: '#a00d72',
        prefix: '',
        suffix: '%',
        rounding: undefined
    },
    {
        name: '黄连',
        value: 23,
        color: '#0b1a89',
        prefix: '',
        suffix: '%',
        rounding: undefined
    },
    {
        name: '白术',
        value: 22,
        color: '#0065a3',
        prefix: '',
        suffix: '%',
        rounding: undefined
    },
    {
        name: '茯苓',
        value: 15,
        color: '#067453',
        prefix: '',
        suffix: '%',
        rounding: undefined
    },
    {
        name: '桂枝',
        value: 15,
        color: '#355d04',
        prefix: '',
        suffix: '%',
        rounding: undefined
    },
   {
        name: '大黄',
        value: 12,
        color: '#9f8504',
        prefix: '',
        suffix: '%',
        rounding: undefined
    }
];

// Dataset for Sichuan-Chongqing region
const sichuanDataset = [
    {
        name: '川芎',
        value: 58,
        color: '#6376DD',
        prefix: '',
        suffix: '%',
        rounding: 1
    },
    {
        name: '党参',
        value: 47,
        color: '#42d392',
        prefix: '',
        suffix: '%',
        rounding: 1
    },
    {
        name: '川椒',
        value: 39,
        color: '#ff6400',
        prefix: '',
        suffix: '%',
        rounding: 1
    },
    {
        name: '黄连',
        value: 36,
        color: '#b90909',
        prefix: '',
        suffix: '%',
        rounding: undefined
    },
    {
        name: '独活',
        value: 32,
        color: '#a00d72',
        prefix: '',
        suffix: '%',
        rounding: undefined
    },
    {
        name: '川楝子',
        value: 28,
        color: '#0b1a89',
        prefix: '',
        suffix: '%',
        rounding: undefined
    },
    {
        name: '天麻',
        value: 25,
        color: '#0065a3',
        prefix: '',
        suffix: '%',
        rounding: undefined
    },
    {
        name: '川贝',
        value: 19,
        color: '#067453',
        prefix: '',
        suffix: '%',
        rounding: undefined
    },
    {
        name: '大黄',
        value: 14,
        color: '#355d04',
        prefix: '',
        suffix: '%',
        rounding: undefined
    }
];

// Create reactive dataset that will be used in the chart
const dataset = ref(defaultDataset);

// Watch for changes to the data prop
watch(() => props.data, (newData) => {
  if (newData && newData.length > 0) {
    // If data has a first item name matching Sichuan herbs like 川芎, use Sichuan dataset
    if (newData[0]?.name?.includes('川')) {
      dataset.value = sichuanDataset;
    } else {
      dataset.value = defaultDataset;
    }
  }
}, { immediate: true });
</script>
<template>
    <!-- Using a wrapper is optional -->
    <div :style="{ width: '100%', height:'100%'}">
        <VueUiSparkbar
            :config="config"
            :dataset="dataset"
        />
    </div>
</template>