<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="grid-content bg-purple" style="font-size:40px;">销售单管理</div>
    </el-col>
    <el-col :span="18">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="销售单编号">
<<<<<<< Updated upstream
          <el-input v-model="formInline.user" placeholder="销售单编号" id="salesid"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSelect" icon="el-icon-search">查询</el-button>
        </el-form-item>

        <el-form-item label="产品名称">
          <el-select v-model="formInline.region" placeholder="产品名称">
            <el-option  v-for="item in allproducts"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"></el-option>
=======
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
>>>>>>> Stashed changes
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
<<<<<<< Updated upstream
          <el-select v-model="formInline.state" placeholder="状态" @change="getstate">
            <el-option label="待提货" value="0"></el-option>
            <el-option label="待结款" value="1"></el-option>
            <el-option label="已结款" value="2"></el-option>
=======
          <el-select v-model="formInline.zt" placeholder="状态" @change="selectState">
            <el-option label="待提货" value="1"></el-option>
            <el-option label="待结款" value="2"></el-option>
            <el-option label="已结款" value="3"></el-option>
>>>>>>> Stashed changes
          </el-select>
        </el-form-item>

        <el-form-item>
<<<<<<< Updated upstream
          <!-- <el-button type="primary" @click="onSelect" icon="el-icon-circle-plus-outline">添加</el-button> -->
          <el-button
            type="primary"
            @click="dialogVisible = true"
            icon="el-icon-circle-plus-outline"
          >添加</el-button>
          <el-dialog
            title="添加销售订单"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose"
          >
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="销售单号" prop="no">
                <el-input v-model="ruleForm.no" style="width:110%"></el-input>
              </el-form-item>

              <el-form-item label="产品名称" prop="ProductId">
                <el-select v-model="ruleForm.ProductId" placeholder="请选择产品名称" style="width:100%">
                  <el-option v-for="item in allproducts"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="用户名称" prop="CustomerId">
                <el-select v-model="ruleForm.CustomerId" placeholder="请选择用户名称">
                  <el-option
                     v-for="item in allusers"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="订单编号" prop="OrderId" style="margin-left:-16px;">
                <!-- <el-select v-model="ruleForm.OrderId" placeholder="请选择订单编号">
                  <el-option label="区域一" value="1"></el-option>
                </el-select> -->
                <el-input v-model="ruleForm.OrderId" readonly="readonly" style="width:110%"></el-input>
              </el-form-item>

              <el-form-item label="销售日期" prop="SaleDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm.SaleDate"
                  style="width: 95%;"
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="结算方式" prop="AmountWay" style="margin-left:-30px;">
                <el-select v-model="ruleForm.AmountWay" placeholder="请选择结算方式">
                  <el-option label="现金" value="0"></el-option>
                  <el-option label="银行卡" value="1"></el-option>
                  <el-option label="支付宝" value="2"></el-option>
                  <el-option label="微信" value="3"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="总金额" prop="amount">
                <el-input type="number" v-model="ruleForm.amount" style="width:110%"></el-input>
              </el-form-item>

              <el-form-item label="数量" prop="nums">
                <el-input type="number" v-model="ruleForm.nums" style="width:110%"></el-input>
              </el-form-item>
              <br />
              <br />

              <el-form-item label="应收金额" prop="AmountReceivable">
                <el-input type="number" v-model="ruleForm.AmountReceivable" style="width:110%"></el-input>
              </el-form-item>

              <el-form-item label="实收金额" prop="AmountReceived">
                <el-input type="number" v-model="ruleForm.AmountReceived" style="width:110%"></el-input>
              </el-form-item>              

              <el-form-item label="经手人" prop="HandleId">
                <el-select v-model="ruleForm.HandleId" placeholder="请选择经手人名称">
                  <el-option
                  v-for="item in allstaff"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="操作员" prop="OperatorId" style="margin-left:-16px;">
                <el-select v-model="ruleForm.OperatorId" placeholder="请选择操作员名称">
                  <el-option 
                  v-for="item in allstaff"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="销售状态" prop="OrderStatus">
                <el-input v-model="ruleForm.OrderStatus" readonly="readonly" style="width:110%"></el-input>
              </el-form-item>

              <el-form-item label="备注" prop="Remark" >
                <el-input v-model="ruleForm.Remark" style="width:110%"></el-input>
              </el-form-item>

              <br />
              <el-form-item style="margin-left:430px;">
                <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
                <el-button type="success" @click="submitForm('ruleForm')">立即添加</el-button>
              </el-form-item>
            </el-form>
            <!-- <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>-->
          </el-dialog>

          <el-dialog
            title="编辑销售订单"
            :visible.sync="dialogVisible2"
            width="50%"
            :before-close="handleClose"
          >
            <el-form
              :model="ruleForm2"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="销售单号" prop="no">
                <el-input v-model="ruleForm2.no" style="width:110%"></el-input>
              </el-form-item>

              <el-form-item label="产品名称" prop="ProductId">
                <el-select v-model="ruleForm2.ProductId" placeholder="请选择产品名称" style="width:100%">
                  <el-option v-for="item in allproducts"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="用户名称" prop="CustomerId">
                <el-select v-model="ruleForm2.CustomerId" placeholder="请选择用户名称">
                  <el-option
                     v-for="item in allusers"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="订单编号" prop="OrderId" style="margin-left:-16px;">
                <!-- <el-select v-model="ruleForm.OrderId" placeholder="请选择订单编号">
                  <el-option label="区域一" value="1"></el-option>
                </el-select> -->
                <el-input v-model="ruleForm2.OrderId" readonly="readonly" style="width:110%"></el-input>
              </el-form-item>

              <el-form-item label="销售日期" prop="SaleDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm2.SaleDate"
                  style="width: 95%;"
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="结算方式" prop="AmountWay" style="margin-left:-30px;">
                <el-select v-model="ruleForm2.AmountWay" placeholder="请选择结算方式">
                  <el-option label="现金" value="现金"></el-option>
                  <el-option label="微信" value="微信"></el-option>
                  <el-option label="支付宝" value="支付宝"></el-option>
                  <el-option label="银行卡" value="银行卡"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="总金额" prop="amount">
                <el-input type="number" v-model="ruleForm2.amount" style="width:110%"></el-input>
              </el-form-item>

              <el-form-item label="数量" prop="nums">
                <el-input type="number" v-model="ruleForm2.nums" style="width:110%"></el-input>
              </el-form-item>
              <br />
              <br />

              <el-form-item label="应收金额" prop="AmountReceivable">
                <el-input type="number" v-model="ruleForm2.AmountReceivable" style="width:110%"></el-input>
              </el-form-item>

              <el-form-item label="实收金额" prop="AmountReceived">
                <el-input type="number" v-model="ruleForm2.AmountReceived" style="width:110%"></el-input>
              </el-form-item>              

              <el-form-item label="经手人" prop="HandleId">
                <el-select v-model="ruleForm2.HandleId" placeholder="请选择经手人名称">
                  <el-option
                  v-for="item in allstaff"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="操作员" prop="OperatorId" style="margin-left:-16px;">
                <el-select v-model="ruleForm2.OperatorId" placeholder="请选择操作员名称">
                  <el-option 
                  v-for="item in allstaff"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="销售状态" prop="OrderStatus">
                <el-input v-model="ruleForm2.OrderStatus" readonly="readonly" style="width:110%"></el-input>
              </el-form-item>

              <el-form-item label="备注" prop="Remark" >
                <el-input v-model="ruleForm2.Remark" style="width:110%"></el-input>
              </el-form-item>

              <br />
              <el-form-item style="margin-left:430px;">
                <el-button type="primary" @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="resetForm('ruleForm2')">重置</el-button>
                <el-button type="success" @click="submitForm2('ruleForm2')">立即修改</el-button>
              </el-form-item>
            </el-form>
            <!-- <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>-->
          </el-dialog>
          
