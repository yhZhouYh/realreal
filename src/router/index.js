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
import User from '@/components/user'
import Login from '@/components/user/Login.vue'
import Register from '@/components/user/Register.vue'
import UserInfo from '@/components/user/UserInfo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
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
    },
     {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/user-info',
      name: 'UserInfo',
      component: UserInfo
    }
  ]
})
