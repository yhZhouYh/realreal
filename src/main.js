// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import store from './store'
import Group from 'vux/src/components/group'
import Cell from 'vux/src/components/cell'
import fixed from './components/filters/fixed'
import VueTouchRipple from 'vue-touch-ripple'
import './api'
import Scroller from 'muse-ui/src/infiniteScroll/infiniteScroll.vue'
import Blank from '@/components/common/Blank'

Vue.component('group', Group)
Vue.component('cell', Cell)
Vue.component('scroller', Scroller)
Vue.component('blank', Blank)

// import InfiniteLoading from 'vue-infinite-loading';
// Vue.component('infiniteLoading', InfiniteLoading)
// Vue.use(VueTouchRipple)
import './assets/fonts/iconfont' //引入图标字体 svg形式

//绑定fastclick
FastClick.attach(document.body)

// function loadScript() {  
//   var script = document.createElement("script");  
//   script.src = "http://api.map.baidu.com/api?v=2.0&ak=8uBt9y54pwbH5EXH3YlMs4f0tnWZMwvd&callback=initialize";//此为v2.0版本的引用方式  
//   // http://api.map.baidu.com/api?v=1.4&ak=您的密钥&callback=initialize"; //此为v1.4版本及以前版本的引用方式  
//   document.head.appendChild(script);  
// } 
// loadScript()
Vue.config.productionTip = true

Vue.filter('fixed', fixed) //过滤数值 保留小数位数

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.accessToken && store.state.user.userId) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})