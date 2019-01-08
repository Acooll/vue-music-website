<template>
<div>
  <page-header :activeClass="activeClass"/>
  <div class="songlist-nav"></div>
   <div class="song-list">
      <div class="singer_detail">
        <div class="singer_pic">
          <img :src="singer_pic" alt="">
        </div>
        <div class="singer_txt">
          <h2>{{songList.singer_name}}</h2>
          <div><text>打发哥哥干不过好地方</text></div>
          <div>
            <a href="">单曲 {{songList.total}}</a>
            <a href="">专辑 38</a>
            <a href="">MV 542</a>
          </div>
          <div></div>
        </div>
      </div>
      <div class="some_songs">
        <div><h3>单曲453</h3></div>
        <div>
          <a href="">播放全部</a>
          <a href="">添加到</a>
          <a href="">下载</a>
          <a href="">批量操作</a>
        </div>
        <div class="songs_info">
          <h5>歌曲</h5>
          <h5>专辑</h5>
          <h5>时长</h5>
        </div>
        <div>
          <ul class="all_songs">
            <li class="songs_detail" v-for="(item,idx) in resouceList" :key="idx">
              <div class="song_name"><router-link to="/player" ><span @click="gotoPlayer(idx)">{{item.musicData.songname}}</span></router-link></div>
              <div class="album_name">{{item.musicData.albumname}}</div>
              <div class="song_time">{{'0'+parseInt(item.musicData.interval/60)+':'+item.musicData.interval%60}}</div>
            </li>
          </ul>
        </div>
      </div>
   </div>
   <page-footer></page-footer>
</div>
</template>

<script>
  import bus from '../assets/bus'
  import PageHeader from '../layout/Header'
  import PageFooter from '../layout/Footer'
  export default {
    name: 'Singer',
    data() {
      return {
        songList:'',
        singerInfo:'',
        singer_pic:'',
        resouceList:'',
        album_mid:'',
        songmid:'',
        mid:'',
        interval:'',
        activeClass:1
      }
    },
    components:{
      PageHeader,
      PageFooter
    },
    mounted(){
       var that = this

      bus.$on('sendSonglist',function (res) {
        that.songList = res.msg.data
        that.singer_pic= 'https://y.gtimg.cn/music/photo_new/T001R300x300M000'+res.msg.data.singer_mid+'.jpg?max_age=2592000'
        that.resouceList = res.msg.data.list
        // console.log(that.resouceList)
      })
    },
    methods:{
      gotoPlayer:function (e) {
        var that = this
        this.songmid = that.resouceList[e].musicData.songmid
        this.mid = that.resouceList[e].musicData.albummid
        this.interval = that.resouceList[e].musicData.interval
        console.log(this.songmid)
        this.$axios({
          method: 'post',
          url: 'api/getSongresouce',
          data: {
            songmid: that.songmid,
            interval: that.interval
          }
        }).then((res) => {
          that.songresouce = res.data.msg.req_0.data.midurlinfo
          that.songresouce.album_mid = that.mid
          that.songresouce.lyric = res.data.lyric
          that.songresouce.interval = res.data.interval
          bus.$emit('sender', that.songresouce)
           // console.log(that.songresouce)

        })
      }
    }


  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.songlist-nav
  width 100%
  height 60px
  background cadetblue
  margin-top 15px
.song-list
  width 100%
  height 2000px
  background #eee
  .singer_detail
    width 80%
    height 400px
    background #ddd
    margin 0 auto
    border-top: 1px solid #ccc
    position relative
    .singer_pic
      width 250px
      height 250px
      margin-left 100px
      line-height 20px
      margin-top 50px
      position absolute
      border 1px
      img
        width 250px
        height 250px
        border 1px
        border-radius 50%
    .singer_txt
      width 600px
      height 300px
      position absolute
      margin-left 400px
      margin-top 50px
.some_songs
  width 80%
  height 1500px
  background #ddd
  margin 0 auto
  text-align left
  min-width 1500px
.songs_info
  margin-left -100px
  h5
    float left
    margin-left 400px
    margin-bottom 20px
.songs_detail
  width 100%
  height 30px
  min-width 1500px
  margin-top 16px
  position relative
  list-style none
  div
    width 200px
    height 50px
    text-align center
    position absolute
    font-size 14px
.song_name
  margin-left 166px
.album_name
  margin-left 600px
.song_time
  margin-left 1026px
.all_songs
  margin-top 60px
</style>
