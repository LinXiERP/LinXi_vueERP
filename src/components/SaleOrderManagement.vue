<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="grid-content bg-purple" style="font-size:40px;">销售单管理</div>
    </el-col>
    <el-col :span="18">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="销售单编号">
          <el-input v-model="formInline.id" placeholder="销售单编号" id="SaleID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSelect" icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item label="产品">
          <el-select v-model="formInline.chanpin" placeholder="产品">
            <el-option label="所有产品" value="1"></el-option>
            <el-option label="所有产品" value="2"></el-option>
            <el-option label="所有产品" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="formInline.zt" placeholder="状态" @change="selectState">
            <el-option label="待提货" value="1"></el-option>
            <el-option label="待结款" value="2"></el-option>
            <el-option label="已结款" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSelectALL" icon="el-icon-refresh">刷新</el-button>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="success" @click="addgsForm" icon="el-icon-edit">添加</el-button> -->
          <el-button type="primary" @click="dialogFormVisible = true,aa" icon="el-icon-circle-plus-outline">添加</el-button>

<el-dialog title="添加销售单" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="销售单号" :label-width="formLabelWidth">
      <el-input v-model="form.name" name="no" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="产品名字" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择产品">
        <!-- <el-option v-for="item in selectItem" :label="item.dict_desc" :value="item.dict_id" :key="item.dict_id"></el-option> -->
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
        </el-form-item>       
      </el-form>
    </el-col>

    <el-table :data="tableData" border style="width: 100%" :header-cell-style="thStyleFun" :cell-style="cellStyleFun">
      <el-table-column prop="no" label="销售单编号" ></el-table-column>
      <el-table-column prop="product_id" label="产品名称" ></el-table-column>
      <el-table-column prop="customer_id" label="客户名称"  ></el-table-column>
      <el-table-column prop="nums" label="销售数量" ></el-table-column>
      <el-table-column prop="sale_date" label="销售日期" ></el-table-column>
      <el-table-column prop="order_status" label="销售状态"  :formatter="formatterColumnState"></el-table-column>
      <el-table-column  label="操作">
        <!-- <el-button v-for="item in tableData"  :key="item.no" type="primary" @click="onSubmit" icon="el-icon-edit">编辑</el-button> -->
        <div >
          <el-button v-if="tableData[3].order_status==0" type="primary" @click="onSubmit" icon="el-icon-edit">编辑</el-button>
              <el-button v-else-if="tableData[3].order_status==1" type="primary" @click="onSubmit" icon="el-icon-edit">结款</el-button>
              <el-button v-else-if="tableData[3].order_status==2" type="success" @click="onSubmit" icon="el-icon-circle-check">结束</el-button>
              <el-button v-else="" type="danger" @click="onSubmit" icon="el-icon-circle-check">未知</el-button>
              <el-button type="danger" @click="onSubmit" icon="el-icon-delete">删除</el-button>
        </div>
              
      </el-table-column>     
    </el-table>
  </el-row>  
</template>

<script>
export default {
  data() {
    return {
      allusers:[],
      allstaff:[],
      allproducts:[],
      formInline: {
        id: "",
        chanpin: "",
        zt: ""
      },//销售状态转换
      formatterColumnState(row, column) {
            switch(row.order_status){
                case "0":
                    return '待提货';
                    break;
                case "1":
                    return '待结款';
                    break;
                case "2":
                    return '已结款';
                    break;
                default:
                    return '未知';
            }
      },//客户姓名转换
      // formatterColumnCust(row, column) {
      //   this.$axios
      //   .get(
      //     "/SaleManagement/GetSSOID",{
      //       params: {
      //          id: row.customer_id,
      //       }
      //     }
      //   )
      //   .then(function(response) {
      //     console.log(response.data);
      //     return response.data.name;
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
      // },
      dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
      formLabelWidth: '100px',
      tableData: [
        {
          no: "20160502",
          product_id: "手机",
          customer_id:1,
          nums: "10",
          sale_date:"2020-08-08",
          order_status:"0"
        },
        {
          no: "20160503",
          product_id: "平板",
          customer_id:1,
          nums: "10",
          sale_date:"2020-08-08",
          order_status:"0"
        },
        {
          no: "20160504",
          product_id: "电脑",
          customer_id:1,
          nums: "10",
          sale_date:"2020-08-08",
          order_status:"1"
        },
        {
          no: "20160505",
          product_id: "显示器",
          customer_id:1,
          nums: "10",
          sale_date:"2020-08-08",
          order_status:"2"
        }
      ],
      ProData:[]
    };
  },
  methods: {   
thStyleFun() {
     return 'text-align:center'
 },
 cellStyleFun() {
    return 'text-align:center'
 },
    onSubmit() {
      this.$message.error("还未完成!");
    },//以订单号查询
    onSelect() {
      const that=this;
      var saleid=$("#SaleID").val();
      if(saleid==""){
        this.$message.error("请输入订单号!");
      }
      else{
      this.$axios
        .get(
          "/SaleManagement/GetSSOID",{
            params: {
               id: saleid,
            }
          }
        )
        .then(function(response) {
          console.log(response.data);
          that.tableData=[];
          that.tableData=response.data;
          console.log(that.tableData);
        })
        .catch(function(error) {
          console.log(error);
        });
      }
    },//查询所有订单
    onSelectALL() {
      const that=this;
      this.$axios
        .get(
          "/SaleManagement/GetSSO"
          )
        .then(function(response) {
          // console.log(response.data);
          // that.tableData=[];
          // that.tableData=response.data;
          // console.log(that.tableData);
          that.tableData=[
        {
          no: "20160502",
          product_id: "手机",
          customer_id:"李白",
          nums: "10",
          sale_date:"2020-08-08",
          order_status:"待提货"
        },
        {
          no: "20160503",
          product_id: "平板",
          customer_id:"曜",
          nums: "10",
          sale_date:"2020-08-08",
          order_status:"待提货"
        },
        {
          no: "20160504",
          product_id: "电脑",
          customer_id:"不知火舞",
          nums: "10",
          sale_date:"2020-08-08",
          order_status:"待提货"
        },
        {
          no: "20160505",
          product_id: "显示器",
          customer_id:"嬴政",
          nums: "10",
          sale_date:"2020-08-08",
          order_status:"待提货"
        }
      ]
        })
        .catch(function(error) {
          console.log(error);
        });
    },//以状态下拉框查询
    selectState(value) {
      const that=this;
      this.$axios
        .get(
          "/SaleManagement/GetSSOState",{
            params: {
               id: value,
            }
          }
        )
        .then(function(response) {
          that.tableData=[];
          that.tableData=response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
   aa(){
     const that=this;
      this.$axios
        .get(
          "/SaleManagement/GetSSOState",
        )
        .then(function(response) {
          that.ProData=response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
   }
  }
};
</script>