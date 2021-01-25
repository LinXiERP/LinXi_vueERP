<template>
  <div id="CustomerManageOrder">
    <el-form
      ref="Customer"
      :model="searchOrderTraceItem"
      label-width="120px"
      size="medium"
    >
      <el-form-item label="请输入订单编号">
        <el-select
          v-model="searchOrderTraceItem.id"
          filterable
          allow-create
          default-first-option
          clearable
          required
          placeholder="请输入订单编号"
          style="width:40%;"
          @change="SelectOrderById"
        >
          <el-option
            v-for="item in allOrderIds"
            :key="item.no"
            :label="item.name"
            :value="String(item.no)"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <el-row>
      <el-col :span="12">
        <div>
          <el-card class="box-card">
            <div
              slot="header"
              class="clearfix"
            >
              <span>订单信息</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
              ></el-button>
            </div>
            <div v-if="orderItem!=null">
              <el-row>
                <el-col :span="5">
                  <el-tag effect="plain">订单编号</el-tag>
                </el-col>
                <el-col :span="12">{{orderItem.no}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-tag effect="plain">交货日期</el-tag>
                </el-col>
                <el-col :span="12">{{orderItem.deliveryDate}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-tag effect="plain">订单数量</el-tag>
                </el-col>
                <el-col :span="12">{{orderItem.nums}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-tag effect="plain">订单金额</el-tag>
                </el-col>
                <el-col :span="12">{{orderItem.price}}元</el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-tag effect="plain">订单日期</el-tag>
                </el-col>
                <el-col :span="12">{{orderItem.orderDate}}</el-col>
              </el-row>
            </div>
          </el-card>
        </div>
      </el-col>

      <el-col :span="12">
        <div>
          <el-card class="box-card">
            <div
              slot="header"
              class="clearfix"
            >
              <span>销售信息</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
              ></el-button>
            </div>
            <div v-if="saleItem!=null">
              <el-row>
                <el-col :span="5">
                  <el-tag effect="plain">销售编号</el-tag>
                </el-col>
                <el-col :span="12">{{saleItem.no}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-tag effect="plain">销售客户</el-tag>
                </el-col>
                <el-col :span="12">{{saleItem.productId}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-tag effect="plain">销售数量</el-tag>
                </el-col>
                <el-col :span="12">{{saleItem.nums}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-tag effect="plain">销售金额</el-tag>
                </el-col>
                <el-col :span="12">{{saleItem.amount}}元</el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-tag effect="plain">销售日期</el-tag>
                </el-col>
                <el-col :span="12">{{saleItem.saleDate}}</el-col>
              </el-row>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <div>
          <el-card class="box-card">
            <div
              slot="header"
              class="clearfix"
            >
              <span>结款信息</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
              ></el-button>
            </div>
            <div v-if="balanceDueItem!=null">
              <el-row>
                <el-col :span="5">
                  <el-tag effect="plain">经手人</el-tag>
                </el-col>
                <el-col :span="12">{{balanceDueItem.handleName}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-tag effect="plain">结款方式</el-tag>
                </el-col>
                <el-col :span="12">{{balanceDueItem.deliveryWay}}</el-col>
              </el-row>

              <el-row>
                <el-col :span="5">
                  <el-tag effect="plain">下单时间</el-tag>
                </el-col>
                <el-col :span="12">{{balanceDueItem.orderDate}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-tag effect="plain">结款金额</el-tag>
                </el-col>
                <el-col :span="12">{{balanceDueItem.price}}元</el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-tag effect="plain">结款日期</el-tag>
                </el-col>
                <el-col :span="12">{{balanceDueItem.operatorTime}}</el-col>
              </el-row>
            </div>
          </el-card>
        </div>
      </el-col>

      <el-col :span="12">
        <div>
          <el-card class="box-card">
            <div
              slot="header"
              class="clearfix"
            >
              <span>产品信息</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
              ></el-button>
            </div>
            <div v-if="productItem!=null">
              <el-row>
                <el-col :span="5">
                  <el-tag effect="plain">产地</el-tag>
                </el-col>
                <el-col :span="12">{{productItem.place}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-tag effect="plain">生产商</el-tag>
                </el-col>
                <el-col :span="12">{{productItem.manufacturer}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-tag effect="plain">产品名称</el-tag>
                </el-col>
                <el-col :span="12">{{productItem.name}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-tag effect="plain">产品规格</el-tag>
                </el-col>
                <el-col :span="12">{{productItem.spec}}</el-col>
              </el-row>

              <el-row>
                <el-col :span="5">
                  <el-tag effect="plain">产品单价</el-tag>
                </el-col>
                <el-col :span="12">{{productItem.price}}元</el-col>
              </el-row>

            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchOrderTraceItem: { id: "" }, //查询信息
      allOrderIds: [], //所有的订单编号
      orderItem: null, //订单信息
      saleItem: null, //销售信息
      productItem: null, //产品信息
      balanceDueItem: null, //结账信息
    };
  },
  created() {
    this.SelectAllOrderId(); //默认进来就加载所有的订单编号
  },
  methods: {
    SelectAllOrderId() {
      var t = this;
      t.$axios
        .get("/CustomerManagement/SelectAllOrderId")
        .then((res) => {
          t.allOrderIds = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    SelectOrderById() {
      var t = this;
      t.$axios
        .get(
          "/CustomerManagement/SelectOrderById?id=" + t.searchOrderTraceItem.id
        )
        .then((res) => {
          t.orderItem = res.data.order;
          t.saleItem = res.data.sale;
          t.productItem = res.data.product;
          t.balanceDueItem = res.data.balanceDue;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>


