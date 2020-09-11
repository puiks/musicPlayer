<template>
  <div class="mFooter">
    <!-- 歌曲信息 -->
    <div v-if="playList.length" class="currentSongInfo">
      <div class="img_container">
        <img :src="playList[0].imgUrl" alt />
      </div>
      <div class="detail">
        <div class="song_title">{{playList[0].sname}}</div>
        <div class="ar_name">
          <span :key="item2.id" class="ar_item" v-for="item2 in playList[0].anames">{{item2.name}}</span>
        </div>
      </div>
    </div>
    <div class="player_tool">
      <i @click="handleBack" class="tool_item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-player-skip-back" />
        </svg>
      </i>
      <!-- 根据当前状态判断下面是渲染播放或是暂停 -->
      <i @click="playMusic" v-if="!playing" class="tool_item tool_play">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-player-play" />
        </svg>
      </i>
      <i @click="playMusic" v-else class="tool_item tool_play">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-player-pause" />
        </svg>
      </i>
      <i @click="handleForward" class="tool_item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-player-skip-forward" />
        </svg>
      </i>
    </div>
    <div v-if="playList.length" class="play_area">
      <!-- 播放控件 -->
      <audio
        ref="audioRefs"
        :autoplay="playing"
        v-if="playList.length"
        :src="playList[setIndex].url"
        @timeupdate="updateTime"
        @ended="musicEnd"
      ></audio>
      <div class="currentTime">{{songInfo.currentTime | formatTime}}</div>
      <div ref="pContainerRefs" @click="changeTheProgress" class="progress_container">
        <div ref="progressRefs" class="progress_now"></div>
      </div>
      <div class="duration">{{setDuration | formatTime}}</div>
      <div class="volume">
        <i>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-volume" />
          </svg>
        </i>
        <div @click="changeVolume" class="volume_tube">
          <div ref="currentVolRefs" class="current_vol"></div>
        </div>
      </div>
    </div>
    <div class="playList">
      <i @click="showThePlayList" class="playList_icon">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-play-list-line" />
        </svg>
      </i>
      <div ref="playListRefs" class="playListArea">
        <div class="total">播放列表内总共有{{playList.length}}首</div>
        <div v-if="playList.length" class="song_area">
          <div class="song_item" :key="item1.sname" v-for="(item1,i) in playList">
            <!-- icon -->
            <div class="statusIcon">
              <i class="icon" v-if="i === setIndex && playing">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-player-play" />
                </svg>
              </i>
              <i class="icon" v-else-if="i === setIndex && !playing">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-player-pause" />
                </svg>
              </i>
            </div>
            <div class="song_title">{{item1.sname}}</div>
            <div class="singer_area">
              <span class="singer" :key="item2.id" v-for="item2 in item1.anames">{{item2.name}}</span>
            </div>
            <div @click="removeSong(item1,i)" class="delete">删除</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data:function() {
    return {
      playList: this.$store.state.playList,
      songInfo: {
        currentTime:0
      },
      playing: false
    }
  },
  computed: {
    setDuration() {
      return this.playList[this.setIndex].duration / 1000 || 0
    },
    setIndex() {
      return this.$store.state.currentMusic
    }
  },
  watch:{
    playList:function(val) {
      if (val.length && val[0].immediate) {
        this.playing = true
      }
    }
  },
  methods: {
    playMusic(e) {
      // 播放相关
      if (!this.playList.length) {
          return
      }
      this.playing = !this.playing
      if (this.playing) {
       this.$refs.audioRefs.play()
      } else {
       this.$refs.audioRefs.pause()
      }
    },
    changeVolume(e) {
      // 更改音量
      const volLev = e.offsetX
      const volPercent = Math.floor(volLev * 100 / e.currentTarget.offsetWidth) / 100
      this.$refs.currentVolRefs.style.width = (volPercent * e.currentTarget.offsetWidth) + 'px'
      this.$refs.audioRefs.volume = volPercent
    },
    changeTheProgress(e) {
      // 手动拖动进度条
      const progress = e.offsetX
      const progressPercent = Math.floor(progress * 100 / e.currentTarget.offsetWidth) / 100
      // this.$refs.progressRefs.style.width = (progressPercent * e.currentTarget.offsetWidth) + 'px'
      this.$refs.audioRefs.currentTime = progressPercent * this.setDuration
    },
    updateTime(e) {
      if (!this.playList.length) {
        return
      }
      // 更新当前播放进度
      const nowTime = Math.floor(e.target.currentTime)
      this.$refs.progressRefs.style.width = ((this.$refs.pContainerRefs.offsetWidth) * nowTime / this.setDuration) + 'px'
      this.songInfo.currentTime = nowTime
    },
    showThePlayList() {
      // 查看播放列表
      if (this.$refs.playListRefs.style.display === 'block') {
        this.$refs.playListRefs.style.display = 'none'
      } else {
        this.$refs.playListRefs.style.display = 'block'
      }
    },
    handleBack() {
      // 判断有无上一首先
      if (this.playList[this.setIndex - 1]) {
        this.$store.commit('setCurrentPlaying',{
          type:'back'
        })
        this.playing = true
      }
    },
    handleForward() {
      // 判断有无下一首先
      if (this.playList[this.setIndex + 1]) {
        this.$store.commit('setCurrentPlaying',{
          type:'add'
        })
        this.playing = true
      }
    },
    musicEnd() {
      // 后续还有音乐就播放，否则暂停播放
      if (this.playList[this.setIndex + 1]) {
        this.$store.commit('setCurrentPlaying',{
          type:'add'
        })
      } else {
        this.playing = false
      }
    },
    removeSong(song,i) {
      if (i < this.setIndex) {
        this.$store.commit('setCurrentPlaying',{
          type:'back'
        })
      } else if (i === this.setIndex) {
          if (!this.playList[i + 1]) {
            this.$store.commit('setCurrentPlaying',{
            type:'back'
          })
        }
      }
      this.$store.commit('removeSong',song)
      // 判断一下列表还有没有音乐，用来控制播放图标的显示
      if (!this.playList.length) {
        this.playing = false
      }
    }
  },
  filters: {
    formatTime(t) {
      let m = parseInt(t / 60)
      let s = parseInt(t % 60)
      m = m < 10 ? '0' + m : m
      s = s < 10 ? '0' + s : s
      return m + ':' + s
    }
  }
}
</script>

