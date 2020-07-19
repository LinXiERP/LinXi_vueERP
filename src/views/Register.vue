<template>
  <div>
    <h1>Register</h1>
    <el-button
      type="primary"
      @click="SendGet"
    >SendGetNoAuthorization</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    SendGet() {
      this.$axios.get(`/AcDepartment/GetAC?id=1`);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>


