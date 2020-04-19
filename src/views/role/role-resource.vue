<template>
    <div>
        <el-drawer
        :title="restitle"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose">
        <div style="padding:0px 30px">
             <el-tabs v-model="activeName" @tab-click="handleClick" >
                <el-tab-pane label="菜单授权" name="menu">
                    <MenuTree ref="slectMenu"></MenuTree>
                </el-tab-pane>
                <el-tab-pane label="用户授权" name="user">
                    用户授权
                </el-tab-pane>
             </el-tabs>
        </div>
        <div class="footer" style="position:fixed; bottom:20px; right:20px">
            <el-button  @click="closeDialog">取消</el-button>
            <el-button type="primary" @click="save">保存</el-button>
        </div>
        </el-drawer>
    </div>
    
    
</template>
<script>
import MenuTree from '../menu/menu-tree-check.vue'
export default {
    data(){
        return{
             direction: 'rtl',
             activeName: 'menu',
             mids:[]
        }
    },
    components:{
       MenuTree
    },
    props: {
        drawer: {
            type: Boolean,
            default: false
        },
        restitle: {
            type: String
        },
         formData:{
              type: Object
         }
  },
  watch:{
      drawer(val){
          if(!val){
            this.closeDialog();
          }
      }
  },


  methods:{

      handleClose(done) {
            this.closeDialog();
      },
       handleClick(tab, event) {
      },

      closeDialog(){
        this.$store.commit('flushMids',[]);
        this.$refs.slectMenu.setChecks()
        //this.$emit('update:drawer', false)
        this.$emit('success', false)
      },

      save(){
        this.postRequestKV("/api/role/menu",{
                        mids:this.$refs.slectMenu.getChecks(),
                        rid:this.formData.id}).then(resp=>{
            if(resp.data.state == 200){
                this.closeDialog();
            }
        })
      }
  }
}
</script>