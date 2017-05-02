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
import Apply from '@/components/user/Apply.vue'
import StoreUser from '@/components/user/StoreUser.vue'
import Needs from '@/components/user/Needs.vue'
import Near from '@/components/home/Near.vue'
import AddressManage from '@/components/user/AddressManage.vue'
import AddressEdit from '@/components/user/AddressEdit.vue'
import PublishNeed from '@/components/user/PublishNeed.vue'
import NeedsDetail from '@/components/user/NeedsDetail.vue'
import EnsureOrder from '@/components/order/EnsureOrder.vue'
import Collect from '@/components/user/Collect.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
     {
      path: '/storeDetail/:id',
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
      path: '/serviceList/:id',
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
      name: 'userInfo',
      component: UserInfo
    },
    {
      path: '/apply',
      name: 'apply',
      component:Apply
    },
    {
      path: '/storeUser',
      name: 'storeUser',
      component:StoreUser
    },
    {
      path: '/needs/:cid',
      name: 'needs',
      component:Needs
    },
    {
      path: '/near',
      name: 'near',
      component:Near
    },
    {
      path: '/addressManage',
      name: 'addressManage',
      component:AddressManage
    },
    {
      path: '/addressEdit',
      name: 'addressEdit',
      component:AddressEdit
    },
    {
      path: '/publishneed',
      name: 'publishneed',
      component:PublishNeed
    },
    {
      path: '/needsDetail/:id',
      name: 'needsDetail',
      component:NeedsDetail
    },
    {
      path: '/ensureOrder',
      name: 'ensureOrder',
      component:EnsureOrder
    },
    {
      path: '/collectList',
      name: 'collectList',
      component:Collect
    }
  ]
})
