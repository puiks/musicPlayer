<template>
  <div class="banner_area" @mouseover="pause" @mouseleave="autoplay">
    <div class="img_container">
      <div class="cover"></div>
      <div @click="prev" class="pre_area">
        <i class="btn pre_btn">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-prev" />
          </svg>
        </i>
      </div>
      <div
        @click="clickImg(item)"
        :key="index"
        v-for="(item,index) in bannerList"
        :class="initName(index)"
      >
        <img :src="item.imageUrl" alt />
      </div>
      <div @click="next" class="next_area">
        <i class="btn next_btn">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-next" />
          </svg>
        </i>
      </div>
    </div>
    <div class="dot_area">
      <ul>
        <li
          @mouseover="currentBtn = index"
          :key="index"
          v-for="(item,index) in bannerList"
          :class="setDotClass(index)"
        >{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    props:['address'],
    data:function () {
      return {
        bannerList:[],
        imgLength:0,
        currentBtn:0
      }
    },
    created() {
        this.swiperFlag = true
        this.getBanner()
        this.autoplay()
    },
    methods:{
        async getBanner() {
          const res = await this.$http.get(this.address)
          this.bannerList = res.data.banners
          this.imgLength = res.data.banners.length
        },
        next() {
          if (this.swiperFlag) {
            this.swiperFlag = false
            this.currentBtn = this.currentBtn >= this.imgLength - 1 ? 0 : ++this.currentBtn
            this.initName()
            // 节流
            setTimeout(() => {
              this.swiperFlag = true
            }, 500)
          }
        },
        prev() {
            this.currentBtn = this.currentBtn <= 0 ? this.imgLength - 1 : --this.currentBtn
            this.initName()
        },
        initName(i) {
           if (i === this.currentBtn) {
               return 'img_item current'
           } else if (i === this.currentBtn - 1) {
               return 'img_item prev'
           } else if (i === this.currentBtn + 1) {
               return 'img_item next'
           } else if (this.currentBtn === 0 && i === this.imgLength - 1) {
               return 'img_item prev'
           } else if (this.currentBtn === this.imgLength - 1 && i === 0) {
               return 'img_item next'
           } else {
               return 'img_item'
           }
        },
        setDotClass(i) {
          if (i === this.currentBtn) {
            return 'dot_item current_dot'
          } else {
            return 'dot_item'
          }
        },
        autoplay() {
          const vm = this
            this.timer = setInterval(function() {
                vm.next()
            },4000)
        },
        pause() {
          clearInterval(this.timer)
        },
        clickImg(song) {
          if (!song.url) {
            this.$message.error('抱歉,暂时没有该歌曲权限')
            return null
          }
        }
    }
}
</script>

<style lang="stylus" scoped>
standardWidth = (1265 / 900);

.banner_area {
  margin-top: 30px;

  .img_container {
    position: relative;
    width: standardWidth * 540px * 1.8;
    height: standardWidth * 215px * 1.2;
    margin: 0 auto;
    cursor: pointer;

    .cover {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }

    .img_item {
      position: absolute;
      left: 50%;
      width: standardWidth * 540px * 1.2;
      height: 100%;
      /* background-color: red; */
      transform: translateX(-50%);
      z-index: -1;
      transition: all 0.4s ease-out;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .current {
      height: 106%;
      transform: translate(-50%, -5%);
      z-index: 10;
    }

    .prev {
      transform: translateX(-75%);
      z-index: 0;
    }

    .next {
      transform: translateX(-25%);
      z-index: 0;
    }

    .pre_area {
      position: absolute;
      left: 0;
      top: 0;
      width: (standardWidth * 540px / 4);
      height: 100%;
      background-color: rgba(0, 0, 0, 0);
      z-index: 2000;

      .pre_btn {
        left: 0;
      }
    }

    .btn {
      display: none;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;

      // z-index: 2000;
      .icon {
        color: #fff;
      }
    }

    .next_area {
      position: absolute;
      right: 0;
      top: 0;
      width: (standardWidth * 540px / 4);
      height: 100%;
      background-color: rgba(0, 0, 0, 0);
      z-index: 2000;

      .next_btn {
        right: 0;
      }
    }

    &:hover .pre_btn {
      display: block;
    }

    &:hover .next_btn {
      display: block;
    }
  }

  .dot_area {
    margin-top: 15px;

    ul {
      display: flex;
      justify-content: center;

      .dot_item {
        width: 30px;
        height: 7px;
        font-size: 0;
        background-color: #eee;
        margin: 0 10px;
        cursor: pointer;
      }

      .current_dot {
        background-color: #C62F2F;
      }
    }
  }
}
</style>