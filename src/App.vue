<template>
  <div id="app">
    <transition :name="direction" :mode="mode">
      <navigation>
        <router-view></router-view>
      </navigation>
    </transition>
    <circle-loading :showloading="$store.state.loading"></circle-loading>
    <Z-footer :show="$store.state.showFooter"></Z-footer>
  </div>
</template>

<script>
import CircleLoading from '@/components/common/CircleLoading'
import ZFooter from '@/components/home/Footter'
export default {
  name: 'app',
  computed: {
    direction () {
      return this.$store.state.navigation.direction
    },
    mode () {
      console.log(1)
       return this.direction == 'forward'? 'out-in' : ''
    }   
  },
  components: {
    CircleLoading,
    ZFooter
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './assets/styles/1px.less';
* {
  box-sizing: border-box;
}

body,
html {
  height: 100%;
  font-size: 0.28rem;
  background-color: #f4f4f4;
}

body {
  max-width: 720px;
  margin: 0 auto;
  position: relative;
}

#app {
  position: absolute;
  width: 100%;
  height: 100%;
}

.forward-enter, .forword-leave-active{
  opacity: 0;
  transform: translate3d(0, 25%, 0)
}

.forward-enter-active {
  transition: all 0.3s ease;
}
.forward-leave-active {
  transition: all 0.1s ease;
}
.forward-enter{
  transform: translateX(20px);
  // opacity: 0;
}
.forward-leave-active{
  transform: translateX(-20px);
  opacity: 0;
}

.back-enter-active {
  transition: all .3s ease;
}
.back-leave-active {
  transition: all .3s ease;
}
.back-leave-active {
  z-index:100;
  transform: translateY(30px);
  opacity: 0;
}


// .forward-leave-active {
//   transition: all 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);
// }


// .back-leave{
//   z-index:10
// }

// .back-leave-active{
//   opacity: 0;
//   transform: translate3d(0, 25%, 0)
// }


// .forward-enter-active {
//   transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
// }

// .back-leave-active {
//   transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
// }





// .fade-leave-active,
// .fade-enter {
//   opacity: 0;
// }
// .fade-enter,
// .fade-enter {
//   opacity: 0;
//   transform: translate3d(0, 25%, 0)
// }

// .fade-enter{
//   opacity: 0;
//   transform: translate3d(0, 20%, 0)
// }
// .fade-enter-active{
//   animation: fadeInUp 0.5s; 
// }
// .fade-leave-active {
//   transition: opacity .2s
// }
.zflex {
  display: flex;
  align-items: center;
}

.zflex-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.zflex-center {
  justify-content: center;
}

.zflex1 {
  flex: 1;
}

.zicon {
  display: inline-block;
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  position: relative; //margin: 0 auto;
  vertical-align: middle;
}

// @media screen and (min-width:321px) and (max-width:375px) {
//   body {
//     font-size: 13px
//   }
// }
// @media screen and (min-width:376px) and (max-width:414px) {
//   body {
//     font-size: 15px
//   }
// }
// @media screen and (min-width:415px) and (max-width:639px) {
//   body {
//     font-size: 17px
//   }
// }
// @media screen and (min-width:640px) and (max-width:719px) {
//   body {
//     font-size: 22px
//   }
// }
// @media screen and (min-width:720px) and (max-width:749px) {
//   body {
//     font-size: 24.5px
//   }
// }
// @media screen and (min-width:750px) and (max-width:799px) {
//   body {
//     font-size: 25.5px
//   }
// }
// @media screen and (min-width:800px) {
//   body {
//     font-size: 25px
//   }
// }
a img {
  width: 100%;
  border: 0;
}

a {
  color: #000;
}

.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.animated.infinite {
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}

.animated.hinge {
  -webkit-animation-duration: 2s;
  animation-duration: 2s;
}





/*the animation definition*/

// @-webkit-keyframes fadeInUp {
//   0% {
//     opacity: 0;
//     -webkit-transform: translate3d(0, 100%, 0);
//     transform: translate3d(0, 100%, 0)
//   }
//   100% {
//     opacity: 1;
//     -webkit-transform: none;
//     transform: none
//   }
// }
@keyframes fadeInUp {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, 5%, 0);
    -ms-transform: translate3d(0, 5%, 0);
    transform: translate3d(0, 5%, 0)
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    -ms-transform: none;
    transform: none
  }
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0)
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    -ms-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0)
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    -ms-transform: none;
    transform: none
  }
}

.z-gray {
  color: #C7C7C7;
}

.z-red {
  color: #f9261d;
}

.z-container .weui-cells {
  margin-top: 0.2rem;
}
</style>
