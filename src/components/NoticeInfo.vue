<template>
<div id="Noticeinfo">
  
<h3>企业公告</h3>
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="num"
      label="序号"
     
      width="130">
    </el-table-column>
    <el-table-column
      prop="date"
      label="日期"
      sortable
      width="180">
    </el-table-column>
 
    <el-table-column
      prop="notice"
      label="奖励通告"
     >
    </el-table-column>
    <el-table-column
      label="操作"
      :formatter="formatter">
         <el-button type="text" @click="open">详情</el-button>
    </el-table-column>
  </el-table>
  <el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
            num:1,
          date: '2016-05-02',
          notice: '见义勇为员工奖励'
        }, {
            num:2,
          date: '2016-05-04',
          notice: '年度十大优秀员工'
        }, {
            num:3,
          date: '2016-05-01',
          notice: '工作努力三好员工奖励'
        }, {
            num:4,
          date: '2016-05-03',
          notice: 'rrr'
        }]
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
         open() {
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定'

        });
      }
    }
  }
</script>