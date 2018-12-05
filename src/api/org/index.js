import axios from 'axios'
export default {
  // 添加部门
  create: async (org) => {
    let rest = await axios.post('/api/orgs', org)
    return rest.data
  },

  // 删除部门
  delete: async (orgId) => {
    let resp = await axios.delete(`/api/orgs/${orgId}`)
    return resp
  },

  // 修改部门信息
  update: async (org) => {
    let rest = await axios.put('/api/orgs', org)
    return rest.data
  },

  // 查询下级部门信息
  queryOrgs: async (orgId) => {
    let resp = await axios.get(`/api/orgs/actions/children?orgId=${orgId}`)
    return resp.data
  },

  // 根据部门名称查询部门信息
  queryOrgsByName: async (filters) => {
    let resp = await axios.get(`/api/orgs?orgName=${filters.orgName}&pageIndex=${filters.pageIndex}&pageSize=${filters.pageSize}`)
    return resp.data
  }

}
