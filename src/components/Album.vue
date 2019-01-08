<template>
  <div>
    <page-header :activeClass="activeClass"></page-header>
    <div class="album_content">
      <div class="album_type">
        <a href="">推荐</a>
        <a href="">内地</a>
        <a href="">港台</a>
        <a href="">欧美</a>
        <a href="">韩国</a>
        <a href="">日本</a>
      </div>
       <ul>
         <li >
            <div class="album_one" v-for="item in albumsList">
              <a href="">
                <img :src="item.album_pic" alt="">
              </a>
              <h5>{{item.album_name}}</h5>
              <h5>{{item.singers[0].singer_name}}</h5>
            </div>
           <div></div>
           <div></div>
           <div></div>
           <div></div>
         </li>
       </ul>
    </div>
    <page-footer></page-footer>
  </div>

</template>
<script>
  import PageHeader from '../layout/Header'
  import PageFooter from '../layout/Footer'
  export default {
    name:'Album',
    data(){
    return{
      albumsList:'',
      activeClass:3
     }
    },
    components:{
      PageHeader,
      PageFooter

    },
    mounted(){
    var  that = this
      this.$axios.get('/api/getAlbums').then(res=>{
        that.albumsList = res.data.msg.albumlib.data.list
        for(let i=0;i<res.data.msg.albumlib.data.list.length;i++) {
          that.albumsList[i].album_pic = 'https://y.gtimg.cn/music/photo_new/T002R300x300M000' +res.data.msg.albumlib.data.list[i].album_mid + ".jpg?max_age=2592000"
        }
       console.log(res.data)
      })
    }
  }
</script>
<style lang="stylus">
.album_content
  width 100%
  height 1800px
  background #ddd
  margin-top 15px
  min-width 1500px
  overflow hidden
  .album_type
    width 80%
    margin 0 auto
    height 60px

    margin-top 50px
    a
      display block
      float left
      width 50px
      height 50px
      line-height 50px
      margin-left 50px
  ul
    width 80%
    height 1500px
    margin 0 auto

    li
      width 100%
      height 320px

      list-style none
      min-width 1500px
      div
        width 260px
        height 300px

        float left
        margin-left 25px
        margin-top 20px
        img
          width 260px
          height 230px
        h5
          text-align left
          margin-top 1px

</style>
