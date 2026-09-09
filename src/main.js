import { createApp } from 'vue'
import App from './App.vue'

// Import Styles
import './style.css'
import '@vuepic/vue-datepicker/dist/main.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

const app = createApp(App)
app.mount('#app')
