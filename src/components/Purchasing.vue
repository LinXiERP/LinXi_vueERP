<template>
  <div id="CommodityInventory">
    <el-row :gutter="20">
      <el-col :span="6">
        <!-- <div class="grid-content bg-purple">待入库采购单</div>-->
      </el-col>
      <!-- 查询 -->
      <el-col
        :span="15"
        style="float:right"
      >
        <!-- 查询 -->
        <el-form
          :inline="true"
          :model="formSearch"
          class="demo-form-inline"
        >
          <el-form-item label="采购单编号">
            <el-input
              v-model="formSearch.no"
              placeholder="采购单编号"
            ></el-input>

          </el-form-item>

          <el-form-item label="商品名称">
            <el-input
              v-model="formSearch.SearchName"
              placeholder="商品名称"
            ></el-input>
          </el-form-item>

          <el-form-item label="商品类别">
            <el-select
              v-model="formSearch.CategoryName"
              placeholder="商品类别"
            >
              <el-option
                label="全部"
                value=" "
              ></el-option>
              <el-option
                :label="v.key"
                :value="v.key"
                v-for="(v,i) in allCategoryName"
                :key="i"
              ></el-option>

            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="BtnSearch"
            >查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!-- 表格数据 -->
      <el-table
        :data="PurchaseList"
        stripe
        height="800"
        :row-style="{height:50+'px'}"
        v-loading="loading"
        style="width: 100%;"
      >
        <el-table-column
          prop="id"
          label="编号"
          v-if="false"
        ></el-table-column>

        <el-table-column
          prop="no"
          label="采购单编号"
        ></el-table-column>

        <el-table-column
          prop="name"
          label="商品名称"
        ></el-table-column>

        <el-table-column
          prop="nums"
          label="采购数量"
        ></el-table-column>

        <el-table-column
          prop="purchaseDate"
          label="采购日期"
        ></el-table-column>

        <el-table-column label="状态">
          <template slot-scope="scope">
            <div>
              <span
                class="badge badge-primary"
                v-if="scope.row.status==2"
              >待结款</span>
              <span
                class="badge badge-secondary"
                v-if="scope.row.status==0"
              >待质检</span>
              <span
                class="badge badge-danger"
                v-if="scope.row.status==1"
              >不合格</span>
              <span
                class="badge badge-warning"
                v-if="scope.row.status==3"
              >已结款</span>
              <span
                class="badge badge-primary"
                v-if="scope.row.status==6"
              >已退货</span>
              <span
                class="badge badge-info"
                v-if="scope.row.status==4"
              >待入库</span>
              <span
                class="badge badge-success"
                v-if="scope.row.status==5"
              >已入库</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <button
                type="button"
                class="btn btn-primary btn-sm"
                data-toggle="modal"
                data-target="#payment"
                data-whatever="@mdo"
                v-if="scope.row.status==2"
                @click="openPayment(scope.$index)"
              >结款</button>

              <button
                type="button"
                class="btn btn-secondary btn-sm"
                data-toggle="modal"
                data-target="#edit"
                data-whatever="@mdo"
                @click="openEdit(scope.$index)"
                v-else-if="scope.row.status==0"
              >编辑</button>

              <button
                type="button"
                class="btn btn-danger btn-sm"
                data-toggle="modal"
                data-target="#return"
                data-whatever="@mdo"
                v-else-if="scope.row.status==1"
                @click="openReturn(scope.$index)"
              >退货</button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-row style="text-align:center;float:right;margin-right:6%;margin-top:3%">
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

      <!-- 采购单编辑 -->
      <div
        class="modal fade"
        id="edit"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel1"
        aria-hidden="true"
      >
        <div
          class="modal-dialog"
          style="max-width: 820px"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5
                class="modal-title"
                id="edit"
              >采购单编辑</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

              <div
                class="form-inline row"
                style="margin-bottom:20px"
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
                >采购编号：</label>
                <input
                  type="text"
                  class="form-control-plaintext"
                  readonly
                  v-model="PurchaseEditObj.no"
                  placeholder="采购编号"
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
                  v-model="PurchaseEditObj.amountWay"
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
                  style="width:78%"
                >
                  <option value="0">现金</option>
                  <option value="1">网银</option>
                  <option value="2">支付宝</option>
                  <option value="3">微信</option>
                </select>
              </div>

              <div
                class="form-inline row"
                style="margin-bottom:20px"
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
                  style="margin-left:0px"
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
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >取消</button>
              <button
                type="button"
                class="btn btn-primary"
                @click="SureEdit"
              >提交更改</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 采购单结款 -->
      <div
        class="modal fade"
        id="payment"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel2"
        aria-hidden="true"
      >
        <div
          class="modal-dialog"
          style="max-width: 820px"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5
                class="modal-title"
                id="exampleModalLabel2"
              >采购单结款</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

              <div
                class="form-inline row"
                style="margin-bottom:20px"
              >
                <label
                  class="col-form-label"
                  style="margin-left:20px"
                >采购编号：</label>
                <input
                  type="text"
                  class="form-control-plaintext"
                  readonly
                  v-model="PurchaseEditObj.no"
                  placeholder="采购编号"
                  style="margin-right:0px;width:31%"
                />
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
                  readonly
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
                >采购数量：</label>
                <input
                  type="number"
                  class="form-control-plaintext"
                  v-model.number="PurchaseEditObj.nums"
                  placeholder="采购数量"
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
                  class="form-control-plaintext"
                  id="exampleFormControlSelect1"
                  readonly
                  display
                  v-model="PurchaseEditObj.amountWay"
                  style="width:78%"
                >
                  <option value="0">现金</option>
                  <option value="1">网银</option>
                  <option value="2">支付宝</option>
                  <option value="3">微信</option>
                </select>
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
                  class="form-control"
                  placeholder="实付金额"
                  v-model.number="PurchaseEditObj.amountReceived"
                  style="margin-right:20px;"
                />

                <label
                  class="col-form-label"
                  style="margin-left:0px"
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
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >取消</button>
              <button
                type="button"
                class="btn btn-primary"
                @click="SurePayment"
              >确认结款</button>
            </div>
          </div>
        </div>
      </div>

    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formSearch: {
        no: "",
        SearchName: "",
        CategoryName: "",
      },
      allCategoryName: [],
      loading: false,
      // 采购单表格信息
      PurchaseList: [],
      // 采购单编辑信息
      PurchaseEditObj: {},
      activeName: "first",
      currentPage: 1, //默认显示第一页
      pageSize: 15, //默认每页显示15条
      totalNum: 0, //总数量
    };
  },
  methods: {
    BtnSearch() {
      var that = this;
      this.$axios
        .get(
          `/PurchasingManagement/PurchaseInfo?no=${this.formSearch.no}&SearchName=${this.formSearch.SearchName}&CategoryName=${this.formSearch.CategoryName}`
        )
        .then((res) => {
          if (res.data.entity.length != 0) {
            res.data.entity.forEach((element) => {
              element.purchaseDate = element.purchaseDate.substring(0, 10);
            });
          }
          that.PurchaseList = res.data.entity;
          that.totalNum = Number(res.data.msg);
        });
    },
    openPayment(index) {
      this.PurchaseEditObj = JSON.parse(
        JSON.stringify(this.PurchaseList[index])
      );
    },
    SurePayment() {
      var that = this;
      this.$axios
        .put("/PurchasingManagement/PayMent", this.PurchaseEditObj)
        .then((res) => {
          that.$message.success(res.data.msg);
          $("#payment").modal("hide");
          that.loadinfo();
          that.currentPage = 1;
        });
    },
    openEdit(index) {
      this.PurchaseEditObj = JSON.parse(
        JSON.stringify(this.PurchaseList[index])
      );
    },
    SureEdit() {
      var that = this;
      this.$axios
        .put("/PurchasingManagement/PurchaseInfoEdit", this.PurchaseEditObj)
        .then((res) => {
          that.$message.success(res.data.msg);
          $("#edit").modal("hide");
          that.loadinfo();
          that.currentPage = 1;
        });
    },
    openReturn(index) {
      var that = this;

      this.$confirm("", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        dangerouslyUseHTMLString: true,
        message: "<h6><i>此操作将退货, 是否继续 ?</i></h6>",
      })
        .then(() => {
          this.PurchaseEditObj = JSON.parse(
            JSON.stringify(this.PurchaseList[index])
          );
          console.log(2);
          this.$axios
            .put("/PurchasingManagement/ReturnBack", this.PurchaseEditObj)
            .then((res) => {
              that.loadinfo();
              that.currentPage = 1;
              that.$message({
                type: "success",
                message: "退货成功!",
              });
            });
        })
        .catch(() => {});
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      var that = this;
      this.$axios
        .get(
          `/PurchasingManagement/PurchaseInfo?pageIndex=${val}&no=${this.formSearch.no}&SearchName=${this.formSearch.SearchName}&CategoryName=${this.formSearch.CategoryName}`
        )
        .then((res) => {
          if (res.data.entity.length != 0) {
            res.data.entity.forEach((element) => {
              element.purchaseDate = element.purchaseDate.substring(0, 10);
            });
          }
          that.PurchaseList = res.data.entity;
          that.totalNum = Number(res.data.msg);
        });
    },
    async loadinfo() {
      const { data: res } = await this.$axios.get(
        "/PurchasingManagement/PurchaseInfo"
      );
      this.loading = false;
      if (res.entity.length != 0) {
        res.entity.forEach((element) => {
          element.purchaseDate = element.purchaseDate.substring(0, 10);
        });
      }
      this.PurchaseList = res.entity;
      const { data: ress } = await this.$axios.get(
        "/PurchasingManagement/AllCategoryName"
      );
      this.allCategoryName = ress.entity;

      console.log(ress.entity);
      this.totalNum = Number(res.msg);
    },
  },
  mounted() {
    this.loading = true;
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
  filters: {
    timeFilter(val) {
      return val.substr(0, 10);
    },
  },
};
</script>
