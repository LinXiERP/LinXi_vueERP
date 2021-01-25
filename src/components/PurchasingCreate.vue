<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <!-- <div class="grid-content bg-purple">待入库采购单</div>-->
      </el-col>
      <!-- 查询 -->
      <el-col
        :span="15"
        style="float:left"
      >
        <!-- 查询 -->
        <el-form
          :inline="true"
          :model="formSearch"
          class="demo-form-inline"
        >

          <el-form-item label="商品类别">
            <el-select
              v-model="formSearch.CategoryName"
              placeholder="商品类别"
              @change="SlChange"
            >
              <el-option
                :label="v.key"
                :value="v.value"
                v-for="(v,i) in allCategoryName"
                :key="i"
              ></el-option>

            </el-select>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>

    <div v-show="formSearch.CategoryName==false">
      <div class="block">
        <el-timeline>
          <el-timeline-item
            timestamp="第一步"
            placement="top"
            size="large"
          >
            <el-card>
              <h4>请选择要采购的商品类别！</h4>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>

    <el-card
      class="box-card"
      v-show="formSearch.CategoryName"
    >
      <div
        slot="header"
        class="clearfix"
      >
        <span>采购商品信息</span>

        <el-button
          style="float:right"
          type="danger"
          @click="BtnSend"
        >确认采购</el-button>
      </div>
      <div style="padding-left:20%">

        <div
          class="form-inline row"
          style="margin-bottom:20px;"
        >
          <label
            class="col-form-label"
            style="margin-left:20px"
          >商品类别：</label>
          <input
            type="text"
            class="form-control-plaintext"
            v-model="PurchaseEditObj.commodityType"
            readonly
            placeholder="商品类别"
            style="margin-right:20px;width:31%"
          />
          <label
            class="col-form-label"
            style="margin-left:0px"
          >商品产地：</label>
          <input
            type="text"
            class="form-control-plaintext"
            readonly
            v-model="PurchaseEditObj.place"
            placeholder="商品产地"
            style="margin-right:50px;width:31%"
          />
        </div>

        <div
          class="form-inline row"
          style="margin-bottom:20px"
        >
          <label
            class="col-form-label"
            style="margin-left:20px"
          >商品名称：</label>
          <input
            type="text"
            class="form-control-plaintext"
            readonly
            v-model="PurchaseEditObj.name"
            placeholder="商品名称"
            style="width:31%"
          />
          <label
            class="col-form-label"
            style="margin-left:20px"
          >供应商名：</label>
          <input
            type="text"
            class="form-control-plaintext"
            readonly
            v-model="PurchaseEditObj.supplierName"
            placeholder="供应商名"
            style="margin-right:20px;width:31%"
          />
        </div>

        <div
          class="form-inline row"
          style="margin-bottom:20px"
        >
          <label
            class="col-form-label"
            style="margin-left:20px"
          >实付金额：</label>
          <input
            type="text"
            class="form-control-plaintext"
            readonly
            placeholder="实付金额"
            v-model="PurchaseEditObj.amountReceived"
            style="margin-right:20px;width:31%"
          />
          <label
            class="col-form-label"
            style="margin-left:0px"
          >未付金额：</label>
          <input
            type="text"
            class="form-control-plaintext"
            readonly
            placeholder="未付金额"
            v-model="noPay"
            style="margin-right:50px;width:30%"
          />
        </div>

        <div
          class="form-inline row"
          style="margin-bottom:20px"
        >
          <label
            class="col-form-label"
            style="margin-left:20px"
          >采购日期：</label>
          <input
            type="text"
            class="form-control-plaintext"
            readonly
            placeholder="采购日期"
            v-model="PurchaseEditObj.purchaseDate"
            style="margin-right:20px;width:31%"
          />
          <label
            class="col-form-label"
            style="margin-left:0px"
          >商品单价：</label>
          <input
            type="text"
            class="form-control-plaintext"
            placeholder="商品单价"
            v-model="PurchaseEditObj.price"
            style="margin-right:50px;width:31%"
          />
        </div>

        <div
          class="form-inline row"
          style="margin-bottom:20px"
        >
          <label
            class="col-form-label"
            style="margin-left:20px"
          >采购金额：</label>
          <input
            type="text"
            class="form-control-plaintext"
            readonly
            placeholder="采购金额"
            v-model="PurchaseEditObj.amount"
            style="margin-right:20px;width:31%"
          />
          <label
            class="col-form-label"
            style="margin-left:0px"
          >应付金额：</label>
          <input
            type="text"
            class="form-control-plaintext"
            readonly
            placeholder="应付金额"
            v-model.number="PurchaseEditObj.amountReceivable"
            style="margin-right:50px;width:31%"
          />
        </div>

        <div
          class="form-inline row"
          style="margin-bottom:20px"
        >
          <label
            class="col-form-label"
            style="margin-left:20px"
          >结算方式：</label>
          <select
            class="form-control"
            id="exampleFormControlSelect1"
            v-model="PurchaseEditObj.amountWay"
            style="width:47%"
          >
            <option value="0">现金</option>
            <option value="1">网银</option>
            <option value="2">支付宝</option>
            <option value="3">微信</option>
          </select>
        </div>

        <div
          class="form-inline row"
          style="margin-bottom:20px;"
        >
          <label
            class="col-form-label"
            style="margin-left:20px"
          >采购数量：</label>
          <input
            type="number"
            class="form-control"
            v-model.number="PurchaseEditObj.nums"
            placeholder="采购数量"
            style="margin-right:20px"
          />
          <label
            class="col-form-label"
            style="margin-left:10%"
          >操作人员：</label>
          <input
            type="text"
            class="form-control-plaintext"
            readonly
            v-model="PurchaseEditObj.operatorName"
            placeholder="操作人员"
            style="margin-right:50px;width:31%"
          />
        </div>

      </div>
    </el-card>

  </div>
