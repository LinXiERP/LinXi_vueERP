<template>
  <div class="home">
    <h1>Home</h1>
    Template里面必须得包一层div哦，如果有两个同级div就会报错哦
    <router-view></router-view>
    <el-row class="row-bg">
      <el-col :span="12">
        我是ElementUI的按钮
        <el-button
          type="success"
          @click="goToLogin"
        >点我去Login</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        我是BootStrap的按钮
        <button
          class="btn btn-primary"
          @click="JoinView"
        >将404子页面加载至Home
        </button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        我是BootStrap的按钮
        <button
          class="btn btn-primary"
          @click="JoinView2"
        >将Register子页面加载至Home
        </button>
      </el-col>
    </el-row>

  </div>
</template>



<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  methods: {
    goToLogin() {
      this.$router.push("/Login");
    },
    JoinView() {
      this.$router.push("/Home/NotFound");
    },
    JoinView2() {
      this.$router.push("/Home");
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
