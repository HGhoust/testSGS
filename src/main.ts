import './shared/config/styles/main.sass'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './app/router/index'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
