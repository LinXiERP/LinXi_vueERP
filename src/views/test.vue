<template>
  <div class="home">
    <div class="block">
      <span class="demonstration">直接前往</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="size"
        layout="prev, pager, next, jumper"
        :total="count"
      >
      </el-pagination>
      <div class="list-group">
        <button
          type="button"
          class="list-group-item list-group-item-action active"
          @click="totalchanges"
        >Active item</button>
        <button
          type="button"
          class="list-group-item list-group-item-action"
        >Item</button>
        <button
          type="button"
          class="list-group-item list-group-item-action disabled"
        >Disabled item</button>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "Home",
  components: {},
  methods: {
    async loadinfo() {
      const { data: res } = await this.$axios.get(
        "/PurchasingManagement/PurchaseInfo"
      );
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    totalchanges() {
      this.count = 200;
    },
  },
  data() {
    return {
      currentPage3: 1,
      size: 15,
      count: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
