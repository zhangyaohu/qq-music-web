import Vue from 'vue';
import VueRouter from 'vue-router';
import App from 'src/views/App';
import router from 'src/router/';
import './index.css';
import element from 'src/views/element/';
import store from 'src/views/store/';
import 'src/views/images/font/iconfont.css'
const _ =  require('lodash');
Vue.prototype.$_ = _

Vue.use(VueRouter);
Vue.use(element);

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})