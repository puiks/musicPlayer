<template>
  <div class="songList_container">
    <div
      class="songList_item"
      @click="toSongListPage(item1)"
      :key="item1.id"
      v-for="item1 in songList.playlists"
    >
      <div class="songList_img">
        <img v-lazy="item1.coverImgUrl" alt />
      </div>
      <div class="songList_name">{{item1.name}}</div>
      <div class="songList_count">{{item1.trackCount}}首</div>
      <div class="author_name">by {{item1.creator.nickname}}</div>
    </div>
    <div class="pageHelper_area">
      <i v-if="currentPage > 0" @click="getSongList(currentPage-1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-prev" />
        </svg>
      </i>

      <div class="page_level" v-if="currentPage < 5">
        <div
          @click="getSongList(item - 1)"
          :class="isCurrent(item - 1)"
          :key="item"
          v-for="item of 8"
        >{{item}}</div>
        <div class="omission">...</div>
        <div @click="getSongList(pageSize-1)" class="page_item">{{pageSize}}</div>
      </div>
      <!-- 分页按钮根据当前页不同有三种样式 -->
      <div class="page_level" v-else-if="currentPage >= 5 && currentPage < pageSize - 5">
        <div @click="getSongList(0)" class="page_item">1</div>
        <div class="omission">...</div>
        <div
          @click="getSongList(item + currentPage - 4)"
          :class="isCurrent(item + currentPage - 4)"
          :key="item + currentPage - 4"
          v-for="item of 7"
        >{{item + currentPage - 3}}</div>
        <div class="omission">...</div>
        <div @click="getSongList(pageSize-1)" class="page_item">{{pageSize}}</div>
      </div>
      <div class="page_level" v-else>
        <div @click="getSongList(0)" class="page_item">1</div>
        <div class="omission">...</div>
        <div
          @click="getSongList(item + pageSize - 9)"
          :class="isCurrent(item + pageSize - 9)"
          :key="item + pageSize - 9"
          v-for="item of 8"
        >{{item + pageSize - 8}}</div>
      </div>
      <i v-if="currentPage < pageSize - 1" @click="getSongList(currentPage+1)">
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
      songList:{},
      pageSize:0
    }
  },
  created() {
     this.initKeyword()
     this.getSongList()
  },
  methods:{
    initKeyword() {
      this.keyword = this.$route.params.keyword
    },
    async getSongList(index = 0) {
      this.currentPage = index
      const res = await this.$http.get(`/search?keywords=${this.keyword}&limit=20&type=1000&offset=${this.currentPage * 20}`)
      this.songList = res.data.result
      this.pageSize = Math.ceil(this.songList.playlistCount / 20)
    },
    // 控制分页按钮的样式
     isCurrent(i) {
      if (i === this.currentPage) {
        return 'currentPage'
      } else {
        return 'page_item'
      }
    },
    toSongListPage(songList) {
      this.$router.push('/songListDetail/' + songList.id)
    }
  }
}
</script>

<style lang="stylus">
.songList_container {
  padding-bottom: 20px;

  .songList_item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px 0 10px 20px;
    background-color: #fff;
    cursor: pointer;

    .songList_img {
      width: 70px;
      height: 70px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .songList_name {
      font-size: 20px;
      margin-left: 30px;
    }

    .songList_count {
      position: absolute;
      left: 55%;
    }

    .author_name {
      position: absolute;
      left: 70%;
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