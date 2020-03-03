<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
        <el-tree
          highlight-current
          :props="defaultProps"
          :load="loadNodes"
          :expand-on-click-node="false"
          lazy>
          <span slot-scope="{ node, data }">
            <span @click="search(data)">{{ node.label }}</span>
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
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <UserList :orgId="checkId"/>>
        </div>
      </el-col>
    </el-row>
    <OrgForm :visible.sync="visible"
             @success="loadTree"
             :title="title"
             :editData="editData"
             :orgData.sync="orgData">
    </OrgForm>
  </div>
</template>

<script>
import OrgApi from '../../api/org'
import OrgForm from './org-form'
import UserList from '../org/user-list'

export default {
  components: {
    OrgForm,
    UserList
  },
  data () {
    return {
      defaultProps: {
        label: 'orgName',
        children: 'childList',
        orgId: 'orgId'
      },
      title: '',
      visible: false,
      checkId: null,
      orgData: [],
      editData: {
        orgId: null,
        orgName: null,
        orgLoc: null,
        pId: null
      }
    }
  },
  methods: {
    // 查询
    async search (data) {
      this.checkId = data.orgId
    },
    // 加载节点
    async loadNodes (node, resolve) {
      this.node = node
      if (node.level === 0) {
        let resp = await OrgApi.queryOrgs('')
        return resolve(resp)
      }
      if (node.level > 0) {
        let resp = await OrgApi.queryOrgs(node.data.orgId)
        return resolve(resp)
      }
    },
    // 新增组织信息
    async addTree (data) {
      this.title = '新增部门'
      this.editData = data
      this.visible = true
    },
    // 修改部门
    async updateTree (data) {
      this.title = '修改部门'
      this.editData = data
      this.visible = true
    },
    // 删除部门
    async removeTree (data) {
      this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await OrgApi.delete(data.orgId)
        this.$message({
          message: '删除成功!',
          type: 'success'
        })
        this.loadTree()
      }).catch(() => {
      })
    },

    // 加载
    loadTree () {
      this.$router.push({
        name: '部门管理',
        query: {
          _t: Date.now()
        }
      })
    }
  }
}

</script>

<style>
.tableTitle {
    position: relative;
    margin: 0 auto;
    width: 600px;
    height: 1px;
    background-color: #d4d4d4;
    text-align: center;
    font-size: 16px;
    color: rgba(101, 101, 101, 1);
  }
</style>
