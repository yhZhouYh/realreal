<template>
    <div class="z-page z-user-index">
        <z-header :class="{'user-header-top': changeHeader}"
                  backWords=""
                  :arrowColor="arrowColor"
                  :showBorder="false"
                  title="我的账户">
            <!--<div slot="rightitems"
                                             style="margin-right: 5px;">
                                             <icon icon=""></icon>
                                        </div>-->
            <router-link to="user-info"
                         slot="rightitems"
                         style="color: #fff">
                <icon icon="icon-fabu"></icon>
            </router-link>
        </z-header>
        <div class="z-container"
             @scroll="scroll">
            <div class="user-header">
                <div class="user-header-center zflex">
                    <img :src="img"
                         class="avatar">
                    <span class="username zflex1"
                          @click="clickusername">{{username}}</span>
                    <span class="account-manage"
                          @click="gopass">修改密码</span>
                </div>
            </div>
            <!--<div class="user-focus zflex">
                    <div class="user-focus-iem zflex zflex1 zflex-center">
                        <icon icon="icon-shoucang"
                              style="color:#f89aaa"></icon>
                        <div class="user-focus-desc">
                            <div class="red">5个</div>
                            <div>收藏</div>
                        </div>
                    </div>
                    <div class="user-focus-iem zflex zflex1 zflex-center vux-1px-l vux-1px-r">
                        <icon icon="icon-0051"
                              style="color:#eaa00d"></icon>
                        <div class="user-focus-desc">
                            <div class="red">5个</div>
                            <div>钱包</div>
                        </div>
                    </div>
                    <div class="user-focus-iem zflex zflex1 zflex-center">
                        <icon icon="icon-youhui"
                              style="color:#4cb2f2"></icon>
                        <div class="user-focus-desc">
                            <div class="red">5个</div>
                            <div>优惠</div>
                        </div>
                    </div>
                </div>-->
    
            <div class="">
                <!--<group>
                        <cell title="我的订单"
                              is-link>
                            <icon icon="icon-dingdan1"
                                  slot="icon"
                                  :horizon="true" style="color:#fab37d"></icon>
                        </cell>
                    </group>-->
                <!--<div class="order-menu zflex">
                        <router-link to="/orderList"
                           class="itembox zflex1 zflex-center zflex-col">
                            <icon icon="icon-daifukuan"></icon>
                            <div>待付款</div>
                            <div class="reddot"></div>
                        </router-link>
                        <a href="javascript:;"
                           class="itembox zflex1 zflex-center zflex-col">
                            <icon icon="icon-daiqujian"></icon>
                            <div>待取件</div>
                        </a>
                        <a href="javascript:;"
                           class="itembox zflex1 zflex-center zflex-col">
                            <icon icon="icon-buoumaotubiao41"></icon>
                            <div>维修中</div>
                        </a>
                        <a href="javascript:;"
                           class="itembox zflex1 zflex-center zflex-col">
                            <icon icon="icon-daipingjia"></icon>
                            <div>待评价</div>
                        </a>
                    </div>-->
                <group class="my-order">
                    <cell title="我的订单"
                          link="/orderList"  
                          is-link>
                        <icon icon="icon-dingdan1"
                              slot="icon"
                              :horizon="true"
                              style="color:#fab37d"></icon>
                    </cell>
                    <cell title="我的地址"
                          link="/addressManage?isManage=1"
                          is-link>
                        <icon icon="icon-dizhi1"
                              slot="icon"
                              :horizon="true"
                              style="color:#afa1ee"></icon>
                    </cell>
                    <cell title="我的收藏"
                          link="/collectList"
                          is-link>
                        <icon icon="icon-shoucang1"
                              slot="icon"
                              :horizon="true"
                              style="color:#afa1ee"></icon>
                    </cell>
                </group>
    
                <group>
                    <cell title="商铺/维修员入驻"
                          is-link
                          link="storeUser">
                        <icon icon="icon-dianpu"
                              slot="icon"
                              :horizon="true"
                              style="color:#5e97e6"></icon>
                    </cell>
                </group>
    
                <group>
                    <cell title="关于我们" to="/newsDetail/16"
                          is-link>
                        <icon icon="icon-guanyuwomen01"
                              slot="icon"
                              :horizon="true"
                              style="color:#ce77d8"></icon>
                    </cell>
                    <!--<cell title="意见反馈"
                          is-link>
                        <icon icon="icon-shequ"
                              slot="icon"
                              :horizon="true"
                              style="color:#9dd2fa"></icon>
                    </cell>-->
                    <cell title="联系客服"
                          is-link>
                        <icon icon="icon-fuwu"
                              slot="icon"
                              :horizon="true"
                              style="color:#9dead8"></icon>
                    </cell>
                </group>
    
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
    computed: {
        username() {
            if (this.user && this.user.userName) {
                return this.user.userName
            } else if (!this.user) {
                return '去登陆'
            } else {
                return '新用户'
            }
        }
    },
    data() {
        return {
            img: this.$store.state.user.userPhoto ? this.$store.state.user.userPhoto : require('../../assets/imgs/avatar.jpg'),
            changeHeader: true,
            showBorder: false,
            arrowColor: '#fff',
            user: this.$store.state.user
        }
    },
    mounted() {

    },
    methods: {
        scroll(e) {
            var _this = this
            _throttle(function () {
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
        clickusername() {
            if (!user) {
                this.$router.push('user-info')
            }
        },
        gopass() {
            this.$router.push({ name: 'register', query: { id: 'reset' } })
        }
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
    .user-focus-iem {
        padding: 0.15rem 0;
    }
}

.user-focus-desc {
    padding-left: 0.2rem;
    div {
        line-height: 1.3;
    }
}

.order-menu {
    div {
        // line-height: 1.2;
    }
}

.itembox {
    padding: 0.15rem 0;
    position: relative;
    background: #fff;
}

.reddot {
    width: 0.1rem;
    height: 0.1rem;
    border-radius: 50px;
    background: #f74c31;
    position: absolute;
    top: 0.05rem;
    right: 0.6rem;
}

.my-order {
    .weui-cells {
        margin-top: 0;
    }
}
</style>