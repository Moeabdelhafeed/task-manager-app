import './assets/style.css'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(bootstrap)
app.use(createPinia())
app.use(router)
const pinia = createPinia() 
pinia.use(({ store }) => { store.router = router }); 
app.use(pinia)
app.use(router)



app.mount('#app')
