<template>
  <div class="singerPage">
    <div class="tag_area">
      <div class="language">
        语种:
        <span
          @click="changeLang(item.id)"
          :class="setLang(item.id)"
          :key="item.id"
          v-for="item in languageType"
        >{{item.name}}</span>
      </div>
      <div class="variety">
        分类:
        <span
          @click="changeVariety(item.id)"
          :class="setVariety(item.id)"
          :key="item.id"
          v-for="item in varietyType"
        >{{item.name}}</span>
      </div>
    </div>
    <div class="singer_area">
      <div
        @click="goToSingerPage(item1)"
        :key="item1.id"
        v-for="item1 in singerLists"
        class="singer_item"
      >
        <div class="img_container">
          <img v-lazy="item1.picUrl" alt />
        </div>
        <span>{{item1.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data:function() {
    return {
      languageType:[
        {id: -1,name:'全部'},
        {id: 7,name:'华语'},
        {id: 96,name:'欧美'},
        {id: 8,name:'日本'},
        {id: 16,name:'韩国'},
        {id: 0,name:'其他'}
      ],
      varietyType:[
        {id:-1,name:'全部'},
        {id:1,name:'男歌手'},
        {id:2,name:'女歌手'},
        {id:3,name:'乐队组合'}
      ],
      singerLists:[],
      currentLang:-1,
      currentVariety:-1
    }
  },
  created() {
    this.getSingerLists()
  },
  methods:{
    // 获取歌手数据
    async getSingerLists() {
        const res = await this.$http.get(
      `/artist/list?type=${this.currentVariety}&area=${this.currentLang}&initial=-1`)
        this.singerLists = res.data.artists
        // console.log(this.singerLists)
    },
    // 选择结果后更改样式
    setLang(i) {
      if (i === this.currentLang) {
        return 'lang_item current_item'
      } else {
        return 'lang_item'
      }
    },
    // 选择结果后更改样式
    setVariety(i) {
      if (i === this.currentVariety) {
        return 'variety_item current_item'
      } else {
        return 'variety_item'
      }
    },
    // 根据地区选择歌手
    changeLang(i) {
      this.currentLang = i
      this.getSingerLists()
    },
    // 根据类型选择歌手
    changeVariety(i) {
      this.currentVariety = i
      this.getSingerLists()
    },
    goToSingerPage(singer) {
      this.$router.push(`/singerDetail?id=${singer.id}&name=${singer.name}&imgUrl=${singer.picUrl}&albumSize=${singer.albumSize}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.singerPage {
  width: 96%;
  margin: 0 auto;
  padding: 20px 0;

  .tag_area {
    margin-bottom: 20px;

    .language, .variety, .filter {
      margin: 15px 0;

      .lang_item, .variety_item {
        margin: 0 5px;
        padding: 2px 15px;
        border-right: 1px solid #ccc;
        font-size: 14px;
        color: #333333;
        cursor: pointer;

        &:last-child {
          border: 0;
        }
      }

      .current_item {
        background-color: #8F9096;
        color: #fff;
      }
    }
  }

  .singer_area {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .singer_item {
      width: 18%;
      height: 200px;
      margin: 15px 0;

      .img_container {
        height: 95%;
        border: 1px solid #ccc;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .img_container, span {
        cursor: pointer;
      }
    }
  }
}
</style>