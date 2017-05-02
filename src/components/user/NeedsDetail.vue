<template>
        <div class="z-page z-need-detail">
        <z-header :showBack="true"
                  backWords=""
                  :title="need.catName">
        </z-header>
        <div class="z-container">
            <div class="z-box">
                <h3 class="detail-title">{{need.title}}</h3>  
                <div class="detail-content">{{need.content}}</div>
                <img :src='need.pic' class="detail-img" v-if="typeof need.pic == 'string'">
                <img :src='img'  v-for="img in need.pic" class="detail-img" v-else>
            </div>
             <a :href="'tel:'+need.userPhone" class="button-box login-button-box"
                 style="padding-top:1rem;">
                <x-button>立即联系</x-button>
            </a>
        </div>

    </div>
</template>
<script>
    import ZHeader from '@/components/common/ZHeader.vue'
    import {getNeedsByNid} from '../../api'
    import {XButton} from 'vux'
    export default {
        components: {
            ZHeader,
            XButton
        },
        data () {
            return {
                need: {}, 
            }
        },
       
        created () {
            getNeedsByNid({id: this.$route.params.id}).then(res=>{
                this.need = res
                console.log(this.need.pic.length)
            })
        }
    }   
</script>
<style lang="less">
    .z-need-detail{
        .vux-cell-bd{
            padding-left:0.4rem;
        }
        .button-box{
            display: block;
        }
    }
    .detail-img{
        width:100%;
    }
</style>