import { createApp } from 'vue'
import App from './App.vue'
 
import * as echarts from 'echarts'
 
const app = createApp(App)
app.config.globalProperties.$echarts = echarts // 全局挂载echarts
app.mount('#app')
