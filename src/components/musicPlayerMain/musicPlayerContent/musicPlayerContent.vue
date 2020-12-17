<template>
  <div ref="contentPageRef" class="content_area">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    // console.log(this.$el)
  },
  provide:function() {
    const self = this
    return {
      scrollToTop() {
        self.$refs.contentPageRef.scrollTo(0,0)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.content_area {
  flex: 5;
  overflow: auto;
}
</style>