<template>
  <div>
    <content-top :nav="navigator" />
    <router-view />
  </div>
</template>

<script>
import contentTop from '../common/contentTop'
export default {
   data: function() {
      return {
        navigator:[
          {id:1,navName:'个性推荐',navAddress:'/discoveryMusic/recommend'},
          {id:2,navName:'歌单',navAddress:'/discoveryMusic/songList'},
          {id:3,navName:'歌手',navAddress:'/discoveryMusic/singer'}
        ]
      }
    },
    components:{
      contentTop
    }
}
</script>

<style lang="stylus" scoped></style>