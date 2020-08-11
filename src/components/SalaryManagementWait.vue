<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="编号 "
      width="180">
      <template slot-scope="scope">
       
        <span style="margin-left: 10px">{{ scope.row.num }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
     <el-table-column
      label="性别"
      width="180">
      <template slot-scope="scope">
        
        <span style="margin-left: 10px">{{ scope.row.sex }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="部门"
      width="180">
      <template slot-scope="scope">
      
        <span style="margin-left: 10px">{{ scope.row.deparmentName }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="电话"
      width="180">
      <template slot-scope="scope">
       
        <span style="margin-left: 10px">{{ scope.row.tel }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="职位"
      width="180">
      <template slot-scope="scope">
     
        <span style="margin-left: 10px">{{ scope.row.rank }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button 
        type="primary"
          size="mini"
          @click="dialogFormVisible = true">编辑</el-button>
         <!-- 编辑弹框 -->
<el-dialog title="收货地址" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-input v-model="scope.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>

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
           num:'9527',
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