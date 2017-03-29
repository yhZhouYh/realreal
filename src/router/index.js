import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Index.vue'
import storeDetail from '@/components/store/Detail.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
     {
      path: '/storeDetail',
      name: 'storeDetail',
      component: storeDetail
    }
  ]
})
