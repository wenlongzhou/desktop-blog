import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('@/views/Desktop'),
    },
    // {
    //   path: '/login',
    //   component: () => import(''),
    // },
  ]
});