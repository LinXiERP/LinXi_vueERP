<template>
  <el-row :gutter="20">
    <el-col :span="6">
<<<<<<< HEAD
      <div
        class="grid-content bg-purple"
        style="font-size:40px;"
      >待质检产品</div>
    </el-col>
    <el-col :span="18">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="生产单编号">
          <el-input
            v-model="formInline.user"
            placeholder="生产单编号"
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
=======
      <div class="grid-content bg-purple" style="font-size:40px;">待质检产品</div>
    </el-col>
    <el-col :span="18">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="生产单编号">
          <el-input v-model="formInline.user" placeholder="生产单编号" id="salesid"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSelect" icon="el-icon-search">查询</el-button>
        </el-form-item>

        <el-form-item label="产品名称">
          <el-select v-model="formInline.region" placeholder="产品名称" @change="getproducts">
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
            <el-option
              v-for="item in allproducts"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-dialog
            title="填写待质检产品"
            :visible.sync="dialogVisible2"
            width="50%"
            :before-close="handleClose"
          >
            <el-form
              :model="ruleForm"
              :rules="rules"
<<<<<<< HEAD
              ref="AddForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item
                label="质检单编号"
                prop="No"
                style="margin-left:0px;"
              >
                <!-- <el-select v-model="ruleForm.OrderId" placeholder="请选择质检单编号">
                  <el-option label="区域一" value="1"></el-option>
                </el-select>-->
                <el-input
                  v-model="ruleForm.No"
                  readonly="readonly"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="生产单号"
                prop="taskid"
              >
                <el-input
                  v-model="ruleForm.taskid"
                  readonly="readonly"
                  style="width:110%"
                ></el-input>
=======
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="质检单编号" prop="qmid" style="margin-left:0px;">
                <!-- <el-select v-model="ruleForm.OrderId" placeholder="请选择质检单编号">
                  <el-option label="区域一" value="1"></el-option>
                </el-select>-->
                <el-input v-model="ruleForm.qmid" style="width:110%"></el-input>
              </el-form-item>

              <el-form-item label="生产单号" prop="taskid">
                <el-input v-model="ruleForm.taskid" readonly="readonly" style="width:110%"></el-input>
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
              </el-form-item>
              <br />
              <br />

<<<<<<< HEAD
              <el-form-item
                label="采购单号"
                prop="Id"
                v-if="false"
              >
                <el-input
                  v-if="false"
                  v-model="ruleForm.Id"
                  readonly="readonly"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="质检日期"
                prop="qmdate"
              >
=======
              <el-form-item label="质检日期" prop="qmdate">
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm.qmdate"
                  style="width: 95%;"
                ></el-date-picker>
              </el-form-item>

<<<<<<< HEAD
              <el-form-item
                label="质检结果"
                prop="result"
                style="margin-left:-28px;"
              >
                <el-select
                  v-model="ruleForm.result"
                  placeholder="请选择质检结果"
                  style="width:100%"
                >
                  <el-option
                    label="合格"
                    value="1"
                  ></el-option>
                  <el-option
                    label="不合格"
                    value="2"
                  ></el-option>
=======
              <el-form-item label="质检结果" prop="result" style="margin-left:-28px;">
                <el-select v-model="ruleForm.result" placeholder="请选择质检结果" style="width:100%">
                  <el-option value="合格">合格</el-option>
                  <el-option value="不合格">不合格</el-option>
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
                </el-select>
              </el-form-item>
              <br />
              <br />

<<<<<<< HEAD
              <!-- <el-form-item label="经手人" prop="handleid" style="margin-left:0px;">
=======
              <el-form-item label="经手人" prop="handleid" style="margin-left:0px;">
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
                <el-select v-model="ruleForm.handleid" placeholder="请选择经手人名称">
                  <el-option
                    v-for="item in allstaff"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="操作人" prop="Operatorid" style="margin-left:-13px;">
                <el-select v-model="ruleForm.Operatorid" placeholder="请选择操作人名称">
                  <el-option
                    v-for="item in allstaff"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <br />
<<<<<<< HEAD
              <br /> -->

              <el-form-item
                label="备注"
                prop="Remark"
              >
                <el-input
                  v-model="ruleForm.Remark"
                  style="width:110%"
                ></el-input>
=======
              <br />

              <el-form-item label="备注" prop="Remark">
                <el-input v-model="ruleForm.Remark" style="width:110%"></el-input>
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
              </el-form-item>

              <br />
              <el-form-item style="margin-left:430px;">
