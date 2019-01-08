<template>
  <div class="home_main">
    <page-header :activeClass = activeClass ></page-header>
  <div class="container">
    <div class="mian-container">
      <div class="top">
        <div class="search">
          <input type="text" placeholder="小情歌" v-model="searchWords" >
          <el-button type="primary" icon="el-icon-search" class="icon-search"   @click="search">
            搜索
          </el-button>
        </div>
      </div>
      <div class="newsongs">
        <div class="top-title">
          <div>
            <h3 >精彩推荐</h3>
          </div>
        </div>
        <div class="songs-container">
          <div class="block">
            <el-carousel :interval="4000" type="card" height="400px">
              <el-carousel-item v-for="(item,idx) in homeInfo" :key="idx" >
                <img :src="item.pic_info.url" @click="jump(item.jump_info.url)">
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
      <div class="firstsongs">
        <div class="top-title">
          <div class="first-title">
            <h3>新碟首发</h3>
          </div>
        </div>
        <div class="songs-nav">
          <a href="">内地</a>
          <a href="">港台</a>
          <a href="">欧美</a>
          <a href="">韩国</a>
          <a href="">日本</a>
        </div>
        <div class="content">
          <div class="first-container">
            <ul>
              <li v-for="item in albums" @click="getAlbum_mid(item.album_mid)" >
                <div class="img-part">
                  <router-link to="/player"><img :src=item.mid ></router-link>
                </div>
                  <!--<div class="mask"><i><img class="play_icon" src="../assets/play.png" /></i></div>-->
                <h4>{{item.album_name}}</h4>
                <div>{{item.singers[0].singer_name}}</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="rank_info">
          <div class="rank_title">
            <h1>排行榜</h1>
          </div>
          <div class="rank_type">
            <div class="rank_top" style="background: pink">
              <h3>巅峰榜</h3>
              <h2>流行指数</h2>
              <ul>
                <h4><span style="margin-right: 5px">1</span>天份</h4>
                <h4>薛之谦</h4>
              </ul>
              <ul>
                <h4><span style="margin-right: 5px">2</span>知否知否</h4>
                <h4>胡夏</h4>
              </ul>
              <ul>
                <h4><span style="margin-right: 5px">3</span>我不想明白</h4>
                <h4>火箭少女101</h4>
              </ul>
            </div>
            <div style="background: cadetblue">
              <h3>巅峰榜</h3>
              <h2>流行指数</h2>
              <ul>
                <h4><span style="margin-right: 5px">1</span>关键字</h4>
                <h4>林俊杰</h4>
              </ul>
              <ul>
                <h4><span style="margin-right: 5px">2</span>圣所</h4>
                <h4>林俊杰</h4>
              </ul>
              <ul>
                <h4><span style="margin-right: 5px">3</span>黑夜问白天</h4>
                <h4>林俊杰</h4>
              </ul>
            </div>
            <div style="background: olivedrab">
              <h3>巅峰榜</h3>
              <h2>流行指数</h2>
              <ul>
                <h4><span style="margin-right: 5px">1</span>关键字</h4>
                <h4>林俊杰</h4>
              </ul>
              <ul>
                <h4><span style="margin-right: 5px">2</span>圣所</h4>
                <h4>林俊杰</h4>
              </ul>
              <ul>
                <h4><span style="margin-right: 5px">3</span>黑夜问白天</h4>
                <h4>林俊杰</h4>
              </ul>
            </div>
            <div style="background: chocolate">
              <h3>巅峰榜</h3>
              <h2>流行指数</h2>
              <ul>
                <h4><span style="margin-right: 5px">1</span>关键字</h4>
                <h4>林俊杰</h4>
              </ul>
              <ul>
                <h4><span style="margin-right: 5px">2</span>圣所</h4>
                <h4>林俊杰</h4>
              </ul>
              <ul>
                <h4><span style="margin-right: 5px">3</span>黑夜问白天</h4>
                <h4>林俊杰</h4>
              </ul>
            </div>
            <div style="background: rosybrown">
              <h3>巅峰榜</h3>
              <h2>流行指数</h2>
              <ul>
                <h4><span style="margin-right: 5px">1</span>Everything I Need</h4>
                <h4>Skylar Grey</h4>
              </ul>
              <ul>
                <h4><span style="margin-right: 5px">2</span>Different World</h4>
                <h4>Alan Walker</h4>
              </ul>
              <ul>
                <h4><span style="margin-right: 5px">3</span>Hope</h4>
                <h4>The Chainsmokers</h4>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
    <page-footer></page-footer>
  </div>
</template>

<script>
import PageHeader from '../layout/Header'
import PageFooter from '../layout/Footer'
import bus from '../assets/bus.js'
import store from '../store/store'

