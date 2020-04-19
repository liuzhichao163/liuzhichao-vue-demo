<template>
  <el-dialog
    :visible.sync="visible"
    :title="title"
    width="600px"
  >
    <div>
      <el-form ref="menuForm" label-width="100px" :model="menuForm" :rules="rules">
        <el-form-item label="资源路径" prop="url">
          <el-input v-model="menuForm.url" placeholder="/api/menu/tree"></el-input>
        </el-form-item>
        <el-form-item label="页面路径" prop="path">
          <el-input v-model="menuForm.path" placeholder="/role/role-demo"></el-input>
        </el-form-item>
        <el-form-item label="组件" prop="component">
          <el-input v-model="menuForm.component" placeholder="MenuTree"></el-input>
        </el-form-item>
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="menuForm.name" placeholder="菜单列表"></el-input>
        </el-form-item>
        <el-form-item label="图标样式" prop="iconCls">
          <el-input v-model="menuForm.iconCls"></el-input>
        </el-form-item>
        <el-form-item label="是否禁用" prop="enabled">
          <el-select v-model="menuForm.enabled" placeholder="请选择"  style="display: block;">
            <el-option
              v-for="item in enableds"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    roleData:{
      type: Object
    },
    title: {
      type: String
    },
  },

  data () {
    return {
      rules: {
        url: [
          {required: true, trigger: 'change', message: '请输入部门编号!'}
        ],
        path: [
          {required: true, trigger: 'change', message: '请输入部门名称!'}
        ]
      },
      menuForm: {
        id:'',
        url:'',
        path:'',
        component:'',
        name:'',
        iconCls:'',
        enabled:'',
        parentId:'',
      },
      enableds: [{
          value: '1',
          label: '不禁用'
        }, {
          value: '2',
          label: '禁用'
        }],
    }
  },

  watch: {
    //监听visible的值变化
    visible (val) {

      this.menuForm.parentId = this.roleData.id;

      if (!val) {
        this.menuForm={
            id:'',
            url:'',
            path:'',
            component:'',
            name:'',
            iconCls:'',
            enabled:'',
            parentId:'',
        }
      }
    }
  },

  mounted () {

  },
  methods: {
    //保存
    save(){
       this.$refs['menuForm'].validate(async (valid) => {
         this.postRequest("/api/menu", this.menuForm).then(resp=>{
            if(resp.data.state == 200){
                this.$emit('success',false);
            }
         })
       })
    },

    //取消
    closeDialog () {
      this.$emit('success', false)
    }
}
}

</script>
