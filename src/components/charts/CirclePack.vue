<script setup>
import { ref } from "vue";
import { VueUiCirclePack } from "vue-data-ui";
import "vue-data-ui/style.css"; // If you are using multiple components, place styles import in your main

const config = ref({
    theme: '',
    customPalette: [],
    userOptions: {
        show: true,
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        position: 'right',
        buttons: {
            tooltip: false,
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
            pdf: 'Download PDF',
            csv: 'Download CSV',
            img: 'Download PNG',
            table: 'Toggle table',
            fullscreen: 'Toggle fullscreen',
            annotator: 'Toggle annotator'
        }
    },
    table: {
        show: false,
        responsiveBreakpoint: 400,
        th: {
            backgroundColor: '#FFFFFFff',
            color: '#222222ff',
            outline: 'none'
        },
        td: {
            backgroundColor: '#FFFFFFff',
            color: '#222222ff',
            outline: 'none'
        },
        columnNames: {
            datapoint: 'Datapoint',
            value: 'Value'
        }
    },
    style: {
        fontFamily: 'inherit',
        chart: {
            backgroundColor: '#222222',
            color: '#222222ff',
            title: {
                text: '中药材产地分类统计',
                color: '#222222ff',
                fontSize: 20,
                bold: true,
                textAlign: 'center',
                paddingLeft: 0,
                paddingRight: 0,
                subtitle: {
                    color: '#222222ff',
                    text: '按产地分类统计中药材数量',
                    fontSize: 16,
                    bold: false
                }
            },
            circles: {
                stroke: '#FFFFFFff',
                strokeWidth: 1,
                gradient: {
                    show: true,
                    intensity: 40
                },
                labels: {
                    name: {
                        fontSizeRatio: 1,
                        show: true,
                        bold: false,
                        offsetY: 0,
                        color: 'auto'
                    },
                    value: {
                        fontSizeRatio: 1,
                        show: true,
                        color: 'auto',
                        rounding: 0,
                        prefix: '',
                        suffix: '',
                        formatter: null,
                        bold: false,
                        offsetY: 0
                    }
                },
                zoom: {
                    show: true,
                    shadowForce: 1,
                    opacity: 0.8,
                    animationFrameMs: 200,
                    zoomRatio: 1,
                    label: {
                        name: {
                            fontSize: 14,
                            bold: false,
                            offsetY: 0,
                            color: 'auto'
                        },
                        value: {
                            fontSize: 14,
                            bold: false,
                            offsetY: 0,
                            rounding: 0,
                            prefix: '',
                            suffix: '',
                            formatter: null,
                            color: 'auto'
                        }
                    }
                }
            }
        }
    }
});

const dataset = ref([
    {
        name: '川药',
        value: 50,
        color: '#891515'
    },
    {
        name: '北药',
        value: 15,
        color: null
    },
    {
        name: '南药',
        value: 25,
        color: null
    },
    {
        name: '关药',
        value: 10,
        color: null
    },
    {
        name: '秦药',
        value: 15,
        color: null
    },
    {
        name: '浙药',
        value: 15,
        color: null
    },
    {
        name: '淮药',
        value: 10,
        color: null
    },
    {
        name: '维药',
        value: 1,
        color: null
    },
    {
        name: '蒙药',
        value: 7,
        color: null
    },
    {
        name: '宁夏药',
        value: 1,
        color: null
    }
]);
</script>

<template>
    <!-- Using a wrapper is optional -->
    <div style="width: 100%; height: 100%;">
        <VueUiCirclePack
            :config="config"
            :dataset="dataset"
        />
    </div>
</template>