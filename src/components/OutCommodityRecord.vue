<template id="CommodityInventory">
  <div>
    <el-row :gutter="20">
      <el-col :span="14">出库单详情表</el-col>
      <el-col :span="10">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="出库单编号">
            <el-input v-model="SearchRecord.id"></el-input>
          </el-form-item>
          <el-form-item label="入库单编号">
            <el-input v-model="SearchRecord.sourceno"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="SearchOutRecord()">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-table
        :data="CommodityRecords.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="id" label width="80" type="selection"></el-table-column>
        <!-- <el-table-column prop="id" label="编号" width="180"></el-table-column> -->
        <el-table-column prop="id" label="出库编号" width="180"></el-table-column>
        <el-table-column prop="commodityName" label="商品名称" width="180"></el-table-column>
        <el-table-column prop="nums" label="出库数量"></el-table-column>
        <el-table-column prop="operateTime" label="出库日期"></el-table-column>
        <el-table-column prop="staffName" label="经手人"></el-table-column>
        <el-table-column prop="sourceno" label="领料单编号"></el-table-column>
        <el-table-column prop="address" label="详细">
          <template slot-scope="scope">
            <el-button type="success" icon="el-icon-search" @click="editShow(scope.$index)">查看</el-button>
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

    <el-dialog title="入库单详情" :visible.sync="centerDialogVisible" width="50%" center>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">出库编号：{{Commodityrecord.id}}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">领料编号:{{Commodityrecord.sourceno}}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">出库时间:{{Commodityrecord.operateTime}}</div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="16">
          <div class="grid-content bg-purple">商品名称：{{Commodityrecord.commodityName}}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">出库库数量:{{Commodityrecord.nums}}</div>
        </el-col>
      </el-row>
      <el-divider></el-divider>

      <el-row>
        <el-col :span="16">
          <div class="grid-content bg-purple">经手人：{{Commodityrecord.staffName}}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">操作员:{{operator.name}}</div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="24">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="Commodityrecord.remark"
          ></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      operator: {},
      Commodityrecord: {},
      CommodityRecords: [],
      //商品信息
      CommodityList: [],
      //查询
      SearchRecord: {
        id: "",
        sourceno: "",
      },
      multipleSelection: [],

      //分页
      activeName: "first",
      select: "",
      CommodityRecordItem: {},
      currentPage: 1, //默认显示第一页
      pageSize: 8, //默认每页显示8条
      totalNum: 0, //总页数
      //弹框
      centerDialogVisible: false,
    };
  },

  created() {
    (this.totalNum = this.CommodityRecords.length), this.GetIcCommoditRecord();
  },
  methods: {
    GetIcCommoditRecord() {
      this.$axios
        .get(`/CommodityInventory/GetOutCommodityRecordDtos`)
        .then((res) => {
          this.CommodityRecords = res.data;
          console.log(this.CommodityRecords);
          this.totalNum = res.data.length;
          this.CommodityRecords.forEach((element) => {
            element.operateTime = element.operateTime.substring(0, 10);
          });
        });
    },

    GetPuCommodityInfo() {
      this.$axios.get(`/CommodityInventory/GetPuCommodityInfo`).then((res) => {
        this.CommodityList = res.data;
      });
    },

    //查询
    SearchOutRecord() {
      this.$axios
        .get("/CommodityInventory/SearchOutRecord", {
          params: {
            id: this.SearchCommodity.id,
            sourceno: this.SearchCommodity.sourceno,
          },
        })
        .then((res) => {
          console.log(res.data)
          this.PuOrderInfos = res.data;
         
          this.CommodityRecords.forEach((element) => {
            element.operateTime = String(element.operateTime).substring(0, 10);
            
          });
        });
    },

    //多选
    handleSelectionChange(val) {
      val.forEach((element) => {
        this.multipleSelection.push(element.date);
      });
      console.log(this.multipleSelection);
    },
    //弹框
    editShow(index) {
      index = index + (this.currentPage - 1) * 8;
      this.Commodityrecord = this.CommodityRecords[index];
      console.log(index);
      console.log(this.Commodityrecord);
      this.centerDialogVisible = true;
    },
    //分页
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
      this.CommodityRecordItem = this.CommodityRecords[
        index + (this.currentPage - 1) * 8
      ];
      this.activeName = "second";
    },
    TodetailCustomer(index, row) {
      this.CommodityRecordItem = this.CommodityRecords[
        index + (this.currentPage - 1) * 8
      ];
      this.activeName = "third";
    },
    SearchOutRecord() {},
  },
  mounted() {
    this.GetIcCommoditRecord();
    this.GetPuCommodityInfo();
    this.$axios
      .get(`/CommodityInventory/GetOperator`)
      .then((res) => ((this.operator = res.data), console.log(this.operator)));
  },
};
</script>