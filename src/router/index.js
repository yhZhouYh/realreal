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
import NewsList from '@/components/user/News.vue'
import NewsDetail from '@/components/user/NewsDetail.vue'
import OrderDetail from '@/components/order/OrderDetail.vue'
import Appraise from '@/components/order/Appraise.vue'

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
      component: Service,
      meta: { requiresAuth: true }
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      meta: { requiresAuth: true }
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: OrderList,
      meta: { requiresAuth: true }
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
      component: User,
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
      component: UserInfo,
      meta: { requiresAuth: true }
    },
    {
      path: '/apply',
      name: 'apply',
      component: Apply
    },
    {
      path: '/storeUser',
      name: 'storeUser',
      component: StoreUser
    },
    {
      path: '/needs/:cid',
      name: 'needs',
      component: Needs,
    },
    {
      path: '/near',
      name: 'near',
      component: Near
    },
    {
      path: '/addressManage',
      name: 'addressManage',
      component: AddressManage,
      meta: { requiresAuth: true }
    },
    {
      path: '/addressEdit',
      name: 'addressEdit',
      component: AddressEdit,
      meta: { requiresAuth: true }
    },
    {
      path: '/publishneed',
      name: 'publishneed',
      component: PublishNeed,
      meta: { requiresAuth: true }
    },
    {
      path: '/needsDetail/:id',
      name: 'needsDetail',
      component: NeedsDetail
    },
    {
      path: '/ensureOrder',
      name: 'ensureOrder',
      component: EnsureOrder,
      meta: { requiresAuth: true }
    },
    {
      path: '/collectList',
      name: 'collectList',
      component: Collect,
      meta: { requiresAuth: true }
    },
    {
      path: '/newsList/:id',
      name: 'newsList',
      component: NewsList
    },
    {
      path: '/newsDetail/:id',
      name: 'newsDetail',
      component: NewsDetail
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: OrderDetail,
      meta: { requiresAuth: true }
    },
    {
      path: '/appraise/:id',
      name: 'appraise',
      component: Appraise,
      meta: { requiresAuth: true }
    }
  ]
})