</template>

<script>
export default {
  data() {
    return {
      formSearch: {
        year: "",
        CategoryName: "",
      },
      PurchaseEditObj: {},
      allCategoryName: [],
      loading: true,
    };
  },
  methods: {
    async loadinfo() {
      const { data: ress } = await this.$axios.get(
        "/PurchasingManagement/AllCommodityName"
      );
      this.allCategoryName = ress.entity;
    },
    async SlChange(val) {
      console.log(val);
      const { data: ress } = await this.$axios.get(
        `/PurchasingManagement/GetPurchasingByCategoryId?id=${val}`
      );
      ress.entity.purchaseDate = ress.entity.purchaseDate.substring(0, 10);
      ress.entity.nums = 1;
      ress.entity.amountReceived = 0;
      ress.entity.amountReceivable = ress.entity.price;
      ress.entity.amount = ress.entity.price;
      ress.entity.amountWay = 1;
      this.PurchaseEditObj = ress.entity;
    },
    async BtnSend() {
      const { data: res } = await this.$axios.post(
        "/PurchasingManagement/CreatePuOrder",
        this.PurchaseEditObj
      );
      this.$message.success(res.entity);

      window.location.reload();
    },
  },
  created() {
    this.loadinfo();
  },
  computed: {
    noPay() {
      return (
        this.PurchaseEditObj.price * this.PurchaseEditObj.nums -
        this.PurchaseEditObj.amountReceived
      );
    },
  },
  watch: {
    "PurchaseEditObj.nums"(newval, oldval) {
      if (newval <= 0) {
        this.$message.error("采购数量不可小于1件!!!");
        this.PurchaseEditObj.nums = 1;
      } else {
        this.PurchaseEditObj.amount =
          this.PurchaseEditObj.price * this.PurchaseEditObj.nums;
        this.PurchaseEditObj.amountReceivable =
          this.PurchaseEditObj.price * this.PurchaseEditObj.nums;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
