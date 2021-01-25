<template>
  <el-row :gutter="20">
    <!-- <el-col :span="6">
      <div class="grid-content bg-purple" style="font-size:40px;">生产计划管理</div>
    </el-col>-->
    <el-col :span="24">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="产品名称">
          <el-input placeholder="产品名称" v-model="formInline.name"></el-input>
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
          <el-dialog title="添加产品" :visible.sync="dialogFormVisible" width="40%">
            <el-form :model="addform" :rules="rules" ref="addform">
              <el-row>
                <el-form-item
                  label="产品编号"
                  :label-width="formLabelWidth"
                  prop="id"
                  style="padding-bottom:20px;"
                >
                  <el-input
                    onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
                    placeholder="产品编号"
                    v-model="addform.id"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="产品名称"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="name"
                >
                  <el-input
                    placeholder="产品名称"
                    v-model="addform.name"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="产品类别"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="categoryId"
                >
                  <el-select
                    v-model="addform.categoryId"
                    style="width:400px;margin-left:-70px"
                    placeholder="选择产品类别"
                  >
                    <el-option
                      v-for="(item,index) in categorys"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="商品条码"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="barCode"
                >
                  <el-input
                    placeholder="商品条码"
                    v-model="addform.barCode"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="单价"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="price"
                >
                  <el-input
                    placeholder="单价"
                    v-model="addform.price"
                    onkeyup="this.value = this.value.replace(/[^.\d]/g,'');"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="产地"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="place"
                >
                  <el-input
                    placeholder="产地"
                    v-model="addform.place"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="单位"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="unit"
                >
                  <el-input
                    placeholder="单位"
                    maxlength="4"
                    v-model="addform.unit"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="规格"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="spec"
                >
                  <el-input
                    placeholder="规格"
                    v-model="addform.spec"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="生产厂家"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="manufacturer"
                >
                  <el-input
                    placeholder="生产厂家"
                    v-model="addform.manufacturer"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="生产批文"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="licenseNo"
                >
                  <el-input
                    placeholder="生产批文"
                    v-model="addform.licenseNo"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item label="备注" :label-width="formLabelWidth" style="padding-bottom:20px;">
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

          <el-dialog title="编辑产品" :visible.sync="dialogEditFormVisible" width="40%">
            <el-form :model="editform" :rules="rules" ref="editform">
              <el-row>
                <el-form-item
                  label="产品编号"
                  :label-width="formLabelWidth"
                  prop="id"
                  style="padding-bottom:20px;"
                >
                  <el-input
                    onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
                    placeholder="产品编号"
                    v-model="editform.id"
<<<<<<< HEAD
                    readonly=""
=======
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="产品名称"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="name"
                >
                  <el-input
                    placeholder="产品名称"
                    v-model="editform.name"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="产品类别"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="categoryId"
                >
                  <el-select
                    v-model="editform.categoryId"
                    style="width:400px;margin-left:-70px"
                    placeholder="选择产品类别"
                  >
                    <el-option
                      v-for="(item,index) in categorys"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="商品条码"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="barCode"
                >
                  <el-input
                    placeholder="商品条码"
                    v-model="editform.barCode"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="单价"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="price"
                >
                  <el-input
                    placeholder="单价"
                    v-model="editform.price"
                    onkeyup="this.value = this.value.replace(/[^.\d]/g,'');"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="产地"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="place"
                >
                  <el-input
                    placeholder="产地"
                    v-model="editform.place"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="单位"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="unit"
                >
                  <el-input
                    placeholder="单位"
                    maxlength="4"
                    v-model="editform.unit"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="规格"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="spec"
                >
                  <el-input
                    placeholder="规格"
                    v-model="editform.spec"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="生产厂家"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="manufacturer"
                >
                  <el-input
                    placeholder="生产厂家"
                    v-model="editform.manufacturer"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="生产批文"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="licenseNo"
                >
                  <el-input
                    placeholder="生产批文"
                    v-model="editform.licenseNo"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item label="备注" :label-width="formLabelWidth" style="padding-bottom:20px;">
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
<<<<<<< HEAD
      v-loading = "loading"
