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
    },
    actions: {
        connect(context){
          context.state.stomp = Stomp.over(new SockJS('http://localhost:12280/webSocket'));
          context.state.stomp.connect({}, frame=> {
            context.state.stomp.subscribe("/topic/nf", message=> {
                console.log("消息内容："+message.body)
              context.commit('toggleNFDot', true);
            });
            
          }, failedMsg=> {
    
          });
        }
      }
});