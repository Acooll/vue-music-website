<template>
<div>
  <page-header :activeClass="activeClass" />
  <div class="top-background">
  </div>
  <div class="maintain">
    <div class="singer_tag">
      <div class="singer_index">
        <a class="tag">热门</a>
        <span v-for="item in A_Z">
        <a href="" >
          {{item}}
        </a>
        </span>
      </div>
      <div class="singer_area">
        <a href="" class="tag">全部</a>
        <a href="">内地</a>
        <a href="">港台</a>
        <a href="">欧美</a>
        <a href="">日本</a>
        <a href="">韩国</a>
        <a href="">其他</a>
      </div>
      <div class="singer_sex">
        <a href="" class="tag">全部</a>
        <a href="">男</a>
        <a href="">女</a>
        <a href="">组合</a>
      </div>
      <div class="singer_type">
       <a href="" class="tag">全部</a>
        <a href="">流行</a>
        <a href="">嘻哈</a>
        <a href="">摇滚</a>
        <a href="">电子</a>
        <a href="">民谣</a>
        <a href="">R&B</a>
        <a href="">民歌</a>
        <a href="">轻音乐</a>
        <a href="">爵士</a>
        <a href="">古典</a>
        <a href="">乡村</a>
        <a href="">蓝调</a>
    </div>
    </div>
    <div class="singer_list">
    <div class="singer_img">
      <ul class="singer_img_list">

        <li v-for="item in shortsingers" @click="findSonglist(item.singer_mid)">
          <router-link to="/songlist">
            <img :src="item.singer_pic" alt="">
           <h3>{{item.singer_name}}</h3>
          </router-link>
        </li>
      </ul>
    </div>

      <div class="singer_txt">
          <ul>
            <li v-for="item in longsingers">
              <a href="">{{item.singer_name}}</a>
            </li>
          </ul>
          <div class="page_number">
            <a href="">1</a>
            <a href="">2</a>
            <a href="">3</a>
            <a href="">...</a>
            <a href="">297</a>
          </div>
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
        A_Z:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
        shortsingers:'',
        longsingers:'',
        activeClass:1

      }
    },
    components:{
      PageHeader,
      PageFooter
    },
    mounted(){
      let shortsingers = new Array()
      let longsingers = new Array()
      var that = this
      this.$axios.get('/api/getSinger').then(res=>{
        for(let i=0;i<10;i++){
          shortsingers.push(res.data.msg.singerList.data.singerlist[i])
        }
        for(let i=10;i<res.data.msg.singerList.data.singerlist.length;i++){
          longsingers.push(res.data.msg.singerList.data.singerlist[i])
        }
          this.shortsingers = shortsingers
          this.longsingers = longsingers
          console.log(longsingers)

      })
    },
    methods:{
      findSonglist:function (e) {
        let singer_mid = e
        var that = this
        this.$axios({
          method:'post',
          url:'api/getSonglist',
          data:{
            singer_mid:singer_mid
          }
        }).then((res)=>{
          bus.$emit('sendSonglist',res.data)
        })
      }
    }


  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.top-background
  width 100%
  height 350px
  background gray
  background: url(https://imgessl.kugou.com/commendpic/20190101/20190101162527652818.jpg) no-repeat center top
  margin-top 15px
.maintain
  width 100%
  height 1600px
  .singer_tag
    width 100%
    height  165px

    margin-top 70px
    div
      width 80%
      height 30px
      margin-top 15px
      margin-left 300px
      text-align left

      .tag
        color white
        background #31c27c
        text-align center
        line-height 30px
        height 30px
        width 50px
        display block
        float left
    .singer_area
      a
        margin-left 30px
    .singer_sex
      a
        margin-left 30px
    .singer_type
      a
        margin-left 30px
    .singer_index
      a
        margin-left 30px
.singer_list
  width 100%
  height 1400px
  .singer_img
    width 80%
    height 600px

    margin 0 auto
    .singer_img_list
      width 80%
      height 600px
      margin 0 auto
      list-style none
      min-width 1350px
      margin-left 20px
      li
        width 200px
        height 220px

        float left
        margin-left 70px
        margin-top 120px
        text-align center
        line-height 50px

        img
          width 160px
          height 160px
          border 1px
          border-radius 50%
        h3
          font-size 16px
          margin-top -20px
.singer_txt
  width 80%
  height 600px

  margin 0 auto
  margin-top 120px
  ul
    width 70%
    height 580px

    list-style none
    min-width 1400px
    li
      width 150px
      height 40px
      float left
      margin-left 130px
      a
        font-size 15px
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
</style>
