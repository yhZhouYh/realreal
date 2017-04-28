<template>
    <div class="z-checkbox zflex">
        <label :for="id"
               class="check-label zflex">
            <input type="checkbox"
                   class="z-check"
                   name="checkit"
                   :value="value"
                   :checked="checked"
                   :id="id"
                   v-model="model" @change="change(value)">
            <icon icon="icon-yuanxingxuanzhongfill"
                  class="boxcheck red"></icon>
            <icon icon="icon-yuanxingweixuanzhong"
                  class="boxnocheck red"></icon>
        </label>
        <div class="checkbox-miidle zflex1">
            <slot name="middle"></slot>
        </div>
        <div>
            <slot name="right"></slot>
        </div>
    </div>
</template>
<script>
import Icon from '../common/Icon'
export default {
    name: 'checkbox',
    props: ['value', 'id', 'checked'],
    components: {
        Icon
    },
    data () {
        return {
            model: this.checked
        }
    },
    methods: {
        change(value){
            this.$emit('change',value)
        }
    }
}
</script>
<style lang="less">
.z-checkbox{
    .zicon{
        margin: 0;
    }
}

.check-label {
    position: relative;
}

.boxcheck {
    display: none;
}

.z-check {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 11;
    &:checked+.boxcheck {
        display: flex;
        &+.boxnocheck {
            display: none;
        }
    }
}
.checkbox-miidle{
    padding-left: 0.2rem;
}
</style>