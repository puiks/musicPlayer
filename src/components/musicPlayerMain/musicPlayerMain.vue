<template>
  <div class="m_container">
    <m-content />
  </div>
</template>

<script>
import MContent from './musicPlayerContent/musicPlayerContent'
export default {
  components: {
    MContent
  }
}
</script>

<style lang="stylus" scoped>
.m_container {
  display: flex;
  position: relative;
  top: 0;
  bottom: 3.2rem;
  display: flex;
  height: 39.3rem;
  background-color: #FAFAFA;
}
</style>