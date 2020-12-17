<template>
  <div ref="main" id="app">
    <m-header />
    <mainContainer />
    <m-footer />
  </div>
</template>

<script>
  import MHeader from './components/musicPlayerHeader/musicPlayerHeader'
  import MFooter from './components/musicPlayerFooter/musicPlayerFooter'
  import mainContainer from './components/musicPlayerMain/musicPlayerMain'
  export default {
    components: {
      MHeader,
      mainContainer,
      MFooter
    },
    watch:{
      $route() {
        this.$refs.main.scrollTo(0,0)
      }
    }
  }
</script>

<style lang="stylus"></style>