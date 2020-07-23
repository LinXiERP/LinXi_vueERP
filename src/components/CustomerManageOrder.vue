<template>
  <div id="CustomerManageOrder">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="订单列表" name="first">
        <el-form ref="SearchCustomerOrder" :model="SearchCustomerOrder" label-width="80px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="所有产品">
                <el-select v-model="SearchCustomerOrder.product" placeholder="请选择产品">
                  <el-option label="蓝牙耳机" value="手机"></el-option>
                  <el-option label="区域一" value="蓝牙耳机"></el-option>
                  <el-option label="区域二" value="空调"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-input placeholder="订单编号" v-model="SearchCustomerOrder.id"></el-input>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态">
                <el-select v-model="SearchCustomerOrder.status">
                  <el-option label="待审核" value="0"></el-option>
                  <el-option label="已审核" value="1"></el-option>
                  <el-option label="待发货" value="2"></el-option>
                  <el-option label="已出库" value="3"></el-option>
                  <el-option label="审核不通过" value="-1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
                 <el-col :span="4">
                      <el-button type="primary" icon="el-icon-search">搜索</el-button>
                 </el-col>
            <el-button
              slot="append"
              icon="el-icon-search"
              style="width:150px;"
              @click="SelectCustomerOrder"
            ></el-button>
          </el-row>
        </el-form>

        <el-table
          :data="CustomerOrderList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column prop="id" label="编号" ></el-table-column>
          <el-table-column prop="no" label="订单编号" ></el-table-column>
          <el-table-column prop="customerName" label="下单客户" ></el-table-column>
          <el-table-column prop="productName" label="产品名称"></el-table-column>
          <el-table-column prop="nums" label="订单数量" ></el-table-column>
             <el-table-column prop="nums" label="订单金额" ></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button type="primary" @click="ToEditCustomerOrder(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" @click="DeleteCustomerOrder(scope.$index, scope.row)">删除</el-button>
              <el-button type="primary" @click="TodetailCustomerOrder(scope.$index, scope.row)">详情</el-button>
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

      <el-tab-pane label="编辑订单" name="second">
        <el-form ref="Customer" :model="CustomerOrderItem" label-width="90px" size="medium">
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
                <el-input v-model="CustomerOrderItem.name" placeholder="客户姓名"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="邮政编码">
                <el-input v-model="CustomerOrderItem.postcode" placeholder="邮政编码"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户地址">
                <el-input v-model="CustomerOrderItem.address" placeholder="客户地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="联系电话">
                <el-input v-model="CustomerOrderItem.custtel" placeholder="联系电话"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系人">
                <el-input v-model="CustomerOrderItem.linkman" placeholder="联系人"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系人电话">
                <el-input v-model="CustomerOrderItem.linktel" placeholder="联系人电话"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="邮箱账号">
                <el-input v-model="CustomerOrderItem.email" placeholder="邮箱账号"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户性别">
                <el-input v-model="CustomerOrderItem.sex" placeholder="客户性别"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户生日">
                <el-input v-model="CustomerOrderItem.birthday" placeholder="客户生日"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="客户爱好">
                <el-input v-model="CustomerOrderItem.love" placeholder="客户爱好"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="备注">
                <el-input v-model="CustomerOrderItem.remark" placeholder="备注"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-form-item>
              <el-col :span="10">
                <el-button
                  type="primary"
                  style="width:90%;height:50px;"
                  @click="UpdateCustomerOrder"
                >提交</el-button>
              </el-col>
              <el-col :span="10">
                <el-button type="warning" style="width:90%;height:50px;">重置</el-button>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="订单详情" name="third">
        <el-form ref="Customer" :model="CustomerOrderItem" label-width="90px" size="medium">
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
                <el-input v-model="CustomerOrderItem.name" placeholder="客户姓名"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="邮政编码">
                <el-input v-model="CustomerOrderItem.postcode" placeholder="邮政编码"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户地址">
                <el-input v-model="CustomerOrderItem.address" placeholder="客户地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="联系电话">
                <el-input v-model="CustomerOrderItem.custtel" placeholder="联系电话"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系人">
                <el-input v-model="CustomerOrderItem.linkman" placeholder="联系人"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系人电话">
                <el-input v-model="CustomerOrderItem.linktel" placeholder="联系人电话"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="邮箱账号">
                <el-input v-model="CustomerOrderItem.email" placeholder="邮箱账号"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户性别">
                <el-input v-model="CustomerOrderItem.sex" placeholder="客户性别"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户生日">
                <el-input v-model="CustomerOrderItem.birthday" placeholder="客户生日"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="客户爱好">
                <el-input v-model="CustomerOrderItem.love" placeholder="客户爱好"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="备注">
                <el-input v-model="CustomerOrderItem.remark" placeholder="备注"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="添加订单" name="fourth">
        <el-form ref="Customer" :model="CustomerOrderItem" label-width="90px" size="medium">
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
                <el-input v-model="CustomerOrderItem.name" placeholder="客户姓名"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="邮政编码">
                <el-input v-model="CustomerOrderItem.postcode" placeholder="邮政编码"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户地址">
                <el-input v-model="CustomerOrderItem.address" placeholder="客户地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="联系电话">
                <el-input v-model="CustomerOrderItem.custtel" placeholder="联系电话"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系人">
                <el-input v-model="CustomerOrderItem.linkman" placeholder="联系人"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系人电话">
                <el-input v-model="CustomerOrderItem.linktel" placeholder="联系人电话"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="邮箱账号">
                <el-input v-model="CustomerOrderItem.email" placeholder="邮箱账号"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户性别">
                <el-input v-model="CustomerOrderItem.sex" placeholder="客户性别"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户生日">
                <el-input v-model="CustomerOrderItem.birthday" placeholder="客户生日"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="客户爱好">
                <el-input v-model="CustomerOrderItem.love" placeholder="客户爱好"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="备注">
                <el-input v-model="CustomerOrderItem.remark" placeholder="备注"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-form-item>
              <el-col :span="10">
                <el-button
                  type="primary"
                  style="width:90%;height:50px;"
                  @click="AddCustomerOrder"
                >提交</el-button>
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
      CustomerOrderItem: {}, //单个客户
      currentPage: 1, //默认显示第一页
      pageSize: 8, //默认每页显示8条
      totalNum: 0, //总页数

      CustomerOrderList: [], //客户集合
      SearchCustomerOrder: {
        //查询客户订单
        id: "", //订单id
        product: "", //产品类别
        status: "", //订单状态
      },
      loading: false, //表格加载
    };
  },
  created() {
    this.SelectAllCustomerOrder();//默认进来就加载所有的客户
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      this.CustomerOrderItem = {};
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    ToEditCustomerOrder(index, row) {
      this.CustomerOrderItem = this.CustomerOrderList[
        index + (this.currentPage - 1) * 8
      ];
      this.activeName = "second";
    },
    TodetailCustomerOrder(index, row) {
      this.CustomerOrderItem = this.CustomerOrderList[
        index + (this.currentPage - 1) * 8
      ];
      this.activeName = "third";
    },
    //删除客户订单
    DeleteCustomerOrder(index, row) {
      var th = this;
      var t = this.CustomerOrderList[index + (th.currentPage - 1) * 8];
      console.log(t);
      //请求删除客户订单的接口

      this.$confirm("确定要删除客户码?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .delete(
              "http://localhost:56567/api/CustomerManagement/DeleteCustomerOrder?id=" +
                t.id
            )
            .then(function (response) {
              // alert(response.data.code);
              if (response.data.code === 400) {
                th.$message.success("删除成功!");
                th.CustomerOrderList.splice(
                  index + (th.currentPage - 1) * 8,
                  1
                );
              } else {
                th.$message.warn("删除失败!");
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
    //查询客户所有订单
    SelectAllCustomerOrder() {
      var t = this;
      this.$axios
        .get("http://localhost:56567/api/CustomerManagement/GetAllCustomerOrder")
        .then(function (response) {
          console.log(response.data);
          t.totalNum = response.data.length; //多少页数据
          t.CustomerOrderList = response.data; //将客户集合给前端
          t.loading = false; //表格加载完成
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //修改客户订单
    UpdateCustomerOrder() {
      var t = this;
      this.$axios
        .put(
          "http://localhost:56567/api/CustomerManagement/UpdateCustomerOrder",
          t.CustomerOrderItem
        )
        .then(function (response) {
          console.log(response.data.code == 400);
          if (response.data.code == 400) {
            t.$message.success("更新成功！");
            t.CustomerOrderItem = {};
          } else {
            t.$message.warn("更新失败！");
            t.CustomerOrderItem = {};
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //添加客户订单
    AddCustomerOrder() {
      var t = this;
      this.$axios
        .post(
          "http://localhost:56567/api/CustomerManagement/AddCustomerOrder",
          t.CustomerOrderItem
        )
        .then(function (response) {
          console.log(response.data.code == 400);
          if (response.data.code == 400) {
            t.$message.success("添加成功！");
            t.CustomerOrderItem = {};
          } else {
            t.$message.warn("添加失败！");
            t.CustomerOrderItem = {};
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //筛选客户订单
    SelectCustomerOrder() {
      var t = this;
      this.$axios
        .get(
          "http://localhost:56567/api/CustomerManagement/SelectCustomerOrder?name=" +
            t.SearchCustomerOrder.id +
            "&product=" +
            t.SearchCustomerOrder.product +
            "&status=" +
            t.SearchCustomerOrder.status
        )
        .then(function (response) {
          t.CustomerOrderList = response.data;
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


