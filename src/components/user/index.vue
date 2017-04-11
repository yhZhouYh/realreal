<template>
    <div class="z-page z-user-index">
        <z-header :class="{'user-header-top': changeHeader}"
                  :backWords="showBorder"
                  :arrowColor="arrowColor"
                  :showBorder="false"
                  title="我的账户">
            <!--<div slot="rightitems"
                             style="margin-right: 5px;">
                             <icon icon=""></icon>
                        </div>-->
        </z-header>
        <div class="z-container"
             @scroll="scroll">
            <div class="user-header">
                <div class="user-header-center zflex">
                    <img :src="img"
                         class="avatar">
                    <span class="username zflex1">王思聪</span>
                    <span class="account-manage">账号管理,修改密码</span>
                </div>
            </div>
            <div class="user-focus zflex">
                <div class="user-focus-iem zflex zflex1 zflex-center">
                    <icon icon="icon-shoucang" style="color:#f89aaa"></icon>
                    <div class="user-focus-desc">
                        <div class="red">5个</div>
                        <div>收藏</div>
                    </div>
                </div>
                <div class="user-focus-iem zflex zflex1 zflex-center vux-1px-l vux-1px-r">
                    <icon icon="icon-0051" style="color:#eaa00d"></icon>
                    <div class="user-focus-desc">
                        <div class="red">5个</div>
                        <div>收藏</div>
                    </div>
                </div>
                <div class="user-focus-iem zflex zflex1 zflex-center">
                    <icon icon="icon-youhui" style="color:#4cb2f2"></icon>
                    <div class="user-focus-desc">
                        <div class="red">5个</div>
                        <div>收藏</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import Wave from './Wave.vue'
import ZHeader from '@/components/common/ZHeader.vue'
import Icon from '../common/Icon'
import _throttle from 'lodash.throttle'
export default {
    name: 'user-index',
    components: {
        // Wave
        ZHeader,
        Icon
    },
    data() {
        return {
            img: require('../../assets/imgs/avatar.jpg'),
            changeHeader: true,
            showBorder: false,
            arrowColor: '#fff'
        }
    },
    mounted() {

    },
    methods: {
        scroll(e) {
            var _this = this
            _throttle(function () {
                console.log(e.target.scrollTop)
                if (e.target.scrollTop >= 50) {
                    _this.changeHeader = false
                    _this.showBorder = true
                    _this.arrowColor = '#e74037'
                } else {
                    _this.changeHeader = true
                    _this.showBorder = false
                    _this.arrowColor = '#fff'
                }
            }, 300)()
        },
    }
}
</script>
<style lang="less">
.user-header-top {
    background: transparent;
    color: #fff;
}

.user-header {
    background: #e53549;
    height: 3rem;
    margin-top: -0.85rem;
}




/*.z-page.z-user-index{
    position:relative;
}*/

.user-header-center {
    padding-top: 0.85rem;
    height: 2.15rem;
    padding-left: 0.3rem;
}

.avatar {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
}

.username {
    padding-left: 0.3rem;
    color: #fff;
    font-size: 0.35rem;
}

.account-manage {
    padding: 0.1rem 0.4rem 0.1rem 0.2rem;
    border-radius: 10px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
}

.user-focus {
    background: #fff;
    .zicon {
        margin: 0;
    }
    .user-focus-iem{
        padding: 0.15rem 0;
    }
}

.user-focus-desc {
    padding-left: 0.2rem;
    div {
        line-height: 1.3;
    }
}
</style>