=======
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
      style="width: 100%"
      :header-cell-style="thStyleFun"
      :cell-style="cellStyleFun"
    >
      <el-table-column width="130%" prop="id" label="产品编号"></el-table-column>
      <el-table-column width="150%" prop="name" label="产品名称"></el-table-column>
      <el-table-column width="130%" prop="place" label="产地"></el-table-column>
      <el-table-column prop="unit" label="单位"></el-table-column>
      <el-table-column prop="spec" label="规格"></el-table-column>
      <el-table-column prop="licenseNo" label="批号"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="dialogEditFormVisible=true;getselectlist();editInfo(scope.row.id);"
            icon="el-icon-edit"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
<<<<<<< HEAD
      loading:false,
=======
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
      categorys: [],
      suppliers: [],
      //查询内容
      formInline: {
        name: "",
      },
      rules: {
        id: [
          { required: true, message: "请输入产品编号", trigger: "change" },
        ],
        name: [
          { required: true, message: "请输入产品名称", trigger: "change" },
        ],
        categoryId: [
          { required: true, message: "请选择产品分类", trigger: "change" },
        ],
        barCode: [
          { required: true, message: "请输入产品条码", trigger: "change" },
        ],
        price: [{ required: true, message: "请输入价格", trigger: "change" }],
        place: [{ required: true, message: "请输入产地", trigger: "change" }],
        spec: [{ required: true, message: "请输入规格", trigger: "change" }],
        unit: [{ required: true, message: "请输入单位", trigger: "change" }],
        manufacturer: [{ required: true, message: "请输入生产厂家", trigger: "change" }],
        licenseNo: [
          { required: true, message: "请输入生产批文", trigger: "change" },
        ],
      },
      tableData: [],
      dialogFormVisible: false,
      dialogEditFormVisible: false,
      addform: {
        id:"",//产品编号
        categoryId:"",//产品分类编号
        barCode:"",//产品条码
        name:"",//产品名称
        price:"",//单价
        stock:"",//库存
        licenseNo:"",//生产批文
        spec:"",//规格
        unit:"",//单位
        place:"",//产地
        manufacturer:"",//生产厂家
        operatorId:"",//操作人
        operatorTime:"",//操作时间
        remark:"",//备注
      },
      editform: {
        id:"",//产品编号
        categoryId:"",//产品分类编号
        barCode:"",//产品条码
        name:"",//产品名称
        price:"",//单价
        stock:"",//库存
        licenseNo:"",//生产批文
        spec:"",//规格
        unit:"",//单位
        place:"",//产地
        manufacturer:"",//生产厂家
        operatorId:"",//操作人
        operatorTime:"",//操作时间
        remark:"",//备注
      },
      formLabelWidth: "95px",
    };
  },
  mounted() {
<<<<<<< HEAD
    this.loading=true;
=======
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
    var that = this;
    this.$axios
      .get("/BasicInformationManagement/GetPPs")
      .then(function (response) {
          that.tableData=[];
        for (var i = 0; i < response.data.length; i++) {
          that.tableData.push(response.data[i]);
        }
<<<<<<< HEAD
        that.loading=false;
=======
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    getselectlist() {
      var that = this;
      this.$axios
        .get("/BasicInformationManagement/GetPPCs")
        .then(function (response) {
          that.categorys = [];
          for (var i = 0; i < response.data.length; i++) {
            that.categorys.push(response.data[i]);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //提交修改
    Editformsubmit(editform) {
      var that = this;
      this.$refs.editform.validate((valid) => {
        if (valid) {
          this.$axios
            .put("/BasicInformationManagement/EditPP", that.editform)
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
    },
    //表单提交
    addformsubmit(addform) {
      var that = this;
      this.$refs.addform.validate((valid) => {
        if (valid) {
          this.$axios
            .post("/BasicInformationManagement/AddPP", that.addform)
            .then(function (response) {
              if (response.data > 0) {
                that.$message.success("添加成功！");
                that.selecttablelist();
                that.addform = {};
                that.dialogFormVisible = false;
              } else if (response.data == -99) {
                that.$message.error("该产品编号已被占用！");
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
        .get("/BasicInformationManagement/GetPPs")
        .then(function (response) {
            that.tableData=[];
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
        .get("/BasicInformationManagement/GetPP", {
          params: {
            name: that.formInline.name,
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
    thStyleFun() {
      return "text-align:center";
    },
    cellStyleFun() {
      return "text-align:center";
    },
  },
};
</script>