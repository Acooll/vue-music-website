<template>
  <div>
    <page-header :activeClass="activeClass"/>
    <div class="rank-maintain">
      <div class="left-main">
        <dl>
          <dt><h3>QQ音乐巅峰榜</h3></dt>
          <dd class="hot_songs">巅峰榜.热歌</dd>
          <dd>巅峰榜.新歌</dd>
          <dd>巅峰榜.网路歌曲</dd>
          <dd>巅峰榜.内地</dd>
          <dd>巅峰榜.港台</dd>
        </dl>
      </div>
      <div class="main">
        <div class="rank_title">
          <h2>巅峰榜.流行指数</h2>
          <div class="date">2019-01-03</div>
        </div>
        <div class="rank_songs">
          <div class="songs_info">
            <h5>歌曲</h5>
            <h5 class="singer_title">歌手</h5>
            <h5>时长</h5>
          </div>
          <div>
            <ul class="all_songs">
              <li class="songs_detail" v-for="(item,idx) in rankList":key="idx" >
                <h2>{{idx+1}}</h2>
                <div class="song_img"><img :src="item.data.song_pic" alt=""></div>
                <div class="song_name"><router-link to="/player" ><span @click="gotoPlayer(idx)" >{{item.data.songname}}</span></router-link></div>
                <div class="singer_name"><span>{{item.data.singer[0].name}}</span></div>
                <div class="song_time">{{'0'+parseInt(item.data.interval/60)+':'+item.data.interval%60}}</div>
              </li>
              <div class="page_number">
                <a href="">1</a>
                <a href="">2</a>
                <a href="">3</a>
                <a href="">4</a>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="comment">
      <h2 >评论：</h2>
      <div  class="comment_text"><input type="text" placeholder="期待你的神评论..."></div>
      <h4><a href=""><span>发表评论</span></a></h4>
      <div class="comment_content">
        <h4>最新评论({{(commentTotal)}})</h4>
        <ul>
          <li v-for="item in commentList">
          <a href=""><img :src="item.avatarurl" alt=""></a>
          <h4 style="color: #999">{{item.nick}}</h4>
          <div class="comment_p">
            <p style="font-size: 15px">{{item.middlecommentcontent? '回复：'+ item.middlecommentcontent[0].replyednick + item.middlecommentcontent[0].subcommentcontent : ''}}

            </p>
            <p class="rootcomment">{{item.rootcommentcontent}}</p>
          </div>

          <div class="comment_zan">
            <a href=""><img src="../assets/zan.png" height="10px" width="10px"/><span>{{item.praisenum}}</span></a>
          </div>
          </li>
        </ul>
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
        rankList:'',
        song_pic:'',
        // activeClass:'2',
        mid:'',
        songmid:'',
        commentList:'',
        commentTotal:'',
        activeClass:2,
        interval:''
      }
    },
    components:{
      PageHeader,
      PageFooter
    },
    mounted(){
      var that = this
      this.$axios.get('/api/getRank').then(res=>{
        that.rankList = res.data.msg.songlist
        for(var i=0;i<that.rankList.length;i++) {
          that.rankList[i].data.song_pic ='https://y.gtimg.cn/music/photo_new/T002R300x300M000'+that.rankList[i].data.albummid+'.jpg?max_age=2592000 res.album_mid'
        }
        console.log(that.rankList)
      })
      this.$axios.get('/api/getComment').then(res=>{
        that.commentList = res.data.msg.comment.commentlist
        that.commentTotal = res.data.msg.comment.commenttotal
        console.log(that.commentList)
      })
    },
    methods: {
      gotoPlayer:function (e) {
        var that = this
        this.songmid = that.rankList[e].data.songmid
        this.interval = that.rankList[e].data.interval
        this.mid = that.rankList[e].data.albummid
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
.rank-maintain
  width 100%
  height 3700px
  background #eee
  position relative
  margin-top 15px
  min-width 1500px
  .left-main
    width 260px
    height 800px
    position absolute
    margin-left 190px
    margin-top 150px
    border 1px grey solid
    dl
      width 260px
      height 600px
      text-align center
      .hot_songs

        color white
      dd
        width 260px
        height 36px
        font-size 16px
        color black
        text-align center
        margin-left 0
        line-height 35px

  .main
    width 1000px
    height 2500px
    position absolute
    margin-left 450px
    margin-top 150px
    .rank_title
      width 1000px
      height 50px
      position relative
      h2
       width 200px
       height 50px
       position absolute

      .date
         width 100px
         height 50px
         position absolute
         margin-left 200px
         margin-top 30px
    .rank_songs
      width 1000px
      height 800px
      .songs_info
        width 1000px
        height 50px
        h5
          float left
          margin-left 200px
        .singer_title
          margin-left 400px
.all_songs
  width 100%
  height 1800px
  list-style none
  li
    width 100%
    height 100px

    position revert
    margin-top 10px
    h2
      width 50px
      height 100px
      text-align center
      line-height 50px
      position absolute
    .song_img
      width 100px
      height 100px
      position absolute
      margin-left 120px
      img
        width 100px
        height 100px
    .song_name
      width 250px
      height 100px

      position absolute
      margin-left 240px
      text-align left
      line-height 100px
    .singer_name
      width 150px
      height 100px
      position absolute
      margin-left 530px
      text-align center
      line-height 100px
    .song_time
      width 150px
      height 100px
      position absolute
      margin-left 760px
      text-align center
      line-height 100px
.page_number
  width 80%
  height 50px
  margin 0 auto
  margin-top 30px
  a
    margin-left 40px
    margin-right 40px
    font-size 18px
    color #999
  a:hover
    color #f40193
.comment
  width 80%
  height 5200px
  margin 0 auto


  h2
    width 80%
    height 50px
    margin 0 auto
    text-align left
  h4
    width 80%
    height 50px
    margin 0 auto
    text-align right
    span
      color white
      background #169af3
      width 80px
      height 35px
      display block
      text-align center
      line-height 35px
      margin-left 945px
  .comment_text
    width 80%
    height 120px

    margin 0 auto
    input
      display block
      width 1000px
      height 100px
      background #eee
      padding-left 20px
      border 1px solid whitesmoke
  .comment_content
    width 80%
    height 2000px
    border-bottom 1px solid #ededed
    margin 0 auto
    h4
      text-align left
      margin-left -10px
      font-weight normal
    ul
      width 100%
      height 1000px
      margin-left -40px
      list-style none
      li
        width 100%
        height 160px

        position relative
        border-bottom 1px solid #ededed
        padding-bottom 10px
        padding-top 20px
        a
         display block
         width 60px
         height 60px
         position absolute
         background white
         img
          width 60px
          height 60px
          border 1px
          border-radius 50%
        h4
          position absolute
          width 800px
          height 40px

          margin-left 80px
        .comment_p
          width 800px
          height 100px
          position absolute
          margin-left 80px
          margin-top 20px
          text-align left
        .comment_zan
          width 150px
          height 50px
          position absolute
          margin-left 880px

          margin-top 120px
          a
            display block
            width 50px
            height 50px
            span
              margin-top -25px
              display block
              margin-left 48px

            img
              width 30px
              height 30px
</style>
