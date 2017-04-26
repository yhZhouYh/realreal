<template>
    <div class="z-page z-near">
      <z-header :showBack="true"
                  backWords=""
                  title="附近">
        </z-header>
        <div class="z-container">
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
    import StoreItem from '../service/StoreItem.vue'
    import ZHeader from '@/components/common/ZHeader.vue'
    import { getCategory, getGoodsByCid, getStoreById } from '../../api'
    export default{
        name: 'near',
        components: {
            StoreItem,
            ZHeader
        },
        data () {
            return {
                storeItems:[]
            }
        },
        created () {
            getStoreById({ id: 48, page: 1, limit: 10 }).then(res => {
            this.storeItems = res
        })
        }
    }
</script>
<style>

</style>