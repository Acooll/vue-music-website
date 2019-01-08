<template>
  <div class="footer">
    <div class="footer_nav">
      <a href="">关于酷狗</a>
      <a href="">监督举报</a>
      <a href="">广告服务</a>
      <a href="">版权指引</a>
      <a href="">用户服务协议</a>
      <a href="">推广合作</a>
      <a href="">酷狗音乐人</a>
      <a href="">招聘信息</a>
    </div>
    <div class="about">
      <p>我们致力于推动网络正版音乐发展，相关版权合作请联系copyrights@kugou.com</p>
      <p>信息网络传播视听节目许可证 1910564 增值电信业务经营许可证粤B2-20060339</p>
      <p>广播电视节目制作经营许可证（粤）字第01270号    营业性演出许可证穗天演440106026</p>
      <p>穗公网监备案证第44010650010167    互联网药品信息服务资格证编号（粤）-非经营性-2012-0018</p>
      <p>不良信息举报邮箱：jubao_music@kugou.net    客服邮箱：kefu@kugou.net</p>
      <p>Copyright  ©  2004-2018 KuGou-Inc.All Rights Reserved</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PageFooter',
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.footer
  width 100%
  height 340px
  background #999
  .footer_nav
    width 100%
    height 50px
    border-bottom 1px solid white
    line-height 50px
    a
     color: white
     font-size 15px
     padding-right  10px
     padding-left 10px
     border-right 1px solid white
  .about
    margin-top 50px
    p
      font-size 14px
      color white
</style>
