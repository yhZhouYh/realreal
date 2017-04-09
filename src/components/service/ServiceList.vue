<template>
    <div class="z-page z-service-list">
        <z-header :showBack="true"
                  backWords=""
                  :title="title">
            <div slot="rightitems"
                 style="margin-right: 5px;">
                <svg class="zicon zheader-icon zflex"
                     aria-hidden="true">
                    <use xlink:href="#real-icon-search"></use>
                </svg>
                <p class="zheader-icon-word">搜索</p>
            </div>
        </z-header>
        <div class="z-container">
            <div class="z-button-tab">
                <button-tab v-model="selected">
                    <button-tab-item selected :value="0">服务</button-tab-item>
                    <button-tab-item :value="1">商家</button-tab-item>
                </button-tab>
            </div>
            <div v-show="selected == 0">
                <div class="z-box"
                    v-for="item in serviceItems">
                <service-item container=".z-store-detail"
                        :item="item"
                        :key="item">
                </service-item>     
                </div>
            </div>
            <div class="z-storeItems">
                <store-item v-for="item in storeItems" :key="item" :item="item" v-show="selected==1"></store-item>
            </div>
            
        </div>
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
import ButtonTab from 'vux/src/components/button-tab/button-tab.vue'
import ButtonTabItem from 'vux/src/components/button-tab/button-tab-item.vue'
import ServiceItem from '../store/ServiceItem.vue'
import StoreItem from './StoreItem.vue'
export default {
    name: 'serviceList',
    components: {
        ZHeader,
        ButtonTab,
        ButtonTabItem,
        ServiceItem,
        StoreItem
    },
    data() {
        return {
            title: '服务列表',
            serviceItems: [
                { id: 1, src: require('../../assets/imgs/test.png'), title: '滚筒洗衣机上门维修(检测费)', desc: '服务内容：1.总费用=一口价+特殊配置特殊配置特殊配置特殊配置', price: 49, unit: '项', sale: 418,StoreName:'到家维修' },
                { id: 1, src: require('../../assets/imgs/test.png'), title: '滚筒洗衣机上门维修(检测费)', desc: '服务内容：1.总费用=一口价+特殊配置特殊配置特殊配置特殊配置', price: 49, unit: '项', sale: 418,StoreName:'到家维修' },
                { id: 1, src: require('../../assets/imgs/test.png'), title: '滚筒洗衣机上门维修(检测费)', desc: '服务内容：1.总费用=一口价+特殊配置特殊配置特殊配置特殊配置', price: 49, unit: '项', sale: 418,StoreName:'到家维修' },
                { id: 1, src: require('../../assets/imgs/test.png'), title: '滚筒洗衣机上门维修(检测费)', desc: '服务内容：1.总费用=一口价+特殊配置特殊配置特殊配置特殊配置', price: 49, unit: '项', sale: 418,StoreName:'到家维修' },
                { id: 1, src: require('../../assets/imgs/test.png'), title: '滚筒洗衣机上门维修(检测费)', desc: '服务内容：1.总费用=一口价+特殊配置特殊配置特殊配置特殊配置', price: 49, unit: '项', sale: 418,StoreName:'到家维修' },
                { id: 1, src: require('../../assets/imgs/test.png'), title: '滚筒洗衣机上门维修(检测费)', desc: '服务内容：1.总费用=一口价+特殊配置特殊配置特殊配置特殊配置', price: 49, unit: '项', sale: 418,StoreName:'到家维修' },
                { id: 1, src: require('../../assets/imgs/test.png'), title: '滚筒洗衣机上门维修(检测费)', desc: '服务内容：1.总费用=一口价+特殊配置特殊配置特殊配置特殊配置', price: 49, unit: '项', sale: 418,StoreName:'到家维修' },
                { id: 1, src: require('../../assets/imgs/test.png'), title: '滚筒洗衣机上门维修(检测费)', desc: '服务内容：1.总费用=一口价+特殊配置特殊配置特殊配置特殊配置', price: 49, unit: '项', sale: 418,StoreName:'到家维修' },
                { id: 1, src: require('../../assets/imgs/test.png'), title: '滚筒洗衣机上门维修(检测费)', desc: '服务内容：1.总费用=一口价+特殊配置特殊配置特殊配置特殊配置', price: 49, unit: '项', sale: 418,StoreName:'到家维修' }
            ],
            storeItems: [
                 { id: 1, src: require('../../assets/imgs/storetest.jpg'), title: '滚筒洗衣机上门维修(检测费)', desc: '服务内容：1.总费用=一口价+特殊配置特殊配置特殊配置特殊配置', price: 49, unit: '项', sale: 418,StoreName:'到家维修' },
                { id: 1, src: require('../../assets/imgs/storetest.jpg'), title: '滚筒洗衣机上门维修(检测费)', desc: '服务内容：1.总费用=一口价+特殊配置特殊配置特殊配置特殊配置', price: 49, unit: '项', sale: 418,StoreName:'到家维修' },
                { id: 1, src: require('../../assets/imgs/storetest.jpg'), title: '滚筒洗衣机上门维修(检测费)', desc: '服务内容：1.总费用=一口价+特殊配置特殊配置特殊配置特殊配置', price: 49, unit: '项', sale: 418,StoreName:'到家维修' }
            ],
            selected: 0
        }
    }
}
</script>
<style lang="less">
.z-button-tab {
    width: 3rem;
    margin: 0.1rem auto 0;
}

.z-page {
    .vux-button-group>a.vux-button-group-current,
    .vux-button-group>a.hover,
    .vux-button-group>a:active {
        border-color: #f9261d;
        color: #fff;
        background: #f9261d;
    }
}
.z-service-list{
    .z-servie-item{
        padding: 0;
    }
}
.z-storeItems{
    overflow: hidden;
    padding:0.1rem 0.1rem 0;
}
</style>