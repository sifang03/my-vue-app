<template>
    <h3>首页</h3>
    <button @click="edit">父组件的按钮</button>
    <hr />
    <Child ref="content"></Child>
</template>

<script setup>
import Child from '../components/zi.vue';
import { onMounted, ref } from 'vue';
// 获取 Child 组件实例对象
let content = ref();

console.log("setup中使用：", content.value); // undefined

onMounted(() => {
    console.log("挂载后使用：", content.value.info);
})

const edit = () => {
    // 执行子组件中的 isChild 方法
    content.value.isChild();
    // 修改子组件中的 age 数据
    content.value.info.age++;
    console.log(content.value.info);
}
</script>