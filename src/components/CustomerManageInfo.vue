<template>
  <div id="CustomerManage">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      type="card"
    >
      <el-tab-pane
        label="用户列表"
        name="first"
      >
        <el-row>
<<<<<<< HEAD
          <el-input
            placeholder="请输入内容"
            v-model="SearchCustomer.name"
            class="input-with-select"
          >
=======
          <el-input placeholder="请输入内容" v-model="SearchCustomer.name" class="input-with-select">
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
            <el-select
              v-model="SearchCustomer.select"
              slot="prepend"
              placeholder="请选择"
              style="width:150px;"
            >
              <el-option
                label="客户姓名"
                value="1"
              ></el-option>
              <el-option
                label="客户电话"
                value="2"
              ></el-option>
              <el-option
                label="联系人名"
                value="3"
              ></el-option>
            </el-select>
            <el-button
              slot="append"
              icon="el-icon-search"
              style="width:150px;"
              @click="SelectCustomer"
            ></el-button>
          </el-input>
        </el-row>
        <el-table
          :data="CustomerList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          style="width: 100%"
          v-loading="loading"
        >
<<<<<<< HEAD
          <el-table-column
            prop="id"
            label="客户编号"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="客户名称"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="客户地址"
          ></el-table-column>
          <el-table-column
            prop="custtel"
            label="电话"
          ></el-table-column>
          <el-table-column
            prop="linkman"
            label="联系人"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="email"
            label="email"
          ></el-table-column>
          <el-table-column
            prop="linktel"
            label="联系人电话"
            width="120"
          ></el-table-column>
          <el-table-column
            label
            width="300"
          >
=======
          <el-table-column prop="id" label="客户编号" width="120"></el-table-column>
          <el-table-column prop="name" label="客户名称" width="120"></el-table-column>
          <el-table-column prop="address" label="客户地址"></el-table-column>
          <el-table-column prop="custtel" label="电话"></el-table-column>
          <el-table-column prop="linkman" label="联系人" width="100"></el-table-column>
          <el-table-column prop="email" label="email"></el-table-column>
          <el-table-column prop="linktel" label="联系人电话" width="120"></el-table-column>
          <el-table-column label width="300">
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
            <template slot-scope="scope">
              <el-button type="primary" @click="ToEditCustomer(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" @click="DeleteCustomer(scope.$index, scope.row)">删除</el-button>
              <el-button type="primary" @click="TodetailCustomer(scope.$index, scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row style="text-align:center;">
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
      </el-tab-pane>

      <el-tab-pane
        label="编辑用户"
        name="second"
      >
        <el-form
          ref="Customer"
          :model="CustomerItem"
          label-width="90px"
          size="medium"
        >
          <el-row>
            <el-col :span="24">
              <div
                class="grid-content bg-purple-dark"
                style="text-align:center;font-size:25px;margin-bottom:15px;"
              >添加客户</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="客户姓名">
                <el-input
                  v-model="CustomerItem.name"
                  placeholder="客户姓名"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="邮政编码">
                <el-input
                  v-model="CustomerItem.postcode"
                  placeholder="邮政编码"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户地址">
                <el-input
                  v-model="CustomerItem.address"
                  placeholder="客户地址"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="联系电话">
                <el-input
                  v-model="CustomerItem.custtel"
                  placeholder="联系电话"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系人">
                <el-input
                  v-model="CustomerItem.linkman"
                  placeholder="联系人"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系人电话">
                <el-input
                  v-model="CustomerItem.linktel"
                  placeholder="联系人电话"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="邮箱账号">
                <el-input
                  v-model="CustomerItem.email"
                  placeholder="邮箱账号"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户性别">
                <!-- <el-input v-model="CustomerItem.sex" placeholder="客户性别"></el-input> -->
<<<<<<< HEAD
                <el-select
                  v-model="CustomerItem.sex"
                  placeholder="客户性别"
                >
                  <el-option
                    label="男"
                    :value="1"
                    :key="1"
                  ></el-option>
                  <el-option
                    label="女"
                    :value="2"
                    :key="2"
                  ></el-option>
=======
                <el-select v-model="CustomerItem.sex" placeholder="客户性别">
                  <el-option label="男" :value="1" :key="1"></el-option>
                  <el-option label="女" :value="2" :key="2"></el-option>
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户生日">
                <!-- <el-input v-model="CustomerItem.birthday" placeholder="客户生日"></el-input> -->
<<<<<<< HEAD
                <el-date-picker
=======
                      <el-date-picker
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
                  v-model="CustomerItem.birthday"
                  type="date"
                  placeholder="交货日期"
                  clearable:true
                  required
                  style="width:100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="客户爱好">
                <el-input
                  v-model="CustomerItem.love"
                  placeholder="客户爱好"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="备注">
                <el-input
                  v-model="CustomerItem.remark"
                  placeholder="备注"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-form-item>
              <el-col :span="10">
                <el-button
                  type="primary"
                  style="width:90%;height:50px;"
                  @click="UpdateCustomer"
                >提交</el-button>
              </el-col>
              <el-col :span="10">
                <el-button
                  type="warning"
                  style="width:90%;height:50px;"
                >重置</el-button>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
      </el-tab-pane>

