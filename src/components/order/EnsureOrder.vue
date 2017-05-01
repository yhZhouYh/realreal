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
                    <div slot="after-title">
                        {{currentAddr.userPhone}}
                    </div>
                    <div>
                        {{currentAddr.areaList | value2name}} {{currentAddr.userAddress}}
                    </div>
                </cell>
                <cell v-else
                      title="选择地址"
                      is-link
                      link="addressManage">
    
                </cell>
            </group>
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
import { addressList, cartList } from '../../api'
import { ChinaAddressV3Data, Value2nameFilter } from 'vux'
export default {
    name: 'ensure-order',
    components: {
        ZHeader
    },
    data() {
        return {
            currentAddr: this.$store.state.checkAddress.item ? this.$store.state.checkAddress.item : null,
            items: [],
            page: 1,
            limit: 10
        }
    },
    filters: {
        value2name(value) {
            return Value2nameFilter(value, ChinaAddressV3Data)
        }
    },
    created() {
        addressList({ userid: this.$store.state.user.userId }).then(res => {
            this.currentAddr = res.filter(item => {
                return item.isDefault == 1
            })
            this.currentAddr = this.currentAddr[0]
            //暂时选择第一个
        })
        cartList({ userid: this.$store.state.user.userId, page: this.page, limit: this.limit }).then(res => {
            this.items = res
            this.$store.dispatch('checkout', res)
        })
    }
}
</script>
<style>

</style>