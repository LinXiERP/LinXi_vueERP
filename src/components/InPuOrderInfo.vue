<template>
  <div id="CommodityInventory">
    <el-row :gutter="20">
      <el-col :span="14">
        <div class="grid-content bg-purple">待入库采购单</div>
      </el-col>
      <el-col :span="10">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="供应商/商品名称">
            <el-input v-model="SearchCommodity.name" placeholder="供应商/商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品类别">
            <el-select v-model="SearchCommodity.category_id" placeholder="请选择">
              <el-option
                v-for="item in CategoryInfo"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchPuOrder()">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-table
        :data="PuOrderInfos.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="id" label width="80" type="selection"></el-table-column>
        <!-- <el-table-column prop="id" label="编号" width="180"></el-table-column> -->
        <el-table-column prop="no" label="采购单编号" width="180"></el-table-column>
        <el-table-column prop="commodity_Name" label="商品名称" width="180"></el-table-column>
        <el-table-column prop="nums" label="采购数量"></el-table-column>
        <el-table-column prop="purchaseDate" label="采购日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <el-tag type="success">待入库</el-tag>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="success" round @click="editShow(scope.$index)">入库</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- #分页 -->
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
    </el-row>
    <!-- 弹框 -->
    <el-dialog title="商品采购入库单" :visible.sync="centerDialogVisible" width="50%" center>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">入库编号：{{CommodityrecorId}}</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            入库时间：
            <el-date-picker v-model="Commodityrecord.operateTime" type="date" placeholder="选择日期"></el-date-picker>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>

      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">采购编号：{{PuOrderInfo.id}}</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">商品编号:{{PuOrderInfo.commodityId}}</div>
        </el-col>
      </el-row>
      <el-divider></el-divider>

      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">商品名称：{{PuOrderInfo.commodity_Name}}</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">商品供应商：{{PuOrderInfo.suppliername}}</div>
        </el-col>
      </el-row>
      <el-divider></el-divider>

      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">类别：{{PuOrderInfo.categoryname}}</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">规格{{PuOrderInfo.commodity_spec}}</div>
        </el-col>
      </el-row>
      <el-divider></el-divider>

      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">产地：{{PuOrderInfo.commodity_place}}</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">单价：{{PuOrderInfo.commodity_price}}</div>
        </el-col>
      </el-row>
      <el-divider></el-divider>

      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">库存数量：{{PuOrderInfo.commodity_stock}}</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">入库数量：{{PuOrderInfo.nums}}</div>
        </el-col>
      </el-row>
      <el-divider></el-divider>

      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">应付金额：{{PuOrderInfo.amountReceived}}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">实付金额：{{PuOrderInfo.amountReceived}}</div>
        </el-col>

        <el-col :span="8">
          <div
            class="grid-content bg-purple-light"
          >未付金额：{{PuOrderInfo.amountReceived-PuOrderInfo.amountReceived}}</div>
        </el-col>
      </el-row>
      <el-divider></el-divider>

      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">经手人：{{PuOrderInfo.handleName}}</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">操作员：{{operator.name}}</div>
        </el-col>
      </el-row>

      <el-divider></el-divider>

      <el-row>
        <el-col :span="20">
          <div class="grid-content bg-purple">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="Commodityrecord.remark"
            ></el-input>
          </div>
        </el-col>
      </el-row>

      <el-divider></el-divider>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="CommodityWarehousing()">确定入库</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      operator: {},

      formInline: {
        user: "",
        region: "",
      },
      PuOrderInfo: {},

      PuOrderInfos: [],

      //商品类型
      CategoryInfo: [
        {
          id: "",
          name: "",
          remark: "",
        },
      ],
      //商品入库
      Commodityrecord: {
        id: 0,
        name: "",
        isin: "",
        sourcecategory: 0,
        sourceid: 0,
        sourceno: "",
        commodityid: 0,
        batch: "",
        nums: 0,
        reason: "",
        departmentid: 0,
        staffid: 0,
        warehouseid: 0,
        operatorid: 0,
        operateTime: "",
        status: 0,
        remark: "",
      },
      CommodityrecorId: 0,
      //多选
      multipleSelection: [],

      //查询
      SearchCommodity: {
        name: "",
        category_id: "",
      },

      activeName: "first",
      select: "",
      PuOrderInfoItem: {},
      currentPage: 1, //默认显示第一页
      pageSize: 8, //默认每页显示8条
      totalNum: 0, //总页数
      SearchCustomer: {
        name: "",
        select: "1",
      },
      //弹框
      centerDialogVisible: false,
    };
  },

  methods: {
    onSubmit() {
      console.log("submit!");
    },
    GetPuOrderInfo() {
      this.$axios.get(`/CommodityInventory/GetPuOreders`).then((res) => {
        this.PuOrderInfos = res.data;
        this.totalNum = res.data.length;
        this.PuOrderInfos.forEach((element) => {
          element.purchaseDate = element.purchaseDate.substring(0, 10);
        });
      });
    },

    //商品类型
    GetCategoryInfo() {
      this.$axios.get(`/CommodityInventory/GetCategoryInfo`).then((res) => {
        this.CategoryInfo = res.data;
      });
    },
    //多选
    handleSelectionChange(val) {
      val.forEach((element) => {
        this.multipleSelection.push(element.date);
      });
      console.log(this.multipleSelection);
    },
    //分页
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
    editShow(index) {
      index = index + (this.currentPage - 1) * 8;
      this.PuOrderInfo = this.PuOrderInfos[index];
      console.log(index);
      this.centerDialogVisible = true;
    },
    //入库
    CommodityWarehousing() {
      this.Commodityrecord.id = this.CommodityrecorId;
      this.Commodityrecord.name = "ss";
      this.Commodityrecord.isin = 0;
      this.Commodityrecord.sourcecategory = 0;
      this.Commodityrecord.sourceid = this.PuOrderInfo.id;
      this.Commodityrecord.sourceno = this.PuOrderInfo.no;
      this.Commodityrecord.commodityid = this.PuOrderInfo.commodityId;
      this.Commodityrecord.batch = this.PuOrderInfo.batch;
      this.Commodityrecord.nums = this.PuOrderInfo.nums;
      this.Commodityrecord.reason = this.PuOrderInfo.remark;
      this.Commodityrecord.departmentid = 2;
      this.Commodityrecord.staffid = this.PuOrderInfo.handleId;
      this.Commodityrecord.warehouseid = null;
      this.Commodityrecord.operatorid = this.operator.id;
      this.Commodityrecord.status = 1;
      console.log(this.Commodityrecord);
      var dt = new FormData();
      dt.append("iCCommodityRecordDtos", this.Commodityrecord);
      this.$axios
        .post("/CommodityInventory/AddInICommodityRecord", this.Commodityrecord)
        .then((e) => {
          this.$message.success(e.data.msg);
          this.centerDialogVisible = false;
          this.GetPuOrderInfo();
        });
    },
    //获取出入库编号
    getCommodityRecordID() {
      this.$axios.get(`/CommodityInventory/getCommodityRecordID`).then((r) => {
        this.CommodityrecorId = r.data;
      });
    },
    //查询
    searchPuOrder() {
      console.log(this.SearchCommodity.name, this.SearchCommodity.category_id);

      this.$axios
        .get("/CommodityInventory/searchPuOrder", {
          params: {
            name: this.SearchCommodity.name,
            category: this.SearchCommodity.category_id,
          },
        })
        .then((res) => {
          this.PuOrderInfos = res.data;
          this.PuOrderInfos.forEach((element) => {
            element.purchaseDate = element.purchaseDate.substring(0, 10);
          });
        });
    },
  },

  mounted() {
    this.GetPuOrderInfo();
    this.GetCategoryInfo();
    this.getCommodityRecordID();
    this.$axios
      .get(`/CommodityInventory/GetOperator`)
      .then((res) => ((this.operator = res.data), console.log(this.operator)));
  },
};
</script>


