<template>
    <div class="box" ref="chartDom"></div>
    <!-- <button @click="updateChartData">点击</button> -->
</template>

<script setup lang="js">
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";

let chartDom = ref(null); // 注意变量名和 ref 名字要对应
let myChart = null;

const initChart = () => {
    if (chartDom.value) {
        myChart = echarts.init(chartDom.value);
        const option = {
            xAxis: {
                type: 'category',

                data: ['四川', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
                // name: '类别',  // X 轴名称
                // nameTextStyle: {
                //   fontSize: 22,  // 设置 X 轴名称的字体大小
                //   fontWeight: 'bold',  // 设置字体加粗
                //   color: '#333'  // 设置字体颜色
                // },
                axisLabel: {
                    rotate: 45,  // 旋转 90 度，使标签垂直显示
                    fontSize: 11,  // 设置 X 轴刻度标签的字体大小
                    color: '#1d3e51'
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    // rotate: 45,  // 旋转 90 度，使标签垂直显示
                    fontSize: 11,  // 设置 X 轴刻度标签的字体大小
                    color: '#1d3e51'
                }
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 200, 150, 80, 70],
                    type: 'bar',
                    barCategoryGap: '45%',
                    itemStyle: {
                        color: function (params) {
                            // 可以通过 params 判断颜色，比如这里根据不同的柱子设置不同颜色
                            var colorList = ['#ffbe7c', '#ff7d09', '#c59f94', '#1979b5', '#9bc639', '#f7b6d6', '#7b7d7a', '#009a9c', '#f99893'];
                            return colorList[params.dataIndex]; // 根据数据的索引值来选择颜色
                        }
                    }
                }
            ]
        };
        option && myChart.setOption(option);
    }
};



const resizeChart = () => {
    myChart?.resize();
};

onMounted(() => {
    initChart();
    window.addEventListener('resize', resizeChart);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeChart);
});
</script>

<style scoped>
.box {
    width: 300px;
    height: 300px;
    background-color: #161922;
    margin-bottom: 30px;
    margin-right: 30px;
}
</style>