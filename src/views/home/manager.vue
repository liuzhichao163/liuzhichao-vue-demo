<template>
  <el-container class="home-container">
      <el-header class="home-header">
        <span class="home-title">微人事</span>

        <div style="display: flex;align-items: center;margin-right: 7px">
          <el-badge style="margin-right: 30px" :is-dot="this.$store.state.nfDot">
            <i class="fa fa-bell-o" @click="goChat" style="cursor: pointer">  </i>
          </el-badge>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link" style="display: flex; align-items: center">{{user.name}}
            <i>
              <sp>{{user.httpuserface}}</sp>
              <img v-if="user.httpUserFace != ''" :src="user.httpUserFace"
                   style="width: 40px;height: 40px; margin-right: 15px; margin-left: 15px;border-radius: 50px"/>
            </i>
            </span>
            <el-dropdown-menu>
              <el-dropdown-item command="center" divided>个人中心</el-dropdown-item>
              <el-dropdown-item command="setting" divided>设置</el-dropdown-item>
              <el-dropdown-item command="logout" divided>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      
      <el-container>
          <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <div style="display: flex; justify-content: flex-start;width: 200px;text-align: left;">
              <el-menu style="background: #ececec; width:200px;"  unique-opened router>
                <template v-for="(item,index) in this.routes">
                  <el-submenu :key="index" :index="index+''">
                    <template slot="title">
                       <i :class="item.iconCls" style="color: #20a0ff;width: 14px;"></i>
                      <sp>{{item.name}}</sp>
                    </template>
                    <el-menu-item width="180px"
                                  style="padding-left: 30px;padding-right:0px;margin-left: 0px;width: 170px;text-align: left"
                                  v-for="child in item.children" :index="child.path" :key="child.path">  
                      {{child.name}}
                    </el-menu-item>
                  </el-submenu>
                </template>
              </el-menu>
            </div>
          </el-aside>
          <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 30px;">
              <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
            </el-breadcrumb>
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </el-main>
      </el-container>
</el-container>
</template>

<script>
import WsApi from '../../api/ws'

export default {
  computed: {
    routes(){
      return this.$store.state.routes
    },
    user: function () {
      return this.$store.state.user
    },
    httpUserFace: function(){
      return this.$store.state.httpUserFace
    }
  },
  methods: {
    //点击小铃铛进入消息界面
    goChat(){
       this.$router.push('/chat/Chat');
    },

    //退出
    logout(){
      this.getRequest("/logout").then(resp=>{
        if(resp.data.state == 200){
           this.$store.commit('logout');
           this.$router.replace({path: '/'});
        }else{
            this.$message({type: info, message: '退出失败'});
        }
      });
     
    },

    //点击头像的下拉选项将执行的方法
    handleCommand(cmd){
      switch(cmd){
        case 'center':
          this.$router.push('/user/user-center');
          break;
        case 'setting': 
          // alert(2);
          break;
        case 'logout':
          this.logout();
          break;
        default:
         break;
      } 

    }
  },
}
</script>
<style>
  .home-container {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .home-header {
    background-color: #20a0ff;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px;
  }
  .el-aside {
    color: #333;
  }
  .home-title {
    color: #333;
    font-size: 22px;
    margin-left: 30px;
  }
</style>
