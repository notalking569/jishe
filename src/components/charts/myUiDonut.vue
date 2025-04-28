<script setup>
import { ref, defineProps, watch } from "vue";
import { VueUiDonut } from "vue-data-ui";
import "vue-data-ui/style.css"; // If you are using multiple components, place styles import in your main
//import myUiDonut from './myUiDonut.vue'

// Add props to accept data from parent component
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
});

const config = ref({
        type: 'classic',
        responsive: false,
        theme: '',
        customPalette: [],
        useCssAnimation: true,
        useBlurOnHover: true,
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
                labels: true,
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
                labels: 'Toggle labels',
                fullscreen: 'Toggle fullscreen',
                annotator: 'Toggle annotator'
            }
        },
        translations: {
            total: '全部',
            average: '平均'
        },
        table: {
            show: false,
            responsiveBreakpoint: 400,
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
                roundingPercentage: 0
            },
            columnNames: {
                series: 'Series',
                value: 'Value',
                percentage: 'Percentage'
            }
        },
        style: {
            fontFamily: 'inherit',
            chart: {
                useGradient: true,
                gradientIntensity: 40,
                backgroundColor: '#222222ff',
                color: '#FFFFFFff',
                layout: {
                    labels: {
                        dataLabels: {
                            show: true,
                            useLabelSlots: false,
                            hideUnderValue: 3,
                            prefix: '',
                            suffix: ''
                        },
                        value: {
                            rounding: 0,
                            show: true,
                            color: '#FFFFFFff',
                            formatter: null
                        },
                        percentage: {
                            color: '#FFFFFFff',
                            bold: true,
                            fontSize: 18,
                            rounding: 0,
                            formatter: null
                        },
                        name: {
                            color: '#FFFFFFff',
                            bold: false,
                            fontSize: 20
                        },
                        hollow: {
                            show: true,
                            total: {
                                show: true,
                                bold: false,
                                fontSize: 18,
                                color: '#AAAAAAff',
                                text: '全部',
                                offsetY: 0,
                                value: {
                                    color: '#FFFFFFff',
                                    fontSize: 18,
                                    bold: true,
                                    suffix: '',
                                    prefix: '',
                                    offsetY: 0,
                                    rounding: 0,
                                    formatter: null
                                }
                            },
                            average: {
                                show: true,
                                bold: false,
                                fontSize: 18,
                                color: '#FFFFFFff',
                                text: '平均',
                                offsetY: 0,
                                value: {
                                    color: '#FFFFFFff',
                                    fontSize: 18,
                                    bold: true,
                                    suffix: '',
                                    prefix: '',
                                    offsetY: 0,
                                    rounding: 0,
                                    formatter: null
                                }
                            }
                        }
                    },
                    donut: {
                        strokeWidth: 55,
                        borderWidth: 1,
                        useShadow: false,
                        shadowColor: '#1A1A1A'
                    }
                },
                comments: {
                    show: true,
                    showInTooltip: true,
                    width: 100,
                    offsetY: 0,
                    offsetX: 0
                },
                legend: {
                    show: true,
                    bold: false,
                    backgroundColor: '#22222ff',
                    color: '#FFFFFFff',
                    fontSize: 16,
                    roundingValue: 0,
                    roundingPercentage: 0
                },
                tooltip: {
                    show: true,
                    color: '#1A1A1Aff',
                    backgroundColor: '#FFFFFFff',
                    fontSize: 14,
                    customFormat: null,
                    borderRadius: 4,
                    borderColor: '#e1e5e8',
                    borderWidth: 1,
                    backgroundOpacity: 30,
                    position: 'center',
                    offsetY: 24,
                    showValue: true,
                    showPercentage: true,
                    roundingValue: 0,
                    roundingPercentage: 0
                },
                title: {
                    text: '归经分布',
                    color: '#00ffff',
                    fontSize: 18,
                    bold: true,
                    textAlign: 'center',
                    paddingLeft: 0,
                    paddingRight: 0,
                    subtitle: {
                        color: '#A1A1A1ff',
                        text: '',
                        fontSize: 16,
                        bold: false
                    }
                }
            }
        }
    });

// Default dataset for national data
const defaultDataset = [
    {
        name: '肝经',
        values: [
            650
        ],
        color: '#be0909'
    },
    {
        name: '脾经',
        values: [
            520
        ],
        color: '#6f0476'
    },
    {
        name: '肺经',
        values: [
            520
        ],
        color: '#9d4d06'
    },
    {
        name: '心经',
        values: [
            390
        ],
        color: '#027e46'
    },
    {
        name: '肾经',
        values: [
            390
        ],
        color: '#d8d118'
    },
    {
        name: '其他经络',
        values: [
            130
        ],
        color: '#e87c17'
    }
];

// Sichuan-Chongqing dataset
const sichuanDataset = [
    {
        name: '肝经',
        values: [
            580
        ],
        color: '#be0909'
    },
    {
        name: '脾经',
        values: [
            540
        ],
        color: '#6f0476'
    },
    {
        name: '肺经',
        values: [
            560
        ],
        color: '#9d4d06'
    },
    {
        name: '心经',
        values: [
            420
        ],
        color: '#027e46'
    },
    {
        name: '肾经',
        values: [
            460
        ],
        color: '#d8d118'
    },
    {
        name: '三焦经',
        values: [
            230
        ],
        color: '#e87c17'
    }
];

// Create reactive dataset that will be used in the chart
const dataset = ref(defaultDataset);

// Watch for changes to the data prop
watch(() => props.data, (newData) => {
  if (newData && newData.length > 0) {
    // If data has "三焦经" which is specific to Sichuan data
    if (newData.some(item => item.name === '三焦经')) {
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
        <VueUiDonut
            :config="config"
            :dataset="dataset"
        />

    </div>
</template>