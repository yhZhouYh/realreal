<template>
    <span
          @click="showpass"
          v-show="password">
        <icon icon="icon-mingwen01" :class="{red: showPassword}" style="padding-left:5px;"></icon>
    </span>
</template>
<script>
    import Icon from '../common/Icon'
    export default {
        name: 'showPass',
        components: {
            Icon
        },
        methods: {
            showpass () {
                
            }
        }
    }
</script>
<style>

</style>