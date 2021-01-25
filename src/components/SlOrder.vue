<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div
        class="grid-content bg-purple"
        style="font-size:40px;"
      >待销售订单</div>
    </el-col>
    <el-col :span="18">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="订单编号">
          <el-input
            v-model="formInline.user"
            placeholder="订单编号"
            id="salesid"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="onSelect"
            icon="el-icon-search"
          >查询</el-button>
        </el-form-item>

        <el-form-item label="产品名称">
          <el-select
            v-model="formInline.region"
            placeholder="产品名称"
            @change="getproducts"
          >
            <el-option
              v-for="item in allproducts"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="dialogVisible = true"
            icon="el-icon-circle-plus-outline"
          >添加</el-button>
          <el-dialog
            title="添加订单"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose"
          >
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="AddFormSlOrder"
              label-width="100px"
              class="demo-ruleForm"
            >
              <!--<el-form-item
                label="订单号"
                prop="No"
              >
                <el-input
                  v-model="ruleForm.No"
                  style="width:110%"
                ></el-input>
              </el-form-item>-->

              <el-form-item
                label="产品名称"
                prop="ProductId"
              >
                <el-select
                  v-model="ruleForm.ProductId"
                  placeholder="请选择产品名称"
                  style="width:100%"
                  @change="getproducts"
                >
                  <el-option
                    v-for="item in allproducts"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <br><br>

              <el-form-item
                label="用户名称"
                prop="CustomerId"
              >
                <el-select
                  v-model="ruleForm.CustomerId"
                  placeholder="请选择用户名称"
                >
                  <el-option
                    v-for="item in allcust"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="数量"
                prop="Nums"
                style="margin-left:-16px"
              >
                <el-input
                  type="number"
                  v-model="ruleForm.Nums"
                  style="width:110%"
                ></el-input>
              </el-form-item>
              <br><br>

              <el-form-item
                label="单价"
                prop="Price"
              >
                <el-input
                  type="number"
                  v-model="ruleForm.Price"
                  readonly="readonly"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="交货时间"
                prop="DeliveryDate"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm.DeliveryDate"
                  style="width: 95%;"
                ></el-date-picker>
              </el-form-item>
              <br><br>

              <el-form-item
                label="交货方式"
                prop="DeliveryWay"
                style="margin-left:0px;"
              >
                <el-select
                  v-model="ruleForm.DeliveryWay"
                  placeholder="请选择交货方式"
                >
                  <el-option
                    label="顺丰"
                    value="顺丰"
                  ></el-option>
                  <el-option
                    label="中通"
                    value="中通"
                  ></el-option>
                  <el-option
                    label="圆通"
                    value="圆通"
                  ></el-option>
                  <el-option
                    label="面交"
                    value="面交"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="订单金额"
                prop="OrderAmount"
                style="margin-left:-16px;"
              >
                <el-input
                  v-model="ruleForm.OrderAmount"
                  readonly="readonly"
                  style="width:110%"
                ></el-input>
              </el-form-item>
              <br><br>

              <el-form-item
                label="备注"
                prop="Remark"
              >
                <el-input
                  v-model="ruleForm.Remark"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <br />
              <el-form-item style="margin-left:430px;">
                <el-button
                  type="primary"
                  @click="dialogVisible = false"
                >取 消</el-button>
                <el-button
                  type="primary"
                  @click="resetForm('AddFormSlOrder')"
                >重置</el-button>
                <el-button
                  type="success"
                  @click="submitForm('AddFormSlOrder')"
                >立即添加</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </el-form-item>

        <el-form-item>
          <el-dialog
            title="添加销售订单"
            :visible.sync="dialogVisible2"
            width="50%"
            :before-close="handleClose"
          >
            <el-form
              :model="ruleForm2"
              :rules="rules"
              ref="AddFormSlSaleOrder"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item
                label="销售单号"
                prop="No"
              >
                <el-input
                  v-model="ruleForm2.No"
                  readonly="readonly"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <!-- <el-form-item label="产品名称" prop="ProductId">
                <el-select v-model="ruleForm2.ProductId" readonly="readonly" placeholder="请选择产品名称" style="width:100%">
                  <el-option v-for="item in allproducts"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"></el-option>
                </el-select>
                <el-input v-model="ruleForm2.ProductId" readonly="readonly" style="width:110%"></el-input>
              </el-form-item> -->

              <!-- <el-form-item label="用户名称" prop="CustomerId">
                <el-select v-model="ruleForm2.CustomerId" readonly="readonly" placeholder="请选择用户名称">
                  <el-option
                     v-for="item in allcust"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"></el-option>
                </el-select>
                <el-input v-model="ruleForm2.CustomerId" readonly="readonly" style="width:110%"></el-input>
              </el-form-item> -->

              <el-form-item
                label="订单编号"
                prop="OrderId"
                style="margin-left:0px;"
              >
                <el-input
                  v-model="ruleForm2.OrderId"
                  readonly="readonly"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="销售日期"
                prop="SaleDate"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm2.SaleDate"
                  style="width: 95%;"
                ></el-date-picker>
              </el-form-item>

              <el-form-item
                label="结算方式"
                prop="AmountWay"
                style="margin-left:-30px;"
              >
                <el-select
                  v-model="ruleForm2.AmountWay"
                  placeholder="请选择结算方式"
                >
                  <el-option
                    label="现金"
                    value="现金"
                  ></el-option>
                  <el-option
                    label="微信"
                    value="微信"
                  ></el-option>
                  <el-option
                    label="支付宝"
                    value="支付宝"
                  ></el-option>
                  <el-option
                    label="银行卡"
                    value="银行卡"
                  ></el-option>
                </el-select>
              </el-form-item>
              <br />
              <br />

              <el-form-item
                label="总金额"
                prop="Amount"
              >
                <el-input
                  type="number"
                  v-model="ruleForm2.Amount"
                  readonly="readonly"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="数量"
                prop="Nums"
              >
                <el-input
                  type="number"
                  v-model="ruleForm2.Nums"
                  readonly="readonly"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="应收金额"
                prop="AmountReceivable"
              >
                <el-input
                  type="number"
                  v-model="ruleForm2.AmountReceivable"
                  readonly="readonly"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="实收金额"
                prop="AmountReceived"
              >
                <el-input
                  type="number"
                  v-model="ruleForm2.AmountReceived"
                  readonly="readonly"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <!-- <el-form-item label="经手人" prop="handleId">
                <el-select v-model="ruleForm2.handleId" placeholder="请选择经手人名称">
                  <el-option
                  v-for="item in allstaff"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="操作员" prop="operatorId" style="margin-left:-16px;">
                <el-select v-model="ruleForm2.operatorId" placeholder="请选择操作员名称">
                  <el-option
                  v-for="item in allstaff"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"></el-option>
                </el-select>
              </el-form-item> -->

              <!-- <el-form-item label="销售状态" prop="OrderStatus">
                <el-input v-model="ruleForm2.OrderStatus" readonly="readonly" style="width:110%"></el-input>
              </el-form-item> -->

              <el-form-item
                label="备注"
                prop="Remark"
              >
                <el-input
                  v-model="ruleForm2.Remark"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <br />
              <el-form-item style="margin-left:430px;">
                <el-button
                  type="primary"
                  @click="dialogVisible2 = false"
                >取 消</el-button>
                <el-button
                  type="success"
                  @click="submitForm2('AddFormSlSaleOrder')"
                >立即添加</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>

          <!-- <el-button type="primary" @click="onSelectALL" icon="el-icon-refresh">刷新</el-button> -->
        </el-form-item>
      </el-form>
    </el-col>

    <el-table
      :data="tableData"
      v-loading="loading"
      border
      style="width: 100%"
      :header-cell-style="thStyleFun"
      :cell-style="cellStyleFun"
    >
      <el-table-column
        prop="no"
        label="订单编号"
      ></el-table-column>
      <el-table-column
        prop="customerName"
        label="下单客户"
      ></el-table-column>
      <el-table-column
        prop="productName"
        label="产品名称"
      ></el-table-column>
      <el-table-column
        prop="nums"
        label="订单数量"
      ></el-table-column>
      <el-table-column
        prop="orderAmount"
        label="订单金额"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        :formatter="formatterColumnstate"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- @click="onEdit(scope.$index, scope.row)" -->
          <el-button
            v-if="scope.row.status==0"
            type="primary"
            @click="onEdit(scope.$index, scope.row)"
            icon="el-icon-edit"
          >去销售</el-button>
          <!-- <el-button
            type="primary"
            @click="dialogVisible = true"
            icon="el-icon-circle-plus-outline"
          >添加</el-button> -->
          <el-button
            v-if="scope.row.status ==-1"
            type="danger"
            icon="el-icon-circle-close"
          >未通过</el-button>
          <el-button
            v-else-if="scope.row.status==2||scope.row.status==1"
            type="info"
            icon="el-icon-loading"
          >处理中</el-button>
          <el-button
            v-else-if="scope.row.status==3"
            type="success"
            icon="el-icon-circle-check"
          >已发货</el-button>
          <!-- <el-button v-else type="danger" icon="el-icon-circle-close">未知</el-button> -->
        </template>
      </el-table-column>
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
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1, //默认显示第一页
      pageSize: 10, //默认每页显示15条
      totalNum: 0, //总数量
      loading: false,
      alldepart: [],
      allstaff: [],
      allproducts: [],
      allcust: [],
      formInline: {
        user: "",
        region: "",
        state: "",
      },
      ruleForm: {
        Id: 1,
        No: "",
        CustomerId: "",
        ProductId: "",
        Nums: "",
        Price: "",
        DeliveryDate: "",
        DeliveryWay: "",
        OrderDate: "",
        OrderAmount: "",
        HandleId: 1,
        OperatorId: 1,
        OperatorTime: "",
        Status: "",
        Remark: "",
      },
      ruleForm2: {
        id: 1,
        No: "",
        // ProductName: "",
        // CustomerName: "",
        ProductId: 1,
        CustomerId: 1,
        OrderId: "",
        SaleDate: "",
        Nums: "",
        Amount: "",
        AmountWay: "",
        AmountReceivable: "",
        AmountReceived: 0.0,
        OrderStatus: 1,
        HandleId: 1,
        OperatorId: 1,
        OperatorTime: "",
        AuditStatus: 0,
        Remark: "",
      },
      rules: {
        SaleDate: [
          { required: true, message: "请选择销售时间", trigger: "change" },
        ],
        AmountWay: [
          { required: true, message: "请选择结算方式", trigger: "change" },
        ],

        OrderAmount: [
          { required: true, message: "请输入订单金额", trigger: "change" },
        ],
        DeliveryWay: [
          { required: true, message: "请选择交货方式", trigger: "change" },
        ],
        DeliveryDate: [
          { required: true, message: "请选择交货时间", trigger: "change" },
        ],
        Price: [{ required: true, message: "请输入价格", trigger: "change" }],
        CustomerId: [
          { required: true, message: "请选择客户名称", trigger: "change" },
        ],
        Nums: [{ required: true, message: "请输入数量", trigger: "change" }],
        No: [{ required: true, message: "请输入订单号", trigger: "change" }],
        ProductId: [
          { required: true, message: "请选择产品名称", trigger: "change" },
        ],
        // productdate: [{ required: true, message: "请输入生产日期", trigger: "change" },],
        // batch: [{ required: true, message: "请输入批次号", trigger: "change" },],
        // departmentid: [{ required: true, message: "请选择部门名称", trigger: "change" },],
        Operatorid: [
          { required: true, message: "请选择操作员", trigger: "change" },
        ],
        qmid: [
          { required: true, message: "请选择订单编号", trigger: "change" },
        ],

        taskid: [
          { required: true, message: "请输入生产单号", trigger: "change" },
        ],
        qmdate: [
          { required: true, message: "请选择质检日期", trigger: "change" },
        ],
        result: [
          { required: true, message: "请选择质检结果", trigger: "change" },
        ],
        handleid: [
          { required: true, message: "请选择经手人", trigger: "change" },
        ],
      },

      dialogVisible: false,
      dialogVisible2: false,
      tableData: [],
    };
  },
  created() {
    this.SelectAllOrder(); //默认进来就加载所有订单
    this.SelectAllproducts(); //默认进来就加载所有的产品
    this.SelectAllcust(); //默认进来就加载所有的客户
    //this.SelectAllstaff(); //默认进来就加载所有的员工
  },
  watch: {
    "ruleForm.Nums"(newval, oldval) {
      if (newval <= 0) {
        this.$message.error("数量不可小于1件!");
        this.ruleForm.Nums = 1;
      } else {
        this.ruleForm.OrderAmount = this.ruleForm.Nums * this.ruleForm.Price;
      }
    },
    "ruleForm.Price"(newval, oldval) {
      this.ruleForm.OrderAmount = this.ruleForm.Nums * this.ruleForm.Price;
    },
  },
  methods: {
    //默认进来就加载所有订单
    SelectAllOrder() {
      this.loading = true;
      var that = this;
      this.$axios
        .get("/SaleManagement/GetSlOrder?pageIndex=1")
        .then(function (response) {
          console.log(response.data);
          that.tableData = response.data.entity;
          that.loading = false;
          that.totalNum=Number(response.data.msg);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, //默认进来就加载所有的产品
    SelectAllproducts() {
      var that = this;
      this.$axios
        .get("/QualityManagement/GetALLPP")
        .then(function (response) {
          console.log(response.data);
          that.allproducts = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }, //默认进来就加载所有的客户
    SelectAllcust() {
      var that = this;
      this.$axios
        .get("/SaleManagement/GetALLSC")
        .then(function (response) {
          console.log(response.data);
          that.allcust = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }, //默认进来就加载所有的员工
    SelectAllstaff() {
      var that = this;
      this.$axios
        .get("/QualityManagement/GetALLACStaff")
        .then(function (response) {
          console.log(response.data);
          that.allstaff = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    onSubmit() {
      this.$message.error("还未完成!");
    }, //订单号查询
    onSelect() {
      var that = this;
      var saleid = $("#salesid").val();
      if (saleid == "") {
        this.$message.error("请输入订单号!");
      } else {
        this.$axios
          .get("/SaleManagement/GetSlOrderID", {
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
    }, //产品名称查询信息
    getproducts(value) {
      var that = this;
      this.$axios
        .get("/SaleManagement/GetPPID", {
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
      switch (row.status) {
        case 0:
          return "待销售";
          break;
        case 1:
          return "待销售";
          break;
        case 2:
          return "处理中";
          break;
        case 3:
          return "已发货";
          break;
        case -1:
          return "未通过";
          break;
        default:
          return "未知";
      }
    }, //产品名称价格
    getproducts(value) {
      var that = this;
      this.$axios
        .get("/SaleManagement/GetSSOProPrice?id=" + value)
        .then(function (response) {
          console.log(response.data);
          that.ruleForm.Price = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
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
        .get("/SaleManagement/GetSlOrder")
        .then(function (response) {
          that.tableData = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }, //模态框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    }, //添加SlOrder
    submitForm(AddFormSlOrder) {
      var that = this;
      this.$refs.AddFormSlOrder.validate((valid) => {
        if (valid) {
          console.log(that.ruleForm);
          this.$axios
            .post("/SaleManagement/AddSlOrder", this.ruleForm)
            .then(function (response) {
              console.log(response.data);
              that.$message.success("添加成功！");
              that.dialogVisible = false;
              that.SelectAllOrder();
            })
            .catch(function (error) {
              //that.$message.error("添加失败error2！");
            });
        } else {
          console.log("valid错误!");
          return false;
        }
      });
    }, //添加SlSaleOrder(第一次查询)
    onEdit(index, row) {
      this.dialogVisible2 = true; //dialog对话窗口打开
      this.ruleForm2.OrderId = row.no;
      this.ruleForm2.No = row.no;
      this.ruleForm2.ProductName = row.productName;
      this.ruleForm2.CustomerName = row.customerName;
      this.ruleForm2.Amount = row.orderAmount;
      this.ruleForm2.AmountReceivable = row.orderAmount;
      this.ruleForm2.Nums = row.nums;
    }, //添加SlSaleOrder(修改数据)
    submitForm2(AddFormSlSaleOrder) {
      var that = this;
      this.$refs.AddFormSlSaleOrder.validate((valid) => {
        if (valid) {
          console.log(this.ruleForm2);
          this.$axios
            .post("/SaleManagement/AddSlSaleOrder", this.ruleForm2)
            .then(function (response) {
              console.log(response.data);
              that.$message.success("添加成功！");
              that.dialogVisible2 = false;
              that.SelectAllOrder();
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
    resetForm(AddFormSlOrder) {
      this.$refs.AddFormSlOrder.resetFields();
    }, 
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      var that = this;
      this.$axios
        .get(
          `/SaleManagement/GetSlOrder?pageIndex=${val}`
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
  },
};
</script>
