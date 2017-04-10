<template>
    <div clas="z-page z-user-index">
        <div class="user-header red">
            <wave></wave>
        </div>
    </div>
</template>
<script>
    import Wave from './Wave.vue'
    export default {
        name: 'user-index',
        components: {
            Wave
        }
    }
</script>
<style>
    .user-header{
        background: #f9261d;
        height:5rem;
    }
</style>