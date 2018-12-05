<template>
  <div>
    <el-table border :data="tableData">
      <el-table-column label="姓名" prop="userName"></el-table-column>
      <el-table-column label="职位" prop="job"></el-table-column>
      <el-table-column label="部门名称" prop="orgName"></el-table-column>
      <el-table-column label="部门地点" prop="orgLoc"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import UserApi from '../../api/user'

export default {
  props: {
    orgId: {
      Type: String
    }
  },
  data () {
    return {
      tableData: null
    }
  },
  watch: {
    orgId (val) {
      if (val) {
        this.loadData(this.orgId)
      }
    }
  },
  methods: {
    // 根据部门编号查询用户信息
    async loadData (orgId) {
      let resp = await UserApi.queryUserByOrgId(orgId)
      this.tableData = resp.userAndOrg
    },

    formatter (row, column) {
      let data = this.tableData
      let check = false
      for (let i = 0; i < data.length; i++) {
        if (data[i].userId === row.mgrId) {
          check = true
          return data[i].userName
        }
      }
      if (!check) {
        return ''
      }
    }
  }
}
</script>
