<template>
    <div class="z-page z-edit-user">
        <z-header :class="{'user-header-top': true}"
                  backWords=""
                  arrowColor="#fff"
                  :showBorder="false"
                  title="我的账户">
            <span slot="rightitems"
                  style="font-size:17px"
                  @click="edit">
                                      确认
                                  </span>
        </z-header>
        <div class="z-container">
            <div class="user-header">
                <div class="user-header-center zflex zflex-center">
                    <div class="avatar-div">
                        <img :src="avatar"
                             class="avatar">
                        <input type="file"
                               accept="image/*"
                               class="uploader-input"
                               @change="uploader">
                    </div>
                </div>
            </div>
            <group>
                <x-input title="昵称"
                         v-model="user.userName"
                         placeholder="请输入昵称"
                         required
                         ref="username"></x-input>
                <cell>
                    <span slot="icon">性别</span>
                    <select name="sex"
                            id=""
                            class="weui-input weui-select"
                            slot="after-title"
                            v-model="selected">
                        <option selected
                                value="1">男</option>
                        <option value="0">女</option>
                    </select>
                </cell>
                <!--<x-input title="手机号码" type="number"
                                     v-model="user.userPhone" placeholder="请输入手机号"></x-input>-->
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
import { uploader, editUser } from '../../api'
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
            avatar: this.user && this.user.userPhoto ? this.user.userPhoto : require('../../assets/imgs/avatar.jpg'),
            selected: 1,
            uploaderAvatar: ''
        }
    },

    methods: {
        // goback () {
        //     alert(1111)

        // },
        edit() {
            let valid = this.$refs.username.valid
            if (!valid) {
                this.$vux.toast.show({
                    text: '请填写昵称',
                    position: 'bottom',
                    width: 'auto',
                    type: 'text'
                })
                return
            }
            let data = { userid: this.user.userId, userName: this.user.userName, userSex: this.selected }
            if( this.uploaderAvatar){ 
                data.userPhoto = this.uploaderAvatar
            }

            editUser(data).then((res) => {
                this.$vux.toast.show({
                    text: '更新成功',
                    position: 'bottom',
                    width: 'auto',
                    type: 'text'
                })
            })
            // if(){
            //     this.$vux.toast.show({
            //         text: '请上传头像',
            //         position: 'bottom',
            //         width: 'auto',
            //         type: 'text'
            //     })
            // }

        },
        uploader(e) {
            this.showloading = !this.showloading
            const file = e.target.files[0]
            const reader = new FileReader()
            let src = ''
            let url = window.URL || window.webkitURL
            if (url) {
                src = url.createObjectURL(file)
            } else {
                src = e.target.result
            }

            reader.onload = (event) => {
                let _this = this
                uploader({ upfile: event.target.result, type: 'users' }).then(photo => {
                    _this.showloading = !this.showloading
                    _this.uploaderAvatar = photo
                    _this.user.userPhoto = photo
                    _this.$store.dispatch('login', _this.user)
                })
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

.avatar-div {
    width: 1.2rem;
    height: 1.2rem;
    position: relative;
}

.uploader-input {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

.weui-select {
    -webkit-appearance: none;
    border: 0;
    outline: 0;
    background-color: transparent;
    width: 100%;
    font-size: inherit; // height: 45px;
    // line-height: 45px;
    position: relative;
    z-index: 1;
    padding-left: 15px;
}
</style>