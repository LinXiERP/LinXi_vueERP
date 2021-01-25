<template>
  <div id="CommodityInventory">
    <el-row :gutter="20">
      <el-col :span="14">
        <el-button type="primary" round @click="DeleteCommodity()">删除</el-button>
      </el-col>

      <el-col :span="10">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="商品名称">
            <el-input v-model="SearchCommodity.name" placeholder="商品名称"></el-input>
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
            <el-button type="primary" @click="SearchCommodityInfo()">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-table
        :data="CommodityList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="id " width="80" type="selection"></el-table-column>
        <el-table-column prop="id" label="编号" width="180"></el-table-column>
        <el-table-column prop="name" label="商品名称" width="180"></el-table-column>
        <el-table-column prop="price" label="商品单价"></el-table-column>
        <el-table-column prop="stock" label="库存数量"></el-table-column>
        <el-table-column prop="spec" label="单位"></el-table-column>
        <el-table-column prop="supplie_name" label="供应商"></el-table-column>
        <el-table-column prop="icategory_name" label="类别"></el-table-column>
        <el-table-column prop="address" label="详细" scope="scope">
          <template slot-scope="scope">
            <el-button type="success" icon="el-icon-search" @click="editShow(scope.$index)">查看详情</el-button>
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

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>商品名称：{{Commodity.name}}</span>
      <el-divider></el-divider>
      <span>单位：{{Commodity.name}}</span>
      <el-divider></el-divider>
      <span>单价：{{Commodity.price}}</span>
      <el-divider></el-divider>
      <span>商品产地：{{Commodity.place}}</span>
      <el-divider></el-divider>
      <span>商品规格：{{Commodity.spec}}</span>
      <el-divider></el-divider>
      <span>批准文号：{{Commodity.license_no}}</span>
      <el-divider></el-divider>
      <span>供应商：{{Commodity.supplie_name}}</span>
      <el-divider></el-divider>
      <span>所属类别：{{Commodity.icategory_name}}</span>
      <el-divider></el-divider>
      <span>库存数量：{{Commodity.stock}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      CommodityList: [
        {
          id: "",
          category_id: "",
          supplier_id: "",
          name: "",
          price: "",
          stock: "",
          place: "",
          spec: "",
          license_no: "",
          operator_id: "",
          Icategory_name: "",
          supplie_name: "",
          operator_name: "",
          remark: "",
        },
      ],
      Commodity: {
        id: "",
        category_id: "",
        supplier_id: "",
        name: "",
        price: "",
        stock: "",
        place: "",
        spec: "",
        license_no: "",
        operator_id: "",
        Icategory_name: "",
        supplie_name: "",
        operator_name: "",
        remark: "",
      },
      //商品类型
      CategoryInfo: [
        {
          id: "",
          name: "",
          remark: "",
        },
      ],

      CommodityIds: [],

      //入库单
      Commodityrecord: {},

      activeName: "first",
      select: "",
      CommodityItem: {},
      currentPage: 1, //默认显示第一页
      pageSize: 8, //默认每页显示8条
      totalNum: 0, //总页数
      //商品查找
      SearchCommodity: {
        name: "",
        category_id: "",
      },
      //弹框
      dialogVisible: false,
    };
  },
  created() {
    (this.totalNum = this.CommodityList.length), this.GetPuCommodityInfo();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    //商品信息
    GetPuCommodityInfo() {
      this.$axios.get(`/CommodityInventory/GetPuCommodityInfo`).then((res) => {
        this.CommodityList = res.data;
        this.totalNum = res.data.length;
      });
    },

    //商品类型
    GetCategoryInfo() {
      this.$axios.get(`/CommodityInventory/GetCategoryInfo`).then((res) => {
        this.CategoryInfo = res.data;
      });
    },

    //删除
    DeleteCommodity() {
      this.$axios
        .delete(`/CommodityInventory/DeleteCommodity`, {
          data: this.CommodityIds,
        })

        .then((res) => alert(res.data.msg), this.GetPuCommodityInfo());
    },

    // 查找
    SearchCommodityInfo() {
      console.log(this.SearchCommodity.name, this.SearchCommodity.category_id);

      this.$axios
        .get("/CommodityInventory/ScreenPuCommodityInfo", {
          params: {
            name: this.SearchCommodity.name,
            category: this.SearchCommodity.category_id,
          },
        })
        .then((res) => {
          this.CommodityList = res.data;
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

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    ToEditCustomer(index, row) {
      this.CustomerItem = this.CommodityList[
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

    //弹框
    editShow(index) {
      index = index + (this.currentPage - 1) * 8;
      this.Commodity = this.CommodityList[index];
      console.log(index);
      this.dialogVisible = true;
      console.log(this.Commodity);
    },
  },

  mounted() {
    this.GetPuCommodityInfo();
    this.GetCategoryInfo();
  },
};
</script>
