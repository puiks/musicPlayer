<template>
  <div class="mheader">
    <div @click="goHomePage" class="logo_area">
      <i class="logo_icon">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-netease-cloud-music-fill" />
        </svg>
      </i>
      <p class="logo_desc">music player</p>
    </div>
    <div class="search_area">
      <input
        @keypress.enter="submitSearch()"
        v-model="inputValue"
        @input="checkInput"
        @click.stop="showTheHotSearch"
        type="text"
        class="search_input"
      />
      <i @click.stop="submitSearch()" class="search_btn">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-search" />
        </svg>
      </i>
      <div ref="searchRef" class="search_frame">
        <div v-if="!suggestList" class="search_part">
          <div class="search_history">
            <h4>搜索历史</h4>
            <div class="history_content">
              <div class="history_item"></div>
            </div>
          </div>
          <div class="hotRank">
            <h4>热搜榜</h4>
            <div class="rank_content">
              <div
                :key="index"
                @click.stop="submitSearch(item2.searchWord)"
                v-for="(item2,index) in hotSearchList"
                class="rank_item"
              >
                <div class="itemIndex">{{index + 1}}</div>
                <div class="item_desc">
                  <div class="item_title">
                    <span>{{item2.searchWord}}</span>
                    <span class="score">{{item2.score}}</span>
                  </div>
                  <div class="item_detail">{{item2.content}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="search_suggest">
          <div class="suggest_item" :key="index" v-for="(item,index) in suggestList.order">
            <h4>{{item}}</h4>
            <div
              :key="item1.id"
              @click.stop="submitSearch(item1.name)"
              v-for="item1 in suggestList[item]"
              class="sub_item"
            >{{item1.name}}</div>
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
      hotSearchList:[],
      inputValue:'',
      suggestList:null
      }
    },
    watch:{
       inputValue:function(val) {
          if (!val) {
           this.suggestList = null
          }
       }
    },
    methods:{
      // 回到主页
      goHomePage() {
        this.$router.push('/discoveryMusic/recommend')
      },
      // 显示搜索框
      async showTheHotSearch() {
        this.$refs.searchRef.style.display = 'block'
        const res = await this.$http.get('/search/hot/detail')
        this.hotSearchList = res.data.data
      },
      // 动态搜索建议
      checkInput() {
        if (!this.inputValue) {
          return
        }
        clearTimeout(this.timer)
        this.timer = setTimeout(async () => {
          const res = await this.$http.get('/search/suggest?keywords=' + this.inputValue)
        this.suggestList = res.data.result
        }, 500)
      },
      // 隐藏搜索框
      hideTheHotSearch() {
        this.$refs.searchRef.style.display = 'none'
      },
      // 提交搜索
      async submitSearch(searchWord = '') {
        this.hideTheHotSearch()
        if (searchWord === '') {
          if (!this.inputValue) {
            return
          }
          this.$router.push({path:'/middlePage',query:{finalPath:'/searchResult/' + this.inputValue}})
        } else {
          this.$router.push({path:'/middlePage',query:{finalPath:'/searchResult/' + searchWord}})
        }
      }
    }
}
</script>

<style lang="stylus" scoped>
c = #fff;

.mheader {
  display: flex;
  position: relative;
  top: 0;
  left: 0;
  background-color: #C62F2F;
  height: 3.2rem;
  align-items: center;

  .logo_area {
    display: flex;
    position: absolute;
    left: 1.25rem;
    cursor: pointer;

    .icon {
      font-size: 1.7rem;
      color: c;
    }

    .logo_desc {
      margin-left: 0.3125rem;
      font-size: 1.1rem;
      color: c;
    }
  }

  // .pageTool {
  // display: flex;
  // align-items: center;
  // position: absolute;
  // left: 250px;

  // .backTool, .forwardTool {
  // color: #fff;
  // font-size: 18px;
  // padding: 2px 4px;
  // margin: 0 3px;
  // border: 1px solid #A82828;
  // }
  // }
  .search_area {
    position: absolute;
    left: 350px;

    .search_input {
      width: 20rem;
      height: 2rem;
      border-radius: (@height / 2);
      background-color: #A82828;
      text-indent: 1em;
      color: #fff;
      font-size: 1rem;
    }

    .search_btn {
      position: absolute;
      right: 0.8rem;
      top: 0.2rem;
      cursor: pointer;
      color: #C56D6D;
      font-size: 1.2rem;

      & :hover {
        color: #fff;
      }
    }

    .search_frame {
      position: absolute;
      display: none;
      width: 35rem;
      height: 25rem;
      top: 45px;
      padding-top: 20px;
      background-color: #fff;
      box-shadow: 0 5px 4px 3px #ccc;
      overflow: auto;
      z-index: 9999;
      transition: all 0.5s ease;

      .search_part {
        .search_history {
          padding-left: 25px;
          margin-bottom: 30px;

          h4 {
            font-size: 18px;
            color: #222;
            font-weight: 500;
            margin-bottom: 15px;
          }

          .history_content {
            display: flex;
            flex-wrap: wrap;

            .history_item {
              padding: 8px 15px;
              margin: 0 15px 10px 0;
              border: 1px solid #ccc;
              border-radius: 5px;
              cursor: pointer;

              &:hover {
                background-color: #eee;
              }
            }
          }
        }

        .hotRank {
          h4 {
            padding-left: 25px;
            font-size: 18px;
            color: #222;
            font-weight: 500;
            margin-bottom: 15px;
          }

          .rank_content {
            .rank_item {
              display: flex;
              align-items: center;
              padding: 20px 0 20px 25px;
              cursor: pointer;

              &:hover {
                background-color: #eee;
              }

              .itemIndex {
                flex: 1;
                font-size: 26px;
                color: #FF3A3A;
              }

              .item_desc {
                flex: 7;

                .item_title {
                  .score {
                    margin-left: 10px;
                    font-size: 12px;
                    color: #ccc;
                  }
                }

                .item_detail {
                  color: #999;
                }
              }

              &:nth-child(n+4) .itemIndex {
                color: #999;
              }
            }
          }
        }
      }

      .search_suggest {
        .suggest_item {
          h4 {
            font-size: 18px;
            padding: 10px 0 10px 30px;
            background-color: #F5F5F7;
          }

          .sub_item {
            font-size: 18px;
            padding: 10px 0 10px 30px;
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
</style>