import Vue from 'vue'
import VueRouter from 'vue-router'
// 发现页
import DiscoveryMusic from '../components/musicPlayerMain/musicPlayerContent/discoveryMusic/discoveryMusic'

// 歌单详情页
import SongListDetail from '../components/musicPlayerMain/musicPlayerContent/songListDetail/songListDetail'

// 歌手详情页
import SingerDetail from '../components/musicPlayerMain/musicPlayerContent/singerDetail/singerDetail'

// 专辑详情页
import AlbumDetail from '../components/musicPlayerMain/musicPlayerContent/albumDetail/albumDetail'

// 中间页
import MiddlePage from '../components/musicPlayerMain/musicPlayerContent/common/middlePage'

// 搜索结果页
import SearchResult from '../components/musicPlayerMain/musicPlayerContent/searchResult/searchResult'
import SearchSinger from '../components/musicPlayerMain/musicPlayerContent/searchResult/searchSinger/searchSinger'
import SearchSong from '../components/musicPlayerMain/musicPlayerContent/searchResult/searchSong/searchSong'
import SearchAlbum from '../components/musicPlayerMain/musicPlayerContent/searchResult/searchAlbum/searchAlbum'
import SearchSongList from '../components/musicPlayerMain/musicPlayerContent/searchResult/searchSongList/searchSongList'

// 发现页下的三大模块
import Recommend from '../components/musicPlayerMain/musicPlayerContent/discoveryMusic/recommend/recommend'
import SongList from '../components/musicPlayerMain/musicPlayerContent/discoveryMusic/songList/songList'
import Singer from '../components/musicPlayerMain/musicPlayerContent/discoveryMusic/singer/singer'
Vue.use(VueRouter)

const routes = [
  {
    path: '/', redirect: '/discoveryMusic/recommend'
  },
  {
    path: '/discoveryMusic',
    component: DiscoveryMusic,
    children: [
      { path: '/discoveryMusic/recommend', component: Recommend },
      { path: '/discoveryMusic/singer', component: Singer },
      { path: '/discoveryMusic/songList', component: SongList }
    ]
  },
  { path: '/songListDetail/:id', component: SongListDetail },
  {
    path: '/singerDetail/:id',
    component: SingerDetail
  },
  { path: '/middlePage', component: MiddlePage, props: (route) => ({ query: route.query.finalPath }) },
  { path: '/albumDetail/:id', component: AlbumDetail },
  {
    path: '/searchResult/:keyword',
    component: SearchResult,
    redirect: '/searchResult/:keyword/song',
    children: [
      { path: '/searchResult/:keyword/song', component: SearchSong },
      { path: '/searchResult/:keyword/singer', component: SearchSinger },
      { path: '/searchResult/:keyword/album', component: SearchAlbum },
      { path: '/searchResult/:keyword/songList', component: SearchSongList }
    ]
  }
]

const router = new VueRouter({
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
