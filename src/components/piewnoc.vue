<template>
  <div class="box" ref="chartDom"></div>
  <!-- <button @click="updateChartData">点击</button> -->
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
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2 // 修正拼写错误
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine', itemStyle: { color: 'green' } },
            { value: 735, name: 'Direct', itemStyle: { color: 'blue' } },
            { value: 580, name: 'Email', itemStyle: { color: 'yellow' } },
            { value: 484, name: 'Union Ads', itemStyle: { color: 'red' } }
          ]
        }
      ],
      graphic: [
        {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: '{network|网络数}\n{number|3}',
            textAlign: 'center',
            fill: 'white',
            fontSize: 16,
            rich: {
              network: {
                fontSize: 16,
                color: 'white'
              },
              number: {
                fontSize: 24,
                color: 'white',
                fontWeight: 'bold'
              }
            }
          }
        }
      ]
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
    const newData = data.values; // 假设返回的 JSON 格式为 { "values": [5000, 10000, 15000, 20000] }
    console.log(chartDom.value);
    myChart?.setOption({
      series: [
        {
          data: [
            { value: newData[0], name: 'Search Engine', itemStyle: { color: 'green' } },
            { value: newData[1], name: 'Direct', itemStyle: { color: 'blue' } },
            { value: newData[2], name: 'Email', itemStyle: { color: 'yellow' } },
            { value: newData[3], name: 'Union Ads', itemStyle: { color: 'red' } }
          ],
        },
      ],
      graphic: [
        {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: '{network|网络数}\n{number|3}',
            textAlign: 'center',
            fill: 'white',
            fontSize: 16,
            rich: {
              network: {
                fontSize: 16,
                color: 'white'
              },
              number: {
                fontSize: 24,
                color: 'white',
                fontWeight: 'bold'
              }
            }
          }
        }
      ]
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
  width: 300px;
  height: 300px;
  background-color: #161922;
  margin-bottom: 30px;
  margin-right: 30px;
}
</style>