<style lang="stylus" scoped>
.mFooter {
  position: fixed;
  display: flex;
  align-items: center;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 4rem;
  border-top: 1px solid #E1E1E2;
  background-color: #F5F5F7;

  .currentSongInfo {
    display: flex;
    position: absolute;
    left: 3em;
    align-items: center;

    .img_container {
      width: 2.85rem;
      height: 2.85rem;
      margin: 0 10px;

      img {
        width: 100%;
      }
    }

    .detail {
      display: flex;
      flex-direction: column;
      font-size: 18px;
      margin: 0 10px;

      .song_title {
        width: 10em;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }

      .ar_name {
        width: 10em;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        font-size: 17px;
        color: #999;

        .ar_item:nth-child(n+2)::before {
          content: '/';
          margin: 5px;
        }
      }
    }
  }

  .player_tool {
    position: absolute;
    left: 25rem;

    .tool_item {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      background-color: #E83C3C;
      border-radius: (@width / 2);
      text-align: center;
      line-height: @height;
      margin: 0 0.75rem;
      cursor: pointer;

      &:hover {
        background-color: #D33030;
      }

      .icon {
        font-size: 1.25rem;
        color: #fff;
      }
    }

    .tool_play {
      width: 2.2rem;
      height: 2.2rem;
      line-height: @height;
    }
  }

  .play_area {
    display: flex;
    position: absolute;
    align-items: center;
    left: 40rem;

    .progress_container {
      cursor: pointer;
      margin: 0 20px;
      width: 400px;
      height: 15px;
      border-radius: (@height / 2);
      background-color: #C2C2C4;
      overflow: hidden;

      .progress_now {
        width: 0;
        height: 15px;
        border-radius: (@height / 2);
        background-color: #E83C3C;
      }
    }

    .volume {
      display: flex;
      align-items: center;
      margin: 0 10px;

      .volume_tube {
        cursor: pointer;
        margin: 0 10px;
        width: 130px;
        height: 15px;
        border-radius: (@height / 2);
        background-color: #E6E6E8;
        overflow: hidden;

        .current_vol {
          height: 15px;
          border-radius: (@height / 2);
          background-color: #E83C3C;
        }
      }
    }
  }

  .playList {
    position: absolute;
    right: 50px;

    .playList_icon {
      font-size: 20px;
      cursor: pointer;
    }

    .playListArea {
      position: absolute;
      display: none;
      width: 550px;
      height: 500px;
      background-color: #FAFAFA;
      bottom: 40px;
      right: -35px;
      box-shadow: -2px -1px 3px #ccc;

      .total {
        padding: 10px;
        text-align: center;
        background-color: #F4F1F3;
        border-bottom: 1px solid #ccc;
      }

      .song_area {
        .song_item {
          display: flex;
          align-items: center;
          padding: 10px 20px;

          &:nth-of-type(2n) {
            background-color: #F5F5F7;
          }

          .statusIcon {
            flex: 1;

            .icon {
              font-size: 18px;
              color: #C62F2F;
            }
          }

          .song_title {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            flex: 5;
            margin: 0 10px;
          }

          .singer_area {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            flex: 3;
            margin: 0 10px;

            .singer:nth-child(n+2)::before {
              content: '/';
              margin: 0 5px;
            }
          }

          .delete {
            background-color: #ddd;
            font-size: 12px;
            color: #000;
            padding: 5px;
            border-radius: 20%;
            cursor: pointer;

            &:hover {
              background-color: #ccc;
            }
          }
        }
      }
    }
  }
}
</style>