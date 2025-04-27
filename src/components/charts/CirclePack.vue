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
                color: '#111111ff',
                outline: 'none'
            },
            td: {
                backgroundColor: '#FFFFFFff',
                color: '#111111ff',
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
                backgroundColor: '#FFFFFFff',
                color: '#111111ff',
                // height: 800, // 增加高度
                title: {
                    text: 'Title',
                    color: '#111111ff',
                    fontSize: 20,
                    bold: true,
                    textAlign: 'center',
                    paddingLeft: 0,
                    paddingRight: 0,
                    subtitle: {
                        color: '#111111ff',
                        text: 'Subtitle',
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
        name: '战国',
        value: 247,
        color: '#891515'
    },
    {
        name: '秦汉',
        value: 365,
        color: null
    },
    {
        name: '三国',
        value: 730,
        color: null
    },
    {
        name: '晋',
        value: 800,
        color: null
    },
    {
        name: '隋唐',
        value: 850,
        color: null
    },
    {
        name: '宋元',
        value: 1748,
        color: null
    },
    {
        name: '明',
        value: 1892,
        color: null
    },
    {
        name: '清',
        value: 2600,
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