<template>
    <div class="z-page z-near">
        <z-header :showBack="true"
                  backWords=""
                  title="附近">
        </z-header>
        <div class="z-container">
            <blank v-if="!storeItems.length"
                   :define="true">
                <div>附近感觉没店铺，去分类里看看吧~</div>
            </blank>
            <div class="z-storeItems">
                <store-item v-for="item in storeItems"
                            :key="item"
                            :item="item"></store-item>
            </div>
        </div>
    </div>
</template>
<script>
import StoreItem from '../service/StoreItem.vue'
import ZHeader from '@/components/common/ZHeader.vue'
import { getNearShops } from '../../api'
export default {
    name: 'near',
    components: {
        StoreItem,
        ZHeader
    },
    data() {
        return {
            storeItems: [],
            currentPosition: this.$store.state.currentLocation || ''
        }
    },
    created() {
        if (this.currentPosition.longitude) {
            getNearShops({ longitude: this.currentPosition.longitude, latitude: this.currentPosition.latitude, page: 1, limit: 50 }).then(res => {
                this.storeItems = res
            })
        }
    }
}
</script>
<style>

</style>