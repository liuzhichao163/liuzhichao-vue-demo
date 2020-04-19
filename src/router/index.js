import Vue from 'vue'
import Router from 'vue-router'
import Manager from '../views/home/manager'
import Login from '../views/home/login'
import NotFound from '../views/home/404'
import Chat from '../views/chat/Chat'
import Center from '../views/user/user-center'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/404',
      component: NotFound,
      name: '404'
    },
    // {
    //   path: '*',
    //   hidden: true,
    //   redirect: {path: '/404'}
    // },
    {
      path: '/manager',
      component: Manager,
      name: '员工管理',
      children: [
        // { path: '/user/index', component: UserIndex, name: '用户管理' },
        // { path: '/org/org-tree', component: OrgTree, name: '部门管理' },
        // { path: '/org/org-list', component: OrgList, name: '部门列表' },
        { path: '/chat/Chat', component: Chat, name: '消息列表' },
        { path: '/user/user-center', component: Center, name: '个人中心'}
      ]
    }
  ]
})
export default router
