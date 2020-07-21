<template>
  <div id="CustomerManage">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户列表" name="first">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="编号" width="180"></el-table-column>
          <el-table-column prop="name" label="客户名称" width="180"></el-table-column>
          <el-table-column prop="address" label="电话"></el-table-column>
          <el-table-column prop="address" label="联系人"></el-table-column>
          <el-table-column prop="address" label="email"></el-table-column>
          <el-table-column prop="address" label="开户银行"></el-table-column>
          <el-table-column  label=""></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="添加用户" name="second"></el-tab-pane>
      <el-tab-pane label="删除用户" name="third"></el-tab-pane>
      <el-tab-pane label="编辑用户" name="fourth">
        <el-form ref="Customer" :model="Customer" label-width="90px" size="medium">
          <el-row>
            <el-col :span="24">
              <div
                class="grid-content bg-purple-dark"
                style="text-align:center;font-size:20px;"
              >编辑客户资料</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="客户全称：">
                <el-input v-model="Customer.name" placeholder="请输入名称"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户简称：">
                <el-input v-model="Customer.name" placeholder="请输入简称"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="邮政编码：">
                <el-input v-model="Customer.name" placeholder="请输入编码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="客户地址：">
                <el-input v-model="Customer.name" placeholder="请输入名称"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户电话：">
                <el-input v-model="Customer.name" placeholder="请输入简称"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="客户传真：">
                <el-input v-model="Customer.name" placeholder="请输入编码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="联系人名：">
                <el-input v-model="Customer.name" placeholder="请输入名称"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系电话：">
                <el-input v-model="Customer.name" placeholder="请输入简称"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="email：">
                <el-input v-model="Customer.name" placeholder="请输入编码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="开户银行：">
                <el-input v-model="Customer.name" placeholder="请输入名称"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="银行账号：">
                <el-input v-model="Customer.name" placeholder="请输入简称"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item>
                <el-button type="primary">提交</el-button>
                <el-button type="warning">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      Customer: {
        name: "",
        id: "",
        postalCode: ""
      }
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>


