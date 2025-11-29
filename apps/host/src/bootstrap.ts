import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index'
import './remotes' // register all remotes before app starts
import './useHistory' // navigation bridge
import './index.css'

createApp(App).use(router).mount('#app')
