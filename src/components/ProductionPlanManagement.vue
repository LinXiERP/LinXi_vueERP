<template>
  <el-row :gutter="20">
    <!-- <el-col :span="6">
      <div class="grid-content bg-purple" style="font-size:40px;">生产计划管理</div>
    </el-col>-->
    <el-col :span="24">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="计划单编号">
          <el-input
            onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
            placeholder="生产单编号"
            v-model="formInline.taskid"
            id="planid"
          ></el-input>
        </el-form-item>
        <el-form-item label="生产年份">
          <el-date-picker type="year" v-model="formInline.year" placeholder="选择年"></el-date-picker>
        </el-form-item>
        <el-form-item label="月份">
          <el-select v-model="formInline.month" placeholder="选择月">
            <el-option label="1月" value="01"></el-option>
            <el-option label="2月" value="02"></el-option>
            <el-option label="3月" value="03"></el-option>
            <el-option label="4月" value="04"></el-option>
            <el-option label="5月" value="05"></el-option>
            <el-option label="6月" value="06"></el-option>
            <el-option label="7月" value="07"></el-option>
            <el-option label="8月" value="08"></el-option>
            <el-option label="9月" value="09"></el-option>
            <el-option label="10月" value="10"></el-option>
            <el-option label="11月" value="11"></el-option>
            <el-option label="12月" value="12"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSelect" icon="el-icon-search">查询</el-button>
        </el-form-item>

        <el-form-item class>
          <el-button
            type="primary"
            @click="dialogVisible = true"
            icon="el-icon-circle-plus-outline"
          >添加</el-button>
          <el-dialog
            title="添加待质检产品"
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
              <el-form-item label="生产单号" prop="no">
                <el-input v-model="ruleForm.no" style="width:110%"></el-input>
              </el-form-item>

              <el-form-item label="产品名称" prop="Productid">
                <el-select v-model="ruleForm.Productid" placeholder="请选择产品名称" style="width:100%">
                  <el-option
                    v-for="item in allproducts"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <br />
              <br />

              <el-form-item label="部门名称" prop="departmentid">
                <el-select v-model="ruleForm.departmentid" placeholder="请选择部门名称">
                  <el-option
                    v-for="item in alldepart"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="质检单编号" prop="qmid" style="margin-left:-16px;">
                <el-input v-model="ruleForm.qmid" style="width:110%"></el-input>
              </el-form-item>
              <br />
              <br />

              <el-form-item label="生产日期" prop="productdate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm.productdate"
                  style="width: 95%;"
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="批次号" prop="batch" style="margin-left:-30px">
                <el-input type="text" v-model="ruleForm.batch" style="width:110%"></el-input>
              </el-form-item>
              <br />
              <br />

              <el-form-item label="数量" prop="nums">
                <el-input type="number" v-model="ruleForm.nums" style="width:110%"></el-input>
              </el-form-item>

              <el-form-item label="操作员" prop="Operatorid" style="margin-left:0px;">
                <el-select v-model="ruleForm.Operatorid" placeholder="请选择操作员名称">
                  <el-option
                    v-for="item in allstaff"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <br />
              <br />

              <el-form-item label="备注" prop="Remark">
                <el-input v-model="ruleForm.Remark" style="width:110%"></el-input>
              </el-form-item>

              <br />
              <el-form-item style="margin-left:430px;">
                <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
                <el-button type="success" @click="submitForm('ruleForm')">立即添加</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>

          <el-dialog
            title="填写待质检产品"
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
              <el-form-item label="质检单编号" prop="qmid" style="margin-left:0px;">
                <el-input v-model="ruleForm.qmid" style="width:110%"></el-input>
              </el-form-item>

              <el-form-item label="生产单号" prop="taskid">
                <el-input v-model="ruleForm2.taskid" style="width:110%"></el-input>
              </el-form-item>
              <br />
              <br />

              <el-form-item label="质检日期" prop="qmdate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm2.qmdate"
                  style="width: 95%;"
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="质检结果" prop="result" style="margin-left:-28px;">
                <el-select v-model="ruleForm2.result" placeholder="请选择质检结果" style="width:100%">
                  <el-option value="合格">合格</el-option>
                  <el-option value="不合格">不合格</el-option>
                </el-select>
              </el-form-item>
              <br />
              <br />

              <el-form-item label="经手人" prop="handleid" style="margin-left:0px;">
                <el-select v-model="ruleForm2.handleid" placeholder="请选择经手人名称">
                  <el-option
                    v-for="item in allstaff"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="操作人" prop="Operatorid" style="margin-left:-13px;">
                <el-select v-model="ruleForm2.Operatorid" placeholder="请选择操作人名称">
                  <el-option
                    v-for="item in allstaff"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <br />
              <br />

              <el-form-item label="备注" prop="Remark">
                <el-input v-model="ruleForm2.Remark" style="width:110%"></el-input>
              </el-form-item>

              <br />
              <el-form-item style="margin-left:430px;">
                <el-button type="primary" @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="resetForm('ruleForm2')">重置</el-button>
                <el-button type="success" @click="submitForm('ruleForm2')">立即添加</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>

          <el-button
            type="primary"
            @click="onSelectALL"
            icon="el-icon-refresh"
            style="margin-left:10px;"
          >刷新</el-button>
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
      <el-table-column prop="id" label="计划编号"></el-table-column>
      <el-table-column prop="productName" label="产品名称"></el-table-column>
      <el-table-column prop="nums" label="计划产量"></el-table-column>
      <el-table-column prop="productDate" label="生产时间" :formatter="formatDate"></el-table-column>
      <el-table-column prop="operatorName" label="经手人"></el-table-column>
      <el-table-column prop="no" label="订单编号" :formatter="formatterColumnstate"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- @click="onEdit(scope.$index, scope.row)" -->
          <el-button type="primary" @click="onEdit(scope.$index, scope.row)" icon="el-icon-edit">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      alldepart: [],
      allstaff: [],
      allproducts: [],
      formInline: {
        taskid: "",
        year: "",
        month: "",
      },
      ruleForm: {
        no: "",
        Productid: "",
        productdate: "",
        batch: "",
        departmentid: "",
        nums: "",
        remark: "",
        Operatorid: "",
        qmid: "",
      },
      ruleForm2: {
        qmid: "",
        taskid: "",
        qmdate: "",
        result: "",
        Operatorid: "",
        handleid: "",
        Remark: "",
      },
      rules: {
        nums: [{ required: true, message: "请输入数量", trigger: "change" }],
        no: [{ required: true, message: "请输入生产单号", trigger: "change" }],
        Productid: [
          { required: true, message: "请选择产品名称", trigger: "change" },
        ],
        productdate: [
          { required: true, message: "请输入生产日期", trigger: "change" },
        ],
        batch: [{ required: true, message: "请输入批次号", trigger: "change" }],
        departmentid: [
          { required: true, message: "请选择部门名称", trigger: "change" },
        ],
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
    this.tableinitialization();
  },
  methods: {
    tableinitialization() {
      var that = this;
      this.$axios
        .get("/ProductionManagement/GetPPTs")
        .then(function (response) {
          for (var i = 0; i < response.data.length; i++) {
            that.tableData.push(response.data[i]);
          }
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
      var fomatyear = "";
      if (that.formInline.year != "" && that.formInline.year != null) {
        var date = new Date(that.formInline.year);
        fomatyear = date.getFullYear();
      }
      alert(fomatyear);
      this.$axios
        .get("/ProductionManagement/GetPPT", {
          params: {
            year: fomatyear,
            month: that.formInline.month,
            id: that.formInline.taskid,
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
    }, //刷新
    onSelectALL() {
      var that = this;
      if (
        that.formInline.taskid != "" ||
        that.formInline.year != "" ||
        that.formInline.month != ""
      ) {
        var fomatyear = "";
        if (that.formInline.year != "" && that.formInline.year != null) {
          var date = new Date(that.formInline.year);
          fomatyear = date.getFullYear();
        }
        this.$axios
          .get("/ProductionManagement/GetPPT", {
            params: {
              year: fomatyear,
              month: that.formInline.month,
              id: that.formInline.taskid,
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
      } else {
        that.tableData = [];
        this.$axios
          .get("/ProductionManagement/GetPPTs")
          .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
              that.tableData.push(response.data[i]);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
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
      this.dialogVisible2 = true; //dialog对话窗口打开
      //this.ruleForm2 = Object.assign({}, row);//将数据传入dialog页面
      //this.ruleForm2.index=index;//传递当前index
      //this.$message.error("暂无数据，请勿操作!");
      var that = this;
      this.$axios
        .get("/SaleManagement/GetSSOID", {
          params: {
            id: row.no,
          },
        })
        .then(function (response) {
          console.log(response.data);
          console.log(response.data.ProductId);
          that.ruleForm2 = response.data;
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
};
</script>