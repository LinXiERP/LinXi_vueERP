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
            v-model="formInline.recordid"
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
            <el-option label="待送检" value="0"></el-option>
            <el-option label="待入库" value="1"></el-option>
            <el-option label="不合格" value="2"></el-option>
            <el-option label="已入库" value="3"></el-option>
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
          <el-dialog title="生产登记" :visible.sync="dialogFormVisible" width="40%">
            <el-form :model="addform" :rules="rules" ref="addform">
              <el-row>
                <el-form-item
                  label="生产编号"
                  :label-width="formLabelWidth"
                  prop="id"
                  style="padding-bottom:20px;"
                >
                  <el-input
                    onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
                    placeholder="生产编号"
                    v-model="addform.id"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="计划编号"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                >
                  <el-select
                    v-model="addform.sourceCategory"
                    placeholder="选择计划编号"
                    style="width:400px;margin-left:-70px"
                  >
                    <el-option label="计划外" value></el-option>
                    <el-option
                      v-for="(item,index) in tasks"
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
                  label="生产部门"
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
                  label="生产批号"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="batch"
                >
                  <el-input
                    placeholder="生产批号"
                    v-model="addform.batch"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
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

          <el-dialog title="修改生产登记" :visible.sync="dialogEditFormVisible" width="40%">
            <el-form :model="editform" :rules="rules" ref="editform">
              <el-row>
                <el-form-item
                  label="生产编号"
                  :label-width="formLabelWidth"
                  prop="id"
                  style="padding-bottom:20px;"
                >
                  <el-input
                    onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
                    placeholder="生产编号"
                    v-model="editform.id"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                    readonly
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="计划编号"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                >
                  <el-select
                    v-model="editform.sourceCategory"
                    placeholder="选择计划编号"
                    style="width:400px;margin-left:-70px"
                  >
                    <el-option label="计划外" value></el-option>
                    <el-option
                      v-for="(item,index) in tasks"
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
                  label="生产部门"
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
                  label="生产批号"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="batch"
                >
                  <el-input
                    placeholder="生产批号"
                    v-model="editform.batch"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
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
      <el-table-column width="130%" prop="id" label="生产编号"></el-table-column>
      <el-table-column width="150%" prop="productName" label="产品名称"></el-table-column>
      <el-table-column width="130%" prop="nums" label="生产数量"></el-table-column>
      <el-table-column prop="receiptDate" label="生产日期" :formatter="formatDate"></el-table-column>
      <el-table-column
        width="150%"
        prop="sourceCategory"
        label="计划编号"
        :formatter="formatterPlanColumnstate"
      ></el-table-column>
      <el-table-column prop="no" label="状态" :formatter="formatterColumnstate"></el-table-column>
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
      products: [], //产品编号
      departments: [], //部门编号
      tasks: [], //计划编号
      //设置日期控件
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now();
        },
      },
      //查询内容
      formInline: {
        recordid: "",
        productid: "",
        status: "",
      },
      rules: {
        id: [{ required: true, message: "请输入生产编号", trigger: "change" }],
        nums: [
          { required: true, message: "请输入生产数量", trigger: "change" },
        ],
        productId: [
          { required: true, message: "请选择生产产品", trigger: "change" },
        ],
        batch: [
          { required: true, message: "请输入生产批号", trigger: "change" },
        ],
        departmentId: [
          { required: true, message: "请选择部门名称", trigger: "change" },
        ],
      },
      tableData: [],
      dialogFormVisible: false,
      dialogEditFormVisible: false,
      addform: {
        id: "", //生产编号
        sourceCategory: "", //源单类型
        productId: "", //产品编号
        batch: "", //生产批号
        nums: "", //生产数量
        departmentId: "", //部门编号
        remark: "", //备注

        sourceId: "", //源单编号
        sourceNo: "", //源单id
        reason: "", //原因
        warehouseId: "", //仓库编号
        staffId: "", //员工ID
        operatorId: "", //操作人
        operateTime: "", //生产日期
        isIn: "", //出入库
        name: "", //名称
        status: "", //状态
      },
      editform: {
        id: "", //生产编号
        sourceCategory: "", //源单类型
        productId: "", //产品编号
        batch: "", //生产批号
        nums: "", //生产数量
        departmentId: "", //部门编号
        remark: "", //备注

        sourceId: "", //源单编号
        sourceNo: "", //源单id
        reason: "", //原因
        warehouseId: "", //仓库编号
        staffId: "", //员工ID
        operatorId: "", //操作人
        operateTime: "", //生产日期
        isIn: "", //出入库
        name: "", //名称
        status: "", //状态
      },
      formLabelWidth: "95px",
    };
  },
  mounted() {
    var that = this;
    this.$axios
      .get("/ProductionManagement/GetIPRs")
      .then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
          that.tableData.push(response.data[i]);
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
  },
  methods: {
    //提交修改
    Editformsubmit(editform) {
      var that = this;
      this.$refs.editform.validate((valid) => {
        if (valid) {
          this.$axios
            .put("/ProductionManagement/EditIPRs", that.editform)
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
    //编辑领料单
    editInfo(id) {
      var index = this.tableData.findIndex((item) => item.id == id);
      var task = this.tableData[index];
      this.editform = task;
      console.log(this.editform);
    },
    //删除领料单
    delInfo(id) {
      var that = this;
      this.$confirm("此操作将永久删除该条记录，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .delete("/ProductionManagement/DeleteIPR", {
              params: {
                id: id,
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
      this.$axios
        .get("/ProductionManagement/GetPPTs")
        .then(function (response) {
          that.tasks = [];
          for (var i = 0; i < response.data.length; i++) {
            that.tasks.push(response.data[i]);
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
          this.$axios
            .post("/ProductionManagement/AddIPR", that.addform)
            .then(function (response) {
              if (response.data > 0) {
                that.$message.success("添加成功！");
                that.selecttablelist();
                that.addform = {};
                that.dialogFormVisible = false;
              } else if (response.data == -99) {
                that.$message.error("该生产编号已被占用！");
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
        .get("/ProductionManagement/GetIPRs")
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
    //查询
    onSelect() {
      var that = this;
      this.$axios
        .get("/ProductionManagement/GetIPR", {
          params: {
            id: that.formInline.recordid,
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
      if (row.status == 0) {
        return "待送检";
      } else if (row.status == 1) {
        return "待入库";
      } else if (row.status == 2) {
        return "不合格";
      } else {
        return "已入库";
      }
    },
    formatDate(row, column) {
      var currdate = new Date(row.operateTime);
      var year = currdate.getFullYear();
      var month = currdate.getMonth() + 1;
      var day = currdate.getDate();
      return year + "年" + month + "月" + day + "日";
    },
    formatterPlanColumnstate(row, column) {
      if (row.sourceCategory != "" && row.sourceCategory != null) {
        return row.sourceCategory;
      } else {
        return "订单外";
      }
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