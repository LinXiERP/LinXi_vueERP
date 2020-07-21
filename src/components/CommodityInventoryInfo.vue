<template>
  <div id="CommodityInventory">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">商品库存管理</div>
      </el-col>
      <el-col :span="12">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="商品名称">
            <el-input v-model="formInline.user" placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品类别">
            <el-select v-model="formInline.region" placeholder="商品类别">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="6">
        <span class="grid-content bg-purple">删除</span>

        <span class="grid-content bg-purple">刷新</span>
      </el-col>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="编号" width="180"></el-table-column>
        <el-table-column prop="name" label="商品名称" width="180"></el-table-column>
        <el-table-column prop="price" label="商品单价"></el-table-column>
        <el-table-column prop="stock" label="库存数量"></el-table-column>
        <el-table-column prop="address" label="单位"></el-table-column>
        <el-table-column prop="address" label="供应商"></el-table-column>
        <el-table-column prop="address" label="类别"></el-table-column>
        <el-table-column prop="address" label="详细">
          <a href>查看</a>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          id: "",
          category_id: "",
          supplier_id: "",
          name: "",
          price: "",
          stock: "",
          place: "",
          spec: "",
          license_no: "",
          operator_id: ""
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    ProductInfo() {
      this.$axios
        .get(`http://localhost:56567/api/CommodityInventory/GetPrProductInfo`)
        .then(res => {
          this.tableData = res.data;
          console.log(res.data);
        });
    }
  },
  mounted() {
    this.ProductInfo();
  }
};
</script>
