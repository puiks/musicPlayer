<template>
  <div class="singer_container">
    <div class="singer_item" :key="item1.id" v-for="item1 in singerList.artists">
      <div class="singer_img">
        <img v-lazy="item1.picUrl" alt />
      </div>
      <div class="singer_name">{{item1.name}}</div>
    </div>
    <div class="pageHelper_area">
      <i v-if="currentPage > 0" @click="submitSearch(currentPage-1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-prev" />
        </svg>
      </i>
      <div
        @click="submitSearch(item - 1)"
        :class="isCurrent(item - 1)"
        :key="item"
        v-for="item of pageSize"
      >{{item}}</div>
      <i v-if="currentPage < 4" @click="submitSearch(currentPage+1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-next" />
        </svg>
      </i>
    </div>
  </div>
</template>

<script>
export default {
  data:function() {
    return {
      keyword:'',
      currentPage: 0,
      singerList:{},
      pageSize:0
    }
  },
  created() {
    this.initKeyword()
    this.getSingerList()
  },
  methods:{
    initKeyword() {
      this.keyword = this.$route.params.keyword
    },
    async getSingerList(index = 0) {
      this.currentPage = index
      const res = await this.$http.get(`/search?keywords=${this.keyword}&limit=20&type=100&offset=${this.currentPage * 20}`)
      this.singerList = res.data.result
      console.log(this.singerList)
      this.pageSize = (res.data.result.artistCount / 20)
    }
  }
}
</script>

<style lang="stylus">
.singer_container {
  .singer_item {
    display: flex;
    align-items: center;
    padding: 10px 0 10px 20px;
    background-color: #fff;
    cursor: pointer;

    .singer_img {
      width: 70px;
      height: 70px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .singer_name {
      font-size: 20px;
      margin-left: 30px;
    }

    &:nth-child(2n) {
      background-color: #F5F5F7;
    }

    &:hover {
      background-color: #EBECED;
    }
  }
}
</style>