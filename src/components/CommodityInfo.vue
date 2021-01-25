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
<<<<<<< HEAD
          <!-- <el-button type="primary" @click="onSelectALL" icon="el-icon-refresh">刷新</el-button> -->
=======
          <el-button type="primary" @click="onSelectALL" icon="el-icon-refresh">刷新</el-button>
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
        </el-form-item>
      </el-form>
    </el-col>

    <el-table
      :data="tableData"
<<<<<<< HEAD
      v-loading = "loading"
      border
      height="800"
=======
      border
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
      style="width: 100%"
      :header-cell-style="thStyleFun"
      :cell-style="cellStyleFun"
    >
      <el-table-column prop="orderId" label="采购编号"></el-table-column>
      <!-- <el-table-column prop="commodityName" label="商品名称"></el-table-column> -->
      <el-table-column prop="no" label="质检编号"></el-table-column>
<<<<<<< HEAD
      <el-table-column prop="qmDate" label="质检日期" :formatter="formatDate"></el-table-column>
      <el-table-column prop="handleName" label="经手人"></el-table-column>
      <el-table-column prop="result" label="质检结果" :formatter="formatterColumnstate"></el-table-column>
    </el-table>
    <el-row style="text-align:center;float:right;margin-right:6%;margin-top:3%">
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
=======
      <el-table-column prop="qmDate" label="质检日期"></el-table-column>
      <el-table-column prop="handleName" label="经手人"></el-table-column>
      <el-table-column prop="result" label="质检结果" :formatter="formatterColumnstate"></el-table-column>
    </el-table>
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
  </el-row>
</template>

<script>
export default {
  data() {
    return {
<<<<<<< HEAD
      currentPage: 1, //默认显示第一页
      pageSize: 10, //默认每页显示15条
      totalNum: 0, //总数量
      loading:false,
=======
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
      allQcId: [],
      formInline: {
        user: "",
        region: "",
        state: "",
      },
<<<<<<< HEAD
      tableData: [],
=======
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
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
    };
  },
  created() {
    this.SelectAllQualityproducts(); //默认进来就加载所有质检的商品
    this.SelectAllQCID(); //默认进来就加载所有的质检单编号
  },
  methods: {
<<<<<<< HEAD
    //默认进来就加载所有质检的商品
    SelectAllQualityproducts() {
      this.loading=true;         
      var that = this;
      this.$axios
        .get("/QualityManagement/GetQC?pageIndex=1")
        .then(function (response) {
          console.log(response.data);
          that.tableData = response.data.entity;
          that.loading=false;
          that.totalNum=Number(response.data.msg);
=======
    SelectAllQualityproducts() {
      //默认进来就加载所有质检的商品
      var that = this;
      this.$axios
        .get("/QualityManagement/GetQC")
        .then(function (response) {
          console.log(response.data);
          that.tableData = response.data;
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
        })
        .catch(function (error) {
          console.log(error);
        });
<<<<<<< HEAD
    }, //默认进来就加载所有的质检单编号
    SelectAllQCID() {    
=======
    },
    SelectAllQCID() {
      //默认进来就加载所有的质检单编号
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
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
<<<<<<< HEAD
    },//时间转换
    formatDate(row, column) {
      var currdate = new Date(row.qmDate);
      var year = currdate.getFullYear();
      var month = currdate.getMonth() + 1;
      return year + "年" + month + "月";
=======
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
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
<<<<<<< HEAD
          
=======
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
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
        })
        .catch(function (error) {
          console.log(error);
        });
    },
<<<<<<< HEAD
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      var that = this;
      this.$axios
        .get(
          `/QualityManagement/GetQC?pageIndex=${val}`
        )
        .then((res) => {
          // if (res.data.entity.length != 0) {
          //   res.data.entity.forEach((element) => {
          //     element.purchaseDate = element.purchaseDate.substring(0, 10);
          //   });
          // }
          that.tableData = res.data.entity;
          that.totalNum = Number(res.data.msg);
        });
    },
=======
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
  },
};
</script>