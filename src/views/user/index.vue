<template>
  <div>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.userName" placeholder="用户姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUsers">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="openAddDialog">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table border :data="tableData">
      <el-table-column label="姓名" prop="userName"></el-table-column>
      <el-table-column label="职位" prop="job"></el-table-column>
      <el-table-column label="部门名称" prop="orgName"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="remove(scope.row.id)" type="danger">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="openModfiyDialog(scope.row)" type="danger" icon="el-icon-edit">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="filters.pageSize"
        @current-change="pageChange">
      </el-pagination>
    </div>
    <UserForm :visible.sync="visible" @success="loadData" :title="title" :formData="formData"></UserForm>
  </div>
</template>

<script>
import UserForm from './user-form.vue'
import UserApi from '../../api/user'

export default {
  components: {UserForm},
  data () {
    return {
      visible: false,
      tableData: [],
      title: '',
      total: 0,
      filters: {
        userName: '',
        pageIndex: 1,
        pageSize: 10
      },
      formData: {
        userName: '',
        job: '',
        orgName: ''
      }
    }
  },
  watch: {
    orgId (val) {
      if (val) {
        this.queryUser(this.orgId)
      }
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    // 查询用户列表
    async loadData (flag) {
      let resp = await UserApi.queryUsers(this.filters)
      this.tableData = resp.userAndOrg
      this.total = resp.count
      this.visible = flag
    },
    // 根据用户名模糊查询
    async getUsers () {
      this.loadData()
    },
    pageChange (page) {
      this.filters.pageIndex = page
      this.loadData()
    },
    // 删除用户
    remove (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let resp = await UserApi.delete(id)
        if (resp.state === 200) {
          this.$message({
            message: resp.message,
            ype: 'success'
          })
        } else {
          this.$message({
            message: resp.message,
            type: 'error'
          })
        }
        this.loadData()
      }).catch(() => {
      })
    },

    // 修改用户信息
    async openModfiyDialog (user) {
      this.formData = user
      this.title = '修改用户'
      this.visible = true
    },
    async openAddDialog () {
      this.title = '新增用户'
      this.visible = true
    }
  }
}
</script>
