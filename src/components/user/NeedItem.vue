<template>
   <div class="comment zflex vux-1px-b">
        <img :src="need.avatar" alt="" class="comment-avatar">
        <div class="comment-content zflex1 zflex">
            <div>
                <p class="comment-name">
                    {{need.name}}                
                </p>
                <p class="comment-star">
                    <!--<span v-for="i in comment.star" class="red">★</span> -->
                    <span class="comment-time gray">{{need.time}}</span>              
                </p>
                <p class="comment-core">
                    {{need.content}}
                </p>
            </div>
        </div>
         
    </div>
</template>
<script>
    export default {
       props: {
         need: {
             type: Object
         }
       }
    }
</script>
<style>
</style>