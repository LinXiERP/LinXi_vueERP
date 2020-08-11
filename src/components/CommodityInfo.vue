<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="grid-content bg-purple" style="font-size:40px;">商品质检单</div>
    </el-col>
    <el-col :span="18">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="采购单编号">
          <el-input v-model="formInline.user" placeholder="采购单编号" id="salesid"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSelect" icon="el-icon-search">查询</el-button>
        </el-form-item>

        <el-form-item label="质检单编号">
          <el-select v-model="formInline.region" placeholder="质检单编号" @change="getorderId">
            <el-option v-for="item in allQcId" :key="item.name" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSelectALL" icon="el-icon-refresh">刷新</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :header-cell-style="thStyleFun"
      :cell-style="cellStyleFun"
    >
      <el-table-column prop="orderId" label="采购编号"></el-table-column>
      <!-- <el-table-column prop="commodityName" label="商品名称"></el-table-column> -->
      <el-table-column prop="no" label="质检编号"></el-table-column>
      <el-table-column prop="qmDate" label="质检日期"></el-table-column>
      <el-table-column prop="handleName" label="经手人"></el-table-column>
      <el-table-column prop="result" label="质检结果" :formatter="formatterColumnstate"></el-table-column>
    </el-table>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      allQcId: [],
      formInline: {
        user: "",
        region: "",
        state: "",
      },
      tableData: [
        // {
        //   no: "20160502",
        //   commodityName: "手机",
        //   orderId: "20160502",
        //   qmDate: "2020-08-08",
        //   handleName: "小夏",
        //   result: "1",
        // },
        // {
        //   no: "20160502",
        //   commodityName: "手机",
        //   orderId: "20160502",
        //   qmDate: "2020-08-08",
        //   handleName: "小夏",
        //   result: "1",
        // },
        // {
        //   no: "20160502",
        //   commodityName: "手机",
        //   orderId: "20160502",
        //   qmDate: "2020-08-08",
        //   handleName: "小夏",
        //   result: "1",
        // },
        // {
        //   no: "20160502",
        //   commodityName: "手机",
        //   orderId: "20160502",
        //   qmDate: "2020-08-08",
        //   handleName: "小夏",
        //   result: "1",
        // },
      ],
    };
  },
  created() {
    this.SelectAllQualityproducts(); //默认进来就加载所有质检的商品
    this.SelectAllQCID(); //默认进来就加载所有的质检单编号
  },
  methods: {
    SelectAllQualityproducts() {
      //默认进来就加载所有质检的商品
      var that = this;
      this.$axios
        .get("/QualityManagement/GetQC")
        .then(function (response) {
          console.log(response.data);
          that.tableData = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    SelectAllQCID() {
      //默认进来就加载所有的质检单编号
      var that = this;
      this.$axios
        .get("/QualityManagement/GetALLQCID")
        .then(function (response) {
          console.log(response.data);
          that.allQcId = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    onSubmit() {
      this.$message.error("还未完成!");
    }, //采购单编号查询
    onSelect() {
      var that = this;
      var saleid = $("#salesid").val();
      if (saleid == "") {
        this.$message.error("请输入采购单编号!");
      } else {
        this.$axios
          .get("/QualityManagement/GetPOIDTwo", {
            params: {
              id: saleid,
            },
          })
          .then(function (response) {
            console.log(response.data);
            that.tableData = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }, //质检单编号查询信息
    getorderId(value) {
      var that = this;
      this.$axios
        .get("/QualityManagement/GetQCID", {
          params: {
            id: value,
          },
        })
        .then(function (response) {
          that.tableData = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }, //状态转换
    formatterColumnstate(row, column) {
      switch (row.result) {
        case "1":
          return "合格";
          break;
        case "2":
          return "不合格";
          break;
        default:
          return "未知";
      }
    },
    thStyleFun() {
      return "text-align:center";
    },
    cellStyleFun() {
      return "text-align:center";
    }, //刷新
    onSelectALL() {
      var that = this;
      this.$axios
        .get("/QualityManagement/GetQC")
        .then(function (response) {
          console.log(response.data);
          that.tableData = response.data;
          // that.tableData = [
          //   {
          //     no: "20160502",
          //     commodityName: "手机",
          //     orderId: "20160502",
          //     qmDate: "2020-08-08",
          //     handleName: "小夏",
          //     result: "合格",
          //   },
          //   {
          //     no: "20160502",
          //     commodityName: "手机",
          //     orderId: "20160502",
          //     qmDate: "2020-08-08",
          //     handleName: "小夏",
          //     result: "合格",
          //   },
          //   {
          //     no: "20160502",
          //     commodityName: "手机",
          //     orderId: "20160502",
          //     qmDate: "2020-08-08",
          //     handleName: "小夏",
          //     result: "合格",
          //   },
          //   {
          //     no: "20160502",
          //     commodityName: "手机",
          //     orderId: "20160502",
          //     qmDate: "2020-08-08",
          //     handleName: "小夏",
          //     result: "合格",
          //   },
          // ];
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>