<template>
    <div class="pagenation">
    <el-pagination 
        class="text-center"  
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange"
        :current-page="page.page" 
        :page-sizes="pageSizes" 
        :page-size="page.limit"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
   </div>
</template>
<script>
export default {
    data(){
        return{
             pageSizes: [1, 5, 10, 15],
              page: {
                page_index: 1,
                page_limit: 5
            }
        }
    },

    props:{
        total:{
            type:Number
        }
    },

    methods: {
    // 每页查看条数变化
    handleSizeChange(val) {
      this.page.page_limit= val;
      this.$emit('pageChange', this.page);
    },
    // 当前页码变化
    handleCurrentChange(val) {
      this.page.page_index= val;
      this.$emit('pageChange', this.page);
    }
  },
}
</script>

<style>
    .pagenation{
        position:fixed;
        bottom:20px;
        margin: 20px 0;
    }
</style>