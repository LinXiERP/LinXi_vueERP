<template>
  <div class="home">
    <el-container>
      <el-header>
        <top></top>
      </el-header>
      <el-container>
        <left></left>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>



<script>
import HelloWorld from "@/components/HelloWorld.vue";
import Top from "../components/Top.vue";
import Left from "../components/Left.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Top,
    Left
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
.el-header {
  padding: 0;
}
</style>
