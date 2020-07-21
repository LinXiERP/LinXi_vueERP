<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="grid-content bg-purple" style="font-size:40px;">销售单管理</div>
    </el-col>
    <el-col :span="18">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="销售单编号">
          <el-input v-model="formInline.user" placeholder="销售单编号"></el-input>
        </el-form-item>
        <el-form-item label="产品">
          <el-select v-model="formInline.region" placeholder="产品">
            <el-option label="所有产品" value="shanghai"></el-option>
            <el-option label="所有产品" value="beijing"></el-option>
            <el-option label="所有产品" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region" placeholder="状态">
            <el-option label="待提货" value="shanghai"></el-option>
            <el-option label="待结款" value="beijing"></el-option>
            <el-option label="已结款" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!-- <el-col :span="6">
      <span class="grid-content bg-purple">刷新</span>
    </el-col> -->

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="销售单编号" width="500"></el-table-column>
      <el-table-column prop="name" label="产品名称" width="500"></el-table-column>
      <el-table-column prop="address" label="销售数量" width="500"></el-table-column>
      <el-table-column>
              <el-button type="primary" style="" @click="onSubmit">编辑</el-button>
              <el-button type="primary" style="" @click="onSubmit">删除</el-button>
      </el-table-column>
      
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
          date: "20160502",
          name: "手机",
          address: "10"
        },
        {
          date: "20160504",
          name: "电脑",
          address: "20"
        },
        {
          date: "20160501",
          name: "平板",
          address: "30"
        },
        {
          date: "20160503",
          name: "显示器",
          address: "40"
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      this.$message.error("还未完成!");
    }
  }
};
</script>
