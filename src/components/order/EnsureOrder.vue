<template>
    <div class="z-page z-ensure-order">
        <z-header :showBack="true"
                  backWords=""
                  title="确认订单">
        </z-header>
        <div class="z-container">
            <group>
                <cell :title="currentAddr.userName"
                      v-if="currentAddr"
                      link="addressManage"
                      is-link>
                    <span slot="after-title">
                                    {{currentAddr.userPhone}}
                                 </span>
                    <span slot="inline-desc">
                                    {{currentAddr.areaList | value2name}} {{currentAddr.userAddress}}
                                </span>
                </cell>
                <cell v-else
                      title="选择地址"
                      is-link
                      link="addressManage">
                </cell>
            </group>
            <div class="addr-strip"></div>
            <div class="cart-box"
                 v-for="(item,index) in items">
                <div class="cart-item vux-1px-b zflex">
                    <span slot="middle"
                          class="zflex zflex1">
                                        <icon icon="icon-dianpu" :vertical="false" class="gray"></icon>
                                        <span class="cart-title">{{item.shopName}}</span>
                    </span>
                </div>
                <div class="cart-item vux-1px-b">
                    <div class="zflex">
                        <div class="service-img"
                             :style="{backgroundImage: 'url('+item.goodsImg+')'}"></div>
                        <div class="service-name zflex1">
                            <div class="service-title">{{item.goodsName}}</div>
                            <div class="zflex">
                                <span class="zflex1 red">￥{{item.shopPrice}}</span>
                            </div>
                        </div>
                        <div>x{{item.cartNum}}</div>
                    </div>
                </div>
            </div>
            <div class="checkPay gray">选择支付方式</div>
            <div class="z-box">
                <!--<div class="order-checker vux-1px-b">
                                            <z-checker :value="1"
                                                       :model="checker"
                                                       :id="1"
                                                       type="radio"
                                                       position="right">
                                                <span></span>货到付款</z-checker>
                                        </div>-->
                <div class="order-checker">
                    <z-checker :value="2"
                               :model="checker"
                               :id="2"
                               type="radio"
                               :checked="true"
                               position="right">支付宝</z-checker>
                </div>
                <!--<div class="order-checker">
                                                        <z-checker :value="3"
                                                                   :model="checker"
                                                                   :id="3"
                                                                   type="radio">微信</z-checker>
                                                    </div>-->
            </div>
            <group>
                <x-textarea placeholder="如有特殊需求，请留言"
                            v-model="orderRemarks"></x-textarea>
            </group>
        </div>
        <div class="service-bottom zflex vux-1px-t"
             v-if="items.length">
            <div class="cart-total zflex1">合计：<span class="red">￥{{totalPrice | fixed(2)}}</span></div>
            <a href="javascript:;"
               class="buynow ripple"
               @click="orderDown">立即支付</a>
        </div>
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
import Icon from '@/components/common/Icon.vue'
import { addressList, cartList, orderDown, orderPay, changeOrderStatus } from '../../api'
import { ChinaAddressV3Data, Value2nameFilter, XTextarea } from 'vux'
import ZChecker from '../cart/CheckBox'
export default {
    name: 'ensure-order',
    components: {
        ZHeader,
        Icon,
        ZChecker,
        XTextarea
    },
    data() {
        return {
            currentAddr: this.$store.state.checkAddress.item ? this.$store.state.checkAddress.item : '',
            items: [],
            page: 1,
            limit: 50,
            checker: 2,
            orderRemarks: ''
        }
    },
    filters: {
        value2name(value) {
            return Value2nameFilter(value, ChinaAddressV3Data)
        }
    },
    destroyed() {
        this.$store.dispatch('showFooter')
    },
    created() {
        this.$store.dispatch('showFooter')
        cartList({ userid: this.$store.state.user.userId, page: this.page, limit: this.limit, isCheck: 1 }).then(res => {
            this.items = res
            let price = 0
            this.items.map((item, index) => {
                if (item.isCheck == 1) {
                    price += item.shopPrice * item.cartNum
                }

            })
            this.totalPrice = price
        })
    },
    methods: {
        orderDown() {
            if (this.currentAddr) {
                let orderInfos = ''
                orderDown({ userid: this.$store.state.user.userId, addressId: this.currentAddr.addressId, payType: this.checker, orderRemarks: this.orderRemarks }).then(res => {
                    orderInfos = res
                    return orderPay({ userid: this.$store.state.user.userId, orderId: res.orderId, payType: this.checker })
                }).then(order => {
                    if (window.api) {
                        console.error(order)
                        const aliPay = api.require('aliPay')
                        aliPay.pay({
                            subject: '正证订单',
                            body: '正证订单支付',
                            amount: orderInfos.totalMoney.toFixed(2),
                            tradeNO: orderInfos.orderunique,
                            out_trade_no:  orderInfos.orderunique
                        }, (ret, error) => {
                            console.error(ret.code)
                            if(ret.code == '9000'){
                                changeOrderStatus({userid: this.$store.state.user.userId, orderunique: orderInfos.orderunique})
                                this.$router.replace({name: 'paystatus', params:{id: 1}})
                            }else{
                                 this.$router.replace({name: 'paystatus', params:{id: ret.code}})
                            }
                        })
                        // aliPay.payOrder({
                        //     orderInfo: order
                        // }, (ret, error) => {
                        //     alert(ret.code)
                        //     if (ret.code == '9000') {
                        //         this.$router.replace({ name: 'paystatus', params: { id: 1 } })
                        //     } else {
                        //         this.$router.replace({ name: 'paystatus', params: { id: ret.code } })
                        //     }
                        // })
                    }
                })
            } else {
                this.$vux.toast.show({
                    text: '请选择地址',
                    position: 'bottom',
                    width: 'auto',
                    type: 'text'
                })
            }

        }
    }
}
</script>
<style lang='less'>
.addr-strip {
    height: 0.11rem;
    background-image: url('../../assets/imgs/addStrip.png');
    background-size: contain;
    margin-bottom: 0.2rem;
}

.z-ensure-order {
    .buynow {
        width: 2.5rem
    }
}

.order-checker {
    padding: 0.1rem 0
}

.z-box {
    .order-checker {
        &:first-child {
            padding-top: 0;
        }
        &:last-child {
            padding-bottom: 0;
        }
    }
}

.checkPay {
    font-size: 0.26rem;
    padding-left: 0.2rem;
    padding-top: 0.2rem;
}

// .z-container {
//     .weui-cells {
//         &:first-child {
//             margin-top: 0;
//         }
//     }
//     .z-box {
//         &:first-child {
//             margin-top: 0;
//         }
//     }
// }
</style>