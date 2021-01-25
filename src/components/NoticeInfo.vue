<template>
<div id="Noticeinfo">
<h3>企业公告</h3>
  <el-table
          :data="noticelist.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column prop="id" label="序号"></el-table-column>
             <el-table-column prop="createdate" label="发布日期"></el-table-column>
            <el-table-column prop="title" label="通告" ></el-table-column>
          <el-table-column label width="300">
            <template slot-scope="scope">
            <!-- Form -->
              <el-button
                type="primary"
                @click="TodetailNotice(scope.$index, scope.row)"
              >详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 详情模态框 -->
        <el-dialog title="公告详情" :visible.sync="dialogdetail">
   <el-form :model="noticeitem"  >  
    <el-form-item  label="发布日期:"  :label-width="formLabelWidth">
      <el-input v-model="noticeitem.createdate" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     <el-form-item label="标题:" :label-width="formLabelWidth" >
      <el-input v-model="noticeitem.title" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
    <el-form-item  label="详细:"  :label-width="formLabelWidth">
      <el-input v-model="noticeitem.detail" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary"  @click="dialogdetail=false">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
       dialogdetail:false,
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '120px',
      activeName: "first",
      select: "",
      noticeitem: {},//单个公告
      currentPage: 1, //默认显示第一页
      pageSize: 8, //默认每页显示8条
      totalNum: 0, //总页数
      noticelist: [],//公告集合
      SearchStaff: {  //查询公告
        name: "",//要查询的姓名
        select: "1"//查询的方式1.公告姓名，2.公告电话，3.联系人名
      },
      loading: true,//表格加载
      }
    },
  created() {
    this.SelectAllNotice();//默认进来就加载所有的公告
  },
    methods: {
      SelectAllNotice() {
      var t = this;
      this.$axios
        .get("/AcNotice/GetAllNoticeInfo")
        .then(function(response) {
          console.log(response.data);
          t.totalNum = response.data.length;//多少页数据
          t.noticelist = response.data;//将公告集合给前端
          t.loading=false;//表格加载完成
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    TodetailNotice(index, row){
      this.dialogdetail=true
      this.noticeitem = this.noticelist[index + (this.currentPage - 1) * 8];
    },
      }
    }
  
</script>