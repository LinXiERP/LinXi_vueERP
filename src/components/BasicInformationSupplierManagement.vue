<template>
  <el-row :gutter="20">
    <!-- <el-col :span="6">
      <div class="grid-content bg-purple" style="font-size:40px;">生产计划管理</div>
    </el-col>-->
    <el-col :span="24">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="供应商名称">
          <el-input placeholder="供应商名称" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input placeholder="联系人" v-model="formInline.linkman"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSelect" icon="el-icon-search">查询</el-button>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="dialogFormVisible = true;"
            icon="el-icon-circle-plus-outline"
          >添加</el-button>
          <el-dialog title="添加供应商" :visible.sync="dialogFormVisible" width="40%">
            <el-form :model="addform" :rules="rules" ref="addform">
              <el-row>
                <el-form-item
                  label="供应商编号"
                  :label-width="formLabelWidth"
                  prop="id"
                  style="padding-bottom:20px;"
                >
                  <el-input
                    onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
                    placeholder="领料单编号"
                    v-model="addform.id"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="供应商名称"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="name"
                >
                  <el-input
                    placeholder="供应商名称"
                    v-model="addform.name"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="传真"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="postcode"
                >
                  <el-input
                    placeholder="传真"
                    onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
                    v-model="addform.postcode"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="地址"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="address"
                >
                  <el-input
                    placeholder="地址"
                    v-model="addform.address"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="联系人"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="linkman"
                >
                  <el-input
                    placeholder="联系人"
                    v-model="addform.linkman"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="电话"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="tel"
                >
                  <el-input
                    placeholder="电话"
                    onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
                    v-model="addform.tel"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="QQ"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="qq"
                >
                  <el-input
                    placeholder="QQ"
                    onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
                    v-model="addform.qq"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="微信"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="weixin"
                >
                  <el-input
                    placeholder="微信"
                    v-model="addform.weixin"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="Email"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="email"
                >
                  <el-input
                    placeholder="Email"
                    v-model="addform.email"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="信誉"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="credit"
                >
                  <el-rate v-model="addform.credit" style="margin-left:-70px;margin-top:10px"></el-rate>
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

          <el-dialog title="修改供应商" :visible.sync="dialogEditFormVisible" width="40%">
            <el-form :model="editform" :rules="rules" ref="editform">
              <el-row>
                <el-form-item
                  label="供应商编号"
                  :label-width="formLabelWidth"
                  prop="id"
                  style="padding-bottom:20px;"
                >
                  <el-input
                    onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
                    placeholder="领料单编号"
                    v-model="editform.id"
                    autocomplete="off"
                    readonly
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="供应商名称"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="name"
                >
                  <el-input
                    placeholder="供应商名称"
                    v-model="editform.name"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="传真"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="postcode"
                >
                  <el-input
                    placeholder="传真"
                    onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
                    v-model="editform.postcode"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="地址"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="address"
                >
                  <el-input
                    placeholder="地址"
                    v-model="editform.address"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="联系人"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="linkman"
                >
                  <el-input
                    placeholder="联系人"
                    v-model="editform.linkman"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="电话"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="tel"
                >
                  <el-input
                    placeholder="电话"
                    onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
                    v-model="editform.tel"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="QQ"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="qq"
                >
                  <el-input
                    placeholder="QQ"
                    onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
                    v-model="editform.qq"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="微信"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="weixin"
                >
                  <el-input
                    placeholder="微信"
                    v-model="editform.weixin"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="Email"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="email"
                >
                  <el-input
                    placeholder="Email"
                    v-model="editform.email"
                    autocomplete="off"
                    style="width:400px;margin-left:-70px"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item
                  label="信誉"
                  :label-width="formLabelWidth"
                  style="padding-bottom:20px;"
                  prop="credit"
                >
                  <el-rate v-model="editform.credit" style="margin-left:-70px;margin-top:10px"></el-rate>
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
      style="width: 100%"
      v-loading="loading"
      :header-cell-style="thStyleFun"
      :cell-style="cellStyleFun"
    >
      <el-table-column width="130%" prop="id" label="供应商编号"></el-table-column>
      <el-table-column width="150%" prop="name" label="供应商"></el-table-column>
      <el-table-column width="130%" prop="tel" label="电话"></el-table-column>
      <el-table-column prop="linkman" label="联系人"></el-table-column>
      <el-table-column prop="email" label="Email"></el-table-column>
      <el-table-column prop="credit" label="信誉度">
        <template slot-scope="scope">
          <el-rate :value="rateChange(scope.row.credit)" disabled></el-rate>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="dialogEditFormVisible=true;editInfo(scope.row.id);"
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
      loading:false,
      //查询内容
      formInline: {
        name: "",
        linkman: "",
      },
      rules: {
        id: [
          { required: true, message: "请输入供应商编号", trigger: "change" },
        ],
        name: [
          { required: true, message: "请输入供应商名称", trigger: "change" },
        ],
        address: [{ required: true, message: "请输入地址", trigger: "change" }],
        linkman: [
          { required: true, message: "请输入联系人", trigger: "change" },
        ],
        tel: [{ required: true, message: "请输入电话", trigger: "change" }],
        credit: [
          { required: true, message: "请选择信誉度", trigger: "change" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          { type: "email", message: "请输入正确的邮箱", trigger: "blur" },
        ],
      },
      tableData: [],
      dialogFormVisible: false,
      dialogEditFormVisible: false,
      addform: {
        id: "", //供应商编号
        name: "", //供应商名称
        postcode: "", //传真
        address: "", //地址
        linkman: "", //联系人
        tel: "", //电话
        qq: "", //QQ
        weixin: "", //微信
        email: "", //邮箱
        credit: 1, //信誉度
        remark: "", //备注
        operatorId: "", //操作人
        operateTime: "", //操作时间
      },
      editform: {
        id: "", //供应商编号
        name: "", //供应商名称
        postcode: "", //传真
        address: "", //地址
        linkman: "", //联系人
        tel: "", //电话
        qq: "", //QQ
        weixin: "", //微信
        email: "", //邮箱
        credit: 1, //信誉度
        remark: "", //备注
        operatorId: "", //操作人
        operateTime: "", //操作时间
      },
      formLabelWidth: "95px",
    };
  },
  mounted() {
    this.loading=true;
    var that = this;
    this.$axios
      .get("/BasicInformationManagement/GetPSs")
      .then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
          that.tableData.push(response.data[i]);
          that.loading=false;
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
            .put("/BasicInformationManagement/EditPS", that.editform)
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
            .post("/BasicInformationManagement/AddPS", that.addform)
            .then(function (response) {
              if (response.data > 0) {
                that.$message.success("添加成功！");
                that.selecttablelist();
                that.addform = {};
                that.dialogFormVisible = false;
              } else if (response.data == -99) {
                that.$message.error("该供应商编号已被占用！");
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
        .get("/BasicInformationManagement/GetPSs")
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
        .get("/BasicInformationManagement/GetPS", {
          params: {
            name: that.formInline.name,
            linkman: that.formInline.linkman,
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
    rateChange(num) {
      return Number(num);
    },
  },
};
</script>