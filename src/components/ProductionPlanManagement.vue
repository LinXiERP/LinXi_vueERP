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

        <el-form-item>
          <el-button
            type="primary"
            @click="dialogFormVisible = true;getselectlist()"
            icon="el-icon-circle-plus-outline"
          >添加</el-button>
          <el-dialog title="添加生产计划" :visible.sync="dialogFormVisible" width="40%">
            <el-form :model="addform" :rules="rules" ref="addform">
              <el-row>
                <el-form-item
                  label="计划编号"
                  :label-width="formLabelWidth"
                  prop="id"
                  style="padding-bottom:20px;"
                >
                  <el-input
                    onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
                    placeholder="计划编号"
                    v-model="addform.id"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="订单编号"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                >
                  <el-select
                    v-model="addform.no"
                    placeholder="选择订单编号"
                    style="width:400px;margin-left:-70px"
                  >
                    <el-option label="订单外" value=""></el-option>
                    <el-option
                      v-for="(item,index) in slorder"
                      :key="index"
                      :label="item.id"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="产品名称"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="productId"
                >
                  <el-select
                    v-model="addform.productId"
                    placeholder="选择产品名称"
                    style="width:400px;margin-left:-70px"
                  >
                    <el-option
                      v-for="(item,index) in products"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="生产数量"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="nums"
                >
                  <el-input
                    onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
                    placeholder="生产数量"
                    v-model="addform.nums"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="生产日期"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="productDate"
                >
                  <el-date-picker
                    v-model="addform.productDate"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions"
                    style="width:400px;margin-left:-70px"
                  ></el-date-picker>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="生产批次"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="batch"
                >
                  <el-input
                    placeholder="批次号"
                    v-model="addform.batch"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="部门名称"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="departmentId"
                >
                  <el-select
                    v-model="addform.departmentId"
                    placeholder="选择部门名称"
                    style="width:400px;margin-left:-70px"
                  >
                    <el-option
                      v-for="(item,index) in departments"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="计划备注"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                >
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入备注"
                    maxlength="100"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                    v-model="addform.remark"
                  ></el-input>
                </el-form-item>
              </el-row>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="success" @click="addformsubmit(addform)">确 定</el-button>
            </div>
          </el-dialog>

          <el-dialog title="编辑生产计划" :visible.sync="dialogEditFormVisible" width="40%">
            <el-form :model="editform" :rules="rules" ref="editform">
              <el-row>
                <el-form-item
                  label="计划编号"
                  :label-width="formLabelWidth"
                  prop="id"
                  style="padding-bottom:20px;"
                >
                  <el-input
                    onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
                    placeholder="计划编号"
                    v-model="editform.id"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                    readonly
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="订单编号"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                >
                  <el-select
                    v-model="editform.no"
                    placeholder="选择订单编号"
                    style="width:400px;margin-left:-70px"
                  >
                    <el-option label="订单外" value></el-option>
                    <el-option
                      v-for="(item,index) in slorder"
                      :key="index"
                      :label="item.id"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="产品名称"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="productId"
                >
                  <el-select
                    v-model="editform.productId"
                    placeholder="选择产品名称"
                    style="width:400px;margin-left:-70px"
                  >
                    <el-option
                      v-for="(item,index) in products"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="生产数量"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="nums"
                >
                  <el-input
                    onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
                    placeholder="生产数量"
                    v-model="editform.nums"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="生产日期"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="productDate"
                >
                  <el-date-picker
                    v-model="editform.productDate"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions"
                    style="width:400px;margin-left:-70px"
                  ></el-date-picker>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="生产批次"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="batch"
                >
                  <el-input
                    placeholder="批次号"
                    v-model="editform.batch"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="部门名称"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="departmentId"
                >
                  <el-select
                    v-model="editform.departmentId"
                    placeholder="选择部门名称"
                    style="width:400px;margin-left:-70px"
                  >
                    <el-option
                      v-for="(item,index) in departments"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="计划备注"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                >
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入备注"
                    maxlength="100"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                    v-model="editform.remark"
                  ></el-input>
                </el-form-item>
              </el-row>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogEditFormVisible = false">取 消</el-button>
              <el-button type="success" @click="Editformsubmit(editform)">确 定</el-button>
            </div>
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
      <el-table-column width="130%" prop="id" label="计划编号"></el-table-column>
      <el-table-column width="150%" prop="productName" label="产品名称"></el-table-column>
      <el-table-column width="130%" prop="nums" label="计划产量"></el-table-column>
      <el-table-column prop="productDate" label="生产时间" :formatter="formatDate"></el-table-column>
      <el-table-column prop="operatorName" label="经手人"></el-table-column>
      <el-table-column prop="no" label="订单编号" :formatter="formatterColumnstate"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="dialogEditFormVisible=true;editInfo(scope.row.id);getselectlist()"
            v-if="scope.row.status==0"
            icon="el-icon-edit"
          >编辑</el-button>
          <el-button type="primary" v-else disabled icon="el-icon-edit">编辑</el-button>
          <el-button
            type="danger"
            @click="delInfo(scope.row.id)"
            v-if="scope.row.status==0"
            icon="el-icon-delete"
          >删除</el-button>
          <el-button type="danger" v-else disabled icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      slorder: [], //订单编号
      products: [], //产品编号
      departments: [], //部门编号
      //设置日期控件
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now();
        },
      },
      //查询内容
      formInline: {
        taskid: "",
        year: "",
        month: "",
      },
      rules: {
        id: [{ required: true, message: "请输入计划编号", trigger: "change" }],
        productId: [
          { required: true, message: "请选择产品名称", trigger: "change" },
        ],
        nums: [
          { required: true, message: "请输入生产数量", trigger: "change" },
        ],
        productDate: [
          { required: true, message: "请输入生产日期", trigger: "change" },
        ],
        batch: [{ required: true, message: "请输入批次号", trigger: "change" }],
        departmentId: [
          { required: true, message: "请选择部门名称", trigger: "change" },
        ],
      },
      tableData: [],
      dialogFormVisible: false,
      dialogEditFormVisible: false,
      addform: {
        id: "", //计划编号
        no: "", //订单编号
        productId: "", //产品编号
        nums: "", //计划生产数量
        productDate: "", //计划生产日期
        batch: "", //批次号
        departmentId: "", //部门编号
        operatorId: "", //经手人
        operateTime: "", //操作日期
        status: "", //状态
        remark: "", //备注
        qmId: "", //质检单编号
      },
      editform: {
        id: "", //计划编号
        no: "", //订单编号
        productId: "", //产品编号
        nums: "", //计划生产数量
        productDate: "", //计划生产日期
        batch: "", //批次号
        departmentId: "", //部门编号
        operatorId: "", //经手人
        operateTime: "", //操作日期
        status: "", //状态
        remark: "", //备注
        qmId: "", //质检单编号
      },
      formLabelWidth: "80px",
    };
  },
  mounted() {
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
  methods: {
    //提交修改
    Editformsubmit(editform){
      var that = this;
      this.$refs.editform.validate((valid) => {
        if (valid) {
          var date = new Date(that.editform.productDate);
          var year = date.getFullYear();
          var month = date.getMonth();
          var day = date.getDate();
          that.editform.productDate = year + "-" + month + "-" + day;
          this.$axios
            .put("/ProductionManagement/EditPPT", that.editform)
            .then(function (response) {
              if (response.data > 0) {
                that.$message.success("修改成功！");
                that.selecttablelist();
                that.editform = {};
                that.dialogEditFormVisible = false;
              } else {
                that.$message.error("修改失败！");
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          console.log("valid错误!");
          return false;
        }
      });
    },
    //编辑计划
    editInfo(id) {
      var index = this.tableData.findIndex(item => item.id == id);
      var task = this.tableData[index];
      this.editform=task;
    },
    //删除计划
    delInfo(id) {
      var that = this;
      this.$confirm("此操作将永久删除该条记录，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .delete("/ProductionManagement/DeletePPT", {
              params: {
                taskid: id,
              },
            })
            .then(function (response) {
              if (response.data > 0) {
                that.selecttablelist();
                that.$message.success("删除成功！");
              } else {
                that.$message.success("删除失败！");
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
    //获取下拉列表所需的数据
    getselectlist() {
      var that = this;
      this.$axios
        .get("/ProductionManagement/GetSOS")
        .then(function (response) {
          that.slorder = [];
          for (var i = 0; i < response.data.length; i++) {
            that.slorder.push(response.data[i]);
          }
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
      this.$axios
        .get("/ProductionManagement/GetADs")
        .then(function (response) {
          that.departments = [];
          for (var i = 0; i < response.data.length; i++) {
            that.departments.push(response.data[i]);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //表单提交
    addformsubmit(addform) {
      var that = this;
      this.$refs.addform.validate((valid) => {
        if (valid) {
          var date = new Date(that.addform.productDate);
          var year = date.getFullYear();
          var month = date.getMonth();
          var day = date.getDate();
          that.addform.productDate = year + "-" + month + "-" + day;
          this.$axios
            .post("/ProductionManagement/AddPPT", that.addform)
            .then(function (response) {
              if (response.data > 0) {
                that.$message.success("添加成功！");
                that.selecttablelist();
                that.addform = {};
                that.dialogFormVisible = false;
              } else if (response.data == -99) {
                that.$message.error("该订单编号已被占用！");
              } else {
                that.$message.error("添加失败！");
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          console.log("valid错误!");
          return false;
        }
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
  },
};
</script>