=======
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :header-cell-style="thStyleFun"
      :cell-style="cellStyleFun"
    >
      <el-table-column prop="no" label="销售单编号"></el-table-column>
      <el-table-column prop="productName" label="产品名称"></el-table-column>
      <el-table-column prop="customerName" label="客户名称"></el-table-column>
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
          <!-- @click="onEdit(scope.$index, scope.row)" -->
          <el-button
            v-if="scope.row.order_status==0"
            type="primary"
            @click="onEdit(scope.$index, scope.row)"          
            icon="el-icon-edit"
          >编辑</el-button>
          <el-button
            v-else-if="scope.row.order_status==1"
            type="primary"
            @click="onSubmit"
            icon="el-icon-edit"
          >结款</el-button>
          <el-button
            v-else-if="scope.row.order_status==2"
            type="success"
            icon="el-icon-circle-check"
          >完成</el-button>
          <el-button v-else type="danger" style @click="onSubmit" icon="el-icon-circle-close">未知</el-button>
          <el-button
            type="danger"
            style
            @click="onDelete(scope.$index, scope.row)"
            icon="el-icon-delete"
          >删除</el-button>
        </template>
      </el-table-column>
=======
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        user: "",
        region: "",
        state: "",
      },
      ruleForm: {
        no: "",
        ProductId: "",
        CustomerId: "",
        OrderId: "非订单",
        SaleDate: "",
        nums: "",
        amount: "",
        AmountWay: "",
        AmountReceivable: "",
        AmountReceived: "",
        OrderStatus: "待提货",
        HandleId: "",
        OperatorId: "",
      },
      ruleForm2: {
        no: "",
        ProductId: "",
        CustomerId: "",
        OrderId: "非订单",
        SaleDate: "",
        nums: "",
        amount: "",
        AmountWay: "",
        AmountReceivable: "",
        AmountReceived: "",
        OrderStatus: "待提货",
        HandleId: "",
        OperatorId: "",
      },
      rules: {
        nums: [{ required: true, message: "请输入数量", trigger: "change" }],
        amount: [
          { required: true, message: "请选择总金额", trigger: "change" },
        ],
      },

      dialogVisible: false,
      dialogVisible2: false,
      tableData: [
        {
          no: "20160502",
          productName: "手机",
          customerName: "小夏",
          nums: 10,
          sale_date: "2020-08-08",
          order_status: 0,
        },
        {
          no: "20160502",
          productName: "手机",
          customerName: "小夏",
          nums: 10,
          sale_date: "2020-08-08",
          order_status: 1,
        },
        {
          no: "20160502",
          productName: "手机",
          customerName: "小夏",
          nums: 10,
          sale_date: "2020-08-08",
          order_status: 1,
        },
        {
          no: "20160502",
          productName: "手机",
          customerName: "小夏",
          nums: 10,
          sale_date: "2020-08-08",
          order_status: 2,
        },
      ],
