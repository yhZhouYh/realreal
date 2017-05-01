<template>
    <div>
        <div class="z-box address-item"
             :class="{'checked': isChecked == index && !isManage}"
             @click="checkItem(addressItem, index)"
             v-for="(addressItem, index) in addressLists">
            <icon icon="icon-xuanze"
                  class="add-checked red"
                  v-if="isChecked == index  && !isManage"></icon>
            <div class="add-top zflex">
                <span class="zflex1">{{addressItem.userName}}</span>
                <span>{{addressItem.userPhone}}</span>
            </div>
            <div class="add-middle"
                 :class="{'vux-1px-b': isManage}">
                {{addressItem.areaList | value2name}}
            </div>
            <div class="add-bottom"
                 v-if="isManage">
                <span style="padding-right:0.2rem;"
                      @click="edit(addressItem)">编辑</span>
                <span>删除</span>
            </div>
            <!--<z-checker class="add-bottom"
                                       v-if="isManage">
                                <span slot="middle">默认地址</span>
                                <div slot="right">
                                    <span style="padding-right:0.2rem;">编辑</span>
                                    <span>删除</span>
                                </div>
                            </z-checker>-->
            <icon icon="icon-moren"
                  class="isdefault red"
                  v-if="addressItem.isDefault"></icon>
        </div>
    </div>
</template>
<script>
import ZChecker from '../cart/CheckBox'
import Icon from '../common/Icon'
import { ChinaAddressV3Data, Value2nameFilter } from 'vux'
export default {
    name: 'addressItem',
    props: {
        addressLists: {
            type: Array
        },
        isCheck: {
            type: Number,
            default: 0
        },
        realAdd: {
            type: String
        }
    },
    components: {
        ZChecker,
        Icon
    },
    // computed: {
    //     realAdd() {
    //         debugger
    //         let add = this.addressLists
    //         return this.getName(add.areaList) + add.userAddress
    //     }
    // },
    data() {
        return {
            isManage: this.$route.query.isManage == 1 ? true : false,
            isChecked: this.$store.state.checkAddress.item ? this.$store.state.checkAddress.index : this.isCheck,
        }
    },
    filters: {
        value2name(value) {
            return Value2nameFilter(value, ChinaAddressV3Data)
        }
    },
    // mounted () {
    //     this.$store.dispatch('checkAddress', {this.addressLists[0], index})
    // },
    methods: {
        edit(item) {
            this.$store.dispatch('saveAddress', item)
            this.$router.push({ name: 'addressEdit', query: { edit: 1 } })
        },
        checkItem(item, index) {
            if (!this.$route.query.isManage) {
                this.$store.dispatch('checkAddress', {item, index})
                this.$emit('checkedItem')
                this.isChecked = index
            }
        }
    }
}
</script>
<style lang="less">
.address-item {
    position: relative;
    &.checked {
        border: 1px solid #f9261d;
    }
}

.add-middle {
    padding: 0.2rem 0 0.25rem 0;
}

.add-bottom {
    padding-top: 0.1rem;
    text-align: right;
}

.add-checked {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 0.5rem;
}

.isdefault {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 0.5rem;
}
</style>