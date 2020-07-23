<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="grid-content bg-purple" style="font-size:40px;">销售单管理</div>
    </el-col>
    <el-col :span="18">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="销售单编号">
          <el-input v-model="formInline.user" placeholder="销售单编号" id="salesid"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSelect" icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item label="产品">
          <el-select v-model="formInline.region" placeholder="产品">
            <el-option label="所有产品" value="0"></el-option>
            <el-option label="所有产品" value="1"></el-option>
            <el-option label="所有产品" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.state" placeholder="状态"  @change="getstate">
            <el-option label="待提货" value="0"></el-option>
            <el-option label="待结款" value="1"></el-option>
            <el-option label="已结款" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSelect" icon="el-icon-circle-plus-outline">添加</el-button>
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
      <el-table-column prop="no" label="销售单编号"></el-table-column>
      <el-table-column prop="product_id" label="产品名称"></el-table-column>
      <el-table-column prop="customer_id" label="客户名称"></el-table-column>
      <el-table-column prop="nums" label="销售数量"></el-table-column>
      <el-table-column prop="sale_date" label="销售日期"></el-table-column>
      <el-table-column
        prop="order_status"
        label="销售状态"
        :formatter="formatterColumnstate"
        v-model="order_status"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.order_status==0"
            type="primary"
            @click="onSubmit"
            icon="el-icon-edit"
          >编辑</el-button>
          <el-button
            v-else-if="scope.row.order_status==1"
            type="primary"
            @click="onSubmit"
            icon="el-icon-edit"
          >结款</el-button>
          <el-button v-else-if="scope.row.order_status==2" type="success" icon="el-icon-edit">完成</el-button>
          <el-button v-else type="success" style @click="onSubmit" icon="el-icon-circle-check">未知</el-button>
          <el-button type="danger" style @click="onSubmit" icon="el-icon-delete">删除</el-button>
        </template>
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
        region: "",
        state: ""
      },
      tableData: [
        {
          no: "20160502",
          product_id: "手机",
          customer_id: 1,
          nums: 10,
          sale_date: "2020-08-08",
          order_status: 0
        },
        {
          no: "20160502",
          product_id: "手机",
          customer_id: 1,
          nums: 10,
          sale_date: "2020-08-08",
          order_status: 1
        },
        {
          no: "20160502",
          product_id: "手机",
          customer_id: 1,
          nums: 10,
          sale_date: "2020-08-08",
          order_status: 1
        },
        {
          no: "20160502",
          product_id: "手机",
          customer_id: 1,
          nums: 10,
          sale_date: "2020-08-08",
          order_status: 2
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      this.$message.error("还未完成!");
    }, //销售单号查询
    onSelect() {
      var that = this;
      var saleid = $("#salesid").val();
      if (saleid == "") {
        this.$message.error("请输入销售单号!");
      } else {
        this.$axios
          .get("/SaleManagement/GetSSOID", {
            params: {
              id: saleid
            }
          })
          .then(function(response) {
            that.tableData = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }, //状态转换
    formatterColumnstate(row, column) {
      switch (row.order_status) {
        case 0:
          return "待取货";
          break;
        case 1:
          return "待结款";
          break;
        case 2:
          return "已结款";
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
        .get("/SaleManagement/GetSSO")
        .then(function(response) {
          //that.tableData=response.data;
          that.tableData = [
            {
              no: "20160502",
              product_id: "手机",
              customer_id: 1,
              nums: 10,
              sale_date: "2020-08-08",
              order_status: 0
            },
            {
              no: "20160502",
              product_id: "手机",
              customer_id: 1,
              nums: 10,
              sale_date: "2020-08-08",
              order_status: 1
            },
            {
              no: "20160502",
              product_id: "手机",
              customer_id: 1,
              nums: 10,
              sale_date: "2020-08-08",
              order_status: 1
            },
            {
              no: "20160502",
              product_id: "手机",
              customer_id: 1,
              nums: 10,
              sale_date: "2020-08-08",
              order_status: 2
            }
          ];
        })
        .catch(function(error) {
          console.log(error);
        });
    }, //状态得到信息
    getstate(value) {
      var that=this;
      this.$axios
        .get("/SaleManagement/GetSSOState", {
          params: {
            id: value
          }
        })
        .then(function(response) {
          that.tableData = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
