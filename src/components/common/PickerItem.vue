<template>
    <div class="iselect-wrap">
        <div class="iselect">
            <item :data="data1"
                  @getobj="getobj"
                  ref="item1"
                  :index="1"></item>
            <item :data="data2"
                  @getobj="getobj"
                  ref="item2"
                  :index="2"></item>
            <item :data="data3"
                  @getobj="getobj"
                  ref="item3"
                  :index="3"></item>
        </div>
    </div>
    </div>
</template>
<script>
import Transform from '../../assets/lib/transform'
import AlloyTouch from '../../assets/lib/alloy_touch'
import Item from './PickerMe'
export default {
    name: 'picker-item',
    props: ['address'],
    data() {
        return {
            data1: [],
            data2: [],
            data3: [],
        }
    },
    components: {
        Item
    },
    watch: {
        address() {
            if (this.address.length) {
                this.initail(0)
            }
        }
    },
    methods: {
        getobj(obj, index) {
            const length = this.address.length
            console.log(obj)
            if (index == 1) {
                let arr1 = []
                let arr2 = []
                for (var i = 0, l = length; i< l; i++) {
                    if (this.address[i].parentId == obj.areaId) {
                        arr1.push(this.address[i])
                    }
                }
                 for (var j = 0, l = length; j < l; j++) {
                    if (this.address[j].parentId == this.data2[0].areaId) {
                        arr2.push(this.address[j])
                    }
                }
                this.data2 = arr1
                this.data3 = arr2
            }
            if(index == 2){
                let arr = []
                for (var z = 0, l = length; z< l; z++) {
                    if (this.address[z].parentId == obj.areaId) {
                        arr.push(this.address[z])
                    }
                }
                this.data3 = arr
            }


        },
        initail(parentId) {
            const length = this.address.length
            for (var i = 0, l = length; i < l; i++) {
                if (this.address[i].parentId == 0) {
                    this.data1.push(this.address[i])
                }
            }

            for (var j = 0, l = length; j < l; j++) {
                if (this.address[j].parentId == this.data1[0].areaId) {
                    this.data2.push(this.address[j])
                }
            }

            for (var z = 0, l = length; z < l; z++) {
                if (this.address[z].parentId == this.data2[0].areaId) {
                    this.data3.push(this.address[z])
                }
            }

        }

    }
}
</script>
<style>
.iselect-wrap {
    height: 100%;
}

.iselect-options {
    flex: 1;
}

.iselect-wrap {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1200;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    overflow: hidden;
    /*display: none;*/
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}

.iselect {
    width: 100%;
    height: 190px;
    bottom: -190px;
    overflow: hidden;
    position: absolute;
    /*visibility: hidden;*/
    background-color: white;
    bottom: 0px;
    display: flex
}

.iselect-options {
    width: 100%;
    height: 150px;
    bottom: 0;
    overflow: hidden;
    position: relative;
}

.iselect-scroll {
    position: absolute;
    top: 0px;
    width: 100%;
    z-index: 7;
    text-align: center;
    top: 60px;
}

.iselect-scroll li {
    list-style: none;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    overflow: hidden;
}

.iselect-mask1 {

    position: absolute;
    width: 100%;
    height: 60px;
    top: 0px;
    background-color: white;
    opacity: 0.7;
    z-index: 9;
    border-bottom: 1px solid #e4e4e4
}

.iselect-mask2 {

    position: absolute;
    width: 100%;
    height: 60px;
    bottom: 0;
    background-color: white;
    opacity: 0.7;
    z-index: 10;
    border-top: 1px solid #e4e4e4
}

.iselect-toolbar {
    top: 0px;
    height: 40px;
    font-size: 13px;
    font-weight: bold;
    width: 100%;
    background-color: #fcfcfc;
    border-top: 1px solid #ccc;
}

.iselect-toolbar-ok {
    position: absolute;
    right: 12px;
    border-radius: 3px;
    top: 7px;
    padding: 3px 6px;
    color: white;
    background-color: #0283FD;
}

.iselect-toolbar-cancel {
    position: absolute;
    left: 12px;
    border-radius: 3px;
    top: 7px;
    padding: 3px 6px;
    color: white;
    background-color: #0283FD;
}

.button {
    background-color: #00ABEB;
    border: 1px solid #c3c8cc;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    height: 29px;
    font-size: 14px;
    color: white;
    text-align: center;
    line-height: 26px;
    width: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -100px;
    margin-top: -15px;
}

.button.active {
    background-color: #006389;
}

b1:after {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform-origin: 0 0;
    transform: scale(1);
    pointer-events: none;
}






/*@media only screen and (-webkit-min-device-pixel-ratio: 2) {
    .b1:after {
        right: -100%;
        bottom: -100%;
       transform: scale(0.5);
    }
}*/

.b1.bb:after {
    border-bottom: 1px solid #e4e4e4;
}

.b1.bt:after {
    border-top: 1px solid #e4e4e4;
}

.b1.bl:after {
    border-left: 1px solid #e4e4e4;
}

.b1.br:after {
    border-right: 1px solid #e4e4e4;
}
</style>