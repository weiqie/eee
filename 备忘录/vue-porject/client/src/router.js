import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index';
import User from './views/user';
import Auth from './views/auth'
import NotFound from './views/404';
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '*',
      name: '/404',
      component: NotFound
    }
  ]
})
//路由守卫
router.beforeEach((to,from,next) =>{
  const isLogin = localStorage.eleToken ? true :false;
  if (to.path=='/auth' || to.path=='/user') {
    next();
  }else{
    isLogin ? next() : next('/auth');
  }
})
export default router;
