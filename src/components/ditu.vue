<template>
    <div id="app">
        <div ref="chart" style="width: 100%; height: 600px;"></div>
    </div>

    <div>
        <label for="province">选择省份:</label>
        <select v-model="selectedProvince" id="province">
            <option disabled value="">请选择一个省份</option>
            <option v-for="province in provinces" :key="province" :value="province">
                {{ province }}
            </option>
        </select>
        <p>你选择的省份是: {{ selectedProvince }}</p>
    </div>

</template>

<script>
import { onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';

// 使用 import 动态加载地图数据
import chinaMapData from '../assets/mapjson/china.json';

export default {
    name: 'MapComponent',

    setup() {

        const chart = ref(null);
        const currentProvince = ref(null);  // 当前下钻的省份
        const selectedProvince = ref(''); // 绑定选中的省份，初始为空
        const provinces = ref(["", "安徽",
            "澳门",
            "北京",
            "福建",
            "甘肃",
            "广东",
            "广西",
            "贵州",
            "海南",
            "河北",
            "河南",
            "黑龙江",
            "湖北",
            "湖南",
            "吉林",
            "江苏",
            "江西",
            "辽宁",
            "内蒙古",
            "宁夏",
            "青海",
            "山东",
            "山西",
            "陕西",
            "上海",
            "四川",
            "台湾",
            "天津",
            "西藏",
            "香港",
            "新疆",
            "云南",
            "浙江",
            "重庆",]); // 下拉框的省份列表
        // 初始化 ECharts 图表
        const initChart = () => {
            echarts.registerMap('china', chinaMapData); // 注册中国地图

            const myChart = echarts.init(chart.value);

            // 设置初始中国地图
            setChinaMap(myChart);

            // 监听点击事件
            myChart.on('click', handleMapClick(myChart));
        };

        // 设置中国地图
        const setChinaMap = (myChart) => {
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}',
                },
                visualMap: {
                    min: 0,
                    max: 100,
                    text: ['高', '低'],
                    calculable: true,
                    inRange: {
                        color: ['#e0ffff', '#006edd'],
                    },
                },
                series: [
                    {
                        name: '中国',
                        type: 'map',
                        mapType: 'china', // 使用已经注册的中国地图
                        // roam: true, // 启用地图拖拽
                        label: {
                            show: true,
                            formatter: '{b}',
                        },
                    },
                ],
            };

            myChart.setOption(option);
        };


        const updateMap = async () => {
            if (selectedProvince.value === '') {
                // const provinceMapData = await import(`../assets/mapjson/${selectedProvince.value.toLowerCase()}.json`);
                const myChart = echarts.init(chart.value);
                const option = {
                    series: [
                        {
                            name: "中国",
                            type: 'map',
                            mapType: "china", // 使用已注册的省级地图
                            // roam: true,
                            label: {
                                show: true,
                                formatter: '{b}',
                            },
                            data: [
                                { name: '合肥', value: 50 },
                                { name: '芜湖', value: 40 },
                                // 更多市级数据...
                            ],
                        },
                    ],
                };

                myChart.setOption(option);
                return;
            }

            try {
                // 动态加载省级地图数据
                const provinceMapData = await import(`../assets/mapjson/${selectedProvince.value.toLowerCase()}.json`);
                const myChart = echarts.init(chart.value);
                echarts.registerMap(selectedProvince.value, provinceMapData.default); // 注册省级地图

                const option = {
                    series: [
                        {
                            name: selectedProvince.value,
                            type: 'map',
                            mapType: selectedProvince.value, // 使用已注册的省级地图
                            // roam: true,
                            label: {
                                show: true,
                                formatter: '{b}',
                            },
                            data: [
                                { name: '合肥', value: 50 },
                                { name: '芜湖', value: 40 },
                                // 更多市级数据...
                            ],
                        },
                    ],
                };

                myChart.setOption(option);
            } catch (error) {
                console.error('地图加载失败:', error);
            }
        };
        // 处理地图点击事件（下钻到省市级）
        const handleMapClick = (myChart) => (params) => {

            if (params.name !== '中国') {
                currentProvince.value = params.name;
                console.log('点击了 ' + currentProvince.value);

                // 加载该省的市级地图数据
                // alert(currentProvince.value);
                setProvinceMap(myChart, currentProvince.value);
            }
        };

        // 设置省级地图
        const setProvinceMap = (myChart, provinceName) => {
            let provinceMapData;
            try {
                // 使用 import() 动态导入省级地图
                // alert(provinceName.toLowerCase())
                import(`../assets/mapjson/${provinceName.toLowerCase()}.json`).then((module) => {
                    provinceMapData = module.default;
                    echarts.registerMap(provinceName, provinceMapData); // 注册省级地图

                    // 更新图表的配置，展示该省的地图
                    const option = {
                        series: [
                            {
                                name: provinceName,
                                type: 'map',
                                mapType: provinceName, // 使用已注册的省级地图
                                roam: true,
                                label: {
                                    show: true,
                                    formatter: '{b}',
                                },
                                data: [
                                    { name: '合肥', value: 50 },
                                    { name: '芜湖', value: 40 },
                                    // 其他市级数据
                                ],
                            },
                        ],
                    };

                    myChart.setOption(option);
                });
            } catch (e) {
                console.error(`${provinceName} 地图数据未找到`);
            }
        };

        // 在组件挂载时初始化图表
        onMounted(() => {
            initChart();
        });

        watch(selectedProvince, () => {
            updateMap();
        });

        return {
            chart,
            currentProvince,
            selectedProvince,
            provinces,
            updateMap,
        };
    },
};
</script>

<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
