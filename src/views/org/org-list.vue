<template>
  <div>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.orgName" placeholder="部门名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getOrgs">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <div>
      <el-table border :data="orgData">
        <el-table-column class="columnStyle" label="部门名称" prop="orgName"></el-table-column>
        <el-table-column class="columnStyle" label="部门地点" prop="orgLoc"></el-table-column>
        <el-table-column class="columnStyle" label="所属部门" prop="pId" :formatter="formatter"></el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="filters.pageSize"
        @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import OrgApi from '../../api/org'
export default {
  data () {
    return {
      visible: false,
      orgData: [],
      filters: {
        orgName: '',
        pageIndex: 1,
        pageSize: 5
      },
      total: 0
    }
  },

  methods: {
    // 分页查询部门信息
    async loadData (flag) {
      let resp = await OrgApi.queryOrgsByName(this.filters)
      this.orgData = resp.orgList
      this.total = resp.count
      this.visible = flag
    },
    async getOrgs () {
      this.loadData()
    },
    pageChange (page) {
      this.filters.pageIndex = page
      this.loadData()
    },

    formatter (row, column) {
      let data = this.orgData
      let check = false
      for (let i = 0; i < data.length; i++) {
        if (data[i].orgId === row.pId) {
          check = true
          return data[i].orgName
        }
      }
      if (!check) {
        return '/'
      }
    }
  },

  async mounted () {
    this.loadData()
  }
}
</script>

<style scoped>
  .columnStyle{
    align :'center'
  }
</style>
