<template>
    <div>
        <el-row>
            <el-col :span="24" class="toolbar">
                <el-form  :inline="true" class="demo-form-inline" :model="select">
                    <el-form-item>
                        <el-input v-model="role.nameZH" placeholder="角色名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                        <el-button type="primary" @click="onAdd">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="角色名称" prop="nameZH"></el-table-column>
            <el-table-column label="角色代码" prop="name"></el-table-column>
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
             <el-table-column label="操作">
                <template slot-scope="scope">
                <el-button @click="allocation(scope.row)" type="danger" icon="el-icon-edit">配置</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div>
           <pageNation :total="page_total" @pageChange="pageChange"></pageNation>
        </div>
        <RoleFrom :visible.sync="visible" @success="refresh" :title="title" :formData="formData"></RoleFrom>
        <RoleResource :drawer.sync="drawer" @success="refresh" :restitle="restitle" :formData="formData"></RoleResource>
    </div>
</template>
<script>
import RoleFrom from './role-from.vue'
import RoleResource from './role-resource.vue'
import pageNation from '../../components/module/pageNation.vue'

export default {
    data(){
        return{
            tableData: [],
            role: {
                id: '',
                name: '',
                nameZH: ''
            },
            page_index: 1, // 页数
            page_total: 1, // 总页数
            page_size: 5,
            title: '',
            restitle: '',
            visible: false,
            drawer: false,
            formData:{
                id: '',
                name: '',
                nameZH: '',
            },
        }
    },

    components:{
        RoleFrom,
        RoleResource,
        pageNation
    },

    mounted(){
        this.load();
    },

    methods:{

        //查询所有
        load(){
            this.getRequest("/api/role?nameZH="+this.role.nameZH+"&page="+this.page_index+"&size="+this.page_size).then(resp=>{
                 this.tableData = resp.data.list;
                 this.page_total = resp.data.total;
            })
        },

        //子组件点击取消键
        refresh(val){
            this.visible = val;
            this.drawer = val;
            this.load();
        },
        //查询单个
        onSubmit(){
            this.load();
        },
        //删除角色
        remove (id) {
            this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                this.deleteRequest("api/role?id="+id)
                })
            },

        //新增角色
        onAdd(){
            this.title = '新增角色';
            this.visible = true;
        },
        //修改角色
        openModfiyDialog(role){
            this.formData = role
            this.title = '修改角色'
            this.visible = true
        },
        //分页
        pageChange (item) {
	      console.log(item)
	      this.page_index = item.page_index;
	      this.page_size = item.page_limit;
	      this.load() //改变页码，重新渲染页面
        },

        //资源配置
        allocation(role){
            this.$store.commit('flushMids',role.mids);
            this.formData = role
            this.restitle = "角色授权";
            this.drawer = true;
        }

        }

}
</script>