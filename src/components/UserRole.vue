<template>
  <div>
    <el-col>账户角色管理</el-col>
    <el-table :data="UserInfos" stripe style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>

      <el-table-column prop="account" label="用户" width="180"></el-table-column>
      <el-table-column prop="name" label="角色" width="250">
        <template slot-scope="scope">
          <el-select v-model="scope.row.roleId" placeholder="请选择" filterable allow-create>
            <el-option v-for="item in Role " :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-check" circle @click="Edit(scope.$index)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      UserInfos: [],
      userInfo: {
        account: "admin",
        id: 1,
        pwd: "e5e567921a572dbbf747ba712857f8dd",
        roleId: 1,
        staffId: 1,
      },
      Role: [],
    };
  },
  methods: {
    GetUserInfos() {
      this.$axios.get("/RoleMenus/GetUserInfos").then((res) => {
        this.UserInfos = res.data;
      });
    },
    GetRoles() {
      this.$axios.get("/RoleMenus/GetAcRoles").then((res) => {
        this.Role = res.data;
        console.log(this.Role);
      });
    },
    Edit(index) {
      this.userInfo = this.UserInfos[index];
      console.log(this.userInfo);
      this.userInfo = JSON.stringify(this.userInfo);
      this.$axios
        .put("/RoleMenus/EdUserInfo?UserInfo=" + this.userInfo)
        .then((res) => {
          alert(res.data.msg);
        });
    },
  },
  mounted() {
    this.GetUserInfos();
    this.GetRoles();
  },
};
</script>