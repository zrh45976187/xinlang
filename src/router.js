import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'
 import Xiangqing from './views/xiangqing.vue'
  import resou from './views/resou.vue'

Vue.use(Router) // 将Router方法添加到vue构造函数中,并创建两个全局组件 router-link router-view




	
	
	const router = new Router({
		 routes: [
			  {path: '/', name: 'home', component: home,props: true},
 		 	 {path: '/xiangqing', name: 'xiangqing', component: Xiangqing, props: true},
			 {path: '/resou', name: 'resou', component: resou, props: true},
			  // {path: '/user', name: 'user', component: user,props: true},

		 ],
		
	

})
export default router
