<template>
  <div class="album_container">
    <div
      class="album_item"
      @click="toAlbumPage(item1)"
      :key="item1.id"
      v-for="item1 in albumList.albums"
    >
      <div class="album_img">
        <img v-lazy="item1.picUrl" alt />
      </div>
      <div class="album_name">{{item1.name}}</div>
      <div class="singer_name">{{item1.artist.name}}</div>
    </div>
    <div class="pageHelper_area">
      <i v-if="currentPage > 0" @click="getAlbumList(currentPage-1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-prev" />
        </svg>
      </i>

      <div class="page_level" v-if="currentPage < 5">
        <div
          @click="getAlbumList(item - 1)"
          :class="isCurrent(item - 1)"
          :key="item"
          v-for="item of 8"
        >{{item}}</div>
        <div class="omission">...</div>
        <div @click="getAlbumList(pageSize-1)" class="page_item">{{pageSize}}</div>
      </div>
      <!-- 分页按钮根据当前页不同有三种样式 -->
      <div class="page_level" v-else-if="currentPage >= 5 && currentPage < pageSize - 5">
        <div @click="getAlbumList(0)" class="page_item">1</div>
        <div class="omission">...</div>
        <div
          @click="getAlbumList(item + currentPage - 4)"
          :class="isCurrent(item + currentPage - 4)"
          :key="item + currentPage - 4"
          v-for="item of 7"
        >{{item + currentPage - 3}}</div>
        <div class="omission">...</div>
        <div @click="getAlbumList(pageSize-1)" class="page_item">{{pageSize}}</div>
      </div>
      <div class="page_level" v-else>
        <div @click="getAlbumList(0)" class="page_item">1</div>
        <div class="omission">...</div>
        <div
          @click="getAlbumList(item + pageSize - 9)"
          :class="isCurrent(item + pageSize - 9)"
          :key="item + pageSize - 9"
          v-for="item of 8"
        >{{item + pageSize - 8}}</div>
      </div>
      <i v-if="currentPage < pageSize - 1" @click="getAlbumList(currentPage+1)">
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
      albumList:{},
      pageSize:0
    }
  },
  created() {
    this.initKeyword()
    this.getAlbumList()
  },
  methods:{
    initKeyword() {
      this.keyword = this.$route.params.keyword
    },
    async getAlbumList(index = 0) {
      this.currentPage = index
      const res = await this.$http.get(`/search?keywords=${this.keyword}&limit=20&type=10&offset=${this.currentPage * 20}`)
      this.albumList = res.data.result
      this.pageSize = Math.ceil(this.albumList.albumCount / 20)
      console.log(this.albumList)
    },
    // 跳转到专辑页面
    toAlbumPage(album) {
      this.$router.push('/albumDetail/' + album.id)
    },
    // 控制分页按钮的样式
     isCurrent(i) {
      if (i === this.currentPage) {
        return 'currentPage'
      } else {
        return 'page_item'
      }
    }
  }
}
</script>

<style lang="stylus">
.album_container {
  .album_item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px 0 10px 20px;
    background-color: #fff;
    cursor: pointer;

    .album_img {
      width: 70px;
      height: 70px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .album_name {
      font-size: 20px;
      margin-left: 30px;
    }

    .singer_name {
      position: absolute;
      left: 50%;
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