<template>
  <div class="aside_container">
    <div class="recommend_area">
      <h5>推荐</h5>
      <div class="recommend_content">
        <ul>
          <li class="recommend_item">
            <i>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-music" />
              </svg>
            </i> 发现音乐
          </li>
          <li class="recommend_item">
            <i>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-radio" />
              </svg>
            </i> 私人FM
          </li>
          <li class="recommend_item">
            <i>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-live" />
              </svg>
            </i> 直播
          </li>
          <li class="recommend_item">
            <i>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-Videorecordcamera" />
              </svg>
            </i> 视频
          </li>
          <li class="recommend_item">
            <i>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-friend" />
              </svg>
            </i> 朋友
          </li>
        </ul>
      </div>
    </div>
    <div class="my_music_area">
      <h5>我的音乐</h5>
      <div class="recommend_content">
        <ul>
          <li class="recommend_item">
            <i>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-music" />
              </svg>
            </i> 本地音乐
          </li>
          <li class="recommend_item">
            <i>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-download" />
              </svg>
            </i> 下载管理
          </li>
          <li class="recommend_item">
            <i>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-Clouddownload" />
              </svg>
            </i> 我的音乐云盘
          </li>
          <li class="recommend_item">
            <i>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-collect" />
              </svg>
            </i> 我的收藏
          </li>
        </ul>
      </div>
    </div>
    <div class="current_playing"></div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
.aside_container {
  position: relative;
  flex: 1;
  height: 100%;
  border-right: 1px solid #eee;
  background-color: #F6F6F8;
  overflow: auto;

  .recommend_area {
    margin-top: 0.4rem;

    h5 {
      margin-left: 0.7rem;
      font-weight: 400;
      color: #A27DA3;
    }

    .recommend_content {
      margin-top: 1.5rem;
      margin-left: 1.3rem;

      .recommend_item {
        font-size: 0.875rem;
        margin: 1rem 0;
        color: #5c5c5c;
        cursor: pointer;

        &:hover {
          color: #000;
        }

        i {
          margin-right: 1rem;
        }
      }
    }
  }

  .my_music_area {
    margin-top: 2rem;

    h5 {
      margin-left: 0.7rem;
      font-weight: 400;
      color: #A27DA3;
    }

    .recommend_content {
      margin-top: 1.5rem;
      margin-left: 1.3rem;

      .recommend_item {
        font-size: 0.875rem;
        margin: 1rem 0;
        color: #5c5c5c;
        cursor: pointer;

        &:hover {
          color: #000;
        }

        i {
          margin-right: 1rem;
        }
      }
    }
  }

  .current_playing {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3.5rem;
    border-top: 1px solid #E1E1E2;
  }
}
</style>