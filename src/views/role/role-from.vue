<template>
  <el-dialog
    :visible.sync="visible"
    :title="title"
    width="500px"
  >
    <div>
      <el-form ref="roleForm" label-width="100px" :model="roleForm" :rules="rules">
        <el-form-item label="角色名称" prop="nameZH" style="width:70%; margin-left:50px">
          <el-input v-model="roleForm.nameZH" />
        </el-form-item>
        <el-form-item  label="角色代码" prop="name" style="width:70%; margin-left:50px">
          <el-input  v-model="roleForm.name" />
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

import updateRole from '../../api/user'
export default{
    
 data () {
    return {
      rules: {
        nameZH: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入角色代码', trigger: 'blur' }
        ]
      },
      roleForm: {
        name: null,
        nameZH: null
      },
    }
  },

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
  },
  watch: {
    //监听visible的值变化
    visible (val) {
      if (this.title === '修改角色') {
             this.roleForm = this.formData
      }
      if (!val) {
        this.roleForm = {
           name: '',
           nameZH: ''
        }
        // alert(JSON.stringify(this.$refs['roleForm']))
        // this.$refs['roleForm'].resetFields()
      }
    }
  },

 
  methods: {
    //保存
    save () {
     
      this.$refs['roleForm'].validate(async (valid) => {
        let resp = null
        if (valid) {
            if(this.title == '新增角色'){
                this.postRequest("/api/role", this.roleForm).then(resp => {
                     this.back(resp)
                })
            }else{
                this.putRequest("/api/role", this.roleForm).then(resp => {
                     this.back(resp)
                })
            }
        }
      })
    },

    back(resp){
         this.$emit('success', false)
         if (resp.data.state === 200) {
            this.$message({
              message: resp.data.message,
              type: 'success'
            })
          } else {
            this.$message({
              message: resp.data.message,
              type: 'error'
            })
          }
    },


    closeDialog () {
      this.$emit('success', false)
    }
  }
}

</script>
<style>

</style>
