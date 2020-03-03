<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="10">
      <div class="grid-content bg-purple">
        <el-tree
        :data="data"
         node-key="id"
         show-checkbox
         default-expand-all
        :default-checked-keys="defaultData"
        :props="defaultProps"
         ref="tree"
        >
        </el-tree>
      </div>
     </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
       data() {
            const data = [];
            return {
                 defaultProps: {
                    label: 'name',
                    children: 'children',
                },
                data: JSON.parse(JSON.stringify(data)),
                //defaultData: [],
            }
        },

        computed: {
          defaultData: function () {
            return this.$store.state.mids
          },
        },


        mounted() {
            this.loadTree();
        },

        methods: {
            //加载数据
            loadTree(){
                this.getRequest("/api/menu").then(resp=>{
                    this.data = resp.data;
                })   
            },

          //获取当前选中节点及父节点，要在tree组件中加ref="tree"属性
          getChecks(){
            //return this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
             return this.$refs.tree.getCheckedKeys();
          },
          //清空复选框
          setChecks(){
            this.$refs.tree.setCheckedKeys([]);
          }
        },
}

</script>

<style>

</style>
