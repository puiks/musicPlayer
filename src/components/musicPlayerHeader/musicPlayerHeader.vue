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
      <input type="text" class="search_input" />
      <i class="search_btn">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-search" />
        </svg>
      </i>
    </div>
    <div class="login_area">
      <a class="login_btn" href="javascript:;">未登陆</a>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    goHomePage() {
      this.$router.push('/discoveryMusic/recommend')
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

  .search_area {
    position: absolute;
    left: 250px;

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
  }

  .login_area {
    position: absolute;
    right: 10rem;

    .login_btn {
      color: #eee;

      &:hover {
        color: #fff;
      }
    }
  }
}
</style>