<template>
  <div style="height:1000px">
    <el-aside width="200px">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        style="height:1000px"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>企业管理</span>
          </template>
          <el-menu-item-group style="text-align:center">
            <el-menu-item
              index="1-1"
              @click="GoPath(`/Notice/NoticeInfo`)"
            >企业公告</el-menu-item>
            <el-menu-item
              index="1-2"
              @click="GoPath(`/StaffManagement/StaffManagementInfo`)"
            >人事管理</el-menu-item>
            <el-menu-item index="1-3">待定薪资</el-menu-item>
            <el-menu-item index="1-4">薪资维护</el-menu-item>
            <el-menu-item index="1-5">薪资管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>生产管理</span>
          </template>
          <el-menu-item-group style="text-align:center">
            <el-menu-item index="2-1" @click="GoPath(`/ProductionManagement/ProductionPlanManagement`)">计划管理</el-menu-item>
            <el-menu-item index="2-2" @click="GoPath(`/ProductionManagement/ProductionPickingManagement`)">领料管理</el-menu-item>
            <el-menu-item index="2-3" @click="GoPath(`/ProductionManagement/ProductionProductManagement`)">产品生产</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>客户管理</span>
          </template>
          <el-menu-item-group style="text-align:center">
            <el-menu-item
              index="3-1"
              @click="GoPath(`/Customermanage/CustomermanageInfo`)"
            >客户资料</el-menu-item>
            <el-menu-item
              index="3-2"
              @click="GoPath(`/Customermanage/CustomermanageOrder`)"
            >订单管理</el-menu-item>
            <el-menu-item index="3-3">订单跟踪</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>采购管理</span>
          </template>
          <el-menu-item-group style="text-align:center">
            <el-menu-item index="4-1"
                 @click="GoPath(`/PurchaseManagement/Create`)
            >添加采购单</el-menu-item>
            <el-menu-item
              index="4-2"
              @click="GoPath(`/PurchaseManagement/PurchaseEdit`)"
            >采购单管理</el-menu-item>
            <el-menu-item
              index="4-3"
              @click="GoPath(`/PurchaseManagement/Statistics`)"
            >采购统计</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>商品库存管理</span>
          </template>
          <el-menu-item-group style="text-align:center">
            <el-menu-item
              index="5-1"
              @click="GoPath(`/CommodityInventory/CommodityInventoryInfo`)"
            >库存管理</el-menu-item>

            <el-menu-item
              index="5-2"
              @click="GoPath(`/CommodityInventory/PuOrderInfo`)"
            >添加入库单</el-menu-item>
            <el-menu-item index="5-3">入库单管理</el-menu-item>
            <el-menu-item index="5-4">添加出库单</el-menu-item>
            <el-menu-item index="5-5">出库单管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>销售管理</span>
          </template>
          <el-menu-item-group style="text-align:center">
            <el-menu-item
              index="6-1"
              @click="GoPath(`/SaleManagement/SaleOrderManagement`)"
            >销售单管理</el-menu-item>
            <el-menu-item index="6-2">待销售订单</el-menu-item>
            <el-menu-item index="6-3">销售统计</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="7">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>产品库存管理</span>
          </template>
          <el-menu-item-group style="text-align:center">
            <!-- <el-menu-item index="7-1">选项1</el-menu-item>
            <el-menu-item index="7-2">选项2</el-menu-item>
            <el-menu-item index="7-3">销售统计</el-menu-item>-->
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="8">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>往来管理</span>
          </template>
          <el-menu-item-group style="text-align:center">
            <el-menu-item index="8-1">销售结款单</el-menu-item>
            <el-menu-item index="8-2">采购结款单</el-menu-item>
            <el-menu-item index="8-3">采购退货单</el-menu-item>
            <el-menu-item index="8-4">销售发货单</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="9">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>质量管理</span>
          </template>
          <el-menu-item-group style="text-align:center">
            <el-menu-item index="9-1">待检商品</el-menu-item>
            <el-menu-item index="9-2">商品质检单</el-menu-item>
            <el-menu-item index="9-3">待检产品</el-menu-item>
            <el-menu-item index="9-4">产品质检单</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="10">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>基础信息</span>
          </template>
          <el-menu-item-group style="text-align:center">
            <el-menu-item index="10-1">供应商资料</el-menu-item>
            <el-menu-item index="10-2">商品资料</el-menu-item>
            <el-menu-item index="10-3">产品资料</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="11">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>系统管理</span>
          </template>
          <el-menu-item-group style="text-align:center">
            <el-menu-item index="11-1">用户管理</el-menu-item>
            <el-menu-item index="11-2">部门管理</el-menu-item>
            <el-menu-item index="11-3">公告管理</el-menu-item>
            <el-menu-item index="11-4">系统帮助</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  name: "Left",
  data() {
    return {
      array: [1, 2],
    };
  },
  methods: {
    GoPath(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style lang="scss" scoped>
body,
html {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  width: 100%;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  line-height: 200px;
  height: 1000px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