<<<<<<< HEAD
                <el-button
                  type="primary"
                  @click="dialogVisible2 = false"
                >取 消</el-button>
                <el-button
                  type="primary"
                  @click="resetForm('ruleForm')"
                >重置</el-button>
                <el-button
                  type="success"
                  @click="submitForm('AddForm')"
                >立即添加</el-button>
=======
                <el-button type="primary" @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
                <el-button type="success" @click="submitForm('ruleForm')">立即添加</el-button>
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
              </el-form-item>
            </el-form>
            <!-- <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>-->
          </el-dialog>

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
      v-loading="loading"
      border
      height="800"
=======
      border
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
      style="width: 100%"
      :header-cell-style="thStyleFun"
      :cell-style="cellStyleFun"
    >
<<<<<<< HEAD
      <el-table-column
        v-if="false"
        prop="id"
        label="采购单编号"
      ></el-table-column>
      <el-table-column
        prop="no"
        label="生产编号"
      ></el-table-column>
      <el-table-column
        prop="productName"
        label="产品名称"
      ></el-table-column>
      <el-table-column
        prop="nums"
        label="生产数量"
      ></el-table-column>
      <el-table-column
        prop="productDate"
        label="生产日期"
        :formatter="formatDate"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        :formatter="formatterColumnstate"
      ></el-table-column>
=======
      <el-table-column prop="no" label="生产编号"></el-table-column>
      <el-table-column prop="productName" label="产品名称"></el-table-column>
      <el-table-column prop="nums" label="生产数量"></el-table-column>
      <el-table-column prop="productDate" label="生产日期"></el-table-column>
      <el-table-column prop="status" label="状态" :formatter="formatterColumnstate"></el-table-column>
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- @click="onEdit(scope.$index, scope.row)" -->
          <el-button
            type="primary"
            @click="onEdit(scope.$index, scope.row)"
            icon="el-icon-edit"
          >填写质检单</el-button>
        </template>
      </el-table-column>
    </el-table>
<<<<<<< HEAD
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
      loading: false,
