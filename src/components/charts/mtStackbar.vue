<script setup>
import { FALSE } from "sass";
import { ref, defineProps, watch } from "vue";
import { VueUiStackbar } from "vue-data-ui";
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
        responsive: false,
        customPalette: [],
        useCssAnimation: true,
        orientation: 'vertical',
        table: {
            show: false,
            responsiveBreakpoint: 400,
            columnNames: {
                period: 'Period',
                total: 'Total'
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
                roundingValue: 0
            }
        },
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
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: '#000000ff',
                color: '#111111ff',
                height: 250,
                width: 800,
                padding: {
                    top: 12,
                    right: 12,
                    bottom: 36,
                    left: 48
                },
                title: {
                    text: '中草药来源部位统计',
                    color: '#00ffff',
                    fontSize: 16,
                    bold: true,
                    textAlign: 'center',
                    paddingLeft: 0,
                    paddingRight: 0
                   /* subtitle: {
                        color: '#A1A1A1ff',
                        text: 'Subtitle',
                        fontSize: 16,
                        bold: false
                    }*/
                },
                legend: {
                    show: true,
                    bold: false,
                    backgroundColor: '#000000ff',
                    color: '#FFFFFFff',
                    fontSize: 14
                },
                zoom: {
                    show: true,
                    color: '#CCCCCCff',
                    highlightColor: '#4A4A4A',
                    fontSize: 14,
                    useResetSlot: false,
                    startIndex: null,
                    endIndex: null,
                    enableRangeHandles: true,
                    enableSelectionDrag: true
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
                    roundingPercentage: 0,
                    showTimeLabel: true
                },
                highlighter: {
                    color: '#1A1A1Aff',
                    opacity: 5
                },
                bars: {
                    gapRatio: 0.5,
                    distributed: false,
                    showDistributedPercentage: true,
                    borderRadius: 0,
                    strokeWidth: 1,
                    gradient: {
                        show: true,
                        intensity: 20
                    },
                    totalValues: {
                        show: true,
                        offsetY: 0,
                        fontSize: 18,
                        bold: false,
                        color: '#FFFFFFff'
                    },
                    dataLabels: {
                        show: true,
                        hideEmptyValues: false,
                        hideEmptyPercentages: false,
                        adaptColorToBackground: true,
                        color: '#FFFFFFff',
                        fontSize: 16,
                        bold: false,
                        rounding: 0,
                        prefix: '',
                        suffix: '',
                        formatter: null
                    }
                },
                grid: {
                    scale: {
                        ticks: 10,
                        scaleMin: null,
                        scaleMax: null
                    },
                    x: {
                        showAxis: true,
                        showHorizontalLines: false,
                        axisColor: '#E1E5E8',
                        axisThickness: 2,
                        axisName: {
                            show: true,
                            fontSize: 14,
                            color: '#1A1A1Aff',
                            bold: false,
                            offsetY: 0
                        },
                        timeLabels: {
                            show: true,
                            values: [
                                '根部',
                                '果实/种子',
                                '全草',
                                '茎',
                                '叶类',
                                '花类',
                                '其他'
                            ],
                            offsetY: 0,
                            rotation: 0,
                            fontSize: 20,
                            color: '#FFFFFFff',
                            bold: false
                        }
                    },
                    y: {
                        showAxis: FALSE,
                        showVerticalLines: false,
                        axisColor: '#E1E5E8',
                        axisThickness: 2,
                        axisName: {
                            show: true,
                            fontSize: 14,
                            color: '#1A1A1Aff',
                            bold: false,
                            offsetX: 0
                        },
                        axisLabels: {
                            show: true,
                            color: '#FFFFFFff',
                            fontSize: 14,
                            bold: false,
                            rounding: 0
                        }
                    }
                }
            }
        }
    });

// Watch config to update x-axis labels when switching datasets
watch(() => props.data, (newData) => {
  if (newData && newData.length > 0) {
    // Check if we need to update to Sichuan-specific categories
    if (newData[0]?.category?.includes('树皮') || newData.some(item => item.category === '树皮')) {
      config.value.style.chart.grid.x.timeLabels.values = [
        '动物',
        '果实/种子',
        '全草',
        '根/茎',
        '叶类',
        '花类',
        '其他'
      ];
    } else {
      config.value.style.chart.grid.x.timeLabels.values = [
        '动物',
        '果实/种子',
        '全草',
        '根/茎',
        '叶类',
        '花类',
        '其他'
      ];
    }
  }
}, { immediate: true });

// Default dataset for national data
const defaultDataset = [
    {
        name: '数量',
        series: [
            42,
            159,
            57,
            189,
            22,
            32,
            94
        ],
        color: '#003d75'
    }
];

// Dataset for Sichuan-Chongqing
const sichuanDataset = [
    {
        name: '数量',
        series: [
            520,
            480,
            390,
            310,
            260,
            190,
            130
        ],
        color: '#003d75'
    }
];

// Create reactive dataset that will be used in the chart
const dataset = ref(defaultDataset);

// Watch for changes to the data prop
watch(() => props.data, (newData) => {
  if (newData && newData.length > 0) {
    // If data includes the "树皮" category (typical for Sichuan dataset)
    if (newData.some(item => item.category === '树皮')) {
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
        <VueUiStackbar
            :config="config"
            :dataset="dataset"
        />
    </div>
</template>