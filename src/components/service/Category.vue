<template>
    <div class="z-page z-category">
        <z-header :showBack="true"
                  backWords=""
                  title="分类">
            <router-link to="search" slot="rightitems"
                 style="margin-right: 5px;">
                <svg class="zicon zheader-icon zflex"
                     aria-hidden="true">
                    <use xlink:href="#icon-sousuo"></use>
                </svg>
                <p class="zheader-icon-word">搜索</p>
            </router-link div>
        </z-header>
        <div class="z-container zflex">
    
            <div class="z-ver-menu">
                <cate-menu :items="items" @checkedItem="checkedItem"></cate-menu>
            </div>
            <div class="z-category-detail zflex1">
                <category-item :detail="detail"></category-item>
            </div>
        </div>
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
import CateMenu from './CateMenu.vue'
import CategoryItem from './CategoryItem.vue'
import {getCategory} from '../../api'
export default {
    name: 'category',
    components: {
        ZHeader,
        CateMenu,
        CategoryItem
    },
    data () {
        return {
            items: [],
            detail: {}
        }
    },
    created () {
        getCategory().then(res => {
            this.items = res
            this.detail = this.items[0]
        })
    },
    methods: {
        checkedItem(detail){
            this.detail = detail
        }
    }
}
</script>
<style lang="less">
.z-ver-menu {
    height: 100%;
    background: #fff;
    overflow: hidden;
}

.z-category-detail {
    background: #fff;
    height: 100%;
    margin-left: 0.1rem;
    padding: 0.2rem 0.4rem;
    box-sizing: border-box;
}
.category-item{
    .weui-btn{
        font-size: 0.3rem;
    }
}
</style>