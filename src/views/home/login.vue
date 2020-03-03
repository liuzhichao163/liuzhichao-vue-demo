<template>
  <body id="poster">
    <el-form ref='AccountFrom' :model='account' :rules='rules' lable-position='left' lable-width='0px' class='demo-ruleForm login-container'>
    <h3 class="title">登录系统首页</h3>
    <el-form-item prop="userName">
      <el-input type="text" v-model="account.userName" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="userPassword">
      <el-input type="password" v-model="account.userPassword" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" @click.native.prevent='handleLogin' :loading= 'logining'>登录</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
import userApi from '../../api/user/index'
import api from '../../api/api'
export default {
  name: 'login',
  data () {
    return {
      logining: false,
      account: {
        userName: '',
        userPassword: ''
      },
      rules: {
        userName: [{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        }],
        userPassword: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      },
      checked: true
    }
  },

  methods: {
    handleLogin () {
      this.$refs.AccountFrom.validate((valid) => {
        if (valid) {
          // 验证通过 可以提交
          this.logining = true
          // 将提交的数据进行封装
          let user = {username: this.account.userName, password: this.account.userPassword}
          // 调用函数  传递参数 获取结果

          this.postRequest('login', user).then(resp=> {
            if(resp.data.state == 200){
              this.$store.commit('login',resp.data.data);
              //如果当前登录是由路由守卫跳转过来的，则登陆成功后获取跳转路径所携带的参数(原目标路径)
              var path = this.$route.query.redirect;
              this.$router.replace({path: path == '/' || path == undefined ? '/manager' : path});
            }
          });
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style>

 #poster {
    background:url("../../assets/background.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
    padding: 0;
  }

  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 300px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    /* border: 1px solid #eaeaea; */
    /* box-shadow: 0 0 25px #cac6c6; */
  }
</style>
