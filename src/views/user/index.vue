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
        <el-form-item>
          <el-upload
              accept="application/vnd.ms-excel"
              action="/api/users/importEmp"
              :before-upload="beforeFileUpload"
              :on-success="fileUploadSuccess"
              :on-error="fileUploadError"
              :disabled="fileUploadBtnText=='正在导入'"
            >
            <el-button type="primary" :loading="fileUploadBtnText=='正在导入'">
              {{fileUploadBtnText}}
            </el-button>
          </el-upload>
        </el-form-item>
         <el-form-item>
              <el-button type="primary" @click="exportUsers">导出数据</el-button>
           </el-form-item>
      </el-form>
    </el-col>
    <el-table border height="400" :data="tableData">
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
       <pageNation :total="total" @pageChange="pageChange"></pageNation>
    </div>
    <UserForm :visible.sync="visible" @success="loadData" :title="title" :formData="formData"></UserForm>
  </div>
</template>

<script>
import UserForm from './user-form.vue'
import pageNation from '../../components/module/pageNation.vue'

export default {
  components: {
      UserForm,
      pageNation,
      },
  data () {
    return {
      visible: false,
      tableData: [],
      title: '',
      total: 0,
      fileUploadBtnText: '导入数据',
      filters: {
        userName: '',
        pageIndex: 1,
        pageSize: 5
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
    //excel上传成功后的钩子
   fileUploadSuccess(response, file, fileList) {
      if (response.state == 200) {
          this.$message({type: response.state, message: response.message});
        }
        this.loadData();
        this.fileUploadBtnText = '导入数据';
   },
    //文件上传失败后的钩子
    fileUploadError(err, file, fileList) {
        this.$message({type: 'error', message: "导入失败!"});
        this.fileUploadBtnText = '导入数据';
      },
      //点击上传按钮后，上传文件前的钩子
     beforeFileUpload(file) {
        this.fileUploadBtnText = '正在导入';
      },
      //导出用户excel的钩子
      exportUsers(){
        window.open("/api/users/exportEmp", "_parent");
      },
    // 查询用户列表
    async loadData (flag) {
      this.getRequest("api/users?userName="+this.filters.userName+"&pageIndex="+this.filters.pageIndex+"&pageSize="+this.filters.pageSize).then(resp=>{
                this.tableData = resp.data.userAndOrg
                this.total = resp.data.count
                this.visible = flag
          })
    },
    // 根据用户名模糊查询
    async getUsers () {
      this.loadData()
    },
    pageChange (item) {
      this.filters.pageIndex = item.page_index;
	    this.filters.pageSize = item.page_limit;
      this.loadData()
    },
    // 删除用户
    remove (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
         this.deleteRequest("/api/users/"+id)
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
<style>

</style>