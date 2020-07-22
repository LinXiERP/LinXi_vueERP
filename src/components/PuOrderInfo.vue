<template>
  <div id="CommodityInventory">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">待入库采购单</div>
      </el-col>
      <el-col :span="12">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="供应商/商品名称">
            <el-input v-model="formInline.user" placeholder="供应商/商品名称"></el-input>
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

      <el-col :span="3">
        <span class="grid-content bg-purple btn btn-primary">刷新</span>
      </el-col>

      <el-table
        :data="CommmodityList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="z" label="编号" width="80" type="selection"></el-table-column>
        <el-table-column prop="date" label="编号" width="180"></el-table-column>
        <el-table-column prop="date" label="采购单编号" width="180"></el-table-column>

        <el-table-column prop="name" label="商品名称" width="180"></el-table-column>
        <el-table-column prop="price" label="采购数量"></el-table-column>
        <el-table-column prop="stock" label="采购日期"></el-table-column>
        <el-table-column prop="address" label="状态"></el-table-column>
        <el-table-column prop="address" label="入库"></el-table-column>
      </el-table>

      <el-row style="text-align:center;">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="totalNum"
          ></el-pagination>
        </div>
      </el-row>
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
      CommmodityList: [
        // {
        //   id: "",
        //   category_id: "",
        //   supplier_id: "",
        //   name: "",
        //   price: "",
        //   stock: "",
        //   place: "",
        //   spec: "",
        //   license_no: "",
        //   operator_id: ""
        // }

        
      ],
      multipleSelection: [],

      activeName: "first",
      select: "",
      CustomerItem: {},
      currentPage: 1, //默认显示第一页
      pageSize: 8, //默认每页显示8条
      totalNum: 0, //总页数
      SearchCustomer: {
        name: "",
        select: "1"
      }
    };
  },
  
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    
    //多选
    handleSelectionChange(val) {
      val.forEach(element => {
        this.multipleSelection.push(element.date);
      });
      console.log(this.multipleSelection);
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    ToEditCustomer(index, row) {
      this.CustomerItem = this.CustomerList[index + (this.currentPage - 1) * 8];
      this.activeName = "second";
    }
  },

  mounted() {
   
  }
};
</script>


