<template>
  <div>加载中</div>
</template>

<script>
export default {
    created() {
        this.$router.push(decodeURI(this.$route.query.finalPath))
    }
}
</script>

<style lang="stylus" scoped></style>