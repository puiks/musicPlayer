<template>
  <div v-if="albumInfo.album" class="albumDetailPage">
    <div class="albumDescription_area">
      <div class="img_container">
        <img :src="albumInfo.album.picUrl" alt />
      </div>
      <div class="albumInfo">
        <div class="albumTitle">{{albumInfo.album.name}}</div>
        <div class="albumArtist">歌手:{{albumInfo.album.artist.name}}</div>
        <div class="album_publishTime">时间:{{albumInfo.album.publishTime | format}}</div>
      </div>
    </div>
    <div class="album_main">
      <div class="album_nav">
        <div @click="switchNav('song')" :class="isCurrent('song')">歌曲列表</div>
        <div @click="switchNav('desc')" :class="isCurrent('desc')">专辑详情</div>
      </div>
      <div v-if="currentNav === 'song'" class="album_container">
        <div class="list_header">
          <div class="index">#</div>
          <div class="operator">操作</div>
          <div class="song_title">音乐标题</div>
          <div class="singer">歌手</div>
          <div class="album">专辑</div>
          <div class="time">时长</div>
        </div>
        <div
          @dblclick="playMusic(item2,index)"
          :key="item2.id"
          v-for="(item2,index) in albumInfo.songs"
          class="song_item"
        >
          <div class="index">{{index + 1 | formatIndex}}</div>
          <div @click="addIntoList(item2)" class="operator">
            <i class="icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-AddwithcircleF" />
              </svg>
            </i>
          </div>
          <div class="song_title">{{item2.name}}</div>
          <div class="singer">
            <span :key="item3.id" v-for="item3 in item2.ar">{{item3.name}}</span>
          </div>
          <div class="album">{{item2.al.name}}</div>
          <div class="time">{{item2.dt | getTime}}</div>
        </div>
      </div>
      <div class="album_desc" v-else>
        <h4>专辑介绍</h4>
        <div v-html="albumInfo.album.description"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data:function() {
    return {
      albumInfo:{},
      currentNav:'song'
    }
  },
  created() {
    this.getAlbumInfo()
  },
  methods:{
    async getAlbumInfo() {
      const res = await this.$http.get('/album?id=' + this.$route.params.id)
      this.albumInfo = res.data
      this.albumInfo.album.description = this.albumInfo.album.description.replace(/\n/gm,'<br />')
    },
    async playMusic(song,index) {
        const { data:res} = await this.$http.get('/song/url?id=' + song.id)
        if (!res.data[0].url) {
          alert('没有播放该首歌的权限')
          return null
        }
        const songs = {
          id: song.id,
          sname: song.name,
          anames: song.ar,
          duration: song.dt,
          immediate: true,
          // immediate:true,
          url: res.data[0].url
        }
        this.$store.commit('replaceThePlayList',songs)
      },
     async addIntoList(song) {
        const { data:res} = await this.$http.get('/song/url?id=' + song.id)
        if (!res.data[0].url) {
          alert('没有播放该首歌的权限')
          return null
        }
        const songInfo = {
          id: res.data[0].id,
          url: res.data[0].url,
          sname: song.name,
          anames: song.ar,
          duration: song.dt
        }
         this.$store.commit('addSong',songInfo)
      },
      isCurrent(item) {
        if (this.currentNav === item) {
          return 'nav_item current_item'
        } else {
          return 'nav_item'
        }
      },
      switchNav(item) {
        this.currentNav = item
      }
  },
  filters:{
        format(time) {
            const date = new Date(time)
            const year = date.getFullYear()
            let month = date.getMonth() + 1
            let day = date.getDay() + 1
            if (month < 10) {
                month = '0' + month
            }
            if (day < 10) {
                day = '0' + day
            }
            // console.log(time)
            return year + '-' + month + '-' + day
        },
        getTime(t) {
          let m = parseInt(t / 1000 / 60)
          m = m < 10 ? '0' + m : m
          let s = parseInt(t / 1000 % 60)
          s = s < 10 ? '0' + s : s
          return m + ':' + s
        },
        formatIndex(i) {
          if (i < 10) {
            return '0' + i
          } else {
            return i
          }
        }
    }
}
</script>

<style lang="stylus" scoped>
.albumDetailPage {
  padding: 30px 10px 30px 0;
  background-color: #FAFAFA;

  .albumDescription_area {
    display: flex;
    width: 95%;
    margin: 0 auto;
    margin-bottom: 100px;

    .img_container {
      flex: 1;

      img {
        width: 100%;
      }
    }

    .albumInfo {
      flex: 5;
      padding-left: 40px;

      .albumTitle {
        font-size: 30px;
      }

      .albumArtist {
        margin: 10px 0;
      }

      .album_publishTime {
        margin: 0 0 10px 0;
      }
    }
  }

  .album_main {
    .album_nav {
      display: flex;
      padding: 0 40px;
      border-bottom: 1px solid #ccc;

      .nav_item {
        cursor: pointer;
        margin: 0 30px;
        padding-bottom: 10px;
      }

      .current_item {
        border-bottom: 5px solid #C62F2F;
      }
    }

    .album_container {
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      text-align: center;

      .list_header {
        display: flex;
        border-bottom: 1px solid #ccc;
        padding: 10px 0;

        .index {
          flex: 1;
        }

        .operator {
          flex: 1;
        }

        .song_title {
          flex: 4;
        }

        .singer {
          flex: 3;
        }

        .album {
          flex: 3;
        }

        .time {
          flex: 1;
        }
      }

      .song_item {
        display: flex;
        height: 50px;
        align-items: center;

        &:nth-of-type(2n) {
          background-color: #F5F5F7;
        }

        &:hover {
          background-color: #EBECED;
        }

        .index {
          flex: 1;
        }

        .operator {
          flex: 1;

          .icon {
            color: #ccc;
            cursor: pointer;

            &:hover {
              color: #555;
            }
          }
        }

        .song_title {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          flex: 4;
          overflow: hidden;
        }

        .singer {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 3;

          span:nth-child(n+2)::before {
            content: '/';
            margin: 0 7px;
          }
        }

        .album {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          flex: 3;
          overflow: hidden;
        }

        .time {
          flex: 1;
        }
      }
    }
  }

  .album_desc {
    padding: 40px 40px 60px 40px;

    h4 {
      font-size: 25px;
    }

    div {
      margin-top: 30px;
      font-size: 22px;
    }
  }
}
</style>