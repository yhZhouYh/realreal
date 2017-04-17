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
Vue.component('group', Group)
Vue.component('cell', Cell)
// Vue.use(VueTouchRipple)
//import './assets/fonts/iconfont' //引入图标字体 svg形式

//绑定fastclick
FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.filter('fixed', fixed) //过滤数值 保留小数位数

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
