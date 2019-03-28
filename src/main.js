import Vue from 'vue'
import App from './App.vue'
import $ from 'jquery'
import router from './router'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { InfiniteScroll } from 'mint-ui';
import store from './store'



Vue.use(InfiniteScroll);
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper, /* { default global options } */)

const app = new Vue({
	router,
	store,
    render: h => h(App),
}).$mount('#app')
