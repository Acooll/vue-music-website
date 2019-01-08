<template>
<div class="login_main">
  <div class="login_nav">
    <h4>还未注册账号？点击 <a href="/register"><span>注册</span></a></h4>
  </div>
  <div class="box">
  <el-form ref="ruleForm" :rules="rules" label-width="100px" :model="ruleForm" class="demo-ruleForm">
    <el-form-item label="用户名" prop="username">
      <el-input type="username" v-model="ruleForm.username" ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pwd">
      <el-input type="password" v-model="ruleForm.pwd"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
      <div style="color: red">{{statusMsg}}</div>
    </el-form-item>
  </el-form>
  </div>
</div>
</template>

<script>

  export default {
    name: 'Login',
    data() {
      return {
        statusMsg:'',
        error: '',
        ruleForm: {
          username: '',
          pwd: ''
        },
        rules: {
          username: [{
            required: true, type: 'string', message: '请输入同户名', triggle: 'blur'
          }],
          pwd: [{
            required: true, message: '请输入密码', trigger: 'blur'
          },]
        }
      }

    },
    created() {

      // this.$axios.get('/v1/RoomRecommend/biliIndexRecList').then(res =>{
      //
      //   console.log(res.data)
      // }).catch(err =>{
      //   console.log(err)
      // })
    },
    methods: {
      login:function () {
        let that = this
        this.$axios({
          method:'post',
          url:'api/users/login',
          data:{
            username:that.ruleForm.username,
            password:that.ruleForm.pwd
          }
          }).then(({status,data})=>{
            if(status===200&&data.code===0){
              location.href='/'
              console.log(data)
            }else if(status===200&data.code===-1){
              that.statusMsg = data.msg
            }
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.login_main
  width 100%
  height 970px
  background pink
  overflow hidden
  .login_nav
    width 80%
    height 120px
    margin-top 50px
    h4
      span
        display block
        width 60px
        height 35px
        color white
        background #169af3
        text-align center
        line-height 35px
        margin-left 850px
        margin-top -30px
        border 1px
        border-radius 3px
  .box
    width 30%
    height 600px
    margin-top 100px
    margin-left 590px
</style>
