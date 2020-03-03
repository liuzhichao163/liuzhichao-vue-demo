/**
 * Created by binwang on 2018/11/7.
 */
import axios from 'axios'

export default {
  // 添加用户数据
  create: async (user) => {
    let resp = await axios.post('/api/users', user)
    return resp.data
  },
  // 删除用户数据
  delete: async (id) => {
    let resp = await axios.delete(`/api/users/${id}`)
    return resp.data
  },
  // 修改用户数据
  update: async (user) => {
    let resp = await axios.put('/api/users/', user)
    return resp.data
  },

  // 根据用户名模糊查询用户数据
  queryUsers: async (filters) => {
    let resp = await axios.get(`api/users?userName=${filters.userName}&pageIndex=${filters.pageIndex}&pageSize=${filters.pageSize}`)
    return resp.data
  },

  // 根据部门id查询用户信息
  queryUserByOrgId: async (orgId) => {
    let resp = await axios.get(`/api/users/orgId?orgId=${orgId}`)
    return resp.data
  },

  // 用户登录
  login: async (user) => {
    let resp = await axios.post('/api/users/actions/login/', user)
    return resp.data
  },

   // 用户登录
   login2: async (user) => {
    let resp = await axios.post(`/login/?userName=${user.userName}&userPassword=${user.userPassword}`)
    return resp.data
  },

   // 修改用户数据
   updateRole: async (role) => {
    let resp = await axios.put('/api/role/', role)
    return resp.data
  },
}
