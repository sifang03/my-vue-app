<template>
  <div class="box" ref="chartDom"></div>
  <button @click="updateChartData">点击</button>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";

let chartDom = ref(null); // 注意变量名和 ref 名字要对应
let myChart: echarts.ECharts | null = null;

const initChart = () => {
  if (chartDom.value) {
    myChart = echarts.init(chartDom.value);
    const option = {
      tooltip: {
        // 鼠标悬浮提示数据
        trigger: "axis",
        backgroundColor: "rgba(32, 33, 36,.7)",
        borderColor: "rgba(32, 33, 36,0.20)",
        borderWidth: 15,
        textStyle: {
          // 文字提示样式
          color: "#fff",
          fontSize: "12",
        },
        axisPointer: {
          // 坐标轴虚线
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      grid: {
        // 控制图表的位置
        left: "5%",
        right: "5%",
        top: "18%",
        bottom: "5%",
        containLabel: true,
      },
      xAxis: {
        axisLabel: {
          // X轴线 标签修改
          textStyle: {
            color: "white", // 坐标值得具体的颜色
            fontSize: "10",
          },
        },
        data: ["A", "B", "C", "D", "E", "F"],
      },
      yAxis: {
        axisLabel: {
          // y轴线 标签修改
          textStyle: {
            color: "white", // 坐标值得具体的颜色
          },
        },
      },
      series: [
        {
          data: [2549, 12421, 2637, 3146, 15189, 9562],
          type: "bar",
          barWidth: "48%", // 调整柱状图宽度
          itemStyle: {
            normal: {
              /*--------设置柱形图圆角 [左上角，右上角，右下角，左下角]-------------*/
              borderRadius: [12, 12, 0, 0],
              /*--------设置柱形图渐变色 -------------*/
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(0,244,255,1)",
                },
                {
                  offset: 1,
                  color: "rgba(0,77,167,1)",
                },
              ]),
            },
          },
        },
      ],
    };
    option && myChart.setOption(option);
  }
};

const updateChartData = async () => {
  try {
    const response = await fetch('/api/nihao/test'); // 使用代理解决跨域问题
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const newData = data.values; // 假设返回的 JSON 格式为 { "values": [5000, 10000, 15000, 20000, 25000, 30000] }
    console.log(chartDom.value);
    myChart?.setOption({
      series: [
        {
          data: newData,
        },
      ],
    });
  } catch (error) {
    console.error('Fetch error:', error);
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
html,
body,
.container {
  height: 100%;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.box {
  width: 200px;
  height: 200px;
  /* 设置高度为50% */
  background-color: #031a67;
  margin-bottom: 30px;
  margin-right: 30px;
  margin-left: 30px;
  margin-top: 30px;

}
</style>