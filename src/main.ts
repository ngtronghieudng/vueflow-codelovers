import { createApp } from 'vue'
import App from '@/layouts/default.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from '@/routers/index'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router as any)
app.use(ElementPlus)

app.mount('#app')

export default app
