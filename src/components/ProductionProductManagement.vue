<template>
  <el-row :gutter="20">
    <!-- <el-col :span="6">
      <div class="grid-content bg-purple" style="font-size:40px;">生产计划管理</div>
    </el-col>-->
    <el-col :span="24">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="生产单编号">
          <el-input
            onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
            placeholder="生产单编号"
            v-model="formInline.id"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品名称">
          <el-select v-model="formInline.productid" placeholder="选择产品名称">
            <el-option label="所有产品" value></el-option>
            <el-option
              v-for="(item,index) in products"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="选择状态">
            <el-option label="所有" value></el-option>
            <el-option label="待领料" value="0"></el-option>
            <el-option label="待生产" value="1"></el-option>
            <el-option label="待送检" value="4"></el-option>
            <el-option label="待入库" value="2"></el-option>
            <el-option label="不合格" value="-1"></el-option>
            <el-option label="已入库" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSelect" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table
      :data="tableData"
      border
      v-loading="loading"
      style="width: 100%"
      :header-cell-style="thStyleFun"
      :cell-style="cellStyleFun"
    >
      <el-table-column width="130%" prop="id" label="计划编号"></el-table-column>
      <el-table-column width="150%" prop="productName" label="产品名称"></el-table-column>
      <el-table-column width="130%" prop="nums" label="生产数量"></el-table-column>
      <el-table-column prop="productDate" label="生产时间" :formatter="formatDate"></el-table-column>
      <el-table-column prop="no" label="订单编号" :formatter="formatterColumnstate"></el-table-column>
      <el-table-column prop="status" label="状态" :formatter="formatterStutaColumnstate"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="Editformsubmit(scope.row.id)"
            v-if="scope.row.status==1"
            icon="el-icon-edit"
          >生产完成</el-button>
          <el-button type="primary" v-else disabled icon="el-icon-edit">生产完成</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      loading: false,
      //查询内容
      formInline: {
        id: "",
        productid: "",
        status: "",
      },
      tableData: [],
      formLabelWidth: "80px",
    };
  },
  mounted() {
    this.loading = true;
    var that = this;
    this.$axios
      .get("/ProductionManagement/GetPPTs")
      .then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
          that.tableData.push(response.data[i]);
        }
        that.loading = false;
      })
      .catch(function (error) {
        console.log(error);
      });
    this.$axios
      .get("/ProductionManagement/GetPPs")
      .then(function (response) {
        that.products = [];
        for (var i = 0; i < response.data.length; i++) {
          that.products.push(response.data[i]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    //提交修改
    Editformsubmit(planid) {
      var that = this;
      this.$confirm("是否确认生产完成？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .get("/ProductionManagement/EditStatuPPT", {
          params: {
            taskid: planid,
          },
        })
            .then(function (response) {
              if (response.data > 0) {
                that.selecttablelist();
                that.$message.success("修改成功！");
              } else {
                that.$message.error("修改失败！");
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(() => {
          that.$message.error("已取消操作！");
        });
    },
    selecttablelist() {
      var that = this;
      this.$axios
        .get("/ProductionManagement/GetPPTs")
        .then(function (response) {
          that.tableData = [];
          for (var i = 0; i < response.data.length; i++) {
            that.tableData.push(response.data[i]);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //生产单号查询
    onSelect() {
      var that = this;
      this.$axios
        .get("/ProductionManagement/GetPPPT", {
          params: {
            id: that.formInline.id,
            productid: that.formInline.productid,
            status: that.formInline.status,
          },
        })
        .then(function (response) {
          that.tableData = [];
          for (var i = 0; i < response.data.length; i++) {
            that.tableData.push(response.data[i]);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    formatterColumnstate(row, column) {
      if (row.no != "") {
        return row.no;
      } else {
        return "订单外";
      }
    },
    formatterStutaColumnstate(row, column) {
      var stasus = row.status;
      if (stasus == 0) {
        return "待领料";
      } else if (stasus == 1) {
        return "待生产";
      } else if (stasus == 4) {
        return "待送检";
      } else if (stasus == -1) {
        return "不合格";
      } else if (stasus == 2) {
        return "待入库";
      } else {
        return "已入库";
      }
    },
    formatDate(row, column) {
      var currdate = new Date(row.productDate);
      var year = currdate.getFullYear();
      var month = currdate.getMonth() + 1;
      return year + "年" + month + "月";
    },
    thStyleFun() {
      return "text-align:center";
    },
    cellStyleFun() {
      return "text-align:center";
    },
  },
};
</script>