<template>
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
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </el-row>
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
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
