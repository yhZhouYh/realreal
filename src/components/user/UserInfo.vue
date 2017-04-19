<template>
    <div class="z-page z-edit-user">
        <z-header :class="{'user-header-top': true}"
                  backWords=""
                  arrowColor="#fff"
                  :showBorder="false"
                  title="我的账户"
                  @goback="goback">
            <span slot="rightitems"
                  style="font-size:17px">
                          确认
                      </span>
        </z-header>
        <div class="z-container">
            <div class="user-header">
                <div class="user-header-center zflex zflex-center">
                    <div class="avatar-div">
                         <img :src="avatar"
                         class="avatar">
                          <input type="file" accept="image/*" class="uploader-input" @change="uploader">    
                    </div>
                </div>
            </div>
            <group>
                <x-input title="昵称"
                         v-model="user.userName" placeholder="请输入昵称"></x-input>
                <cell>
                    <span slot="icon">性别</span>
                    <select name="sex" id=""  class="weui-input weui-select" slot="after-title">
                        <option selected value="1">男</option>
                        <option value="2">女</option>
                    </select>
                </cell>
                <x-input title="手机号码" type="number"
                         v-model="user.userPhone" placeholder="请输入手机号"></x-input>
            </group>
            <circle-loading :showloading="showloading"></circle-loading>
        </div>
    
    </div>
</template>
<script>
import XInput from 'vux/src/components/X-input'
import ZHeader from '@/components/common/ZHeader.vue'
import Icon from '../common/Icon'
import CircleLoading from '../common/CircleLoading'
export default {
    name: 'user-info',
    components: {
        XInput,
        ZHeader,
        Icon,
        CircleLoading
    },
    data() {
        return {
            user: this.$store.state.user,
            showloading: false,
            avatar: this.user && this.user.userPhoto ? this.user.userPhoto : require('../../assets/imgs/avatar.jpg')
        }
    },

    methods: {
        goback () {
            alert(1111)
           
        },
        uploader (e) {
            console.log(e)
             this.showloading = !this.showloading
             const file = e.target.files[0]
             const reader = new FileReader()
             let src = ''
             let url = window.URL || window.webkitURL
             if(url){
                 src = url.createObjectURL(file)
             }else{
                 src = e.target.result
             }
             console.log(src)
             this.avatar = src
             console.log(this.avatar)
             reader.onload = (event) => {
                 console.log(event)
                //  console.log(event.target.result)
                //  this.avatar = event.target.result
             }
             reader.readAsDataURL(file)
        }
    }
}
</script>
<style lang="less">
.z-edit-user {
    .user-header-center {
        padding-left: 0;
    }
    .avatar {
        margin: 0 auto;
    }
}
.avatar-div{
    width:1.2rem;
    height:1.2rem;
    position: relative;
}
.uploader-input{
    opacity: 0;
    position: absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
}
.weui-select {
    -webkit-appearance: none;
    border: 0;
    outline: 0;
    background-color: transparent;
    width: 100%;
    font-size: inherit;
    // height: 45px;
    // line-height: 45px;
    position: relative;
    z-index: 1;
    padding-left: 15px;
}
</style>