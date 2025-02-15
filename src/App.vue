<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import piewnoc from './components/piewnoc.vue';
import biaownoc from './components/biaownoc.vue';
</script>

<template>
  <div class="sssss">
    <div>
      <piewnoc />
    </div>
    <div id="biaownoc">
      <biaownoc />
    </div>
  </div>
</template>

<style scoped>
.sssss {
  display: flex;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  width: 600px;
  height: 300px;
  margin: 0;
  padding: 0;
  color: blue;
  box-sizing: border-box;
  /* 确保 padding 和 border 不会影响宽度 */
}

.sssss div {
  width: 300px;
  height: 300px;
  margin: 0;
  padding: 0;
  color: blue;
  box-sizing: border-box;
  /* 确保 padding 和 border 不会影响宽度 */
}

#biaownoc {
  width: 300px;
  height: 300px;
  margin: 0;
  padding: 0;
  color: blue;
  box-sizing: border-box;
  /* 确保 padding 和 border 不会影响宽度 */
  display: flex;
  /* 使用 flexbox 布局 */
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
}
</style>