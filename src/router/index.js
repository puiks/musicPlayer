import Vue from 'vue'
import VueRouter from 'vue-router'
// 发现页
import DiscoveryMusic from '../components/musicPlayerMain/musicPlayerContent/discoveryMusic/discoveryMusic'

// 歌单详情页
import SongListDetail from '../components/musicPlayerMain/musicPlayerContent/songListDetail/songListDetail'

// 歌手详情页
import SingerDetail from '../components/musicPlayerMain/musicPlayerContent/singerDetail/singerDetail'

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
    path: '/singerDetail',
    component: SingerDetail,
    props: (route) => ({
      id: route.query.id,
      name: route.query.name,
      imgUrl: route.query.imgUrl,
      albumSize: route.query.albumSize
    })
  }
]

const router = new VueRouter({
  routes
})

export default router
