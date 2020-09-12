<template>
  <div>
    <swiper address="/banner" />
    <div class="recommend_songList_area">
      <h3>推荐歌单</h3>
      <div class="recommend_songList_content">
        <div
          @click="goToSongList(item.id)"
          :key="item.id"
          v-for="item in songLists"
          class="recommend_songList_item"
        >
          <img v-lazy="item.picUrl" alt />
          <h4>{{item.name}}</h4>
        </div>
      </div>
    </div>
    <div class="latestMusic_area">
      <h3>最新音乐</h3>
      <div class="latestMusic_content">
        <div
          @dblclick="playMusic(item)"
          :key="item.id"
          v-for="(item,index) in newSong"
          class="latestMusic_item"
        >
          <div class="indexOfSong">{{index+1 | format}}</div>
          <img v-lazy="item.picUrl" alt />
          <div class="song_info">
            <div>{{item.name}}</div>
            <div class="song_artist">
              <span
                @click="goToSingerPage(item1.id)"
                :key="item1.id"
                v-for="item1 in item.song.artists"
              >{{item1.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import Swiper from '../../common/swiper'
export default {
  data:function() {
    return {
      songLists:[],
      newSong:[]
    }
  },
  created() {
    this.getSongLists()
    this.getNewSong()
  },
  methods: {
   async getSongLists() {
      const res = await this.$http.get('/personalized?limit=10')
      this.songLists = res.data.result
      // console.log(this.songLists)
    },
    async getNewSong() {
      const res = await this.$http.get('/personalized/newsong')
      this.newSong = res.data.result
      // console.log(this.newSong)
    },
    async playMusic(song) {
        const { data:res} = await this.$http.get('/song/url?id=' + song.id)
        if (!res.data[0].url) {
          this.$message.error('抱歉，该首歌仅限会员才可播放。')
          return null
        }
        const songs = {
          id: song.id,
          sname: song.name,
          anames: song.song.artists,
          duration: song.song.duration,
          immediate: true,
          imgUrl:song.picUrl,
          url: res.data[0].url
        }
        this.$store.commit('replaceThePlayList',songs)
      },
    goToSongList(id) {
      this.$router.push('/songListDetail/' + id)
    },
    goToSingerPage(id) {
      this.$router.push('/singerDetail/' + id)
    }
  },
  components:{
    Swiper
  },
  filters:{
    format(index) {
      if (index < 10) {
        return '0' + index
      }
      return index
    }
  }
}
</script>

<style lang="stylus" scoped>
.recommend_songList_area {
  width: 90%;
  margin: 50px auto 20px;

  // border: 1px solid #000;
  h3 {
    font-size: 22px;
    font-weight: 400;
    padding: 10px 0;
    border-bottom: 1px solid #E1E1E2;
  }

  .recommend_songList_content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow: hidden;

    .recommend_songList_item {
      width: 18%;
      height: @width;
      margin: 30px 0;
      cursor: pointer;

      // margin: 50px 20px;
      img {
        width: 100%;
        height: 100%;
      }

      h4 {
        font-weight: 400;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
}

.latestMusic_area {
  width: 90%;
  margin: 0 auto 20px;

  h3 {
    font-size: 22px;
    font-weight: 400;
    padding: 10px 0;
    border-bottom: 1px solid #E1E1E2;
  }

  .latestMusic_content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    border: 1px solid #eee;
    margin: 20px 0;

    .latestMusic_item {
      width: 50%;
      box-sizing: border-box;
      display: flex;
      padding: 10px 0;

      img {
        width: 8%;
        margin-right: 8px;
      }

      .indexOfSong {
        margin: 0 8px;
        display: flex;
        align-self: center;
      }

      .song_info {
        .song_artist {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          margin-top: 10px;

          span {
            font-weight: 300;
            color: #000;
            cursor: pointer;
            margin: 0 5px;
          }
        }
      }
    }

    .latestMusic_item:nth-child(2n+1) {
      border-right: 1px solid #ccc;
    }

    .latestMusic_item:nth-child(3), .latestMusic_item:nth-child(4), .latestMusic_item:nth-child(7), .latestMusic_item:nth-child(8) {
      background-color: #f8f8f8;
    }

    .latestMusic_item:hover {
      background-color: #eee;
    }
  }
}

.footer {
  width: 90%;
  margin: 30px auto;
  padding: 20px 0;
  border-top: 1px solid #e1e2e3;
  text-align: center;
  color: #000;
}
</style>