import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Index.vue'
import Hello from '@/components/Hello.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
     {
      path: '/hello',
      name: 'Home',
      component: Hello
    }
  ]
})
