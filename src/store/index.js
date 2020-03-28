/**
 * vuex使用
 * 1：安装vuex：npm install vuex --save
 * 2：在src下新建store文件夹，在文件家中新建index.js文件
 * 3：在main.js中引入vuex(store文件夹)；然后注册vuex
 * 4：最后就可以在任何组件中使用this.$store 了。
 * 
 * vuex由：State、getter、Mutation、Action和Module组成。
 *   State：vuex的数据中心
 *   getter：计算状态，一些对数据的处理(判断/过滤)等，都在getter属性中处理
 *   Mutation(只支持同步操作，异步操作使用Action)：1：vuex的状态管理器；2：通过Mutation里的方法来修改State中的数据的值:
 *                                                3：Mutation中的方法名自己定义(要有意义)，方法可以接受一个参数(state)或两个参数(state+载荷)，
 *                                                  其中state参数是固定的，荷载可以是多个参数合成的一个参数。
 *            4：在其他组件中如果要修改State中的数据，可以通过this.$store.commit("type",data); type:Mutation中定义的方法名，data：要修改的数据对象
 *   Action：1:通过调用Mutation中的方法异步的处理state中的数据。2:方法名(context){context.commit('Mutation中的方法名')};
 *          3：Action函数接受一个和store实例具有相同方法和属性的context对象，因此可以调用一个context.commit来提交一个Mutaion，
 *            或者通过context.getters和context.state来进行获取和修改state中的值。
 *          4：通过this.$store.dispatch('方法名',参数)调用caction中的方法
 * 
 * 区别：action和mutation都可以改变state中数据的状态，但是action可以处理异步函数可以在devtool中追踪数据变化，
 *      而mutation只可以处理同步函数，当处理异步函数的时候检测不到数据变化；
 */  


import Vue from 'vue'
import Vuex from 'vuex'
// import '../views/lib/sockjs'
// import '../views/lib/stomp'
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user:{ //user中的字段要和后端返回的user里的字段一致
          userId: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).userId,
          name: window.localStorage.getItem('user' || '[]') == null ? '未登录' : JSON.parse(window.localStorage.getItem('user' || '[]')).name,
          httpUserFace: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).httpUserFace,
          userFace: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).userFace,
          roles: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).roles,
          job: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).job,
          
        },
        stomp: null,
        nfDot: false,
        routes: [],
        mids: [],
        currentFriend:{},
        msgs:[],  //好友聊天消息数组
        isDotMap: new Map(),  //好友消息提示
    },
    mutations: {
        //改变主页的消息状态
        toggleNFDot(state, newValue){
            state.nfDot = newValue;
        },
        //初始化菜单（路由）
        initMenu(state, menus){
          state.routes = menus;
        },
        login(state, user){
          window.localStorage.setItem('user',JSON.stringify(user));
          state.user = user;
        },
        logout(state){
          window.localStorage.removeItem('user');
          state.routes = [];
        },
        httpuserface(state, url){
          state.httpuserface = url;
        },
        //角色-菜单授权时，刷新角色机构树复选框
        flushMids(state, mids){
          state.mids = mids;
        },
        //切换当前聊天对象
        updateCurrentFriend(state,user){
          state.currentFriend = user
        },
        updateMsgList(state, msgs){
          state.msgs = msgs
        },
    },
    actions: {
        connect(context){
          context.state.stomp = Stomp.over(new SockJS('http://localhost:12280/webSocket'));
          context.state.stomp.connect({}, frame=> {
            //广播消息
            context.state.stomp.subscribe("/topic/nf", message=> {
              console.log("消息内容1："+message.body)
              context.commit('toggleNFDot', true);
            });
            //一对一消息
            context.state.stomp.subscribe("/user/queue/chat", message=>{
              console.log("来消息了")
              //获取消息主体
              let msg = JSON.parse(message.body);
              console.log("消息内容2："+ msg.msg)
              let oldMsg = window.localStorage.getItem(context.state.user.name +"#"+ msg.from);
              if(oldMsg == null){
                oldMsg = [];
                oldMsg.push(msg);
                window.localStorage.setItem(context.state.user.name+"#"+ msg.from,JSON.stringify(oldMsg))
                context.commit("updateMsgList",oldMsg)
              }else{
                let oldMsgJson = JSON.parse(oldMsg);
                oldMsgJson.push(msg);
                window.localStorage.setItem(context.state.user.name+"#"+ msg.from,JSON.stringify(oldMsgJson))
                context.commit("updateMsgList",oldMsgJson)
              }

            })
            
          }, failedMsg=> {
          });
        }
      }
});