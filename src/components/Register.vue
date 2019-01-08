<template>
  <div class="register_main">
    <div class="register_nav">
      <h3>已有阿酷账号？点击<a href="/login"><span>登录</span></a></h3>
    </div>
    <div class="register">
      <el-form ref="ruleForm"  label-width="100px"  :model="ruleForm" :rules="rules">
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username" maxlength="6"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password"  v-model="ruleForm.pwd" maxlength="6"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input type="password"  v-model="ruleForm.cpwd" maxlength="6"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">注册</el-button>
        </el-form-item>
        <div style="color: red">{{statusMsg}}</div>
      </el-form>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Register',
    data() {
      return {
        statusMsg: '',
        error: '',
        ruleForm: {
          username: '',
          pwd: '',
          cpwd: ''
        },
        rules: {
          username: [{
            required: true, type: 'string', message: '请填写用户信息', triggle: 'blur'
          }],
          pwd: [{
            required: true, message: '请创建密码', trigger: 'blur'
          }],
          cpwd: [{
            required: true, message: '请确认密码', trigger: 'blur'
          }, {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.ruleForm.pwd) {
                callback(new Error('两次输入密码不一致'))
              } else {
                callback()
              }
            }, trigger: 'blur'
          }]
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
      register: function () {
        let that = this
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            that.$axios({
              method: "post",
              url: "/api/users/register",
              data: {
                username: that.ruleForm.username,
                password: that.ruleForm.pwd
              }
            }).then(({status,data}) => {
              if(status===200&&data.code===0){
                  location.href='/login'
                  console.log(data)
                }else if(status===200&&data.code===-1){
                 that.statusMsg = data.msg
                }

            })
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.register_main
  width 100%
  height 973px
  background pink
  overflow hidden
  .register_nav
    width 80%
    height 100px

    margin 0 auto
    margin-top 30px
    h3
      text-align center
      width 60%
      height 100px
      span
        display block
        width 60px
        height 35px
        background #169af3
        text-align center
        line-height 35px
        color white
        margin-left 550px
        margin-top -30px
        border 1px
        border-radius 3px
  .register
    width 30%
    height 500px
    margin 0 auto
    margin-top 200px
</style>
