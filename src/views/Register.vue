<template>
  <div>
    <img
      src="../assets/image/background/erp2.jpg"
      class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
      alt=""
      style="width:120%;height:120%"
    >
  </div>
</template>

<script>
export default {
  methods: {
    SendGet() {
      this.$axios.get(`/AcDepartment/GetAC?id=1`);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>


