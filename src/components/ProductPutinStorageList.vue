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
  <div id="ProductPutinStorage">
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
              label="产品类型"
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
            @click="CheckSelectProductPutIn"
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
        label="任务编号"
        width="270"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="产品名称"
        width="270"
      ></el-table-column>
      <el-table-column
        prop="nums"
        label="生产数量"
        width="270"
      ></el-table-column>
      <el-table-column
        prop="productDate"
        label="生产日期"
        width="270"
      ></el-table-column>
      <el-table-column
        prop="statusName"
        label="状态"
        width="270"
      ></el-table-column>
      <el-table-column
        label="操作"
        width="270"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="TodetailProducttask(scope.$index, scope.row)"
          >入库</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="产品入库"
      :visible.sync="dialogTableVisible"
      style="text-align:center"
    >
      <el-form :model="productrecord">
        <el-row>
          <el-col :span="10">
            <el-form-item
              label="入库编号"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="productrecord.productrecordID"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="入库日期"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="productrecord.operateTime"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item
              label="产品类型"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="productrecord.category"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="生产编号"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="productrecord.no"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item
              label="产品编号"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="productrecord.productId"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="产品名称"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="productrecord.name"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item
              label="产品类别"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="productrecord.category"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="规格"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="productrecord.spec"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item
              label="生产地"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="productrecord.address"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="单价"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="productrecord.price"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item
              label="库存数量"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="productrecord.stock"
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
                v-model="productrecord.nums"
                autocomplete="off"
                disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button
            type="primary"
            @click="ProductPutInStorage"
          >确认入库</el-button>
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
      formLabelWidth: "100px",
      productrecord: {},
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
    this.SelectAllProducttask(); //默认进来就加载所有的产品
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    TodetailProducttask(index, row) {
      var t = this;
      this.productrecord = this.tableData[index + (this.currentPage - 1) * 8];
      this.dialogTableVisible = true;
    },
    //一进来查询所有数据
    SelectAllProducttask() {
      var t = this;
      var i = 0;
      this.$axios
        .get("ProductInventoryInfo/GetAllProductPutinStorage")
        .then(function (response) {
          t.totalNum = response.data.length; //多少页数据
          t.tableData = response.data; //将客户集合给前端
          t.tableData.forEach((element) => {
            element.productDate = element.productDate.substring(0, 10);
            element.operateTime = element.operateTime.substring(0, 10);
          });
          t.loading = false; //表格加载完成
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    CheckSelectProductPutIn() {
      var t = this;
      this.$axios
        .get(
          "ProductInventoryInfo/CkeckSelectProducTasktinfo?name=" +
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
    ProductPutInStorage() {
      var t = this;
      this.$axios
        .put("ProductInventoryInfo/ProductPutInStorage", t.productrecord)
        .then(function (response) {
          console.log(response.data.code == 400);
          if (response.data.code == 400) {
            t.$message.success("入库成功！");
            t.CustomerItem = {};
            this.SelectAllProducttask();
          } else {
            t.$message.warn("入库失败！");
            t.dialogTableVisible = true;
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
