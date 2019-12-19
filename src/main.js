import Vue from 'vue';
import VueRouter from 'vue-router';
import App from 'src/views/App';
import router from 'src/router/';
import './index.css';
import element from 'src/views/element/';

Vue.use(VueRouter);
Vue.use(element);

new Vue({
	el: '#app',
	router,
	render: h => h(App)
})