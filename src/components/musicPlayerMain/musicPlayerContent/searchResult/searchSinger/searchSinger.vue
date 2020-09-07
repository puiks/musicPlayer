<template>
  <div class="singer_container">
    <div
      class="singer_item"
      @click="toSingerPage(item1)"
      :key="item1.id"
      v-for="item1 in singerList.artists"
    >
      <div class="singer_img">
        <img v-lazy="item1.picUrl" alt />
      </div>
      <div class="singer_name">{{item1.name}}</div>
    </div>
    <div class="pageHelper_area">
      <i v-if="currentPage > 0" @click="getSingerList(currentPage-1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-prev" />
        </svg>
      </i>

      <div class="page_level" v-if="currentPage < 5">
        <div
          @click="getSingerList(item - 1)"
          :class="isCurrent(item - 1)"
          :key="item"
          v-for="item of 8"
        >{{item}}</div>
        <div class="omission">...</div>
        <div @click="getSingerList(pageSize-1)" class="page_item">{{pageSize}}</div>
      </div>
      <!-- 分页按钮根据当前页不同有三种样式 -->
      <div class="page_level" v-else-if="currentPage >= 5 && currentPage < pageSize - 5">
        <div @click="getSingerList(0)" class="page_item">1</div>
        <div class="omission">...</div>
        <div
          @click="getSingerList(item + currentPage - 4)"
          :class="isCurrent(item + currentPage - 4)"
          :key="item + currentPage - 4"
          v-for="item of 7"
        >{{item + currentPage - 3}}</div>
        <div class="omission">...</div>
        <div @click="getSingerList(pageSize-1)" class="page_item">{{pageSize}}</div>
      </div>
      <div class="page_level" v-else>
        <div @click="getSingerList(0)" class="page_item">1</div>
        <div class="omission">...</div>
        <div
          @click="getSingerList(item + pageSize - 9)"
          :class="isCurrent(item + pageSize - 9)"
          :key="item + pageSize - 9"
          v-for="item of 8"
        >{{item + pageSize - 8}}</div>
      </div>
      <i v-if="currentPage < pageSize - 1" @click="getSingerList(currentPage+1)">
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
      this.pageSize = Math.ceil(res.data.result.artistCount / 20)
    },
    // 控制分页按钮的样式
     isCurrent(i) {
      if (i === this.currentPage) {
        return 'currentPage'
      } else {
        return 'page_item'
      }
    },
    toSingerPage(singer) {
       this.$router.push(`/singerDetail?id=${singer.id}&name=${singer.name}&imgUrl=${singer.picUrl}&albumSize=${singer.albumSize}`)
    }
  }
}
</script>

<style lang="stylus">
.singer_container {
  padding-bottom: 20px;

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

  .pageHelper_area {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;

    .icon {
      width: 20px;
      height: 20px;
      padding: 5px;
      cursor: pointer;
      font-size: 15px;
      color: #c1c2c3;
      background-color: #fff;
      border: 1px solid #c1c2c3;

      &:hover {
        background-color: #ECEDF1;
      }
    }

    .page_level {
      display: flex;

      .page_item {
        padding: 15px;
        cursor: pointer;

        &:hover {
          background-color: #ECEDF1;
          font-weight: 600;
        }
      }

      .omission {
        padding: 15px;
      }

      .currentPage {
        margin: 15px;
        color: #C62F2F;
        border-bottom: 1px solid #C62F2F;
      }
    }
  }
}
</style>