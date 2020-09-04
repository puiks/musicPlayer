<template>
  <div>this is search result</div>
</template>

<script>
export default {
    data:function() {
        return {
            keyword:'',
            searchResult:{}
        }
    },
    created() {
        this.keyword = this.$route.params.keyword
        this.submitSearch()
    },
    methods:{
       async submitSearch() {
           const res = await this.$http.get('/search?keywords=' + this.keyword)
           this.searchResult = res.data.result
           console.log(this.searchResult)
        }
    }
}
</script>

<style lang="stylus" scoped></style>