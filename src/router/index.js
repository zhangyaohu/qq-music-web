import Router from 'src/router/router';
import VueRouter from 'vue-router';

console.log(Router);
const router = new  VueRouter({
	mode: 'history',
  routes: Router
})

export default router;