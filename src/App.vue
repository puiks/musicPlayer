<template>
  <div id="app">
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
    }
  }
</script>

<style lang="stylus"></style>
