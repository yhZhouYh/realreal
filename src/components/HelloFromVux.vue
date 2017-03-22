<template>
  <div>
    <z-header :headerFix="headerFix"></z-header>
  </div>
</template>

<script>
import ZHeader from './common/Header.vue'
export default {
  components: {
    ZHeader
  },
  data () {
    return {
      headerFix: {
      }
    }
  }
}
</script>

<style>

</style>
