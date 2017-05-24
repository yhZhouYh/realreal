<template>
    <div class="z-page 'z-value'">
        <z-header :showBack="true"
                  backWords=""
                  title="评价">
            <div slot="rightitems"
                 @click="valueit"
                 class="red"
                 style="font-size:0.26rem">
                发布
            </div>
        </z-header>
        <div class="z-container">
            <group v-for="item in goods"
                   :key="item">
                <cell>
                    <span slot="icon">服务描述({{item.goodsName}})</span>
                    <rater v-model="item.value"
                           active-color="#f9261d"></rater>
                </cell>
                <x-textarea placeholder="尽情吐槽和称赞吧，老铁！"
                            v-model="item.text"></x-textarea>
            </group>
        </div>
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
import { Rater, XTextarea } from 'vux'
import { valueIt } from '../../api'
export default {
    name: 'zvalue',
    components: {
        ZHeader,
        Rater,
        XTextarea
    },
    data() {
        return {
            order: this.$store.state.currentOrder,
            goods: [],
            valueObj: {
                vaule: 5,
                text: ''
            }
        }
    },
    created() {
        this.goods = this.order.goods
        this.goods.map((item, index) => {
            item.value = 5
            item.text = ''
        })
    },
    methods: {
        valueit() {
            let promises = this.goods.map((item, index) => {
                return valueIt({ userid: this.$store.state.user.userId, orderId: this.$route.params.id, goodsId: item.goodsId, serviceScore: item.value, content: item.text })
            })
            Promise.all(promises).then(res => {
                this.$vux.toast.show({
                    text: '评价成功',
                    position: 'bottom',
                    width: 'auto',
                    type: 'text'
                })
                this.$router.go(-1)
            }).catch(error => {
                this.$vux.toast.show({
                    text: '网络异常',
                    position: 'bottom',
                    width: 'auto',
                    type: 'text'
                })
            })
        }
    }

}
</script>
<style>

</style>  