import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Index.vue'
import Store from '@/components/store/Index.vue'
import Service from '@/components/service/Index.vue'
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
      component: Store
    },
    {
      path: '/service',
      name: 'service',
      component: Service
    }
  ]
})
