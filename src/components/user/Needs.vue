<template>
    <div class="z-page z-needs">
        <z-header :showBack="true"
                  backWords=""
                  title="正证网">
        </z-header>
        <div class="z-container">
            <div class="menu-box">
                <z-menu :items="items"></z-menu>
            </div>
            <need-item v-for="item in needs" :key="item.id" :need="item"></need-item>
        </div>
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
import ZMenu from '../common/Menu.vue'
import needItem from './NeedItem'
export default {
    components: {
        ZHeader,
        ZMenu,
        needItem
    },
    data() {
        return {
            items: ['全部需求', '家电服务', '办公设备', '电商服务', '生活服务'],
            needs: [
                { id: 1, name: '永远的小逗比', star: 4, time: '2017-3-3', content: '感觉很不错的样子哦，你也快来试试把', avatar: require('../../assets/imgs/avatar.jpg') },
                { id: 1, name: '永远的小逗比', star: 4, time: '2017-3-3', content: '感觉很不错的样子哦，你也快来试试把', avatar: require('../../assets/imgs/avatar.jpg') },
                { id: 1, name: '永远的小逗比', star: 4, time: '2017-3-3', content: '感觉很不错的样子哦，你也快来试试把', avatar: require('../../assets/imgs/avatar.jpg') },
                { id: 1, name: '永远的小逗比', star: 4, time: '2017-3-3', content: '感觉很不错的样子哦，你也快来试试把', avatar: require('../../assets/imgs/avatar.jpg') }
            ]
        }
    }
}
</script>
<style>

</style>