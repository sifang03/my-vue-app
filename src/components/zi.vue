<template>
    <h3>我是 Child 组件</h3>
    <p>{{ info.name }} : {{ info.age }}</p>
</template>

<script setup>
import { reactive } from "vue";
let info = reactive({ name: "张三", age: 20 });
const isChild = () => {
    console.log("我是子组件");
};
// 暴露 info 数据和 isChild 方法
defineExpose({ info, isChild });
</script>