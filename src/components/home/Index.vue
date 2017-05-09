<template>
  <!--头部开始-->
  <div class="z-page">
    <z-header :showArrow="false"
              title="主页">
      <div slot="leftitems"
           style="color:#ea2a1d">
        <svg class="zicon zheader-icon zflex"
             aria-hidden="true">
          <use xlink:href="#icon-weizhi"></use>
        </svg>
      </div>
      <div slot="leftitems"
           style="font-size:14px;">
        南宁
      </div>
      <router-link to="search"
                   slot="rightitems"
                   style="margin-right: 5px;">
        <svg class="zicon zheader-icon zflex"
             aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <p class="zheader-icon-word">搜索</p>
      </router-link>
      <router-link to="publishneed"
                   slot="rightitems">
        <svg class="zicon zheader-icon zflex"
             aria-hidden="true">
          <use xlink:href="#icon-fabu"></use>
        </svg>
        <p class="zheader-icon-word">需求</p>
      </router-link>
    </z-header>
    <!--头部结束-->
    <div class="z-container">
      <!--轮播开始-->
      <div class="z-carousel-box">
        <tf-carousel :imgs="imgs"
                     display='adFile'
                     :delay="4000"
                     autoPlay></tf-carousel>
      </div>
      <!--轮播结束-->
      <!--分类圈圈开始-->
      <div class="z-cate-container">
        <div class="z-cate-box zflex-center zflex"
             v-for="items in cateSvgs">
          <div class="z-cate-item zflex1"
               v-for="item in items">
            <z-category :backcolor="item.backcolor"
                        :svgsrc="item.svgsrc"
                        :categoryname="item.categoryname"
                        :cid="item.catId"
                        :url="item.url"></z-category>
          </div>
        </div>
      </div>
      <!--分类圈圈结束-->
      <!--news开始-->
      <div class="z-box">
        <router-link to="/newsList/8"
                     class="zflex">
          <p style="color:#4fbafe">正证新闻：</p>
          <marquee class="zflex1">
            <marquee-item v-for="i in news"
                          :key="i"
                          class="align-middle">{{i.articleTitle}}</marquee-item>
          </marquee>
        </router-link>
        <div class="zflex">
          <p style="color:#4fbafe">免费查询：</p>
          <router-link to="/newsList/20"
                       href="javascript:;"
                       class="zflex1">电脑初步诊断查询>></router-link>
          <router-link to="/newsList/19"
                       href="javascript:;"
                       class="zflex1">电脑型号查询>></router-link>
        </div>
      </div>
      <!--news结束-->
      <!--各项分类开始-->
  
      <div class="z-box"
           v-for="cates in catesItem">
        <index-category :cates="cates"></index-category>
      </div>
      <!--各项分类结束-->
    </div>
  </div>
</template>

<script>
import ZHeader from '@/components/common/ZHeader.vue'
import TfCarousel from '@/components/common/carousel.vue'
import ZCategory from './CategoryCircle.vue'
import Marquee from 'vux/src/components/marquee/marquee.vue'
import MarqueeItem from 'vux/src/components/marquee/marquee-item.vue'
import IndexCategory from './IndexCategory.vue'
import { indexAds, article, getgoodsIndex } from '../../api'
//import BMap from 'BMap'
export default {
  components: {
    ZHeader,
    TfCarousel,
    ZCategory,
    Marquee,
    MarqueeItem,
    IndexCategory
  },
  data() {
    return {
      imgs: [],
      cateSvgs: [
        [{ backcolor: '#4da4d1', svgsrc: '#icon-jiadian', categoryname: "家电服务", catId: 47, url: '/needs/47' },
        { backcolor: '#ec633f', svgsrc: '#icon-bangongshebei', categoryname: "办公设备", catId: 48, url: '/needs/48' },
        { backcolor: '#f5ce33', svgsrc: '#icon-dianshang', categoryname: "电商服务", catId: 49, url: '/needs/49' },
        { backcolor: '#8dc52c', svgsrc: '#icon-shangmenfuwu', categoryname: "上门服务", catId: 50, url: '/needs/50' },
        { backcolor: '#f25a59', svgsrc: '#icon-shenghuofuwu', categoryname: "生活服务", catId: 51, url: '/needs/51' }],
        [{ backcolor: '#ce1c1a', svgsrc: '#icon-444', categoryname: "以旧换新", catId: 344, url: '/needs/344' },
        { backcolor: '#4ddf74', svgsrc: '#icon-tongcheng', categoryname: "同城交易", catId: 52, url: '/needs/52' },
        { backcolor: '#8185a0', svgsrc: '#icon-xingyezixun', categoryname: "行业资讯", catId: 47, url: '/newsList/17' },
        { backcolor: '#e1b77d', svgsrc: '#icon-fuwu', categoryname: "正证新闻", catId: 47, url: '/newsList/8' },
        { backcolor: '#c8c8c8', svgsrc: '#icon-quanbufenlei', categoryname: "全部分类", catId: 0, url: '/needs/0' }]
      ],
      news: [],
      catesItem: []
    }
  },
  created() {
    indexAds({ id: 34 }).then(res => {
      this.imgs = res
    })
    article({ page: 1, limit: 6, classid: 8 }).then(res => {
      this.news = res
    })
    getgoodsIndex().then(res => {
      this.catesItem = res
    })

  },
  mounted() {
    // this.getLoction()
    window.apiready = function () {
      const baiduLocation = api.require('baiduLocation');
      baiduLocation.startLocation({
        accuracy: '100m',
        filter: 1,
        autoStop: true
      }, function (ret, err) {
        if (ret.status) {
          alert(JSON.stringify(ret));
        } else {
          alert(JSON.stringify(err));
        }
      });
    }
  },

  methods: {
    go() {
      this.$router.push('/serviceList/48')
    },
    getLoction() {
      navigator.geolocation.getCurrentPosition(pos => {
        console.log(pos.coords.latitude, pos.coords.longitude)
      })
    }
  }
}
</script>

<style>
.z-container {
  box-sizing: border-box;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding-top: 0.85rem;
  padding-bottom: 1.8rem;
}

.z-page {
  position: absolute;
  height: 100%;
  width: 100%;
}

.z-carousel-box {
  height: 3.85rem;
}

.z-cate-container {
  padding: 0 0.3rem 0.3rem;
  background-color: #fff;
}

.z-cate-box {
  padding-top: 0.3rem;
}

.z-box {
  padding: 0.15rem 0.2rem;
  background-color: #fff;
  margin-top: 0.18rem;
  overflow: hidden;
}

.gray {
  color: rgb(150, 150, 150)
}

.red {
  color: #f9261d;
}
</style>
