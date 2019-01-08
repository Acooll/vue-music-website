import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Register from '../components/Register'
import Login from '../components/Login'
import Player from '../components/Player'
import Search from '../components/Search'
import Singer from '../components/Singer'
import Songlist from '../components/Songlist'
import Rank from '../components/Rank'
import Album from '../components/Album'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/register',
      name:'Register.vue',
      component:Register
    },
    {
      path:'/login',
      name:'Login.vue',
      component:Login
    },
    {
      path:'/player',
      name:'Player.vue',
      component:Player
    },
    {
      path:'/search',
      name:'Search.vue',
      component:Search
    },
    {
      path:'/singer',
      name:'Singer.vue',
      component:Singer
    },
    {
      path:'/songlist',
      name:'Songlist.vue',
      component:Songlist
    },
    {
      path:'/rank',
      name:'Rank.vue',
      component:Rank
    },
    {
      path:'/album',
      name:'Album.vue',
      component:Album
    }


  ],


})
