<template>
  <div class="songListDetailPage">
    <div class="songListDescription_area">
      <div class="img_container">
        <img :src="songListDetail.coverImgUrl" alt />
      </div>
      <div class="songListInfo">
        <div class="songListTitle">{{songListDetail.name}}</div>
        <div class="songListAuthor">
          <div class="avatar_container">
            <img :src="songListDetail.creator.avatarUrl" alt />
          </div>
          <div class="nickName">{{songListDetail.creator.nickname}}</div>
          <div>{{songListDetail.updateTime | format}}</div>
        </div>
        <!-- <div class="tool_area"></div> -->
        <div class="tag">
          标签:
          <span :key="key" v-for="(item2,key) in songListDetail.tags">{{item2}}</span>
        </div>
        <div class="desc">
          简介:
          <p>{{songListDetail.description}}</p>
        </div>
      </div>
    </div>
    <div class="songList_main">
      <div class="songList_nav">
        <div class="nav_item">歌曲列表</div>
        <div class="nav_item">评论({{songListDetail.commentCount}})</div>
        <div class="nav_item">收藏者</div>
      </div>
      <div class="song_container">
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
          v-for="(item2,index) in song_items"
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
    </div>
  </div>
</template>

<script>
export default {
    data:function() {
        return {
            id:this.$route.params.id,
            songListDetail:{
                creator:{},
                tags:[],
                tracks:[]
            },
            tracksId:'',
            song_items:[]
        }
    },
    created() {
     this.getSongListDetail()
    },
    methods:{
      async getSongListDetail() {
          const res = await this.$http.get('/playlist/detail?id=' + this.id)
          this.songListDetail = res.data.playlist
          const ids = this.songListDetail.tracks.map(item => {
          return item.id
          })
          this.tracksId = ids.join(',')
          this.getSong()
          // console.log('gs')
          // console.log(this.songListDetail)
          // this.getSong()
        },
      async getSong() {
        const res = await this.$http.get('/song/detail?ids=' + this.tracksId)
        this.song_items = res.data.songs
      },
      async playMusic(song,index) {
        const { data:res} = await this.$http.get('/song/url?id=' + song.id)
        if (!res.data[0].url) {
          this.$message.error('抱歉，该首歌仅限会员才可播放。')
          return null
        }
        const songs = {
          id: song.id,
          sname: song.name,
          anames: song.ar,
          duration: song.dt,
          immediate: true,
          imgUrl:song.al.picUrl,
          // immediate:true,
          url: res.data[0].url
        }
        // res.data.forEach((item,index2) => {
        //   playList[index2].url = item.url
        // })
        // playList[0].immediate = true
        // 告知当前播放是哪首
        // this.$store.commit('setCurrentPlaying',{
        //  id: song.id
        // })
        this.$store.commit('replaceThePlayList',songs)
      },
     async addIntoList(song) {
        const { data:res} = await this.$http.get('/song/url?id=' + song.id)
        if (!res.data[0].url) {
         this.$message.error('抱歉，该首歌仅限会员才可播放。')
          return null
        }
        const songInfo = {
          id: res.data[0].id,
          url: res.data[0].url,
          sname: song.name,
          anames: song.ar,
          imgUrl:song.al.picUrl,
          duration: song.dt
        }
         this.$store.commit('addSong',songInfo)
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
            return year + '-' + month + '-' + day + '更新'
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
.songListDetailPage {
  padding: 30px 10px 30px 0;
  background-color: #FAFAFA;

  .songListDescription_area {
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

    .songListInfo {
      flex: 5;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: auto;
      padding-left: 40px;

      .songListTitle {
        font-size: 20px;
      }

      .songListAuthor {
        display: flex;
        align-items: center;
        margin-top: 10px;

        .avatar_container {
          width: 40px;
          height: 35px;
          border-radius: 50%;

          img {
            width: 100%;
            border-radius: 50%;
          }
        }

        .nickName {
          margin: 0 10px;
        }
      }

      .tag {
        margin: 25px 0;

        span {
          margin: 0 10px;
        }
      }

      .desc {
      }
    }
  }

  .songList_main {
    .songList_nav {
      display: flex;
      padding: 0 40px;
      border-bottom: 1px solid #ccc;

      .nav_item {
        cursor: pointer;
        margin: 0 30px;
        padding-bottom: 10px;
      }

      .current_item {
        border-bottom: 3px solid #C62F2F;
      }
    }

    .song_container {
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
        height: 30px;
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
}
</style>