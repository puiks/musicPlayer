<template>
  <div class="songListPage">
    <!-- 标签选择器 -->
    <div class="selector">
      <div @click.stop="showCate" class="select_btn">
        全部歌单
        <i>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-down" />
          </svg>
        </i>
      </div>
      <div ref="selectFrameRef" class="select_frame">
        <h3>添加标签</h3>
        <div class="selection_area">
          <div @click="setCurrentCate('全部')" class="all">全部歌单</div>
          <div :key="item" v-for="(item,key) in songListCate.categories" class="select_item">
            <div class="parent_desc">{{item}}</div>
            <div class="child_area">
              <div
                @click.stop="setCurrentCate(item1.name)"
                class="child_desc"
                :key="item1.id"
                v-for="item1 in subCate(key)"
              >{{item1.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 热门标签 -->
    <div class="pop_tag_area">
      <div>热门标签:</div>
      <div :key="item.id" v-for="(item,index) in hotSongLists">
        <span class="hotTag_item" @click="setCurrentCate(item.name)">{{item.name}}</span>
        <i :class="index < hotSongLists.length - 1 ? 'divider' : ''"></i>
      </div>
    </div>
    <!-- 歌单展示区域 -->
    <div class="songList_area">
      <div
        @click="goToDetailtPage(item)"
        :key="item.id"
        v-for="item in songLists"
        class="songList_item"
      >
        <img v-lazy="item.coverImgUrl" alt />
        <div class="songList_info">{{item.name}}</div>
      </div>
    </div>
    <!-- 分页工具 -->
    <div class="pageHelper_area">
      <i v-if="currentPage > 0" @click="getSongLists(currentPage-1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-prev" />
        </svg>
      </i>
      <div
        @click="getSongLists(index)"
        :class="isCurrent(index)"
        :key="index"
        v-for="(item,index) in pageHelper"
      >{{index+1}}</div>
      <i v-if="currentPage < 9" @click="getSongLists(currentPage+1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-next" />
        </svg>
      </i>
    </div>
  </div>
</template>

<script>
import '../../common/selectFrame'
export default {
  data:function() {
    return {
      songListCate:{},
      hotSongLists:[],
      songLists:[],
      pageHelper: new Array(10),
      currentPage: -1,/* 当前页 */
      currentCate:'全部' /* 当前分类 */
    }
  },
  created() {
    this.getCate()
    this.getHotList()
    this.getSongLists()
  },
  methods:{
    // 获取分类
   async getCate() {
     const res = await this.$http.get('/playlist/catlist')
     this.songListCate = res.data
    },
    // 获取热门歌单
    async getHotList() {
      const res = await this.$http.get('/playlist/hot')
      this.hotSongLists = res.data.tags
    },
    // 获取歌单列表
    async getSongLists(i = 0) {
      const res = await this.$http.get(`/top/playlist?limit=40&offset=${i * 40}&cat=${this.currentCate}`)
      this.songLists = res.data.playlists
      this.currentPage = i
    },
    // 选择标签
    setCurrentCate(cate) {
      this.showCate()
      this.currentCate = cate
      this.getSongLists()
    },
    // 分页器样式控制
    isCurrent(i) {
      if (i === this.currentPage) {
        return 'currentPage'
      } else {
        return 'page_item'
      }
    },
    // 展示标签选择框
    showCate() {
      if (this.$refs.selectFrameRef.style.display === 'none' || this.$refs.selectFrameRef.style.display === '') {
        this.$refs.selectFrameRef.style.display = 'block'
      } else {
        this.$refs.selectFrameRef.style.display = 'none'
      }
    },
    subCate(key) {
     const res = this.songListCate.sub.filter(item => {
        return item.category === Number.parseInt(key)
      })
      return res
    },
    // 跳转歌单详情页面
    goToDetailtPage(item) {
      this.$router.push('/songListDetail/' + item.id)
    }
  }
}
</script>

<style lang="stylus" scoped>
.songListPage {
  width: 96%;
  margin: 0 auto;
  padding: 30px 0;

  .selector {
    position: relative;

    .select_btn {
      width: 8%;
      border: 1px solid #ccc;
      padding: 8px;
      border-radius: 10%;
      background-color: #fff;
      cursor: pointer;

      &:hover {
        background-color: #eee;
      }
    }

    .select_frame {
      display: none;
      position: absolute;
      top: 50px;
      width: 700px;
      height: 500px;
      background-color: #FAFAFA;
      border-radius: 1%;
      box-shadow: -5px -1px 10px #ccc;
      overflow: auto;

      h3 {
        font-size: 18px;
        font-weight: 400;
        padding: 20px;
        border-bottom: 1px solid #ccc;
      }

      .selection_area {
        width: 90%;
        margin: 20px auto;

        .all {
          padding: 15px 0;
          text-align: center;
          border: 1px solid #ccc;
          cursor: pointer;

          &:hover {
            background-color: #eee;
          }
        }

        .select_item {
          display: flex;
          margin-top: 15px;

          .parent_desc {
            flex: 1;
            font-size: 18px;
            color: #D77575;
          }

          .child_area {
            display: flex;
            flex-wrap: wrap;
            flex: 5;

            .child_desc {
              width: 20%;
              border: 1px solid #ccc;
              box-sizing: border-box;
              text-align: center;
              padding: 10px 0;
              cursor: pointer;

              &:hover {
                background-color: #eee;
              }
            }
          }
        }
      }
    }
  }

  .pop_tag_area {
    display: flex;
    margin-top: 20px;

    .hotTag_item {
      cursor: pointer;
    }

    div:nth-of-type(2) {
      margin-left: 30px;
    }

    .divider {
      display: inline-block;
      vertical-align: middle;
      width: 1px;
      height: 16px;
      margin: 0 30px;
      background-color: #000;
    }
  }

  .songList_area {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .songList_item {
      cursor: pointer;
      width: 19%;
      margin: 30px 0;

      img {
        width: 100%;
      }

      .songList_info {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
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
}
</style>