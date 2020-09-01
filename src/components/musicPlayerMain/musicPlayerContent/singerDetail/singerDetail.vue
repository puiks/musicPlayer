<template>
  <div class="singerDetailPage">
    <!-- 歌手信息区域 -->
    <div class="singerInfo">
      <div class="singer_desc">
        <div class="singer_name">{{name}}</div>
      </div>
      <div class="singerImg">
        <img :src="imgUrl" alt />
      </div>
    </div>
    <!-- 导航区域 选择是要热门歌曲还是专辑信息 -->
    <div class="navBar">
      <div
        @click="chooseNav(item.id)"
        :class="setActive(item)"
        :key="item.id"
        v-for="item in navBars"
      >{{item.title}}</div>
    </div>
    <!-- 主体区域 -->
    <div class="main_area">
      <!-- 热门歌曲 -->
      <div class="topSong" v-show="navBars[0].isActive">
        <div
          :key="item.id"
          @dblclick="playTheMusic(item)"
          v-for="(item,index) in topSongs"
          class="song_item"
        >
          <div class="song_index">{{index + 1 | formatIndex}}</div>
          <div class="song_name">{{item.name}}</div>
          <div class="song_duration">{{item.dt | formatTime}}</div>
        </div>
      </div>
      <!-- 歌手描述 -->
      <div class="desc_area" v-show="navBars[1].isActive">
        <div class="desc_item" :key="index" v-for="(item3,index) in description">
          <h2>{{item3.ti}}</h2>
          <p v-html="item3.txt"></p>
        </div>
      </div>
      <!-- 专辑 -->
      <div class="album_component" v-show="navBars[2].isActive">
        <div class="album_area">
          <div :key="item1.id" v-for="item1 in albumLists" class="album_item">
            <div class="album_img">
              <img :src="item1.picUrl" alt />
            </div>
            <div class="album_name">{{item1.name}}</div>
            <div class="album_publishTime">{{item1.publishTime | formatDate}}</div>
          </div>
        </div>
        <!-- 分页 -->
        <div class="pagination">
          <div class="prePage" v-if="currentPage > 1" @click="getAlbumLists(currentPage - 1)">上一页</div>
          <div
            :class="setPageClass(index)"
            @click="getAlbumLists(index)"
            :key="index"
            v-for="index of pageNum "
          >{{index}}</div>
          <div
            class="nextPage"
            v-if="currentPage < pageNum"
            @click="getAlbumLists(currentPage + 1)"
          >下一页</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['id','name','imgUrl','albumSize'],
  data:function() {
    return {
      singerId: -1,
      topSongs:[],
      navBars:[
        {id:101356,title:'热门歌曲',isActive:true},
        {id:101357,title:'歌手详情',isActive:false},
        {id:101358,title:'专辑',isActive:false}
      ],
      albumLists:[],
      description:[],
      pageNum: Math.ceil(this.albumSize / 12),
      currentPage: 1
    }
  },
  created() {
  //  this.getSingerInfo()
   this.getHotSong()
  },
  methods:{
    // 获取热门歌曲
    async getHotSong() {
      const res = await this.$http.get('/artist/top/song?id=' + this.id)
      this.topSongs = res.data.songs
    },
    // nav栏选择展示不同内容
    chooseNav(id) {
      this.navBars.forEach(item => {
        if (item.id === id) {
          item.isActive = true
        } else {
          item.isActive = false
        }
      })
      // 在跳转时再去获取信息
      if (id === 101358) {
        // 如果已经取过了就不用再重复
        if (!this.albumLists.length) {
          this.getAlbumLists()
        }
      } else if (id === 101357) {
          if (!this.description.length) {
            this.getDescription()
          }
      }
    },
    // 点击nav的时候设置样式
    setActive(item) {
      if (item.isActive) {
        return 'nav_item current_item'
      } else {
        return 'nav_item'
      }
    },
    // 获取专辑信息
    async getAlbumLists(page = 1) {
      const res = await this.$http.get(`/artist/album?id=${this.id}&limit=12&offset=${(page - 1) * 12}`)
      this.currentPage = page
      this.albumLists = res.data.hotAlbums
    },
    // 获取歌手描述信息
    async getDescription() {
      const res = await this.$http.get('/artist/desc?id=' + this.id)
      this.description = res.data.introduction
      this.description.forEach(item => {
        item.txt = item.txt.replace(/\n/gm,'<br />')
        console.log(item.txt)
      })
    },
    // 分页样式控制
    setPageClass(index) {
      if (index === this.currentPage) {
        return 'currentPage'
      }
      return 'page_item'
    },
    async playTheMusic(songInfo) {
      const res = await this.$http.get('/song/url?id=' + songInfo.id)
      const songs = {
          id: songInfo.id,
          sname: songInfo.name,
          anames: songInfo.ar,
          duration: songInfo.dt,
          immediate: true,
          url: res.data.data[0].url
        }
      this.$store.commit('replaceThePlayList',songs)
    }
  },
  filters:{
    formatTime(time) {
      let m = parseInt(time / 1000 / 60)
      let s = parseInt(time / 1000 % 60)
      m = m < 10 ? '0' + m : m
      s = s < 10 ? '0' + s : s
      return m + ':' + s
    },
    formatIndex(index) {
     return index < 10 ? '0' + index : index
    },
    formatDate(date) {
      const Y = new Date(date).getFullYear()
      let M = new Date(date).getMonth() + 1
      let D = new Date(date).getDay()
      M = M < 10 ? '0' + M : M
      D = D < 10 ? '0' + D : D
      return Y + '.' + M + '.' + D
    }
  }
}
</script>

