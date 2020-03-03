<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top: 10px">
            <el-tab-pane label="系统通知" name="notification"><nf></nf></el-tab-pane>
            <el-tab-pane label="好友聊天" name="chat"></el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import Notification from '@/views/chat/Notification'
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'
export default {
    data() {
        return {
            activeName: 'notification'
        };
    },
    components: {
        'nf': Notification,
    },

    mounted(){
       
    },

    methods: {
    },
}
</script>