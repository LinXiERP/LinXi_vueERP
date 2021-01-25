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
  <div id="GetOutStorage">
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
              label="产品订单编号"
              value="1"
            ></el-option>
            <el-option
              label="产品名称"
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
            @click="CheckSelectGetOut"
          ></el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column
        prop="no"
        label="产品订单编号"
        width="250"
      ></el-table-column>
      <el-table-column
        prop="productName"
        label="产品名称"
        width="250"
      ></el-table-column>
      <el-table-column
        prop="nums"
        label="领取数量"
        width="250"
      ></el-table-column>
      <el-table-column
        prop="deliveryDate"
        label="领取日期"
        width="250"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="250"
      ></el-table-column>
      <el-table-column
        label="操作"
        width="250"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="TodetailProductRecord(scope.$index, scope.row)"
          >出库</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="产品出库"
      :visible.sync="dialogTableVisible"
      style="text-align:center"
    >
      <el-form :model="SlOrder">
        <el-row>
          <el-col :span="10">
            <el-form-item
              label="产品编号"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="SlOrder.productId"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="出库编号"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="SlOrder.id"
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
                v-model="SlOrder.deliveryDate"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="入库数量"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="SlOrder.nums"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item
              label="订单编号"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="SlOrder.id"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="产品库存"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="SlOrder.stock"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item
              label="产品单价"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="SlOrder.spec"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="单位"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="SlOrder.unit"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item
              label="经手人"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="SlOrder.handleName"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="部门编号"
              :label-width="formLabelWidth"
            >
              <el-select
                v-model="DepartmentID"
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in Department"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="备注"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="SlOrder.remark"
            autocomplete="off"
            disabled="disabled"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="ProductGetOutStorage"
          >确认出库</el-button>
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
      dialogTableVisible: false,
      query: {
        //查询条件
        name: "",
        select: "1",
      },
      value: "",
      formLabelWidth: "100px",
      SlOrder: {},
      Department: {},
      DepartmentID: 1,
      loading: true,
      currentPage: 1, //默认显示第一页
      pageSize: 8, //默认每页显示8条
      totalNum: 0, //总页数
      tableData: [
        //从数据库读取的数据
      ],
    };
  },
  created() {
    this.SelectAllProductRecord(); //默认进来就加载所有的产品
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    TodetailProductRecord(index, row) {
      var t = this;
      var i = 0;
      this.SlOrder = this.tableData[index + (this.currentPage - 1) * 8];
      this.$axios
        .get("ProductInventoryInfo/getAcDepartment")
        .then(function (response) {
          response.data.forEach((element) => {
            t.Department[i] = element.id;
            i++;
          });
          console.log(t.Department);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.dialogTableVisible = true;
    },
    //一进来查询所有数据
    SelectAllProductRecord() {
      var t = this;
      this.$axios
        .get("ProductInventoryInfo/SelectAllGetOut")
        .then(function (response) {
          t.totalNum = response.data.length; //多少页数据
          t.tableData = response.data; //将客户集合给前端
          t.tableData.forEach((element) => {
            element.deliveryDate = element.deliveryDate.substring(0, 10);
          });
          t.loading = false; //表格加载完成
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //模糊查询
    CheckSelectGetOut() {
      var t = this;
      this.$axios
        .get(
          "ProductInventoryInfo/CheckSelectGetOut?name=" +
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
    //出库
    ProductGetOutStorage() {
      var t = this;
      this.$axios
        .put(
          `ProductInventoryInfo/ProductGetOutStorage?ID=${t.DepartmentID}`,
          t.SlOrder
        )
        .then(function (response) {
          console.log(response.data.code == 400);
          if (response.data.code == 400) {
            t.$message.success("出库成功！");
            t.CustomerItem = {};
            this.SelectAllProductRecord();
          } else {
            t.$message.warn("出库失败！");
            t.CustomerItem = {};
          }
          this.dialogTableVisible = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
