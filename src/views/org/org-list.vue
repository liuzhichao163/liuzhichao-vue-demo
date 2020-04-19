<template>
  <div>
    <el-col :span="14" class="toolbar" style="padding-bottom: 0px;">
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
       <pageNation :total="total" @pageChange="pageChange"></pageNation>
    </div>
  </div>
</template>

<script>
import pageNation from '../../components/module/pageNation.vue'
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

  components:{
        pageNation
    },


  methods: {
    // 分页查询部门信息
    async loadData (flag) {
       this.getRequest("/api/orgs?orgName="+this.filters.orgName+"&pageIndex="+this.filters.pageIndex+"&pageSize="+this.filters.pageSize).then(resp=>{
                  this.orgData = resp.data.orgList
                  this.total = resp.data.count
                  this.visible = flag
            })
    },
    
    async getOrgs () {
      this.loadData()
    },

     //分页
    pageChange (item) {
      this.filters.pageIndex = item.page_index;
      this.filters.pageSize = item.page_limit;
      this.loadData() //改变页码，重新渲染页面
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
</style>
