<template>
  <div>
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
        @dblclick="playMusic(item,index)"
        :key="index"
        v-for="(item,index) in songResult.songs"
        class="song_item"
      >
        <div class="index">{{index + 1 | formatIndex}}</div>
        <div @click="addIntoList(item)" class="operator">
          <i class="icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-AddwithcircleF" />
            </svg>
          </i>
        </div>
        <div class="song_title">{{item.name}}</div>
        <div class="singer">
          <span :key="item2.id + index" v-for="(item2,index) in item.artists">{{item2.name}}</span>
        </div>
        <div class="album">{{item.album.name}}</div>
        <div class="time">{{item.duration | getTime}}</div>
      </div>
    </div>
    <div class="pageHelper_area">
      <i v-if="currentPage > 0" @click="submitSearch(currentPage-1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-prev" />
        </svg>
      </i>
      <div
        @click="submitSearch(item3 - 1)"
        :class="isCurrent(item3 - 1)"
        :key="item3"
        v-for="item3 of pageSize"
      >{{item3}}</div>
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
      songResult:{},
      currentPage:0,
      pageSize:0
    }
  },
  created() {
    this.initKeyword()
    this.submitSearch()
  },
  methods:{
    initKeyword() {
      this.keyword = this.$route.params.keyword
    },
    async submitSearch(index = 0) {
      this.currentPage = index
      const res = await this.$http.get(`/search?keywords=${this.keyword}&limit=100&offset=${this.currentPage * 30}&type = 1`)
      this.songResult = res.data.result
      this.pageSize = (res.data.result.songCount / 100) > 5 ? 5 : Math.ceil(res.data.result.songCount / 100)
    },
     isCurrent(i) {
      if (i === this.currentPage) {
        return 'currentPage'
      } else {
        return 'page_item'
      }
    },
    async playMusic(song,index) {
      console.log(song)
        const { data:res} = await this.$http.get('/song/url?id=' + song.id)
        if (!res.data[0].url) {
          alert('没有播放该首歌的权限')
          return null
        }
        const songs = {
          id: song.id,
          sname: song.name,
          anames: song.artists,
          duration: song.duration,
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
          anames: song.artists,
          duration: song.duration
        }
         this.$store.commit('addSong',songInfo)
      }
  },
  filters:{
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

<style lang="stylus">
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

.pageHelper_area {
  display: flex;
  justify-content: center;
  align-items: center;

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

  .page_item {
    padding: 15px;
    cursor: pointer;

    &:hover {
      background-color: #ECEDF1;
      font-weight: 600;
    }
  }

  .currentPage {
    margin: 15px;
    color: #C62F2F;
    border-bottom: 1px solid #C62F2F;
  }
}
</style>