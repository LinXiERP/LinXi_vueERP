<template>
  <div>
    <!-- 分页 -->
    <el-row style="text-align:center;float:right;margin-right:6%;margin-top:3%">
      <div class="block">
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="totalNum"
        ></el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1, //默认显示第一页
      pageSize: 15, //默认每页显示15条
      totalNum: 0, //总页数
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
