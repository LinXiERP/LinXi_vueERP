<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="员工编号"
      width="180">
      <template slot-scope="scope">
     
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="员工姓名"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>部门: {{ scope.row.deparmentName }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
     <el-table-column
      label="基本工资"
      width="180">
      <template slot-scope="scope">
        
        <span style="margin-left: 10px">{{ scope.row.sex }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="总计金额"
      width="180">
      <template slot-scope="scope">
      
        <span style="margin-left: 10px">{{ scope.row.deparmentName }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="发放日期"
      width="180">
      <template slot-scope="scope">
       
        <span style="margin-left: 10px">{{ scope.row.tel }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="税款"
      width="180">
      <template slot-scope="scope">
     
        <span style="margin-left: 10px">{{ scope.row.rank }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="dialogFormVisible = true">编辑</el-button>
         <!-- 编辑弹框 -->
<el-dialog  width="50%" title="薪资信息" :visible.sync="dialogFormVisible">
  <el-form :model="form"  >  
       <el-row>
 <el-col span="10">
    <el-form-item  label="员工编号:"  :label-width="formLabelWidth">
      <el-input v-model="scope.name" autocomplete="off"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">
     <el-form-item label="创建日期:" :label-width="formLabelWidth" >
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
      <el-row>
 <el-col span="10">
    <el-form-item  label="员工姓名:"  :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">
     <el-form-item label="所属部门:" :label-width="formLabelWidth" >
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
    <el-row>
 <el-col span="10">
    <el-form-item  label="基本工资:"  :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">
     <el-form-item label="午餐补贴:" :label-width="formLabelWidth" >
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
    <el-row>
 <el-col span="10">
    <el-form-item  label="住房补贴:"  :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">
     <el-form-item label="全勤奖金:" :label-width="formLabelWidth" >
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
    <el-row>
 <el-col span="10">
    <el-form-item  label="额外补助:"  :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">
     <el-form-item label="罚款金额:" :label-width="formLabelWidth" >
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
     <el-row>
 <el-col span="10">
    <el-form-item  label="税收金额:"  :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">
     <el-form-item label="总计金额:" :label-width="formLabelWidth" >
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
     <el-row>
 <el-col span="10">
    <el-form-item  label="发放日期:"  :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">
     <el-form-item label="工资账号:" :label-width="formLabelWidth" >
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
    <el-row>
         <el-col span="12">
     <el-form-item label="银行名称:" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择银行名称">
        <el-option label="工商银行" value="beijing"></el-option>
        <el-option label="招商银行" value="beijing"></el-option>
        <el-option label="农业银行" value="beijing"></el-option>
        <el-option label="建设银行" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    </el-col>
    </el-row>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
<!-- 编辑弹框 -->
            <el-popconfirm
  confirmButtonText='是的'
  cancelButtonText='再看看'
  icon="el-icon-info"   
  iconColor="red"
  title="确定删除该条记录吗？"
>
  <el-button  size="mini" type="danger" slot="reference">删除</el-button>
</el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          sex:'男',
          deparmentName:'采购部',
          tel:'13124121421',
          rank:'员工',
         
          address: '上海市普陀区金沙江路 1518 弄'
        }],
         dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>