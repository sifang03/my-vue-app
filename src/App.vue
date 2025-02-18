<template>
  <!-- <button @click="cccc">点击</button> -->
  <div class="nihao">
    <div class="fuangkuai">
      <piewnoc />
    </div>
    <div class="fuangkuai">
      <biaownoc ref="c" />
    </div>
  </div>
  <div>
    <zhuzhuantu />
  </div>
  <!-- <fu /> -->
</template>
<script setup lang="js">
import piewnoc from './components/piewnoc.vue';
import biaownoc from './components/biaownoc.vue';
import zhuzhuantu from './components/zhuzhuantu.vue';
import fu from './components/fu.vue';
import { ref, watch, onMounted } from 'vue';

const c = ref(null);

const cccc = () => {
  if (c.value && c.value.tableData) {
    console.log(c.value.tableData); // 访问 tableData
    c.value.tableData[0]["date"] = 'ssss';
  }
};

// watch(() => c.value, (newValue) => {
//   if (newValue) { 
//     console.log(newValue);
//   }
// });

onMounted(() => {
  console.log(c.value.tableData); // 检查组件是否正确挂载
});
</script>

<style scoped>
.nihao {
  display: flex;
  /* flex-direction: row; */
  width: 600px !important;
  height: 300px !important;
  margin: 0px;
  padding: 0px;
  background-color: #161922;
}

.fuangkuai {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 300px;
  margin: 0px;
  padding: 0px;
  background-color: #161922;
}

.app {
  display: flex;
  flex-direction: row;
}
</style>