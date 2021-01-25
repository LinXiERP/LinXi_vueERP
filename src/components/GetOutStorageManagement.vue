<style>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
<template>
  <div id="GetOutStoragementInfo">
    <el-row :gutter="10">
      <el-col
        :xs="8"
        :sm="6"
        :md="4"
        :lg="3"
        :xl="1"
      >
        <div class="grid-content bg-purple">
          <el-select
            v-model="query.select"
            placeholder="请选择"
            style="width:150px;"
            slot="prepend"
          >
            <el-option
              label="出库单编号"
              value="1"
            ></el-option>
            <el-option
              label="产品订单编号"
              value="2"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col
        :xs="8"
        :sm="12"
        :md="16"
        :lg="18"
        :xl="22"
      >
        <div class="grid-content bg-purple-light">
          <el-input
            placeholder="请输入内容"
            v-model="query.name"
            class="input-with-select"
          ></el-input>
        </div>
      </el-col>
      <el-col
        :xs="8"
        :sm="6"
        :md="4"
        :lg="3"
        :xl="1"
      >
        <div class="grid-content bg-purple-light">
          <el-button
            icon="el-icon-search"
            style="width:150px;"
            @click="CheckSelectGetOutInfo"
          ></el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="出库编号"
        width="220"
      ></el-table-column>
      <el-table-column
        prop="productName"
        label="产品名称"
        width="220"
      ></el-table-column>
      <el-table-column
        prop="nums"
        label="出库数量"
        width="220"
      ></el-table-column>
      <el-table-column
        prop="operateTime"
        label="出库日期"
        width="220"
      ></el-table-column>
      <el-table-column
        prop="staffName"
        label="经手人"
        width="220"
      ></el-table-column>
      <el-table-column
        prop="sourceNo"
        label="订单编号"
        width="220"
      ></el-table-column>
      <el-table-column
        label="操作"
        width="220"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="TodetailProductPutInInfo(scope.$index, scope.row)"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="出库单详情"
      :visible.sync="dialogTableVisible"
      style="text-align:center"
    >
      <el-form :model="product">
        <el-row>
          <el-col :span="10">
            <el-form-item
              label="出库单编号"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="product.id"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="订单编号"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="product.sourceNo"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item
              label="出库日期"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="product.operateTime"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="出库数量"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="product.nums"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item
              label="产品名称"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="product.productName"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="经手人"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="product.staffName"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item
              label="操作员"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="product.operatorName"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="批次号"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="product.batch"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="出库原因"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="product.categoryName"
            autocomplete="off"
            disabled="disabled"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      query: {
        //查询条件
        name: "",
        select: "1",
      },
      formLabelWidth: "120px",
      dialogTableVisible: false, //弹框
      loading: true, //表格加载
      product: {}, //单条数据
      currentPage: 1, //默认显示第一页
      pageSize: 8, //默认每页显示8条
      totalNum: 0, //总页数
      tableData: [], //从数据库读取的数据
    };
  },
  mounted() {
    this.SelectAllGetOut(); //默认进来就加载所有的产品
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    TodetailProductPutInInfo(index, row) {
      this.product = this.tableData[index + (this.currentPage - 1) * 8];
      this.dialogTableVisible = true;
    },
    //一进来查询所有数据
    SelectAllGetOut() {
      var t = this;
      this.$axios
        .get("ProductInventoryInfo/GetSlectAllGetOutInfo")
        .then(function (response) {
          t.totalNum = response.data.length; //多少页数据
          t.tableData = response.data; //将客户集合给前端
          t.tableData.forEach((element) => {
            element.operateTime = element.operateTime.substring(0, 10);
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //模糊查询
    CheckSelectGetOutInfo() {
      var t = this;
      this.$axios
        .get(
          "ProductInventoryInfo/CheckSelectGetOutInfo?name=" +
            t.query.name +
            "&select=" +
            t.query.select
        )
        .then(function (response) {
          t.tableData = response.data;
          t.$message.success("查询成功");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
