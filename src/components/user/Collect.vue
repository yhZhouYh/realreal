<template>
    <div class="z-page z-address-manage">
        <z-header :showBack="true"
                  backWords=""
                  title="我的收藏">
        </z-header>
        <div class="z-container">
            <blank v-if="!storeItems.length"
                   :define="true">
                <div>暂无收藏！</div>
            </blank>
            <div class="z-storeItems">
                <store-item v-for="item in storeItems"
                            :key="item"
                            :item="item"
                            ></store-item>
            </div>
        </div>
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
import {collectList} from '../../api'
import StoreItem from '../service/StoreItem'
export default {
    components: {
        ZHeader,
        StoreItem
    },
    data () {
        return {
           storeItems: [] 
        }
    },
    created () {
        collectList({userid: this.$store.state.user.userId, type: 1, limit: 50, page:1}).then(res => {
            this.storeItems = res
        })
    }
}
</script>
<style>

</style>