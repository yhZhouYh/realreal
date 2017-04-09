import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Index.vue'
import Store from '@/components/store/Index.vue'
import Service from '@/components/service/Index.vue'
import Cart from '@/components/cart/Index.vue'
import OrderList from '@/components/order/Index.vue'
import ServiceList from '@/components/service/ServiceList.vue'
import Category from '@/components/service/Category.vue'
import Search from '@/components/service/Search.vue'
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
      path: '/service/:id',
      name: 'service',
      component: Service
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: OrderList
    },
    {
      path: '/serviceList',
      name: 'serviceList',
      component: ServiceList
    },
    {
      path: '/category',
      name: 'category',
      component: Category
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
})
