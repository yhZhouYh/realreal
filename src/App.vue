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
  font-size: 15px;
  background-color: #f4f4f4;
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
@media screen and (min-width:321px) and (max-width:375px){body{font-size:13px}}
@media screen and (min-width:376px) and (max-width:414px){body{font-size:15px}}
@media screen and (min-width:415px) and (max-width:639px){body{font-size:17px}}
@media screen and (min-width:640px) and (max-width:719px){body{font-size:22px}}
@media screen and (min-width:720px) and (max-width:749px){body{font-size:24.5px}}
@media screen and (min-width:750px) and (max-width:799px){body{font-size:25.5px}}
@media screen and (min-width:800px){body{font-size:25px}}

a img {
    width:100%;
    border: 0;
}

a {
    color: #000;
}
</style>
