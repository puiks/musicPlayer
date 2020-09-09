<template>
  <div class="content_top">
    <ul class="top_lists">
      <li
        :class="['top_item' ,{'current_item':index===currentIndex}]"
        :key="item.id"
        :index="index"
        v-for="(item,index) in nav"
        @click="handleNavigate(index,item.navAddress,$event)"
      >
        <!-- <router-link :to="item.navAddress"> -->
        {{item.navName}}
        <!-- </router-link> -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
   props:['nav'],
   data: function() {
      return {
        currentIndex:0
      }
    },
    created() {
      this.nav.forEach((item,index) => {
        if (item.navAddress === this.$route.path) {
          this.currentIndex = index
        }
      })
    },
      methods: {
        handleNavigate(i,address,e) {
          // 防止反复点击造成错误
        if (e.target.className.includes('current')) {
         return
        }
        this.currentIndex = i
        this.$router.push({path:'/middlePage',query:{finalPath:encodeURI(address)}})
      }
  }
}
</script>

<style lang="stylus" scoped>
.content_top {
  width: 96%;
  height: 2.8125rem;
  border-bottom: 1px solid #eee;
  margin: 0 auto;

  .top_lists {
    display: flex;
    justify-content: center;
    width: 80%;
    margin: 0 auto;

    .top_item {
      width: 8%;
      text-align: center;
      padding: 0.625rem 0;
      margin: 0 1.25rem;
      cursor: pointer;

      &:hover {
        color: #C62F2F;
      }
    }

    .current_item {
      border-bottom: 2px solid #C62F2F;
    }
  }
}
</style>