<template>
  <!--头部开始-->
  <div class="z-page">
    <z-header :showArrow="false">
      <div slot="leftitems"
           style="color:#ea2a1d">
        <svg class="zicon zheader-icon zflex"
             aria-hidden="true">
          <use xlink:href="#real-icon-zuobiao"></use>
        </svg>
      </div>
      <div slot="leftitems"
           style="font-size:14px;">
        南宁
      </div>
      <div slot="rightitems"
           style="margin-right: 5px;">
        <svg class="zicon zheader-icon zflex"
             aria-hidden="true">
          <use xlink:href="#real-icon-search"></use>
        </svg>
        <p class="zheader-icon-word">搜索</p>
      </div>
      <div slot="rightitems">
        <svg class="zicon zheader-icon zflex"
             aria-hidden="true">
          <use xlink:href="#real-icon-fabuxuqiuben01"></use>
        </svg>
        <p class="zheader-icon-word">需求</p>
      </div>
    </z-header>
    <!--头部结束-->
    <div class="z-container">
    <!--轮播开始-->
    <div class="z-carousel-box">
      <tf-carousel :imgs="imgs"
                   :delay="4000"></tf-carousel>
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
                      :categoryname="item.categoryname"></z-category>
        </div>
      </div>
    </div>
    <!--分类圈圈结束-->
    <!--news开始-->
    <div class="z-box">
      <div class="zflex">
        <p style="color:#4fbafe">正证新闻：</p>
        <marquee class="zflex1">
          <marquee-item v-for="i in news"
                        :key="i"
                        class="align-middle">{{i}}</marquee-item>
        </marquee>
      </div>
      <div class="zflex">
        <p style="color:#4fbafe">免费查询：</p>
        <a href="javascript:;"
           class="zflex1">电脑初步诊断查询>></a>
        <a href="javascript:;"
           class="zflex1">电脑型号查询>></a>
      </div>
    </div>
    <!--news结束-->
    <!--各项分类开始-->
    <div class="z-box">
      <index-category></index-category>
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
        [{ backcolor: '#4da4d1', svgsrc: '#real-icon-jiadian', categoryname: "家电维修" },
        { backcolor: '#ec633f', svgsrc: '#real-icon-iconfontdayinji', categoryname: "家电维修" },
        { backcolor: '#f5ce33', svgsrc: '#real-icon-dianshang', categoryname: "家电维修" },
        { backcolor: '#8dc52c', svgsrc: '#real-icon-shangmenfuwu', categoryname: "家电维修" },
        { backcolor: '#f25a59', svgsrc: '#real-icon-shenghuofuwu', categoryname: "家电维修" }],
        [{ backcolor: '#ce1c1a', svgsrc: '#real-icon-444', categoryname: "家电维修" },
        { backcolor: '#4ddf74', svgsrc: '#real-icon-tongcheng', categoryname: "家电维修" },
        { backcolor: '#8185a0', svgsrc: '#real-icon-xingyezixun', categoryname: "家电维修" },
        { backcolor: '#e1b77d', svgsrc: '#real-icon-icon052', categoryname: "家电维修" },
        { backcolor: '#c8c8c8', svgsrc: '#real-icon-quanbufenlei', categoryname: "家电维修" }]
      ],
      news: [
        '天之道',
        '损有余而补不足',
        '是故虚胜实',
        '不足剩有余'
      ],
      catesItem: [{
        catesId: '1',
        catesName: '家电服务',
        catesItems: [
          {
            fengmian: require('../../assets/imgs/img1.jpg'),
            theme: '专业师傅维修电视',
            price: '30',
            unit: '次',
            dianming: '刚刚维修'
          }
        ]
      }]
    }
  },
  created() {
    this.imgs = [{ url: require('../../assets/imgs/img1.jpg') },
    { url: require('../../assets/imgs/img2.jpg') },
    { url: require('../../assets/imgs/img3.jpg') },
    { url: require('../../assets/imgs/img4.jpg') }]
  }
}
</script>

<style>
.z-container{
  box-sizing: border-box;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding-top: 0.85rem;
  padding-bottom: 0.85rem;
}
.z-page{
  position: absolute;
  height:100%;
  width:100%;
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
}
</style>