<style lang="stylus" scoped>
.singerDetailPage {
  padding-bottom: 50px;
  background-color: #F5F5F5;

  .singerInfo {
    padding: 20px;

    .singer_desc {
      margin-bottom: 20px;

      .singer_name {
        font-size: 24px;
      }
    }

    .singerImg {
      width: 40%;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .navBar {
    display: flex;
    border-bottom: 1px solid #ccc;
    padding-left: 30px;
    margin-bottom: 30px;

    .nav_item {
      cursor: pointer;
      font-size: 20px;
      padding: 10px 0;
      margin: 0 30px;
    }

    .current_item {
      border-bottom: 5px solid #C62F2F;
    }
  }

  .main_area {
    .topSong {
      position: relative;
      width: 50%;
      margin-left: 40px;
      border: 1px solid #ccc;

      .song_item {
        display: flex;
        padding: 20px;

        .song_index {
          flex: 1;
        }

        .song_name {
          flex: 5;
        }

        .song_duration {
          flex: 1;
        }

        &:nth-child(2n) {
          background-color: #eee;
        }

        &:hover {
          background-color: #ccc;
        }
      }
    }

    .album_component {
      .album_area {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        .album_item {
          width: 23%;
          margin: 20px 0;

          .album_img {
            img {
              width: 100%;
              height: 100%;
            }
          }

          .album_name {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }

          .album_publishTime {
          }
        }
      }

      .pagination {
        display: flex;
        width: 250px;
        height: 40px;
        margin: 50px auto 0;

        .prePage {
          width: 80px;
          height: 25px;
          margin: 0 10px;
          border: 1px solid #000;
          background-color: #fff;
          border-radius: 5px;
          text-align: center;
          cursor: pointer;
        }

        .page_item {
          width: 25px;
          height: 25px;
          line-height: 25px;
          text-align: center;
          border: 1px solid #ccc;
          margin: 0 10px;
          color: #000;
          background-color: #fff;
          border-radius: 5px;
          cursor: pointer;

          &:hover {
            border: 1px solid #000;
          }
        }

        .currentPage {
          width: 25px;
          height: 25px;
          line-height: 25px;
          text-align: center;
          border: 1px solid #000;
          margin: 0 10px;
          border-radius: 5px;
          color: #fff;
          background-color: #E1151D;
        }

        .nextPage {
          width: 80px;
          height: 25px;
          border: 1px solid #000;
          margin: 0 10px;
          background-color: #fff;
          border-radius: 5px;
          text-align: center;
          cursor: pointer;
        }
      }
    }

    .desc_area {
      padding-left: 50px;

      .desc_item {
        margin: 50px 0;

        h2 {
          margin-bottom: 30px;
        }

        p {
          font-size: 21px;
        }
      }
    }
  }
}
</style>