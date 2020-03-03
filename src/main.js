// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import store from './store'

import {initMenu} from './utils/utils'

//引入utils/api.js的axios
import {postRequest} from './api/api'
import {getRequest} from './api/api'
import {putRequest} from './api/api'
import {deleteRequest} from './api/api'

Vue.use(Element, {size: 'small'})

Vue.config.productionTip = false

//将axios注册为全局变量原型
Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;

router.beforeEach((to, from, next)=> {
  if(to.name == 'login'){
      next();
      return;
  }else{
    initMenu(router, store);
    next();
  }
  
  }
)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
