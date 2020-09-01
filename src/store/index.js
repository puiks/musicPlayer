import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playList: [],
    currentMusic: 0
  },
  mutations: {
    addSong(state, song) {
      const inList = state.playList.some(item => {
        return item.id === song.id
      })
      if (inList) {
        return false
      }
      state.playList.push(song)
    },
    replaceThePlayList(state, song) {
      const index = state.playList.findIndex(item => {
        return item.id === song.id
      })
      // 不在歌单内就加入
      if (index < 0) {
        state.playList.splice(state.currentMusic, 0, song)
      } else if (index === state.currentMusic) {
        // 如果正在播放就不做任何操作
        return null
      } else {
        // 把这首歌挪到当前播放位置
        state.playList.splice(index, 1)
        state.playList.splice(state.currentMusic, 0, song)
      }
    },
    removeSong(state, song) {
      const index = state.playList.findIndex(item => {
        return item.id === song.id
      })
      state.playList.splice(index, 1)
    },
    setCurrentPlaying(state, Info) {
      const { type } = Info
      if (type === 'add') {
        state.currentMusic++
      } else {
        state.currentMusic--
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
