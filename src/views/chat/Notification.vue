<template>
    <div>
        <el-container>
            <el-header calss="nf-header">
                <el-button type="success" size="mini" plain icon="el-icon-success" @click="allRead">全部标记已读</el-button>
                <el-button type="primary" size="mini" plain v-if="true" @click="dialogVisible = true">
                    <i class="fa fa-send" style="margin-right: 5px"/>发送系统消息
                </el-button>
            </el-header>

            <el-main style="padding: 0px;">
               <el-collapse accordion @change="handleChange">
                   <el-collapse-item v-for="(msg,index) in sysmsgs.list" :key="index" :name="msg.msgContent.id">
                       <template slot="title">
                           <div style="display:flex; justify-content: flex-start; align-items: center">
                               <div style="display: flex; justify-content: flex-start; align-items: center; width: 25px;height: 25px">
                                   <div style="width: 8px;height: 8px;background-color: #ea0206;border-radius: 8px;" v-if="msg.state == 0"></div>
                               </div>
                               <span style="width:300px;text-align:left">{{msg.msgContent.title}}</span>
                               <el-tag>{{msg.msgContent.date}}</el-tag>
                           </div>
                       </template>
                       <div style="display: flex; justify-content: flex-start; align-items: center; border-style: solid; border-width: 1px; border-color: #409eff; border-radius: 5px; padding: 4px 0px 4px 8px; box-size: border-box; hight: 100%">
                           {{msg.msgContent.content}}
                       </div>
                   </el-collapse-item>
               </el-collapse>
               <el-pagination
                background
                layout="prev, pager, next"
                :total="this.sysmsgs.total"
                :page-size="this.size"
                @current-change="pageChange">
                </el-pagination>
            </el-main>
        </el-container>

        <div>
            <el-dialog
                title="发送系统通知"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                width="45%">
                <el-row>
                    <el-col :span="3">通知标题</el-col>
                    <el-col :span="21">
                        <el-input v-model="title" size="mini" placeholder="请输入标题"></el-input>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 10px">
                    <el-col :span="3">通知内容</el-col>
                    <el-col :span="21">
                        <el-input v-model="message" size="mini" placeholder="请输入通知内容" type="textarea" :autosize="{minRows: 5,maxRows: 10}">
                        </el-input>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 10px;padding-right: 10px">
                    <el-col>
                        <el-button type="default" size="mini" @click="cancelSend">取消</el-button>
                        <el-button type="primary" size="mini" @click="sendNFMsg">发送</el-button>
                    </el-col>
                </el-row>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'

export default {
    data(){
        return {
            dialogVisible: false,
            title: '',
            message: '',
            stomp: null,
            page: 1,
            size: 5,
            mid: -1,
            sysmsgs:{}
        }
    },
    mounted() {
        this.initMsgs();
    },
    methods: {
        //取消发送系统消息
        cancelSend(){
            this.dialogVisible = false;
            this.title = '';
            this.message = '';
        },
        //发送系统消息
        sendNFMsg(){
        //先将消息入库
             this.postRequest("/api/msg",{title:this.title,content:this.message})

           //关闭发送消息的弹窗
            this.dialogVisible = false;
            //推送“系统消息”
            this.$store.state.stomp.send('/app/ws/nf')
            this.initMsgs();
        },

        //获取系统消息列表
        initMsgs(){
             this.getRequest("/api/msg?page="+this.page+"&size="+this.size).then(resp=>{
                 console.log("系统消息"+JSON.stringify(resp.data))
                this.sysmsgs = resp.data;
            })
        },

        handleChange(val){
            this.mid = val;          //val：<el-collapse-item>标签中 :name 所绑定的值，即消息mid
            if(val != null && val != ''){
                this.updateMsgState();
            }
        },

        allRead(){
            this.mid = -1;
            this.updateMsgState();
        },

        //修改消息的状态
        updateMsgState(){
            this.putRequest("/api/msg",this.mid)
            this.initMsgs();
        },

        //分页
        pageChange (page) {
            this.page = page
            this.initMsgs()
            }



    },
}
</script>
<style>
    .nf-header {
        text-align: left;
        padding-left: 0px;
        background-color: #fff;
        margin-left: 10px;
    }
    .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>