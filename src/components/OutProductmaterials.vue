<template>
  <div id="OutProductmaterial">
    <el-row :gutter="20">
      <el-col :span="14">
        <div class="grid-content bg-purple">待出库领单</div>
      </el-col>

      <el-col :span="10">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="领料单编号">
            <el-input v-model="searchPuOrderMaterial.id" placeholder="领料单编号"></el-input>
          </el-form-item>
          <el-form-item label="领料部门">
            <el-select v-model="searchPuOrderMaterial.deprtmentid" placeholder="请选择">
              <el-option
                v-for="item in department"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchPrProductMaterial()">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-table
        :data="PrProductMaterials.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="id" label width="80" type="selection"></el-table-column>

        <el-table-column prop="id" label="领料单编号" width="180"></el-table-column>
        <el-table-column prop="commodityName" label="商品名称" width="180"></el-table-column>
        <el-table-column prop="nums" label="领料数量"></el-table-column>
        

        <el-table-column prop="operateTime" label="领料日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <el-tag type="success">待出库</el-tag>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="success" round @click="editShow(scope.$index)">出库</el-button>
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
    </el-row>
    <!-- 弹框 -->
    <el-dialog title="商品出库单" :visible.sync="centerDialogVisible" width="50%" center>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">商品编号：{{PrProductMaterial.commodityId}}</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">出库编号：{{CommodityrecorId}}</div>
        </el-col>
      </el-row>
      <el-divider></el-divider>

      <el-row>
        <el-col :span="12">
          入库时间：
          <el-date-picker v-model="Commodityrecord.operateTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">领料单编号:{{PrProductMaterial.id}}</div>
        </el-col>
      </el-row>
      <el-divider></el-divider>

      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">商品名称：{{PrProductMaterial.commodityName}}</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">商品供应商：{{PrProductMaterial.supplierName}}</div>
        </el-col>
      </el-row>
      <el-divider></el-divider>

      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">商品产地：{{PrProductMaterial.commodityPlace}}</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">商品规格：{{PrProductMaterial.commoditySpec}}</div>
        </el-col>
      </el-row>
      <el-divider></el-divider>

      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">商品类别：{{PrProductMaterial.commodityPrice}}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">商品单价：{{PrProductMaterial.commodityPrice}}</div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">库存数量:{{PrProductMaterial.commodityStock}}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">出库数量：{{PrProductMaterial.nums}}</div>
        </el-col>
      </el-row>
      <el-divider></el-divider>

      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">经手人：{{PrProductMaterial.staffName}}</div>
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
              v-model="PrProductMaterial.remark"
            ></el-input>
          </div>
        </el-col>
      </el-row>

      <el-divider></el-divider>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="CommodityWarehousing()">确定出库</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      operator: {},
      CommodityrecorId: 0,
      PrProductMaterials: [],
      PrProductMaterial: {},
      department: [],
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
       
        operatorid: 0,
        operateTime: "",
        status: 0,
        remark: "",
      },
      //分页
      activeName: "first",
      select: "",
      PrProductMaterialItem: {},
      currentPage: 1, //默认显示第一页
      pageSize: 8, //默认每页显示8条
      totalNum: 0, //总页数
      //弹框
      centerDialogVisible: false,
      //查询
      searchPuOrderMaterial: {
        id: null,
        deprtmentid: null,
      },
    };
  },
  methods: {
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    ToEditCustomer(index, row) {
      this.PrProductMaterialItem = this.PrProductMaterials[
        index + (this.currentPage - 1) * 8
      ];
      this.activeName = "second";
    },
    TodetailCustomer(index, row) {
      this.PrProductMaterialItem = this.PrProductMaterials[
        index + (this.currentPage - 1) * 8
      ];
      this.activeName = "third";
    },
    //弹框
    editShow(index) {
      index = index + (this.currentPage - 1) * 8;
      this.PrProductMaterial = this.PrProductMaterials[index];
      console.log(index);
      this.centerDialogVisible = true;
    },

    GetPrProductMaterial() {
      this.$axios
        .get(`/CommodityInventory/GetPrProductMaterial`)
        .then((res) => {
          this.PrProductMaterials = res.data;
          this.totalNum = res.data.length;
          console.log(this.PrProductMaterials);
          this.PrProductMaterials.forEach((element) => {
            element.operateTime = element.operateTime.substring(0, 10);
          });
        });
    },

    Getdepartment() {
      this.$axios
        .get(`/CommodityInventory/Getdepartment`)
        .then((res) => (this.department = res.data));
    },
    //查找
    searchPrProductMaterial() {
      this.$axios
        .get("/CommodityInventory/searchPrProductMaterial", {
          params: {
            id: this.searchPuOrderMaterial.id,
            depatmentId: this.searchPuOrderMaterial.deprtmentid,
          },
        })
        .then((res) => {
          this.PrProductMaterials = res.data;
          this.PrProductMaterials.forEach((element) => {
            element.operateTime = element.operateTime.substring(0, 10);
          });
        });
    },
    //出库
    CommodityWarehousing() {
      this.Commodityrecord.id = this.CommodityrecorId;
      this.Commodityrecord.name = "出库";
      this.Commodityrecord.isin = 1;
      this.Commodityrecord.sourcecategory = 0;
      this.Commodityrecord.sourceid = this.PrProductMaterial.id;
      this.Commodityrecord.sourceno = this.PrProductMaterial.id;
      this.Commodityrecord.commodityid = this.PrProductMaterial.commodityId;
      this.Commodityrecord.batch = this.PrProductMaterial.commoditySpec;
      this.Commodityrecord.nums = this.PrProductMaterial.nums;
      this.Commodityrecord.reason = this.PrProductMaterial.uses;
      this.Commodityrecord.departmentid = this.PrProductMaterial.departmentId;
      this.Commodityrecord.staffid = this.PrProductMaterial.staffId;
     
      this.Commodityrecord.operatorid = this.operator.id;
      this.Commodityrecord.status = 1;
      console.log(this.Commodityrecord);
      var dt = new FormData();
      dt.append("iCCommodityRecordDtos", this.Commodityrecord);
      this.$axios
        .post(
          "/CommodityInventory/AddOutICommodityRecord",
          this.Commodityrecord
        )
        .then((e) => {
          this.$message.success(e.data.msg);
          this.centerDialogVisible = false;
          this.GetPrProductMaterial();
        });
    },

    //多选
    handleSelectionChange(val) {
      this.CommodityIds = [];
      val.forEach((element) => {
        this.CommodityIds.push(element.id);
      });
      console.log(this.CommodityIds);
    },
    //获取出入库编号
    getCommodityRecordID() {
      this.$axios.get(`/CommodityInventory/getCommodityRecordID`).then((r) => {
        this.CommodityrecorId = r.data;
      });
    },
  },
  mounted() {
    this.GetPrProductMaterial();
    this.Getdepartment();
    this.getCommodityRecordID();
    this.$axios
      .get(`/CommodityInventory/GetOperator`)
      .then((res) => ((this.operator = res.data), console.log(this.operator)));
  },
};
</script>

