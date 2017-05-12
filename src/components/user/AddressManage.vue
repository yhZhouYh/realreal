<template>
    <div class="z-page z-address-manage">
        <z-header :showBack="true"
                  backWords=""
                  :title="title">
            <div slot="rightitems"
                 @click="ensuer"
                 v-if="!$route.query.isManage" style="font-size:0.26rem;">
                确认选择
            </div>
        </z-header>
        <div class="z-container">
            <blank v-if="!addressLists.length"
                   :define="true">
                <div>还没有地址哦，赶紧添加！</div>
            </blank>
            <div class="address-item-box">
                <addressItem :addressLists="addressLists"
                             @checkaddress="checkaddress(item)"
                             @deleteAdd="deleteAdd"></addressItem>
            </div>
            <div class="button-box login-button-box"
                 v-if="$route.query.isManage || !addressLists.length">
                <x-button @click.native="addAddress">添加地址</x-button>
            </div>
        </div>
        <confirm v-model="show"
                 title="你确定要删除么"
                 @on-confirm="onConfirm">
            <!--<p style="text-align:center;">你确定要删除么</p>-->
        </confirm>
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
import AddressItem from './AddressItem'
import { XButton, Value2nameFilter, Confirm } from 'vux'
import { addressList, deleteAddr } from '../../api'
import Blank from '@/components/common/Blank.vue'

export default {
    name: 'addressManage',
    components: {
        ZHeader,
        AddressItem,
        XButton,
        Blank,
        Confirm
    },
    data() {
        return {
            addressLists: [],
            title: this.$route.query.isManage ? '地址管理' : '选择地址',
            show: false,
            deleteItem: {}
        }
    },
    created() {
        this.$store.dispatch('showFooter')
        addressList({ userid: this.$store.state.user.userId }).then(res => {
            if (res.length) { //存在数组
                for (var i = 0, l = res.length; i < l; i++) {
                    if (res[i].isDefault == 1) {
                        this.$store.dispatch('checkAddress', { item: res[i], index: i })
                        break
                    } else {
                        this.$store.dispatch('checkAddress', { item: res[0], index: 0 })
                    }
                }
            }

            this.addressLists = res
        })
    },
    destroyed() {
        this.$store.dispatch('showFooter')
    },
    methods: {
        addAddress() {
            this.$router.push('addressEdit')
        },
        getName(value) {
            return Value2nameFilter(value, ChinaAddressV3Data)
        },
        ensuer() {
            this.$router.go(-1)
        },
        deleteAdd(addr, index) {
            this.show= !this.show
            this.deleteItem = addr
            this.deleteIndex = index
        },
          onConfirm() {
            deleteAddr({ userid: this.$store.state.user.userId, field: 'dataFlag', value: 0,addressId: this.deleteItem.addressId }).then(res => {
                this.addressLists.splice(this.deleteIndex, 1)
            })
        },
    }

}
</script>
<style lang="less">
.z-address-manage .button-box {
    padding: 0.5rem 0;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.3rem;
}

.address-item-box {
    padding-bottom: 2rem;
}
</style>