=======
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
      alldepart: [],
      allstaff: [],
      allproducts: [],
      formInline: {
        user: "",
        region: "",
        state: "",
      },
      ruleForm: {
<<<<<<< HEAD
        Id: 0,
        No: "",
        taskid: "",
        qmdate: "",
        result: "",
        Operatorid: 1,
        handleid: 1,
        Remark: "",
        Pic: "",
        OperateTime: "",
      },
      rules: {
     
        Operatorid: [
          { required: true, message: "请选择操作员", trigger: "change" },
        ],
        No: [{ required: true, message: "请选择订单编号", trigger: "change" }],
=======
        qmid: "",
        taskid: "",
        qmdate: "",
        result: "",
        Operatorid: "",
        handleid: "",
        Remark: "",
      },
      rules: {
        // nums: [{ required: true, message: "请输入数量", trigger: "change" }],
        // no: [{ required: true, message: "请输入生产单号", trigger: "change" },],
        // Productid: [{ required: true, message: "请选择产品名称", trigger: "change" },],
        // productdate: [{ required: true, message: "请输入生产日期", trigger: "change" },],
        // batch: [{ required: true, message: "请输入批次号", trigger: "change" },],
        // departmentid: [{ required: true, message: "请选择部门名称", trigger: "change" },],
        Operatorid: [
          { required: true, message: "请选择操作员", trigger: "change" },
        ],
        qmid: [
          { required: true, message: "请选择订单编号", trigger: "change" },
        ],
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25

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
<<<<<<< HEAD
      tableData: [],
=======
      tableData: [
        // {
        //   no: "20160502",
        //   productName: "手机",
        //   nums: 10,
        //   productDate: "2020-08-08",
        //   status: 0,
        // },
        // {
        //   no: "20160502",
        //   productName: "手机",
        //   nums: 10,
        //   productDate: "2020-08-08",
        //   status: 0,
        // },
        // {
        //   no: "20160502",
        //   productName: "手机",
        //   nums: 10,
        //   productDate: "2020-08-08",
        //   status: 0,
        // },
        // {
        //   no: "20160502",
        //   productName: "手机",
        //   nums: 10,
        //   productDate: "2020-08-08",
        //   status: 0,
        // },
      ],
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
    };
  },
  created() {
    this.SelectAllQualityproducts(); //默认进来就加载所有待质检的产品
    this.SelectAllproducts(); //默认进来就加载所有的产品
    this.SelectAllstaff(); //默认进来就加载所有的员工
  },
  methods: {
<<<<<<< HEAD
    //默认进来就加载所有待质检的产品
    SelectAllQualityproducts() {
      this.loading = true;
      var that = this;
      this.$axios
        .get("/QualityManagement/GetPPT?pageIndex=1")
        .then(function (response) {
          console.log(response.data);
          that.tableData = response.data.entity;
          that.loading = false;
          that.totalNum=Number(response.data.msg);
=======
    SelectAllQualityproducts() {
      //默认进来就加载所有待质检的产品
      var that = this;
      this.$axios
        .get("/QualityManagement/GetPPT")
        .then(function (response) {
          console.log(response.data);
          that.tableData = response.data;
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
        })
        .catch(function (error) {
          console.log(error);
        });
<<<<<<< HEAD
    }, //默认进来就加载所有的产品
    SelectAllproducts() {
=======
    },
    SelectAllproducts() {
      //默认进来就加载所有的产品
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
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
    }, //生产单号查询
    onSelect() {
      var that = this;
      var saleid = $("#salesid").val();
      if (saleid == "") {
        this.$message.error("请输入生产单号!");
      } else {
        this.$axios
          .get("/QualityManagement/GetPPTID", {
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
        .get("/QualityManagement/GetPPID", {
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
          return "待质检";
          break;
        case 1:
<<<<<<< HEAD
          return "已质检";
=======
          return "待结款";
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
          break;
        default:
          return "未知";
      }
<<<<<<< HEAD
    }, //时间转换
    formatDate(row, column) {
      var currdate = new Date(row.productDate);
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
        .get("/QualityManagement/GetPPT")
        .then(function (response) {
          that.tableData = response.data;
<<<<<<< HEAD
=======
          //     that.tableData = [
          //   {
          //     no: "20160502",
          //     productName: "手机",
          //     nums: 10,
          //     productDate: "2020-08-08",
          //     status: 0,
          //   },
          //   {
          //     no: "20160502",
          //     productName: "手机",
          //     nums: 10,
          //     productDate: "2020-08-08",
          //     status: 0,
          //   },
          //   {
          //     no: "20160502",
          //     productName: "手机",
          //     nums: 10,
          //     productDate: "2020-08-08",
          //     status: 0,
          //   },
          //   {
          //     no: "20160502",
          //     productName: "手机",
          //     nums: 10,
          //     productDate: "2020-08-08",
          //     status: 0,
          //   },
          // ];
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
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
    }, //编辑(第一次查询)
    onEdit(index, row) {
      this.dialogVisible2 = true; //dialog对话窗口打开
<<<<<<< HEAD
      console.log(row.no);
      this.ruleForm.taskid = row.no;
      this.ruleForm.No = row.no;
      this.ruleForm.Id = row.id;
    }, //编辑(修改数据)
    submitForm(AddForm) {
      var that = this;
      this.$refs.AddForm.validate((valid) => {
        if (valid) {
          console.log(that.ruleForm);
          this.$axios
            .post("/QualityManagement/AddQP", this.ruleForm)
            .then(function (response) {
              console.log(response.data);
              that.$message.success("添加成功！");
              that.dialogVisible = false;
              that.dialogVisible2 = false;
              that.SelectAllQualityproducts();
            })
            .catch(function (error) {
              //that.$message.error("添加失败error2！");
=======
      this.ruleForm.taskid = row.no;
    }, //编辑(修改数据)
    submitForm2(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //this.$message.error("暂无数据，请勿操作!");
          var that = this;
          this.$axios
            .post("/SaleManagement/EditSSO", {
              params: {
                table: that.ruleForm,
              },
            })
            .then(function (response) {
              console.log(response.data);
              if (response.data > 0) {
                that.$message.success("修改成功！");
                that.ruleForm = {};
              } else {
                that.$message.error("修改成功！");
                that.ruleForm = {};
              }
            })
            .catch(function (error) {
              that.$message.error("添加失败error2！");
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
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
<<<<<<< HEAD
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      var that = this;
      this.$axios
        .get(
          `/QualityManagement/GetPPT?pageIndex=${val}`
        )
        .then((res) => {
          // if (res.data.entity.length != 0) {
          //   res.data.entity.forEach((element) => {
          //     element.purchaseDate = element.purchaseDate.substring(0, 10);
          //   });
          // }
          console.log(res.data.entity)
          that.tableData = res.data.entity;
          that.totalNum = Number(res.data.msg);
        });
    },
  },
};
</script>
=======
  },
};
</script>
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
