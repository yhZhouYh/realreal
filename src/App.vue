<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
body, html{
  height:100%;
}
#app{
  position: absolute;
  width:100%;
  height:100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

.zflex {
  display: flex;
  align-items: center;
}
.zflex-center{
  justify-content: center;
}
.zflex1{
  flex:1;
}

.zicon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  position: relative;
}
</style>