export default {
  name: 'Home',
  data () {
    return {
      sliders:'',
      searchWords:'',
      homeInfo:'',
      newsongs:'',
      mvs:'',
      albums:'',
      album_mid:'',
      songresouce:'',
      todolist:"",
      song_pic:'',
      activeClass:0,

 }
  },
  components:{
    PageHeader,
    PageFooter
  },
  store:store,
  mounted(){
    let that = this
    // this.$axios.get('api/users/getSliders').then((res)=>{
    //     that.sliders = res.data.msg
    // })
    this.$axios.get('api/homeInfo').then((res)=>{
      that.homeInfo = res.data.msg.focus.data.content
      that.newsongs = res.data.msg.new_song.data.song_list
      let albums = res.data.msg.new_album.data.list
      let shortalbums = new Array()
      for(let i=0;i<albums.length;i++){
        albums[i].mid = 'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+albums[i].album_mid+".jpg?max_age=2592000"
      }
      for(let i=0;i<15;i++){
         shortalbums.push(albums[i])
      }
      that.albums = shortalbums
      console.log(that.albums)

    })
    this.$axios.get('api/getMv').then((res)=>{
      that.mvs = res.data.msg.data.mvlist
      console.log(that.mvs[0].picurl)

    })
  },
  methods:{
    search:function () {
      var that = this
      this.$axios({
        method:'post',
        url:'api/users/getPost',
        data:{
          searchWords:that.searchWords
        }
      }).then((res)=>{

        console.log(res)
         location.href='/search'
      })
    },

    getAlbum_mid: function (e) {
      this.album_mid = e

       var that = this
      this.$axios({
        method:'post',
        url:'api/getSongresouce',
        data:{
          album_mid:that.album_mid
        }
      }).then((res)=>{
        that.songresouce = res.data.msg.req_0.data.midurlinfo
        that.songresouce.lyric = res.data.lyric
        that.songresouce.album_mid = that.album_mid
        that.songresouce.interval = res.data.interval
        bus.$emit('sender',that.songresouce)
        // store.commit("changeTestMsg", 11101111)
    setTimeout(function () {
    //  location.href='/player'
    //   this.$router.push({
    //     path:'/player',
    //     name: 'Player',
    //     query: {
    //     id: '1111'
    //   }
    // })

    },1000)

})

}

},
  computed:{
    testMsg(){
      return store.state.testMsg;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.home_main
  width 100%
  height 3150px

.container
  width 100%
  height 2700px
  margin-top 15px
.main-container
  width 100%
  min-width 1200px
  height 700px
  margin 0
  padding 0
.top
  width 100%
  height 80px
  border-top 1px solid #777
  min-width 1600px
  background #777
.search
  width 350px
  height 80px
  float right
  margin-right 250px
  margin-top 20px
  position relative
  input
    height 34px
    width 260px
    border-left 25%
    position absolute
    border-radius 5%
    color gray
    padding-left 10px
.icon-search
  position absolute
  margin-left 230px
/*.right-container*/
  /*margin-left 1400px*/
.hot-movie
  list-style-type none
  display flex
  justify-content space-around
  flex-wrap wrap
  width 780px
/*.left-area*/
  /*margin-left 70px*/
  /*div*/
    /*list-style-type none*/


.title
  margin-left -900px
.newsongs
  width 100%
  background #eee
  height 700px
  min-width 1600px
  .top-title
    width 70%
    height 120px
    margin 0 auto
    color #000
    font-size 30px
    letter-spacing 20px
    font-weight bold
    text-align center
    margin-top -35px
    div
      line-height 120px
      text-align center
      h3
        margin-left 280px
.first-title
  text-align center
.songs-nav
  height 50px
  width 70%
  line-height 50px
  margin 0 auto
  text-align center
  a
    display inline-block
    margin-left 30px
    margin-right 26px
.songs-container
  width 100%
  margin 0 auto
  height 450px
  .block
    width 80%
    margin 0 auto
    background white
    img
      width 860px
      height 500px
.firstsongs
  width 100%
  background #ddd
  height 1200px
  margin-top -40px
  .top-title
    width 70%
    height 120px
    margin 0 auto
    color #000
    font-size 30px
    letter-spacing 20px
    font-weight bold
    div
      line-height 120px
  .songs-nav
    height 50px
    width 70%
    line-height 50px
    margin 0 auto
    a
      display inline-block
      margin-left 30px
      margin-right 26px
      text-decoration none
      color #000
    a:hover
       color #169af3
.first-container
  width 100%
  height 600px
  margin 0 auto
  position relative
  ul
    width 100%
    height 850px
    float left
    list-style none
    display  flex
    justify-content space-around
    flex-wrap: wrap
    margin-top 20px
    min-width 1380px
    /*overflow hidden*/
    li
      width 240px
      height 250px
      margin-right 32px
      margin-top 20px
      overflow hidden
      img
        width 240px
        height 200px
        transition: all 0.5s;
      img:hover
        /*position relative*/
        transform: scale(1.1)

    h4
      text-align left
      margin-top 8px
    div
      text-align left
      margin-top -15px
.content
  width 80%
  height 1000px

  margin 0 auto
.rank_info
  width 100%
  height 800px
  background #eee
  min-width 1500px
  .rank_title
    width 80%
    height 150px
    margin 0 auto
    h1
      width 400px
      height 130px
      text-align center
      margin 0 auto
      line-height 150px
      letter-spacing 15px
  .rank_type
    width 80%
    height 600px

    margin 0 auto
    min-width 1500px
    div
      width 258px
      height 500px
      background brown
      float left
      margin-top 20px
      margin-left 39px
      h2
        color white
        text-align center
        font-weight lighter
      h3
        color white
        text-align center
      ul
        width 100px
        height 50px

        margin-left -30px
        margin-top 60px
        h4
          color white
          text-align center
          font-size 15px
          margin-top -16px
          font-weight lighter


</style>
