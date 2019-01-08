<template>
  <div class="header-nav">
  <div class="top-menu">
    <div  class="cool-name">
    <h2>
      <a href="/"><img src="../assets/music.png" height="50" width="50"/><span style="color: #169af3">阿酷音乐</span></a>
    </h2>
    <div class="header-list">
     <div class="grid-content bg-purple">
      <ul class="type-list" >
        <li class= 'home_page'  v-for="(item,idx) in page_nav" :key="idx" @click="changeClass(idx)" ref="nav">
          <a :href="item.link"  :class="activeClass == idx? 'home_page':''">
          {{item.nav}}
          </a>
        </li>

      </ul>
     </div>
    </div>

      <div class="header-right">
        <ul class="menu-list">
          <div class="logining" v-if="noLogin">
            <li class="about_info">客服中心</li>
            <li class="about_info">招贤纳士</li>
            <li class="about_info">会员中心</li>
            <div class="login_info">
             <li class="login_in"><router-link to="login" style=" text-decoration: none" ><span style="color: white">登录</span></router-link></li>
             <li class="register_in"><router-link style="text-decoration: none" to="register"><span style="color: #777">注册</span></router-link></li>
            </div>
          </div>
          <div class="login-in" v-if="user">
            <li style="color: #169af3">欢迎您，{{user}}</li>
            <li class="avatar"><img src="//thirdqq.qlogo.cn/g?b=sdk&k=icf1HR3ZqxwUhpL93iac6r1w&s=140&t=1507535528" width="48"height="48" alt=""></li>
            <li class="login_out"><a href="#" style="color: gray" @click="exit">退出</a></li>
          </div>
          <!--<li><a href="">投稿</a></li>-->
          <!--<li><a href=""><i class="el-icon-edit"></i></a></li>-->
        </ul>
      </div>
    </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'PageHeader',
    props:{
      activeClass:Number,

    },
    data(){
      return{
        user:'',
        noLogin:true,
        page_nav:[{nav:'首页',link:'/'},{nav:'歌手',link:'/singer'},{nav:'排行榜',link:'/rank'},{nav:'专辑',link:'/album'},{nav:'更多',link:'/'}],
        styleType:{color:'white',background:'#169af3'}
      }
    },
    mounted(){
      let that = this
      this.$axios({
        method:'get',
        url:'api/users/getUser',
      }).then((res)=>{
        if(res.data.msg) {
          that.user = res.data.msg
          that.noLogin = false
        }else{
          that.user=''
          that.noLogin = true
        }
      })
    },
    methods:{
      exit:function () {
        this.$axios.get('api/users/exit').then(()=>{
            location.href='/'
        })
      },
      // changeClass:function (e) {
      //  this.activeClass = e
      //   console.log(this.$refs.nav.styles )
      // }

  }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  .header-nav
    width 100%
    height 100px
    z-index 999
    min-width 1200px
    margin 0
    padding 0
    margin-top -15px
  .top-menu
    width 100%
    margin 0 auto
    height 100px
    padding 0
  .cool-name
    margin-left 150px
    position relative
    height 100px
    h2
      width 300px
      height 100px
      position absolute
      margin-left 100px
      margin-top 30px
      font-size 36px
      a
        text-decoration none
        span
          font-family  Helvetica
          font-style italic
    .header-list
      width 560px
      height 100px
      position absolute
      margin-left 350px
      line-height 100px
      margin-top 30px

  .type-list
    list-style-type none
    height 100px
    width 560px
    line-height 80px
    margin-top 30px
    li
      width 50px
      height 100px
      float left
      line-height 15px
      margin-left 40px
      text-align center
      a
        display block
        width 60px
        height 100px
        margin-top -45px
        line-height 100px
        text-decoration none
        color #000
      a:hover
        color #169af3
      .home_page
        background #169af3
        color white
      .home_page:hover
        color white

.header-right
  width 350px
  height 100px
  position absolute
  margin-left 900px
  margin-top 30px
  .menu-list
    list-style-type none
    margin-left 30px
    margin-top 30px
    height 50px
    width 400px
    display block
    .about_info
      font-size 14px
      color #777
    .about_info:hover
      color #169af3
    .login_info
      color white
      margin-left 260px
      height 80px
      text-align center
      width 200px
      li
        width 40px
        height 30px
        text-align center
        line-height 30px
        margin-top -8px
        padding-left 1px
        border 1px
        border-radius 2px
      .login_in
        background #169af3
      .login_in:hover
        background #008aff
      .register_in
        border 1px solid #dbdbdb
        color #777
        margin-left 20px
      .register_in:hover
        border #169af3 1px solid
        color #169af3

    li
      float left
      padding-left 20px
      text-align center
      line-height 15px
      a
      text-decoration none
      color black
      a:hover
       color darkturquoise

.login-in
  width 350px
  height 100px
  margin-top -40px
  position relative
  li
    width 150px
    height 80px
    margin-top 30px
    position absolute
  .avatar
    margin-left 80px
    margin-top 15px
    img
      border 1px
      border-radius 50%
  .login_out
    margin-left 150px


</style>