<<<<<<< HEAD
      <el-tab-pane
        label="客户详情"
        name="third"
      >
        <el-form
          ref="Customer"
          :model="CustomerItem"
          label-width="90px"
          size="medium"
        >
=======
      <el-tab-pane label="客户详情" name="third">
        <el-form ref="Customer" :model="CustomerItem" label-width="90px" size="medium">
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
          <el-row>
            <el-col :span="24">
              <div
                class="grid-content bg-purple-dark"
                style="text-align:center;font-size:25px;margin-bottom:15px;"
              >添加客户</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="客户姓名">
<<<<<<< HEAD
                <el-input
                  v-model="CustomerItem.name"
                  readonly
                  placeholder="客户姓名"
                ></el-input>
=======
                <el-input v-model="CustomerItem.name" readonly placeholder="客户姓名"></el-input>
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="邮政编码">
<<<<<<< HEAD
                <el-input
                  v-model="CustomerItem.postcode"
                  readonly
                  placeholder="邮政编码"
                ></el-input>
=======
                <el-input v-model="CustomerItem.postcode" readonly placeholder="邮政编码"></el-input>
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户地址">
<<<<<<< HEAD
                <el-input
                  v-model="CustomerItem.address"
                  readonly
                  placeholder="客户地址"
                ></el-input>
=======
                <el-input v-model="CustomerItem.address" readonly placeholder="客户地址"></el-input>
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="联系电话">
<<<<<<< HEAD
                <el-input
                  v-model="CustomerItem.custtel"
                  readonly
                  placeholder="联系电话"
                ></el-input>
=======
                <el-input v-model="CustomerItem.custtel" readonly placeholder="联系电话"></el-input>
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系人">
<<<<<<< HEAD
                <el-input
                  v-model="CustomerItem.linkman"
                  readonly
                  placeholder="联系人"
                ></el-input>
=======
                <el-input v-model="CustomerItem.linkman" readonly placeholder="联系人"></el-input>
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系人电话">
<<<<<<< HEAD
                <el-input
                  v-model="CustomerItem.linktel"
                  readonly
                  placeholder="联系人电话"
                ></el-input>
=======
                <el-input v-model="CustomerItem.linktel" readonly placeholder="联系人电话"></el-input>
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="邮箱账号">
<<<<<<< HEAD
                <el-input
                  v-model="CustomerItem.email"
                  readonly
                  placeholder="邮箱账号"
                ></el-input>
=======
                <el-input v-model="CustomerItem.email" readonly placeholder="邮箱账号"></el-input>
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户性别">
                <!-- <span>{{CustomerItem.sex==1?"男":"女"}}</span> -->
<<<<<<< HEAD
                <el-input
                  v-if="CustomerItem.sex==null"
                  value=""
                  readonly
                  placeholder="客户性别"
                ></el-input>
                <el-input
                  v-else
                  :value="CustomerItem.sex==1?'男':'女'"
                  readonly
                  placeholder="客户性别"
                ></el-input>
=======
                 <el-input v-if="CustomerItem.sex==null" value="" readonly placeholder="客户性别"></el-input>
                <el-input v-else :value="CustomerItem.sex==1?'男':'女'" readonly placeholder="客户性别"></el-input>
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户生日">
<<<<<<< HEAD
                <el-input
                  v-model="CustomerItem.birthday"
                  readonly
                  placeholder="客户生日"
                ></el-input>
=======
                <el-input v-model="CustomerItem.birthday" readonly placeholder="客户生日"></el-input>
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="客户爱好">
<<<<<<< HEAD
                <el-input
                  v-model="CustomerItem.love"
                  readonly
                  placeholder="客户爱好"
                ></el-input>
=======
                <el-input v-model="CustomerItem.love" readonly placeholder="客户爱好"></el-input>
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="备注">
<<<<<<< HEAD
                <el-input
                  v-model="CustomerItem.remark"
                  readonly
                  placeholder="备注"
                ></el-input>
=======
                <el-input v-model="CustomerItem.remark" readonly placeholder="备注"></el-input>
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>

<<<<<<< HEAD
      <el-tab-pane
        label="添加客户"
        name="fourth"
      >
        <el-form
          ref="Customer"
          :model="CustomerItem"
          label-width="90px"
          size="medium"
        >
=======
      <el-tab-pane label="添加客户" name="fourth">
        <el-form ref="Customer" :model="CustomerItem" label-width="90px" size="medium">
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
          <el-row>
            <el-col :span="24">
              <div
                class="grid-content bg-purple-dark"
                style="text-align:center;font-size:25px;margin-bottom:15px;"
              >添加客户</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="客户姓名">
                <el-input
                  v-model="CustomerItem.name"
                  placeholder="客户姓名"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="邮政编码">
                <el-input
                  v-model="CustomerItem.postcode"
                  placeholder="邮政编码"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户地址">
                <el-input
                  v-model="CustomerItem.address"
                  placeholder="客户地址"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="联系电话">
                <el-input
                  v-model="CustomerItem.custtel"
                  placeholder="联系电话"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系人">
                <el-input
                  v-model="CustomerItem.linkman"
                  placeholder="联系人"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系人电话">
                <el-input
                  v-model="CustomerItem.linktel"
                  placeholder="联系人电话"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="邮箱账号">
                <el-input
                  v-model="CustomerItem.email"
                  placeholder="邮箱账号"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户性别">
                <!-- <el-input v-model="CustomerItem.sex" placeholder="客户性别"></el-input> -->
