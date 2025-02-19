import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import * as echarts from 'echarts'
 


const app = createApp(App)
app.use(createPinia())
app.config.globalProperties.$echarts = echarts // 全局挂载echarts
app.mount('#app')
