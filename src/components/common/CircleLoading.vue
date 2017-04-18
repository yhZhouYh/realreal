<template>
    <transition name="zoom">
        <div class="mu-refresh-control red" v-show="showloading">
            <circular :size="24"
                    :border-width="2"
                    ></circular>
        </div>
    </transition>
</template>
<script>
import circular from 'muse-ui/src/internal/circular'
export default {
    name: 'circulars',
    props: ['showloading'],
    components: {
        circular
    }
}
</script>
<style lang="less">
@import '../../assets/styles/fn.less';
.mu-refresh-control {
    display: flex;
    margin: 0 auto;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    background-color: #FFF;
    border-radius: 50%;
    position: absolute;
    left: 0;
    right:0;
    .depth(1);
    top: 4rem;
    z-index: 90;
    .mu-icon {
        display: inline-block;
        vertical-align: middle;
    }
}

.zoom-enter-active {
    animation: zoomIn .5s;
}

.zoom-leave-active {
    animation: zoomOut .5s;
}

@keyframes zoomIn {
    0% {
        opacity: 0;
        -webkit-transform: scale3d(.3, .3, .3);
        -ms-transform: scale3d(.3, .3, .3);
        transform: scale3d(.3, .3, .3)
    }
    50% {
        opacity: 1
    }
}

@keyframes zoomOut {
    0% {
        opacity: 1
    }
    50% {
        opacity: 0;
        -webkit-transform: scale3d(.3, .3, .3);
        -ms-transform: scale3d(.3, .3, .3);
        transform: scale3d(.3, .3, .3)
    }
    100% {
        opacity: 0
    }
}
</style>