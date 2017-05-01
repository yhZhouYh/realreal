<template>
    <div class="z-page z-needs">
        <z-header :showBack="true"
                  backWords=""
                  title="发布需求">
        </z-header>
        <div class="z-container">
            <group>
                <cell is-link>
                    <span slot="icon"
                          :class="{'weui-cell_warn': !selected}">选择分类</span>
                    <select name="sex"
                            id=""
                            class="weui-input weui-select"
                            slot="after-title"
                            v-model="selected">
                        <option v-for="item in categorys"
                                :value="item.catId">{{item.catName}}</option>
                    </select>
                </cell>
                <x-input title="联系号码"
                         type="number"
                         required
                         is-type="china-mobile"
                         placeholder="请输入联系号码"
                         v-model="userPhone"
                         ref="userPhone"></x-input>
                <x-input title="需求标题"
                         required
                         placeholder="请输入需求标题"
                         v-model="title"></x-input>
                <cell>
                    <div slot="icon"
                         style="margin-right:0.3rem;"
                         :class="{'weui-cell_warn': !uploadImgs.length}">上传照片（最多8张）</div>
                    <div class="weui-uploader__input-box"
                         v-for="item in uploadImgs"
                         :class="{hasphoto: item}"
                         slot="after-title"
                         :style="{backgroundImage:'url('+item+')'}">
                    </div>
                    <div class="weui-uploader__input-box"
                         slot="after-title"
                         v-if="uploadImgs.length<=8">
                        <input id="uploaderInput"
                               class="weui-uploader__input"
                               type="file"
                               accept="image/*"
                               multiple=""
                               @change="uploader($event)">
                    </div>
    
                </cell>
                <x-textarea title="补充说明"
                            v-model="content"
                            :class="{'weui-cell_warn': !content}"></x-textarea>
            </group>
            <div class="button-box login-button-box"
                 style="padding-top:1rem;">
                <x-button @click.native="publish">发布</x-button>
            </div>
        </div>
        <toast type="text"
               v-model="showToast"
               position="bottom"
               :text="toastText"></toast>
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
import { getCategory, uploader, publishNeed } from '../../api'
import XInput from 'vux/src/components/X-input'
import { XTextarea, XButton, Toast } from 'vux'
export default {
    name: 'publish-need',
    components: {
        ZHeader,
        XInput,
        XTextarea,
        XButton,
        Toast
    },
    data() {
        return {
            categorys: [],
            selected: '',
            title: '',
            userPhone: '',
            uploadImgs: [],
            content: '',
            toastText: '',
            showToast: false
        }
    },
    created() {
        getCategory().then(res => {
            this.categorys = res
        })
    },
    methods: {
        uploader(e) {

            this.$store.dispatch('changeLoading')
            const file = e.target.files[0]
            const reader = new FileReader()
            let src = ''
            let url = window.URL || window.webkitURL
            if (url) {
                src = url.createObjectURL(file)
            } else {
                src = e.target.result
            }
            let _this = this
            reader.onload = (event) => {
                uploader({ upfile: event.target.result, type: 'users' }).then(photo => {
                    _this.$store.state.loading = false
                    _this.uploadImgs.push(photo)
                })
            }
            reader.readAsDataURL(file)
        },
        publish () {
            let valid = this.$refs.userPhone.valid
            if(!valid){
                this.validToast('手机号格式错误')
                return
            }
            let obj = {
                userid: this.$store.state.user.userId,
                userPhone: this.userPhone,
                title: this.title,
                content: this.content,
                pic: this.uploadImgs.join(','),
                catid: this.selected
            }
            publishNeed(obj).then(res => {
               this.validToast('发布成功')
            })
        },
        validToast(text) {
            this.toastText = text
            this.showToast = true
        },
    }
}
</script>
<style>
.weui-uploader__input-box {
    display: inline-block;
    margin-right: 0.2rem;
}
</style>