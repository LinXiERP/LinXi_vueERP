<template>
  <div>
    <el-container>
      <el-main>
        <img
          src="@/assets/image/logo/logo.png"
          alt="logo"
          width="750px"
          height="300px"
        >
        <el-row :gutter="10">
          <el-col
            :span="10"
            :offset="8"
          >
            <div
              class="shadow-lg p-3 mb-5 bg-white rounded"
              style="height:400px;width:570px;margin-left:15px;"
            >
              <el-link :underline="false">
                <h2>登录界面 </h2>
              </el-link>

              <el-form
                ref="form"
                :model="form"
                style=""
                label-width="100px"
                label-position="center"
                status-icon
                :rules="rules"
                class="demo-ruleForm"
              >
                <el-row :gutter="10">
                  <el-col :span="21">
                    <el-form-item
                      label="账号"
                      prop="name"
                    >
                      <el-input
                        v-model="form.name"
                        placeholder="请输入登录账户"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="21">
                    <el-form-item
                      label="密码"
                      prop="password"
                    >
                      <el-input
                        type="password"
                        v-model="form.password"
                        placeholder="请输入登录密码"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="21">
                    <el-form-item style="float:right">
                      <el-button
                        type="primary"
                        @click="submitForm('form')"
                      >提交</el-button>
                      <el-button @click="resetForm('form')">重置</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-form>
            </div>

          </el-col>
        </el-row>

      </el-main>
    </el-container>

  </div>
</template>

<script>
import md5 from "js-md5";
export default {
  name: "Login",
  data() {
    return {
      form: {
        name: "",
        password: ""
      },
      rules: {
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let that = this;
          this.$axios
            .post(`/Login/LoginCheck`, {
              Name: this.form.name,
              Password: md5(`${this.form.password}Auto`)
            })
            .then(res => {
              if (res.data.success == false) {
                console.log(1);
                that.$message.error(res.data.msg);
              } else {
                that.$message.success("登录成功!");
                //设置token
                sessionStorage.setItem("token", res.data.msg);
                //设置用户名
                sessionStorage.setItem("name", res.data.entity.name);
                that.$router.push("/Home");
              }
            });
        } else {
          this.$message.warn("您输入有误哦！");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
body,
html {
  height: 100%;
}
.el-header {
  color: #333;
  text-align: center;
  line-height: 20px;
  background: #2193b0; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #6dd5ed,
    #2193b0
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #6dd5ed,
    #2193b0
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  color: #333;
  height: 975px;
  text-align: center;
  line-height: 160px;
  background: #2193b0; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #6dd5ed,
    #2193b0
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #6dd5ed,
    #2193b0
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

body > .el-container {
  margin-bottom: 40px;
}
.el-row {
  margin-bottom: 10px;
}
</style>
