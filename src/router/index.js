import Vue from 'vue'
import Router from 'vue-router'
import UserIndex from '../views/user/index'
import OrgList from '../views/org/org-list'
import Manager from '../views/home/manager'
import OrgTree from '../views/org/org-tree'
import Login from '../views/home/login'
import NotFound from '../views/home/404'

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
    {
      path: '*',
      hidden: true,
      redirect: {path: '/404'}
    },
    {
      path: '/manager',
      component: Manager,
      name: '员工管理',
      children: [
        { path: '/user/index', component: UserIndex, name: '用户管理' },
        { path: '/org/org-tree', component: OrgTree, name: '部门管理' },
        { path: '/org/org-list', component: OrgList, name: '部门列表' }
      ]
    }
  ]
})
export default router
