<template>
  <div id="CustomerManageOrder">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
      <el-tab-pane label="订单列表" name="first">
        <el-form ref="SearchCustomerOrder" :model="SearchCustomerOrder" label-width="80px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="所有产品">
                <el-select v-model="SearchCustomerOrder.product" placeholder="请选择产品">
                  <el-option label="所有" value="所有"></el-option>
                  <el-option
                    :label="i.productName"
                    :value="i.productName"
                    :key="i.id"
                    v-for="i in products"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-input placeholder="订单编号" v-model="SearchCustomerOrder.id"></el-input>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态">
                <el-select v-model="SearchCustomerOrder.status">
                  <el-option label="所有" value="-100"></el-option>
                  <el-option label="待审核" value="0"></el-option>
                  <el-option label="已审核" value="1"></el-option>
                  <el-option label="待发货" value="2"></el-option>
                  <el-option label="已出库" value="3"></el-option>
                  <el-option label="审核不通过" value="-1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" icon="el-icon-search" @click="SelectCustomerOrder">搜索</el-button>
            </el-col>
            <!-- <el-button
              slot="append"
              icon="el-icon-search"
              style="width:150px;"
              @click="SelectCustomerOrder"
            ></el-button>-->
          </el-row>
        </el-form>

        <el-table
          :data="CustomerOrderList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column prop="id" label="编号"></el-table-column>
          <el-table-column prop="no" label="订单编号"></el-table-column>
          <el-table-column prop="customerName" label="下单客户"></el-table-column>
          <el-table-column prop="productName" label="产品名称"></el-table-column>
          <el-table-column prop="nums" label="订单数量"></el-table-column>
          <el-table-column prop="nums" label="订单金额"></el-table-column>
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

      <el-tab-pane label="编辑订单" name="second" disabled>
        <el-form ref="Customer" :model="CustomerOrderItem" label-width="90px" size="medium">
          <el-row>
            <el-col :span="24">
              <div
                class="grid-content bg-purple-dark"
                style="text-align:center;font-size:25px;margin-bottom:15px;"
              >编辑订单</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="客户编号">
                <el-select
                  v-model="CustomerOrderItem.customerId"
                  filterable
                  allow-create
                  default-first-option
                  clearable
                  required
                  placeholder="请选择或输客户名"
                  style="width:100%;"
                >
                  <el-option
                    v-for="item in allusers"
                    :key="item.id"
                    :label="item.name"
                    :value="String(item.id)"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="产品编号">
                <el-select
                  v-model="CustomerOrderItem.productId"
                  filterable
                  allow-create
                  default-first-option
                  clearable
                  required
                  placeholder="请选择或输入产品名"
                  style="width:100%;"
                >
                  <el-option
                    v-for="item in allproducts"
                    :key="item.id"
                    :label="item.name"
                    :value="String(item.id)"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="数量">
                <el-input
                  v-model="CustomerOrderItem.nums"
                  placeholder="数量"
                  required
                  oninput="value=value.replace(/[^\d]/g,'')"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="交货日期">
                <el-date-picker
                  v-model="CustomerOrderItem.deliveryDate"
                  type="date"
                  placeholder="交货日期"
                  clearable:true
                  required
                  style="width:100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="交货方式">
                <el-input v-model="CustomerOrderItem.deliveryWay" placeholder="交货方式"></el-input>
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
                >修改</el-button>
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
              >订单详情</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="客户姓名">
                <el-input :value="CustomerOrderItem.customerName" readonly></el-input> 
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="产品名称">
                   <el-input :value="CustomerOrderItem.productName" readonly></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="数量">
                <el-input
                  v-model="CustomerOrderItem.nums"
                  placeholder="数量"
                  required
                  readonly
                  oninput="value=value.replace(/[^\d]/g,'')"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="交货日期">
                <el-date-picker
                  v-model="CustomerOrderItem.deliveryDate"
                  type="date"
                  placeholder="交货日期"
                  clearable:true
                  required
                  readonly
                  style="width:100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="交货方式">
                <el-input v-model="CustomerOrderItem.deliveryWay" placeholder="交货方式" readonly></el-input>
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
              >添加订单</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="客户编号">
                <el-select
                  v-model="CustomerOrderItem.customerId"
                  filterable
                  allow-create
                  default-first-option
                  clearable
                  required
                  placeholder="请选择或输客户名"
                  style="width:100%;"
                >
                  <el-option
                    v-for="item in allusers"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <!-- <el-input v-model="CustomerOrderItem.customer_id" placeholder="客户编号"></el-input> -->
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="产品编号">
                <el-select
                  v-model="CustomerOrderItem.productId"
                  filterable
                  allow-create
                  default-first-option
                  clearable
                  required
                  placeholder="请选择或输入产品名"
                  style="width:100%;"
                >
                  <el-option
                    v-for="item in allproducts"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>

                <!-- <el-input v-model="CustomerOrderItem.product_id" placeholder="产品编号"></el-input> -->
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="数量">
                <el-input
                  v-model="CustomerOrderItem.nums"
                  placeholder="数量"
                  required
                  oninput="value=value.replace(/[^\d]/g,'')"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="交货日期">
                <el-date-picker
                  v-model="CustomerOrderItem.deliveryDate"
                  type="date"
                  placeholder="交货日期"
                  clearable:true
                  required
                  style="width:100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="交货方式">
                <el-input v-model="CustomerOrderItem.deliveryWay" placeholder="交货方式"></el-input>
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
      allproducts: [], //所有产品
      allusers: [], //所有用户
      activeName: "first",
      select: "",
      CustomerOrderItem: {}, //单个订单
      currentPage: 1, //默认显示第一页
      pageSize: 8, //默认每页显示8条
      totalNum: 0, //总页数
      products: [],
      CustomerOrderList: [], //订单集合
      SearchCustomerOrder: {
        //查询订单
        id: "", //订单id
        product: "所有", //产品类别
        status: "-100", //订单状态
      },
      loading: false, //表格加载
    };
  },
  created() {
    this.SelectAllCustomerOrder(); //默认进来就加载所有的客户
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      this.CustomerOrderItem = {}; 
      // if(tab.name=="second"){
      //   activeName="first";
      //   return;
      // }
      if (tab.name == "fourth") {
        var t = this;
        //进入添加客户订单界面
        t.$axios
          .get("/CustomerManagement/SelectAllProductandCustomer")
          .then((res) => {
            t.allproducts = res.data.product;
            t.allusers = res.data.customer;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    ToEditCustomerOrder(index, row) {
      var t=this;
      this.CustomerOrderItem = this.CustomerOrderList[
        index + (this.currentPage - 1) * 8
      ];

      //进入编辑客户订单界面
      t.$axios
        .get("/CustomerManagement/SelectAllProductandCustomer")
        .then((res) => {
          t.allproducts = res.data.product;
          t.allusers = res.data.customer;
        })
        .catch((error) => {
          console.log(error);
        });

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
            .delete("/CustomerManagement/DeleteCustomerOrder?id=" + t.id)
            .then(function (response) {
              // alert(response.data.code);
              if (response.data.code === 200) {
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
        .get("/CustomerManagement/GetAllCustomerOrder")
        .then(function (response) {
          console.log(response.data);
          t.totalNum = response.data.length; //多少页数据
          t.CustomerOrderList = response.data; //将客户集合给前端
          t.products = response.data; //所有的产品
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
        .put("/CustomerManagement/UpdateCustomerOrder", t.CustomerOrderItem)
        .then(function (response) {
          console.log(response.data.code == 200);
          if (response.data.code == 200) {
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
      t.CustomerOrderItem.userName = sessionStorage.getItem("name");
      this.$axios
        .post("/CustomerManagement/AddCustomerOrder", t.CustomerOrderItem)
        .then(function (response) {
          console.log(response.data.code == 200);
          if (response.data.code == 200) {
            t.$message.success("添加成功！");
            t.CustomerOrderItem = {};
          } else {
            t.$message.error("添加失败！");
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

      var url = "";
      if (t.SearchCustomerOrder.id == "") {
        url =
          "/CustomerManagement/SelectCustomerOrder?id=" +
          -1 +
          "&product=" +
          t.SearchCustomerOrder.product +
          "&status=" +
          t.SearchCustomerOrder.status;
      } else {
        url =
          "/CustomerManagement/SelectCustomerOrder?id=" +
          t.SearchCustomerOrder.id +
          "&product=" +
          t.SearchCustomerOrder.product +
          "&status=" +
          t.SearchCustomerOrder.status;
      }

      this.$axios
        .get(url)
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


