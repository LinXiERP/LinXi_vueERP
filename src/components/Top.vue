<template>
  <div>
    <el-header>
      <div
        class="module-header-wrapper"
        style="height: 62px;"
      >
        <div
          class="header_logo"
          style="float:left"
        >
          <img
            src="../assets/image/background/erp1.jpg"
            width="60"
            height="60"
            alt="Logo"
            style="margin-left:0px;padding-top:2px;float: left;"
          />
          <!-- <font
            face="verdana"
            style="line-height: 60px;margin-left: 10px;"
          ></font> -->
          <span style="font:bold 45px helvetica,arial,sans-serif;color:white;text-shadow:5px 5px  5px #333"><i>灵犀ERP</i></span>
        </div>

        <nav
          class="header_nav"
          style=" margin-left: -100px;"
        >
          <ul>
            <li>
              <a
                href="/home/AllFile"
                style="margin-left:-20px;text-decoration: none;"
              >
                <span
                  class="icon icon-home"
                  title="ERP"
                ></span>
              </a>
            </li>

            <li style="margin-left:85%;margin-top:0.4%;">
              <el-dropdown @command="handleCommand">
                <div class="demo-fit">
                  <div class="block">

                    <span
                      class="title badge badge-warning badge-pill el-dropdown-link"
                      style="margin-left:10px;font-size:17px;"
                    >
                      {{Name}}
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu
                      slot="dropdown"
                      style="margin-top:-10px"
                    >

                      <el-dropdown-item
                        icon="el-icon-s-home"
                        command="returnHome"
                      >返回首页</el-dropdown-item>
                      <el-dropdown-item
                        icon="el-icon-circle-plus"
                        command="btnExit"
                      >退出</el-dropdown-item>
                    </el-dropdown-menu>
                  </div>
                </div>
              </el-dropdown>
            </li>
          </ul>
        </nav>
      </div>
    </el-header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Name: sessionStorage.getItem("name"),
    };
  },
  methods: {
    handleCommand(command) {
      if (command == "btnExit") {
        sessionStorage.clear();
        this.$router.push("/login");
      } else if (command == "returnHome") {
        console.log(1);
        this.$router.push("/Home");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-header,
.el-footer {
  padding: 0;
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
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

* {
  margin: 0;
  padding: 0;
}

.headBox {
  height: 62px;
  width: 100%;
}

ul,
li {
  list-style: none;
}

.header_logo {
  /* padding-left: 50px; */
  height: 60px;
  overflow: hidden;
}

.header_logo a {
  font-size: 25px;
}
/* 设置图标导航栏 */

.header_nav {
  height: 60px;
  line-height: 60px;
  overflow: hidden;
}

.header_nav li {
  float: left;
  margin-left: 70px;
}

.header_nav li:hover {
  transition: all 600ms linear 0s;
}

.header_nav a span {
  font-size: 25px;
}

a {
  color: black;
  text-decoration: none;
}
</style>
