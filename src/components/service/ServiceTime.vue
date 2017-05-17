<template>
    <div class="z-page z-service-time">
        <z-header :showBack="true"
                  backWords=""
                  title="选择服务时间">
                  <div style="font-size:0.3rem" slot="rightitems">确定</div>
        </z-header>
        <div class="z-container" style="background:#fff">
            <div class="menu-box">
                <z-menu :items="items"
                        name="week"
                        @checkedItem="checkItem"
                        ></z-menu>
                <ul class="z-box">
                    <li v-for="(item,index) in timearr" :class="{checkit: isChecked == index}" @click="checkit(item, index)" v-if="currentIndex !=0">{{item}}</li>
                    <li v-for="(item,index) in timearrToday" :class="{checkit: isChecked == index}" @click="checkit(item, index)" v-if="currentIndex == 0">{{item}}</li>
                     <blank v-if="!timearr.length || !timearrToday.length"
                       :define="true">
                    <div>服务时间貌似爆炸了！</div>
                </blank>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import ZHeader from '@/components/common/ZHeader.vue'
import ZMenu from '@/components/common/Menu.vue'
export default {
    name: 'serviceTime',
    components: {
        ZHeader,
        ZMenu
    },
    data() {
        return {
            weekTrans: {
                '1': '周一',
                '2': '周二',
                '3': '周三',
                '4': '周四',
                '5': '周五',
                '6': '周六',
                '0': '周日',
            },
            items: [],
            timearr: [],
            timearrToday: [],
            isChecked: -1,
            stime: this.$route.query.stime,
            etime: this.$route.query.etime,
            currentIndex: 0,
            currentItem: ''
        }
    },
    created() {
       this.items = this.getDayItems()
       this.currentItem = this.items[0]
       let h = new Date().getHours()
       let min = new Date().getMinutes()
       if(min>30){
           h+=1
           min = '00'
       }else{
           min = '30' 
       }
       this.timearrToday = this.getArea(h+':'+ min, '23:00')
       this.timearr = this.getArea('8:30','23:00')
    },
    methods: {
        getDayItems() {
            let time = Date.parse(new Date())
            let timeObj = {
                timestamp: '',
                date: '',
                week: ''
            }
            let times = []
            for (var i = 0; i <= 6; i++) {
                var obj = { ...timeObj }
                obj.timestamp = time + i * (24 * 60 * 60 * 1000)
                var date = new Date(obj.timestamp)
                var month = date.getMonth() + 1
                var week = date.getDay()
                var day = date.getDate()
                obj.date = month + '-' + day
                obj.week = this.weekTrans[week]
                if (i == 0) {
                    obj.week = '今天'
                }
                times.push(obj)
            }
            return times
        },
        getArea(stime, etime) {
            let date = new Date().toLocaleDateString()
            let sd =  Date.parse(new Date(date + ' ' + stime))
            let ed = Date.parse(new Date(date + ' ' + etime))
            let area = ed - sd
            let n = area / (30 * 60 * 1000)
            let arr = []
            for (var i = 0; i <= n; i++) {
                var t = sd + i* 30 * 60 * 1000
                var hours = new Date(t).getHours()
                var min = new Date(t).getMinutes()
                if(min<10){
                    min = '0' + min
                }
                arr.push(hours+ ':' + min)
            }
            return arr
        },
        checkit(item, index){
            this.isChecked = index
            this.$store.dispatch('saveServiceTime', this.currentItem.date + ' '+ item)
        },
        checkItem(item, index){
            this.currentIndex = index
            this.currentItem = item
        }
    }
}
</script>
<style lang="less">
.z-service-time {
    li {
        padding: 0.1rem 0;
        text-align: center;
        border: 1px solid #ececec;
        border-radius: 4px;
        width: 23%;
        margin: 0.1rem 1%;
        float: left;
        list-style: none;
    }
    .checkit {
        color: #f9261d;
        border-color: #f9261d;
    }
}
</style>