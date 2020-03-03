<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="10">
      <div class="grid-content bg-purple">
        <el-tree
        :data="data"
        :props="defaultProps"
         node-key="id"
        default-expand-all
        :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
            <el-button
                type="text"
                size="mini"
                icon="el-icon-plus"
            @click=addTree(data)>
            </el-button>
            <el-button
                type="text"
                size="mini"
                icon="el-icon-delete"
            @click=removeTree(data)>
            </el-button>
            <el-button
                type="text"
                size="mini"
                icon="el-icon-edit"
                @click=updateTree(data)>
                </el-button>
            </span>
        </span>
        </el-tree>
      </div>
     </el-col>
    </el-row>
    <MenuForm :visible.sync="visible" @success="check" :title="title" :roleData="roleData"></MenuForm>
  </div>
</template>

<script>
import MenuForm from './menu-form.vue'
export default {
       data() {
            const data = [
                {
                    id: 1,
                    name: '菜单管理',
                    children: []
                }
            ];
            return {
                 defaultProps: {
                    label: 'name',
                    children: 'children',
                },
                data: JSON.parse(JSON.stringify(data)),
                title: '',
                visible: false,
                roleData:{},
            }
        
        },
        
         components: {
            MenuForm
        },

        mounted() {
            this.loadTree();
        },

        methods: {

            //子组件还变父组件的方法
            check(val){
                this.visible = false;
                this.loadTree();
            },

            //加载数据
            loadTree(){
                this.getRequest("/api/menu").then(resp=>{
                    this.data[0].children = resp.data;
                })   
            },

            //新增菜单
            addTree(data){
                this.roleData = data;
                this.title = '新增菜单'
                this.visible = true
            },

        },
}

</script>

<style>

</style>
