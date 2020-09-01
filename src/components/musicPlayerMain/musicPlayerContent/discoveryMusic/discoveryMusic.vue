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
          {id:3,navName:'主播电台',navAddress:'/discoveryMusic/radio'},
          {id:4,navName:'排行榜',navAddress:'/discoveryMusic/rank'},
          {id:5,navName:'歌手',navAddress:'/discoveryMusic/singer'},
          {id:6,navName:'最新音乐',navAddress:'/discoveryMusic/latestSong'}
        ]
      }
    },
    components:{
      contentTop
    }
}
</script>

<style lang="stylus" scoped></style>