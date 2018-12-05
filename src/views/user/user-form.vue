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
        <el-form-item  label="姓名" prop="userName" v-if="title==='新增用户'">
          <el-input  v-model="userForm.userName" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPassword" v-if="title==='新增用户'">
          <el-input type="password" v-model="userForm.userPassword"></el-input>
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
import UserApi from '../../api/user'
import OrgApi from '../../api/org'

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
        // this.$emit('update:visible', false)
        this.userForm = {
          userId: null,
          userName: null,
          userPassword: null,
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
        userName: [
          {required: true, trigger: 'change', message: '请输入姓名!'}
        ],
        userPassword: [
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
        userName: null,
        userPassword: null,
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
    let resp = await OrgApi.queryOrgsByName(this.filters)
    this.orgData = resp.orgList
  },
  methods: {
    save () {
      this.$refs['form'].validate(async (valid) => {
        let resp = null
        if (valid) {
          if (this.title === '新增用户') {
            resp = await UserApi.create(this.userForm)
          } else {
            // 修改用户
            resp = await UserApi.update(this.userForm)
            this.$refs['form'].resetFields()
          }
          this.$emit('success', false)
          if (resp.state === 200) {
            this.$message({
              message: resp.message,
              type: 'success'
            })
          } else {
            this.$message({
              message: resp.message,
              type: 'error'
            })
          }
        }
      })
    },
    closeDialog () {
      this.$emit('success', false)
    }
  }
}

</script>
