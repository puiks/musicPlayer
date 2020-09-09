<template>
  <div class="resultPage">
    <content-top :nav="navList" />
    <router-view />
  </div>
</template>

<script>
import contentTop from '../common/contentTop'
export default {
    data:function() {
        return {
            keyword:'',
            currentTarget:'song',
            navList:[]
        }
    },
    created() {
        this.initKeyword()
    },
    methods:{
        initKeyword() {
            this.keyword = this.$route.params.keyword
            this.navList.push({
                navName:'单曲',
                navAddress:`/searchResult/${this.keyword}/song`
                },
                {
                navName:'歌手',
                navAddress:`/searchResult/${this.keyword}/singer`
                },
                {
                navName:'专辑',
                navAddress:`/searchResult/${this.keyword}/album`
                },
                {
                navName:'歌单',
                navAddress:`/searchResult/${this.keyword}/songList`
                })
        }
    },
    components:{
        contentTop
    }
}
</script>

<style lang="stylus" scoped></style>