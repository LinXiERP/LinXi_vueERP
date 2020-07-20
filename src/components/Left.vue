<template>
  <div style="height:1000px">
    <el-aside width="200px">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="height:1000px"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>客户管理</span>
          </template>
          <el-submenu index="1-4">
            <template slot="title">客户资料</template>
            <!-- <el-menu-item index="1-4-1">选项1</el-menu-item> -->
          </el-submenu>

            <el-submenu index="1-4">
            <template slot="title">订单管理</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>

            <el-submenu index="1-4">
            <template slot="title">订单跟踪</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>


        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item
          index="3"
          disabled
        >
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {

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
  text-align: center;
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
