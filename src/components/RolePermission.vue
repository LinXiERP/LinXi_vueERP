
<template>
  <div class="block">
    <el-col>角色权限管理</el-col>
    <el-row :gutter="20">
      <span class="demonstration">角色</span>
      <el-select v-model="rolepermissio.role" placeholder="请选择">
        <el-option v-for="item in Roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>

      <span class="demonstration"></span>
      <el-cascader
        ref="cascader"
        placeholder="权限"
        v-model="permissios"
        :options="options"
        :props="props"
        clearable
      ></el-cascader>

      <el-button type="success" round @click="ed">授权</el-button>
    </el-row>
  </div>
</template>

<script>
let id = 0;
export default {
  data() {
    return {
      props: {
        multiple: true,
      },
      options: [],
      rolepermissio: {
        role: 0,
        permissio: [],
      },
      Roles: [],
      permissios: [],
      option: {
        value: 0,
        lable: "",
        children: [],
      },
    };
  },
  methods: {
    GetRoles() {
      this.$axios.get(`/RoleMenus/GetAcRoles`).then((res) => {
        this.Roles = res.data;
      });
    },
    GetPermission() {
      this.$axios.get(`/RoleMenus/GetTreeList`).then((res) => {
        this.options = this.getTreeData(res.data);
      });
    },

    ed() {
      console.log(this.permissios);
      this.permissios.forEach((v) => {
        v.forEach((element) => {
          this.rolepermissio.permissio.push(element);
        });
      });
      console.log(this.rolepermissio.permissio);

      this.$axios
        .post(
          "/RoleMenus/EdRolePermission?role=" +
            this.rolepermissio.role +
            "&&" +
            "permissios=" +
            JSON.stringify(this.rolepermissio.permissio)
        )
        .then((res) => {
          alert(res.data.msg);
        });
    },

    getTreeData(data) {
      // 循环遍历json数据
      for (var i = 0; i < data.length; i++) {
        if (data[i].children.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].children = undefined;
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children);
        }
      }
      return data;
    },
  },
  mounted() {
    this.GetRoles();
    this.GetPermission();
  },
};
</script>