=======
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
              id: saleid,
            },
          })
          .then(function (response) {
            that.tableData = response.data;
          })
          .catch(function (error) {
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
        .then(function (response) {
          //that.tableData=response.data;
          that.tableData = [
            {
              no: "20160502",
              productName: "手机",
              customerName: "小夏",
              nums: 10,
              sale_date: "2020-08-08",
              order_status: 0,
            },
            {
              no: "20160502",
              productName: "手机",
              customerName: "小夏",
              nums: 10,
              sale_date: "2020-08-08",
              order_status: 1,
            },
            {
              no: "20160502",
              productName: "手机",
              customerName: "小夏",
              nums: 10,
              sale_date: "2020-08-08",
              order_status: 1,
            },
            {
              no: "20160502",
              productName: "手机",
              customerName: "小夏",
              nums: 10,
              sale_date: "2020-08-08",
              order_status: 2,
            },
          ];
        })
        .catch(function (error) {
          console.log(error);
        });
    }, //状态得到信息
    getstate(value) {
      var that = this;
      this.$axios
        .get("/SaleManagement/GetSSOState", {
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
    }, //删除
    onDelete(index, row) {
      this.$confirm("确定要删除销售单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message.error("暂无数据，请勿操作!");
          // this.$axios
          //   .get("/SaleManagement/Delete", {
          //     params: {
          //       table: row.data,
          //     },
          //   })
          //   .then(function (response) {
          //     onSelectALL();
          //   })
          //   .catch(function (error) {
          //     console.log(error);
          //   });
        })
        .catch(() => {
          this.$message({
            type: "success",
            message: "已取消删除",
          });
        });
    }, //模态框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    }, //添加
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //this.$message.error("暂无数据，请勿操作!");
          var that = this;
          this.$axios
            .post("/SaleManagement/Add", that.ruleForm)
            .then(function (response) {
              console.log(response.data);
              if (response.data > 0) {
                that.$message.success("添加成功！");
                that.ruleForm = {};
              } else {
                that.$message.error("添加失败！");
                that.ruleForm = {};
              }
            })
            .catch(function (error) {
              that.$message.error("添加失败error2！");
            });
        } else {
          console.log("valid错误!");
          return false;
        }
      });
    }, //编辑(第一次查询)
    onEdit(index, row) {
      this.dialogVisible2 = true;//dialog对话窗口打开
      //this.ruleForm2 = Object.assign({}, row);//将数据传入dialog页面
      //this.ruleForm2.index=index;//传递当前index
      //this.$message.error("暂无数据，请勿操作!");
      var that=this;
      this.$axios
        .get("/SaleManagement/GetSSOID", {
          params: {
            id: row.no,
          },
        })
        .then(function (response) {
          console.log(response.data);
          console.log(response.data.ProductId)
          that.ruleForm2=response.data;
          //onSelectALL();
        })
        .catch(function (error) {
          console.log(error);
        });
    }, //编辑(修改数据)
    submitForm2(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //this.$message.error("暂无数据，请勿操作!");
          var that = this;
          this.$axios
            .post("/SaleManagement/EditSSO", that.ruleForm2)
            .then(function (response) {
              console.log(response.data);
              if (response.data > 0) {
                that.$message.success("修改成功！");
                that.ruleForm2 = {};
              } else {
                that.$message.error("修改成功！");
                that.ruleForm2 = {};
              }
            })
            .catch(function (error) {
              that.$message.error("添加失败error2！");
            });
        } else {
          console.log("valid错误!");
          return false;
        }
      });
    }, //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
=======
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
>>>>>>> Stashed changes
};
</script>