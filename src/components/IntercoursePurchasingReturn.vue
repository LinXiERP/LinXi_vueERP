<template>
  <div id="CommodityInventory">
    <el-row :gutter="20">
      <el-col :span="6">
        <!-- <div class="grid-content bg-purple">销售结款</div> -->
      </el-col>
      <!-- 查询 -->
      <el-col
        :span="15"
        style="float:right;padding-left:10%"
      >
        <!-- 查询 -->
        <el-form
          :inline="true"
          :model="formSearch"
          class="demo-form-inline"
        >

          <el-form-item label="退货编号">
            <el-input
              v-model="formSearch.no"
              placeholder="退货编号"
            ></el-input>
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
        :data="PuOrderList"
        stripe
        height="800"
        :row-style="{height:50+'px'}"
        v-loading="loading"
        style="width: 100%;"
      >
        <el-table-column
          prop="no"
          label="退货编号"
        ></el-table-column>

        <el-table-column
          prop="name"
          label="商品名称"
        ></el-table-column>

        <el-table-column
          prop="categoryName"
          label="商品类别"
        ></el-table-column>

        <el-table-column
          prop="supplierName"
          label="供应商"
        ></el-table-column>

        <el-table-column
          prop="nums"
          label="退货数量(件)"
        ></el-table-column>

        <el-table-column
          prop="amountReceivable"
          label="金额(元)"
        ></el-table-column>

        <el-table-column
          label="退货日期"
          prop="purchaseDate"
        >
        </el-table-column>

        <el-table-column
          label="退货原因"
          prop="purchaseDate"
        >
          <span class="badge badge-danger"> 质检不合格！</span>

        </el-table-column>

      </el-table>

      <!-- 分页 -->
      <el-row style="text-align:center;float:right;margin-right:6%;margin-top:3%">
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="totalNum"
          ></el-pagination>
        </div>
      </el-row>

    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formSearch: {
        no: "",
      },
      loading: false,
      // 采购单表格信息
      PuOrderList: [],
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
          `/IntercourseManagement/GetAllPuOrderReturn?no=${this.formSearch.no}`
        )
        .then((res) => {
          if (res.data.entity.length != 0) {
            res.data.entity.forEach((element) => {
              element.purchaseDate = element.purchaseDate.substring(0, 10);
            });
          }
          that.PuOrderList = res.data.entity;
          that.totalNum = Number(res.data.msg);
        });
    },
    handleCurrentChange(val) {
      var that = this;
      this.$axios
        .get(
          `/PurchasingManagement/GetAllPuOrderReturn?pageIndex=${val}&no=${this.formSearch.no}`
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
        "/IntercourseManagement/GetAllPuOrderReturn"
      );
      this.loading = false;
      if (res.entity.length != 0) {
        res.entity.forEach((element) => {
          element.purchaseDate = element.purchaseDate.substring(0, 10);
        });
      }
      this.PuOrderList = res.entity;
      this.totalNum = Number(res.msg);
    },
  },
  mounted() {
    this.loading = true;
    this.loadinfo();
  },
  computed: {},
};
</script>
