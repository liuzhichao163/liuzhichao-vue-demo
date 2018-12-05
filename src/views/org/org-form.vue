<template>
  <el-dialog
    :visible.sync="visible"
    :title="title"
    width="600px"
  >
    <div>
      <el-form ref="form" label-width="100px" :model="orgForm" :rules="rules">
        <el-form-item label="部门编号" prop="orgId" v-if="title==='新增部门'">
          <el-input v-model="orgForm.orgId"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="orgName">
          <el-input v-model="orgForm.orgName"></el-input>
        </el-form-item>
        <el-form-item label="部门地点" prop="orgLoc">
          <el-input v-model="orgForm.orgLoc"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import OrgApi from '../../api/org'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },

    title: {
      type: String
    },

    editData: {
      type: Object
    },

    flag: {
      type: Number
    }

  },

  watch: {
    visible (val) {
      if (this.title === '修改部门') {
        this.orgForm = this.editData
      }
      if (!val) {
        this.$emit('update:visible', false)
        this.orgForm = {
          orgId: null,
          orgName: null,
          orgLoc: null
        }
        this.$refs['form'].resetFields()
      }
    }
  },

  data () {
    return {
      rules: {
        orgId: [
          {required: true, trigger: 'change', message: '请输入部门编号!'}
        ],
        orgName: [
          {required: true, trigger: 'change', message: '请输入部门名称!'}
        ]
      },
      orgForm: {
        orgId: null,
        orgName: null,
        orgLoc: null,
        pId: null
      }
    }
  },
  mounted () {
    this.orgForm = {
      orgId: null,
      orgName: null,
      orgLoc: null
    }
  },
  methods: {
    // 加载
    loadTree () {
      this.$router.push({
        name: '部门管理',
        query: {
          _t: Date.now()
        }
      })
    },

    save () {
      this.$refs['form'].validate(async (valid) => {
        let resp = null
        if (valid) {
          if (this.title === '新增部门') {
            this.orgForm.pId = this.editData.orgId
            resp = await OrgApi.create(this.orgForm)
          } else {
            resp = await OrgApi.update(this.orgForm)
          }
          this.visible = false
          this.$emit('success')
          if (resp.state === 200) {
            this.$message({
              message: '成功！',
              type: 'success'
            })
          } else {
            this.$message({
              message: '失败！',
              type: 'error'
            })
          }
          this.loadTree()
        }
      })
    },
    closeDialog () {
      this.$emit('success', false)
    }
  }
}

</script>
