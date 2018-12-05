<template>
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
      <el-button type="primary" style="width:100%;" @click.native.prevent='handleLogin' :loading= 'logining'>登录</el-button>
    </el-form-item>

  </el-form>

</template>

<script>
import userApi from '../../api/user/index'
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
          let user = {userName: this.account.userName, userPassword: this.account.userPassword}
          // 调用函数  传递参数 获取结果
          userApi.login(user).then(data => {
            this.logining = false
            if (data.state === 200) {
              this.$router.push({path: '/manager'})
            } else {
              this.$message({
                message: data.message,
                type: 'error'
              })
            }
          })
        } else {
          console.log('error submit')
          return false
        }
      })
    }
  }
}
</script>

<style>
  body {
    background: #DFE9FB;
  }

  .login-container {
    width: 350px;
    margin-left: 35%;
  }
</style>
