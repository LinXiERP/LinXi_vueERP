<template>
  <div id="CustomerManage">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="用户列表" name="first">
        <el-row>
          <el-input placeholder="请输入内容" v-model="SearchCustomer.name"  class="input-with-select">
            <el-select
              v-model="SearchCustomer.select"
              slot="prepend"
              placeholder="请选择"
              style="width:150px;"
            >
              <el-option label="客户姓名" value="1"></el-option>
              <el-option label="客户电话" value="2"></el-option>
              <el-option label="联系人名" value="3"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" style="width:150px;" @click="SelectCustomer"></el-button>
          </el-input>
        </el-row>
        <el-table
          :data="CustomerList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column prop="id" label="客户编号" width="120"></el-table-column>
          <el-table-column prop="name" label="客户名称" width="120"></el-table-column>
          <el-table-column prop="address" label="客户地址"></el-table-column>
            <el-table-column prop="custtel" label="电话"></el-table-column>
          <el-table-column prop="linkman" label="联系人" width="100"></el-table-column>
          <el-table-column prop="email" label="email"></el-table-column>
          <el-table-column prop="linktel" label="联系人电话" width="120"></el-table-column>
          <el-table-column label width="300">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="ToEditCustomer(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                type="danger"
                @click="DeleteCustomer(scope.$index, scope.row)"
              >删除</el-button>
              <el-button
                type="primary"
                @click="TodetailCustomer(scope.$index, scope.row)"
              >详情</el-button>
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

      <el-tab-pane label="编辑用户" name="second">
        <el-form ref="Customer" :model="CustomerItem" label-width="90px" size="medium">
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
                <el-input v-model="CustomerItem.name" placeholder="客户姓名"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="邮政编码">
                <el-input v-model="CustomerItem.postcode" placeholder="邮政编码"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户地址">
                <el-input v-model="CustomerItem.address" placeholder="客户地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="联系电话">
                <el-input v-model="CustomerItem.custtel" placeholder="联系电话"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系人">
                <el-input v-model="CustomerItem.linkman" placeholder="联系人"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系人电话">
                <el-input v-model="CustomerItem.linktel" placeholder="联系人电话"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="邮箱账号">
                <el-input v-model="CustomerItem.email" placeholder="邮箱账号"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户性别">
                <el-input v-model="CustomerItem.sex" placeholder="客户性别"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户生日">
                <el-input v-model="CustomerItem.birthday" placeholder="客户生日"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="客户爱好">
                <el-input v-model="CustomerItem.love" placeholder="客户爱好"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="备注">
                <el-input v-model="CustomerItem.remark" placeholder="备注"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-form-item>
              <el-col :span="10">
                <el-button type="primary" style="width:90%;height:50px;" @click="UpdateCustomer">提交</el-button>
              </el-col>
              <el-col :span="10">
                <el-button type="warning" style="width:90%;height:50px;">重置</el-button>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="用户详情" name="third">
        <el-form ref="Customer" :model="CustomerItem" label-width="90px" size="medium">
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
                <el-input v-model="CustomerItem.name" placeholder="客户姓名"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="邮政编码">
                <el-input v-model="CustomerItem.postcode" placeholder="邮政编码"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户地址">
                <el-input v-model="CustomerItem.address" placeholder="客户地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="联系电话">
                <el-input v-model="CustomerItem.custtel" placeholder="联系电话"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系人">
                <el-input v-model="CustomerItem.linkman" placeholder="联系人"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系人电话">
                <el-input v-model="CustomerItem.linktel" placeholder="联系人电话"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="邮箱账号">
                <el-input v-model="CustomerItem.email" placeholder="邮箱账号"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户性别">
                <el-input v-model="CustomerItem.sex" placeholder="客户性别"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户生日">
                <el-input v-model="CustomerItem.birthday" placeholder="客户生日"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="客户爱好">
                <el-input v-model="CustomerItem.love" placeholder="客户爱好"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="备注">
                <el-input v-model="CustomerItem.remark" placeholder="备注"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="添加用户" name="fourth">
        <el-form ref="Customer" :model="CustomerItem" label-width="90px" size="medium">
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
                <el-input v-model="CustomerItem.name" placeholder="客户姓名"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="邮政编码">
                <el-input v-model="CustomerItem.postcode" placeholder="邮政编码"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户地址">
                <el-input v-model="CustomerItem.address" placeholder="客户地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="联系电话">
                <el-input v-model="CustomerItem.custtel" placeholder="联系电话"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系人">
                <el-input v-model="CustomerItem.linkman" placeholder="联系人"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系人电话">
                <el-input v-model="CustomerItem.linktel" placeholder="联系人电话"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="邮箱账号">
                <el-input v-model="CustomerItem.email" placeholder="邮箱账号"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户性别">
                <el-input v-model="CustomerItem.sex" placeholder="客户性别"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户生日">
                <el-input v-model="CustomerItem.birthday" placeholder="客户生日"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="客户爱好">
                <el-input v-model="CustomerItem.love" placeholder="客户爱好"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="备注">
                <el-input v-model="CustomerItem.remark" placeholder="备注"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-form-item>
              <el-col :span="10">
                <el-button type="primary" style="width:90%;height:50px;" @click="AddCustomer">提交</el-button>
              </el-col>
              <el-col :span="10">
                <el-button type="warning" style="width:90%;height:50px;">重置</el-button>
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
      CustomerItem: {},//单个客户
      currentPage: 1, //默认显示第一页
      pageSize: 8, //默认每页显示8条
      totalNum: 0, //总页数
      CustomerList: [],//客户集合
      SearchCustomer: {  //查询客户
        name: "",//要查询的姓名
        select: "1"//查询的方式1.客户姓名，2.客户电话，3.联系人名
      },
      loading: true,//表格加载
    };
  },
  created() {
    this.SelectAllCustomer();//默认进来就加载所有的客户
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      this.CustomerItem={};
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
    TodetailCustomer(index, row){
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
        type: "warning"
      })
        .then(() => {
          this.$axios
            .delete(
              "http://localhost:56567/api/CustomerManagement/DeleteCustomerInfo?id=" +
                t.id
            )
            .then(function(response) {
              // alert(response.data.code);
              if (response.data.code === 400) {
                th.$message.success("删除成功!");
                th.CustomerList.splice(index + (th.currentPage - 1) * 8, 1);
              } else {
                th.$message.error("删除失败!");
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "success",
            message: "已取消删除"
          });
        });
    },
    //查询所有客户
    SelectAllCustomer() {
      var t = this;
      this.$axios
        .get("http://localhost:56567/api/CustomerManagement/GetAllCustomerInfo")
        .then(function(response) {
          console.log(response.data);
          t.totalNum = response.data.length;//多少页数据
          t.CustomerList = response.data;//将客户集合给前端
          t.loading=false;//表格加载完成
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    UpdateCustomer() {
      var t = this;
      this.$axios
        .put(
          "http://localhost:56567/api/CustomerManagement/UpdateCustomerInfo",
          t.CustomerItem
        )
        .then(function(response) {
          console.log(response.data.code == 400);
          if (response.data.code == 400) {
            t.$message.success("更新成功！");
            t.CustomerItem = {};
          } else {
            t.$message.error("更新失败！");
            t.CustomerItem = {};
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    AddCustomer() {
      var t = this;
      this.$axios
        .post(
          "http://localhost:56567/api/CustomerManagement/AddCustomerInfo",
          t.CustomerItem
        )
        .then(function(response) {
          console.log(response.data.code == 400);
          if (response.data.code == 400) {
            t.$message.success("添加成功！");
            t.CustomerItem = {};
          } else {
            t.$message.error("添加失败！");
            t.CustomerItem = {};
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    SelectCustomer(){
      var t=this;
      console.log(t.SearchCustomer.select,t.SearchCustomer.name);
      this.$axios
        .get(
          "http://localhost:56567/api/CustomerManagement/SelectCustomerInfo?name="+t.SearchCustomer.name+"&select="+t.SearchCustomer.select
        )
        .then(function(response) {
          t.CustomerList= response.data;
          t.$message.success("查询成功");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>


