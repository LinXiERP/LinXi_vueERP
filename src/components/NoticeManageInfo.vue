<template>
  <div id="noticeManage">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="公告列表" name="first">
        <el-row>
          <el-input placeholder="请输入内容" v-model="Searchnotice.name"  class="input-with-select">
            <el-select
              v-model="Searchnotice.select"
              slot="prepend"
              placeholder="请选择"
              style="width:150px;"
            >
              <el-option label="公告标题" value="1"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" style="width:150px;" @click="Selectnotice"></el-button>
          </el-input>
        </el-row>
        <el-table
          :data="noticeList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
         
          v-loading="loading"
        >
        <el-table-column prop="id" label="序号" ></el-table-column>
             <el-table-column prop="createdate" label="发布日期"></el-table-column>
            <el-table-column prop="title" label="通告" ></el-table-column>
          <el-table-column label width="300">
            <template slot-scope="scope">
            <!-- Form -->
<el-button  type="primary" @click="ToEditnotice(scope.$index, scope.row)">编辑</el-button>
              <el-button
                type="danger"
                @click="Deletenotice(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row style="text-align:center;">
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="pageSize"
              layout="prev, pager, next, jumper"
              :total="totalNum"
            ></el-pagination>
          </div>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="发布公告" name="fourth">
        <el-form ref="notice" :model="noticeItem" label-width="90px" size="medium">
          <el-row>
            <el-col :span="24">
              <div
                class="grid-content bg-purple-dark"
                style="text-align:center;font-size:25px;margin-bottom:15px;"
              > </div>
            </el-col>
          </el-row>
              <el-form-item label="标题">
                <el-input v-model="noticeItem.title" placeholder="请输入标题"></el-input>
              </el-form-item>
              <el-form-item label="内容">
                <el-input v-model="noticeItem.detail" placeholder="请输入内容"></el-input>
              </el-form-item>
                <el-form-item>
              <el-col :span="10">
                <el-button type="primary" style="width:90%;height:50px;" @click="Addnotice">提交</el-button>
              </el-col>
              <el-col :span="10">
                <el-button type="warning" style="width:90%;height:50px;">重置</el-button>
              </el-col>
            </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
     <!-- 编辑模态框 -->
    <el-dialog title="公告信息" :visible.sync="dialogFormVisible">
   <el-form :model="noticeItem"  >  
    
 
    <el-form-item  label="标题"  :label-width="formLabelWidth">
      <el-input v-model="noticeItem.title" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="内容:" :label-width="formLabelWidth" >
      <el-input v-model="noticeItem.detail" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="Updatenotice">确 定</el-button>
  </div>
</el-dialog>
 <!-- 详情模态框 -->
    <el-dialog title="公告信息" :visible.sync="dialogdetail">
   <el-form :model="noticeItem"  >  
       <el-row>
 <el-col span="10">
    <el-form-item  label="公告姓名:"  :label-width="formLabelWidth">
      <el-input v-model="noticeItem.name" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">  
     <el-form-item label="性别:" :label-width="formLabelWidth" >
      <el-input v-model="noticeItem.sexName" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
      <el-row>
 <el-col span="10">
    <el-form-item  label="工号:"  :label-width="formLabelWidth">
      <el-input v-model="noticeItem.no" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">
     <el-form-item label="公告地址:" :label-width="formLabelWidth" >
      <el-input v-model="noticeItem.address" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
    <el-row>
 <el-col span="10">
    <el-form-item  label="电话:"  :label-width="formLabelWidth">
      <el-input v-model="noticeItem.tel" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">
     <el-form-item label="所属部门:" :label-width="formLabelWidth" >
      <el-input v-model="noticeItem.deparmentName" readonly="true"  autocomplete="off"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
    <el-row>
 <el-col span="10">
    <el-form-item  label="状态:" style="readonly"  :label-width="formLabelWidth">
      <el-input v-model="noticeItem.statusStr" readonly="true" autocomplete="off"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">
    </el-col>
    </el-row>
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
        formLabelWidth: '120px',
      activeName: "first",
      select: "",
      noticeItem: {},//单个公告
      currentPage: 1, //默认显示第一页
      pageSize: 8, //默认每页显示8条
      totalNum: 0, //总页数
      noticeList: [],//公告集合
      Searchnotice: {  //查询公告
        name: "",//要查询的姓名
        select: "1"//查询的方式1.公告姓名，2.公告电话，3.联系人名
      },
      loading: true,//表格加载
    };
  },
  created() {
    this.SelectAllNotice();//默认进来就加载所有的公告
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      this.noticeItem={};
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
     ToEditnotice(index, row) {
       this.dialogFormVisible=true
      this.noticeItem = this.noticeList[index + (this.currentPage - 1) * 8];
      this.activeName = "first";
    },
    Todetailnotice(index, row){
      this.dialogdetail=true
      this.noticeItem = this.noticeList[index + (this.currentPage - 1) * 8];
    },
    //删除公告
   Deletenotice(index) {
      var t = this;
      console.log( t.noticeList)
      this.$axios
        .put(
          "/AcNotice/Deletenotice",
         t.noticeList[index]
        )
        .then(function(response) {
          if (response.data.code == 200 && response.data.msg=="成功") {
             t.$message.danger("删除成功！");
            t.SelectAllNotice();
            t.noticeItem = {};
            t.activeName="first"
          } else {
           t.$message.error(response.data.msg)
            t.noticeItem = {};
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //查询所有公告
    SelectAllNotice() {
      var t = this;
      this.$axios
        .get("/AcNotice/GetAllNoticeInfo")
        .then(function(response) {
          console.log(response.data);
          t.totalNum = response.data.length;//多少页数据
          t.noticeList = response.data;//将公告集合给前端
          t.loading=false;//表格加载完成
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //编辑公告信息
    Updatenotice() {
      var t = this;
      t.dialogFormVisible=false
      this.$axios
        .put(
          "/AcNotice/Updatenotice",
          t.noticeItem
        )
        .then(function(response) {
          if (response.data.code == 200) {
            t.$message.success("更新成功！");
            
          } else {
            t.$message.error("更新失败！");
            
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //添加公告
    Addnotice() {
      var t = this;
      this.$axios
        .post(
          "/AcNotice/Addnotice",
          t.noticeItem
        )
        .then(function(response) {
         
          if (response.data.code == 200) {
            t.$message.success("添加成功！");
            t.SelectAllNotice();
            t.noticeItem = {};
            t.activeName="first"
          } else {
            t.$message.warn("添加失败！");
            t.noticeItem = {};
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
     //过滤信息
    Selectnotice(){
      var t=this;
      this.$axios
        .get(
          "/AcNotice/SelectAcNoticeInfo?name="+t.Searchnotice.name+"&select="+t.Searchnotice.select
        )
        .then(function(response) {
          t.noticeList= response.data;
          t.$message.success("查询成功");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  }
};
</script>

<style lang="scss" scoped>
</style>