<<<<<<< HEAD
                <el-select
                  v-model="CustomerItem.sex"
                  placeholder="客户性别"
                >
                  <el-option
                    label="男"
                    :value="1"
                    :key="1"
                  ></el-option>
                  <el-option
                    label="女"
                    :value="2"
                    :key="2"
                  ></el-option>
=======
                 <el-select v-model="CustomerItem.sex" placeholder="客户性别">
                  <el-option label="男" :value="1" :key="1"></el-option>
                  <el-option label="女" :value="2" :key="2"></el-option>
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户生日">
                <!-- <el-input v-model="CustomerItem.birthday" placeholder="客户生日"></el-input> -->

<<<<<<< HEAD
                <el-date-picker
=======
                    <el-date-picker
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
                  v-model="CustomerItem.birthday"
                  type="date"
                  placeholder="交货日期"
                  clearable:true
                  required
                  style="width:100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="客户爱好">
                <el-input
                  v-model="CustomerItem.love"
                  placeholder="客户爱好"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="备注">
                <el-input
                  v-model="CustomerItem.remark"
                  placeholder="备注"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-form-item>
              <el-col :span="10">
                <el-button
                  type="primary"
                  style="width:90%;height:50px;"
                  @click="AddCustomer"
                >提交</el-button>
              </el-col>
              <el-col :span="10">
                <el-button
                  type="warning"
                  style="width:90%;height:50px;"
                >重置</el-button>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      select: "",
      CustomerItem: {}, //单个客户
      currentPage: 1, //默认显示第一页
      pageSize: 8, //默认每页显示8条
      totalNum: 0, //总页数
      CustomerList: [], //客户集合
      SearchCustomer: {
        //查询客户
        name: "", //要查询的姓名
        select: "1", //查询的方式1.客户姓名，2.客户电话，3.联系人名
      },
      loading: true, //表格加载
    };
  },
  created() {
    this.SelectAllCustomer(); //默认进来就加载所有的客户
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      this.CustomerItem = {};
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    ToEditCustomer(index, row) {
      this.CustomerItem = this.CustomerList[index + (this.currentPage - 1) * 8];
      this.activeName = "second";
    },
    TodetailCustomer(index, row) {
      this.CustomerItem = this.CustomerList[index + (this.currentPage - 1) * 8];
      this.activeName = "third";
    },
    //删除客户
    DeleteCustomer(index, row) {
      var th = this;
      var t = this.CustomerList[index + (th.currentPage - 1) * 8];
      console.log(t);
      //请求删除客户的接口

      this.$confirm("确定要删除客户码?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .delete("/CustomerManagement/DeleteCustomerInfo?id=" + t.id)
            .then(function (response) {
              // alert(response.data.code);
              if (response.data.code === 200) {
                th.$message.success("删除成功!");
                th.CustomerList.splice(index + (th.currentPage - 1) * 8, 1);
              } else {
                th.$message.error("删除失败!");
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "success",
            message: "已取消删除",
          });
        });
    },
    //查询所有客户
    SelectAllCustomer() {
      var t = this;
      this.$axios
        .get("/CustomerManagement/GetAllCustomerInfo")
        .then(function (response) {
          console.log(response.data);
          t.totalNum = response.data.length; //多少页数据
          t.CustomerList = response.data; //将客户集合给前端
          t.loading = false; //表格加载完成
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    UpdateCustomer() {
      var t = this;
      this.$axios
        .put("/CustomerManagement/UpdateCustomerInfo", t.CustomerItem)
        .then(function (response) {
          // console.log(response.data.code == 200);
          if (response.data.code == 200) {
            t.$message.success("更新成功！");
            t.CustomerItem = {};
            t.$options.methods.SelectAllCustomer();
          } else {
            t.$message.error("更新失败！");
            t.CustomerItem = {};
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    AddCustomer() {
      var t = this;
      this.$axios
        .post("/CustomerManagement/AddCustomerInfo", t.CustomerItem)
        .then(function (response) {
          console.log(response.data.code == 200);
          if (response.data.code == 200) {
            t.$message.success("添加成功！");
            t.CustomerItem = {};
            t.SelectAllCustomer();
          } else {
            t.$message.error("添加失败！");
            t.CustomerItem = {};
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    SelectCustomer() {
      var t = this;
      console.log(t.SearchCustomer.select, t.SearchCustomer.name);
      this.$axios
        .get(
          "/CustomerManagement/SelectCustomerInfo?name=" +
            t.SearchCustomer.name +
            "&select=" +
            t.SearchCustomer.select
        )
        .then(function (response) {
          t.CustomerList = response.data;
          t.$message.success("查询成功");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>


