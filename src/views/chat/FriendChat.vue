<template>
    <div>
        <el-container>
            <el-aside width="160px">
                <div class="friendListDiv" v-for="(user,index) in users" :key="index" @click="toggleFriend(user)"
                     v-bind:class="{currentChatFriend:true}">
                    <img :src="user.httpUserFace" class="userfaceImg"/>
                    <el-badge :is-dot="true">{{user.userName}}</el-badge>
                </div>
                <div style="background-color: #20a0ff;height: 1px;width: 160px;"/>
            </el-aside>
            <el-main style="padding-top: 0px;padding-bottom: 0px">
                <div class="chatDiv" ref="chatDiv" id="chatDiv">
                    <p>
                        与<el-tag type="primary" size="small" style="margin-left: 5px;margin-right: 5px">{{currentFriend.userName}}</el-tag>
                        聊天中
                    </p>
                    <template>
                            <ul v-for="(item,index) in msgs" :key="index">
                                <li :class="item.from == currentFriend.userName? 'currentFriend' : 'currentUser' ">
                                    <img v-if="item.from == currentFriend.userName" :src="currentFriend.httpUserFace" class="userfaceImg"/>
                                    <div style="display: inline-flex;border-style: solid;border-width: 1px;border-color: #20a0ff;border-radius: 5px;padding: 5px 8px 5px 8px">
                                        {{item.msg}}
                                    </div>
                                    <img v-if="item.from == currentUser.name" :src="currentUser.httpUserFace" class="userfaceImg"/>
                                </li> 
                            </ul>
                    </template>
                </div>
                <div style="text-align:left;margin-top:10px;">
                    <el-input v-model="chatMsg.msg" placeholder="请输入内容" size="mini" style="width:600px;" type="textarea" autosize="">
                    </el-input>
                    <el-button size="small" type="primary" class="sendBtn" @click="sendMsg">
                        <i>发送</i>
                    </el-button>
                    <el-button size="small" type="primary" class="sendBtn" @click="clone">
                        <i>清理</i>
                    </el-button>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script>
export default {
    data(){
        return{
            users:[],  //联系人列表
            currentFriend:{},   //当前聊天好友
            chatMsg:{
                from: '',
                to: '',
                msg: '',
            },
        }
    },

    mounted() {
        this.loadUsers();
        
    },

    computed:{
       currentUser(){   //当前登录用户
           return this.$store.state.user
       },
    //    msgs(){
    //        return this.$store.state.msgs
    //    },
       msgs: {  //获取消息列表
        get: function () {
          return this.$store.state.msgs
        }
      },
    },

    watch:{
       msgs(){
           //alert(JSON.stringify(msgs))
       } 
    },


    methods: {
        //加载好友列表
        loadUsers(){
            this.getRequest("api/msg/users").then(resp=>{
                this.users = resp.data;
            })
        },

        //切换聊天对象
        toggleFriend(user){
            if(user == this.currentFriend){  //如果点击的是当前正在聊天的对象，则不改变数据
                return; 
            }
            this.currentFriend = user;
            this.$store.commit("staupdateCurrentFriendte",user)
            this.loadOldMsg();
        },      

        //查询本地聊天记录
        loadOldMsg(){
            var oldMsg = window.localStorage.getItem(this.$store.state.user.name+"#"+this.currentFriend.userName)
            if(oldMsg == null){
                this.$store.commit("updateMsgList",[])
            }else{
                 this.$store.commit("updateMsgList",JSON.parse(oldMsg))
            }
            alert(oldMsg)
        },

        //发送消息
        sendMsg(){

             this.chatMsg.from = this.currentUser.name;
             this.chatMsg.to = this.currentFriend.userName;

            //获取本地聊天记录，如果没有直接保存，否则将新发送的消息push到历史聊天记录数组中
           var oldMsg = window.localStorage.getItem(this.$store.state.user.name+"#"+this.currentFriend.userName);
            if(oldMsg == null){
                oldMsg = [];
                oldMsg.push(this.chatMsg)
                window.localStorage.setItem(this.$store.state.user.name+"#"+this.currentFriend.userName,JSON.stringify(oldMsg));
            }else{
                var oldMsgJson = JSON.parse(oldMsg);
                oldMsgJson.push(this.chatMsg);
                window.localStorage.setItem(this.$store.state.user.name+"#"+this.currentFriend.userName,JSON.stringify(oldMsgJson));
           }
            this.$store.state.stomp.send('/app/ws/chat', JSON.stringify(this.chatMsg), {});
           //获取消息记录
           this.loadOldMsg();
        },

        clone(){
             window.localStorage.removeItem(this.$store.state.user.name+"#"+this.currentFriend.userName);
             this.$store.commit("updateMsgList",[])
        }
        
    }
}
</script>
<style>
  .userfaceImg {
    width: 37px;
    height: 37px;
    border-radius: 30px;
    margin-right: 10px;
  }

  .friendListDiv {
    display: flex;
    justify-content: flex-start;
    padding-left: 20px;
    box-sizing: border-box;
    align-items: center;
    width: 160px;
    height: 40px;
    border-color: #20a0ff;
    border-left-style: solid;
    border-top-style: solid;
    border-right-style: solid;
    border-width: 1px;
    cursor: pointer
  }

  .chatDiv {
    border-color: #20a0ff;
    border-style: solid;
    border-radius: 5px;
    border-width: 1px;
    box-sizing: border-box;
    width: 700px;
    height: 450px;
    overflow-y: auto;
    padding-bottom: 50px;
  }

  .sendBtn {
    padding-left: 25px;
    padding-right: 25px
  }

  .currentChatFriend {
    background-color: #dcdfe6;
  }

  .currentUser {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      box-sizing: border-box;
  }
  .currentFriend { 
      display: flex;
      justify-content:flex-start;
      align-items: center;
      box-sizing: border-box;
    }

</style>