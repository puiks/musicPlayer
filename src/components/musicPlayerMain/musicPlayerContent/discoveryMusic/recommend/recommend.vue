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
          <img :src="item.picUrl" alt />
          <h4>{{item.name}}</h4>
        </div>
      </div>
    </div>
    <div class="exclusive_area">
      <h3>独家放送</h3>
      <div class="exclusive_content">
        <div :key="item.id" v-for="item in exclusiveContent" class="exclusive_item">
          <img :src="item.sPicUrl" alt />
          <h4>{{item.name}}</h4>
        </div>
      </div>
    </div>
    <div class="latestMusic_area">
      <h3>最新音乐</h3>
      <div class="latestMusic_content">
        <div :key="item.id" v-for="(item,index) in newSong" class="latestMusic_item">
          <div class="indexOfSong">{{index+1 | format}}</div>
          <img :src="item.picUrl" alt />
          <div class="song_info">
            <div>{{item.name}}</div>
            <div class="song_artist">
              <span :key="item1.id" v-for="item1 in item.song.artists">{{item1.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="mv_area">
      <h3>推荐MV</h3>
      <div class="mv_content">
        <div :key="item.id" v-for="item in mvLists" class="mv_item">
          <img :src="item.picUrl" alt />
          <div class="mv_info">
            <div class="mv_name">{{item.name}}</div>
            <div class="mv_artist">
              <span :key="item1.id" v-for="item1 in item.artists">{{item1.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="radio_area">
      <h3>主播电台</h3>
      <div class="radio_content">
        <div :key="item.id" v-for="item in radioLists" class="radio_item">
          <img :src="item.picUrl" alt />
          <div class="radio_info">{{item.name}}</div>
        </div>
      </div>
    </div>-->
    <div class="footer">到底了</div>
  </div>
</template>

<script>
import Swiper from '../../common/swiper'
export default {
  data:function() {
    return {
      songLists:[],
      exclusiveContent:[],
      newSong:[],
      mvLists:[],
      radioLists:[]
    }
  },
  created() {
    this.getSongLists()
    this.getExclusiveContent()
    this.getNewSong()
    // this.getMv()
    // this.getRadio()
  },
  methods: {
   async getSongLists() {
      const res = await this.$http.get('/personalized?limit=10')
      this.songLists = res.data.result
      // console.log(this.songLists)
    },
   async getExclusiveContent() {
      const res = await this.$http.get('/personalized/privatecontent')
      this.exclusiveContent = res.data.result
      // console.log(this.exclusiveContent)
    },
    async getNewSong() {
      const res = await this.$http.get('/personalized/newsong')
      this.newSong = res.data.result
      // console.log(this.newSong)
    },
    async getMv() {
      const res = await this.$http.get('/personalized/mv')
      this.mvLists = res.data.result.splice(0,3)
      // console.log(this.mvLists)
    },
    async getRadio() {
      const res = await this.$http.get('/personalized/djprogram')
      this.radioLists = res.data.result.splice(0,5)
      console.log(this.radioLists)
    },
    goToSongList(id) {
      this.$router.push('/songListDetail/' + id)
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

.exclusive_area {
  width: 90%;
  margin: 0 auto 30px;

  h3 {
    font-size: 22px;
    font-weight: 400;
    padding: 10px 0;
    border-bottom: 1px solid #E1E1E2;
  }

  .exclusive_content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow: hidden;

    .exclusive_item {
      width: 32%;
      height: (@width / 2);
      margin: 30px 0;

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
      }

      .indexOfSong {
        margin: 0 8px;
        display: flex;
        align-self: center;
      }

      .song_info {
        // display: flex;
        // flex-direction: columns;
        .song_artist {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;

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

.mv_area {
  width: 90%;
  margin: 0 auto 20px;

  h3 {
    font-size: 22px;
    font-weight: 400;
    padding: 10px 0;
    border-bottom: 1px solid #E1E1E2;
  }

  .mv_content {
    display: flex;
    overflow: hidden;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    margin: 20px 0;

    .mv_item {
      width: 32%;
      box-sizing: border-box;
      margin: 10 0px;

      img {
        width: 100%;
      }

      .mv_info {
        .mv_name {
        }

        .mv_artist {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;

          span {
            font-size: 15px;
            font-weight: 400;
            color: #444444;
          }
        }
      }
    }
  }
}

.radio_area {
  width: 90%;
  margin: 0 auto 20px;

  h3 {
    font-size: 22px;
    font-weight: 400;
    padding: 10px 0;
    border-bottom: 1px solid #E1E1E2;
  }

  .radio_content {
    display: flex;
    overflow: hidden;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    margin: 20px 0;

    .radio_item {
      width: 19%;

      img {
        width: 100%;
      }

      .radio_info {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin-top: 5px;
        font-size: 14px;
      }
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