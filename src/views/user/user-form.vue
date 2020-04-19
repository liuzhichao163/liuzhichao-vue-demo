<template>
  <el-dialog
    :visible.sync="visible"
    :title="title"
    width="600px"
  >
    <div>
      <el-form ref="form" label-width="100px" :model="userForm" :rules="rules">
        <el-form-item label="工号" prop="userId" v-if="title==='新增用户'">
          <el-input v-model="userForm.userId" ></el-input>
        </el-form-item>
        <el-form-item  label="姓名" prop="name" v-if="title==='新增用户'">
          <el-input  v-model="userForm.name" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="title==='新增用户'">
          <el-input type="password" v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="job">
          <el-input v-model="userForm.job"></el-input>
        </el-form-item>
        <el-form-item  label="部门名称" prop="orgName">
          <el-select v-model="userForm.orgId" lable="请选择" value="0" >
            <el-option
              v-for="item in orgData"
              :value= "item.orgId"
              :label="item.orgName"
              :key="item.orgName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button  @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default{
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    formData: {
      type: Object
    },
    flag: {
      type: Number
    }
  },
  watch: {
    visible (val) {
      if (this.title === '修改用户') {
        this.userForm = this.formData
      }
      if (!val) {
        this.$emit('update:visible', false)
        this.userForm = {
          userId: null,
          name: null,
          password: null,
          job: null,
          orgId: null
        }
        this.$refs['form'].resetFields()
      }
    }
  },

  data () {
    return {
      rules: {
        name: [
          {required: true, trigger: 'change', message: '请输入姓名!'}
        ],
        password: [
          {required: true, trigger: 'change', message: '请输入密码!'}
        ]
      },
      filters: {
        pageIndex: '',
        pageSize: '',
        userName: ''
      },
      userForm: {
        userId: null,
        name: null,
        password: null,
        job: null,
        orgId: null
      },
      orgData: {
        orgId: '',
        orgName: '',
        orgLoc: '',
        pId: ''
      }
    }
  },
  // 级联查询获得所有部门名称
  async mounted () {
    this.getRequest("/api/orgs?orgName="+this.filters.orgName+"&pageIndex="+this.filters.pageIndex+"&pageSize="+this.filters.pageSize).then(resp=>{
        this.orgData = resp.data.orgList
    })

  },
  methods: {
    save () {
      this.$refs['form'].validate(async (valid) => {
        let resp = null
        let state = '';
        if (valid) {
          if (this.title === '新增用户') {
            this.postRequest("/api/users",this.userForm).then(resp=>{
              state = resp.data.state;
            })
          } else {
            // 修改用户
            this.putRequest("/api/users",this.userForm).then(resp=>{
              state = resp.data.state;
            })
            this.$refs['form'].resetFields()
          }
          this.$emit('success', false)
        }
      })
    },
    closeDialog () {
      this.$emit('success', false)
    }
  }
}

</script>
