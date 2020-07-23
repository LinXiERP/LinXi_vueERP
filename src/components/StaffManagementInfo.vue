<template>
<div>
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="num"
      label="编号"
     sortable
      width="140">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      
      width="140">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      
      width="140">
    </el-table-column>
     <el-table-column
      prop="deparment"
      label="部门"
      
      width="140">
    </el-table-column>
     <el-table-column
      prop="phone"
      label="电话"
      
      width="140">
    </el-table-column>  
     <el-table-column
      prop="mail"
      label="e-mail"
      
       width="140">
    </el-table-column>
    <el-table-column
      prop="rank"
      label="职位"
       width="140"
     >
    </el-table-column>
     <el-table-column
      prop="rankname"
      label="职称"
       width="140"
     >
    </el-table-column>
    <el-table-column
      width="140"
      label="操作"
     >
       <el-link type="primary">编辑</el-link>
       <el-link type="primary">查看</el-link>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
       
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      //查询所有员工
    selectAllCustomer() {
      var t=this;
      this.$axios
        .get(
          "/StaffManagement/GetAllStaffInfo"
        )
        .then(function(response) {
           t.StaffList=response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    }
  }
</script>