<template>
<div class="container">

    <page-header/>
  <div>
      <div>
        <div style="background-image:url(http://y.gtimg.cn/mediastyle/yqq/img/bg_search.jpg)"  class="search-area">
          <div class="search-box">
            <input type="text" placeholder="新不了情" v-model="searchWords" >
            <div class="search-icon"><i class="el-icon-search"  @click="searchSongs"></i></div>
          </div>
        </div>
      </div>
      <div class="result">
        <ul class="list">
          <li>单曲</li>
          <li>专辑</li>
          <li>MV</li>
          <li>歌单</li>
          <li>用户</li>
          <li>歌词</li>
        </ul>
      </div>
      <div class="search-songs">
        <div class="about-box">
          <ul class="about">
            <li class="songs-about">歌曲</li>
            <li class="singers-about">歌手</li>
            <li class="only-about">专辑</li>
            <li class="time-about">时长</li>
          </ul>
        </div>
        <div class="songs-info" >
          <ul class="list-about" >
            <li class="list-info" v-for="(item,idx) in searches" :key="idx">
              <div class="song-info" >
                <router-link to="/player"  >
                <span @click="jumpPlayer(idx)">{{item.title}}</span>
                </router-link>
              </div>
              <div class="play-info">
                <a href=""><i class="el-icon-caret-right"></i></a>
                <a href=""><i class="el-icon-circle-plus-outline"></i></a>
                <a href=""><i class="el-icon-download"></i></a>
                <a href=""><i class="el-icon-share"></i></a>
              </div>
                  <div class="singer-info" >{{item.singer[0].name}}</div>
                  <div class="only-info">{{item.album.name}}</div>
                  <div class="time-info">{{'0'+parseInt(item.interval/60)+':'+item.interval%60}}</div>
            </li>
          </ul>
        </div>
      </div>
  </div>
    <page-footer></page-footer>
 </div>
</template>

<script>
  import bus from '../assets/bus.js'
  import PageHeader from '../layout/Header'
  import PageFooter from '../layout/Footer'
  export default {
    name: 'Search',
    data() {
      return {
        searchWords: '',
        searches: '',
        res:'',
        interval:''
      }
    },
    components: {
      PageHeader,
      PageFooter
    },
    methods: {
      searchSongs: function () {
        var that = this
        this.$axios({
          method: 'post',
          url: 'api/users/getInfo',
          data: {
            searchWords: that.searchWords
          }
        }).then((res) => {
          that.searches = res.data.msg.data.song.list
          //console.log(that.searches)
          //console.log(that.searches)
        })
      },
      jumpPlayer: function (e) {
       this.album_mid = this.searches[e].album.mid
        this.interval = this.searches[e].interval
        var that = this
        this.$axios({
          method: 'post',
          url: 'api/getSongresouce',
          data: {
            album_mid: that.album_mid,
            interval: that.interval
          }
        }).then((res) => {
          that.songresouce = res.data.msg.req_0.data.midurlinfo
          that.songresouce.lyric = res.data.lyric
          that.songresouce.album_mid = that.album_mid
          that.songresouce.interval = res.data.interval
          bus.$emit('sender', that.songresouce)
        })
      }
    },
    mounted() {
      var that = this
      // bus.$on('sender',function (e) {
      //   that.res = e
      //     console.log(e)
      // })
      // var that = this
      // that.bus.$on('event',function (res) {
      // that.searches= res
      // console.log(res)
      var that = this
      this.$axios({
        method: 'post',
        url: 'api/users/getInfo',
        data: {
          searchWords: that.searchWords
        }
      }).then((res) => {
        that.searches = res.data.msg.data.song.list
        //console.log(that.searches)
        //console.log(that.searches)
      })
    },


  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  .search-area
    width 100%
    height 250px
    position relative
    margin-top 15px

  .search-box
    width 560px
    height 100px
    margin-left 670px
    position relative
    line-height 200px
    input
      width 450px
      height 40px
  .search-icon
    width:30px
    height 30px
    margin-top -196px
    margin-left 466px

    position absolute
  .result
    height 65px
    margin-left 200px
  .list
    width 1500px
    height 60px
    line-height 60px
    list-style-type none
    float left
    border-bottom 1px #f0f0f0 solid
    li
      float left
      padding-left 16px
      width  72px
      font-size 16px
  .about-box
    height 60px
    width 1500px
  .about
    height 50px
    width 1400px
    list-style-type none
    font-size 14px
    color gray
    float left
    position relative
    margin-left 50px
    li
      float left
  .singers-about
    margin-left 550px
  .only-about
    margin-left 300px
  .time-about
    margin-left 300px
  .songs-info
    height 1580px
    width 1400px
    font-size 14px
  .list-about
    height 1000px
    width 1380px
    list-style none
  .list-info
    height 80px
    width 1380px
    margin-left 46px
    div
      float left
  .play-info
    width 5%
    margin-left 100px
  .singer-info
    margin-left 80px
  .song-info
    width 25%
    color darkturquoise
    margin-left -156px
  .play-info
    width 15%
  .play-info:hover
    display inline-block
    i
      width 20px
      height 20px
  .only-info
    width 10%
    margin-left 250px
  .time-info
    width 2%
    padding-left 200px
    position absolute
    margin-left 1036px
  .search-songs
    margin-left 200px



</style>
