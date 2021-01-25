<template>
  <div id="SalaryManage">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="薪资维护" name="first">
        <el-row>
          <el-input placeholder="请输入内容" v-model="SearchSalary.name"  class="input-with-select">
            <el-select
              v-model="SearchSalary.select"
              slot="prepend"
              placeholder="请选择"
              style="width:150px;"
            >
              <el-option label="员工姓名" value="1"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" style="width:150px;" @click="SelectSalary"></el-button>
          </el-input>
        </el-row>
        <el-table
          :data="SalaryList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column prop="id" label="编号" width="120"></el-table-column>
             <el-table-column prop="no" label="员工工号" width="120"></el-table-column>
            <el-table-column prop="departmentName" label="员工部门" width="120"></el-table-column>
              <el-table-column prop="name" label="员工姓名" width="120"></el-table-column>
          <el-table-column prop="base" label="基本工资"></el-table-column>
            <el-table-column prop="sum" label="总计金额"></el-table-column>
          <el-table-column prop="grant" label="发放日期" width="100"></el-table-column>
          <el-table-column prop="tax" label="税款" width="100"></el-table-column>
          <el-table-column label width="300">
            <template slot-scope="scope">
            <!-- Form -->
              <el-button
                type="primary"
                @click="ToEditSalary(scope.$index, scope.row)"
              >编辑</el-button>
              
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
    </el-tabs>
     <!-- 编辑模态框 -->
    <el-dialog title="薪资信息" :visible.sync="dialogFormVisible">
   <el-form :model="SalaryItem"  >  
       <el-row>
 <el-col span="10">
    <el-form-item  label="员工编号:"  :label-width="formLabelWidth">
      <el-input v-model="SalaryItem.no" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">  
     <el-form-item label="创建日期:" :label-width="formLabelWidth" >
      <el-input v-model="SalaryItem.createdate" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
      <el-row>
 <el-col span="10">
    <el-form-item  label="员工姓名:"  :label-width="formLabelWidth">
      <el-input v-model="SalaryItem.name" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">
     <el-form-item label="员工部门:" :label-width="formLabelWidth" >
      <el-input v-model="SalaryItem.departmentName" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
    <el-row>
 <el-col span="10">
    <el-form-item  label="基本工资:"  :label-width="formLabelWidth">
      <el-input v-model="SalaryItem.base" autocomplete="off" ></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">
     <el-form-item label="午餐补贴:" :label-width="formLabelWidth" >
      <el-input v-model="SalaryItem.lunch"   autocomplete="off"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
       <el-row>
 <el-col span="10">
    <el-form-item  label="住房补贴:"  :label-width="formLabelWidth">
      <el-input v-model="SalaryItem.live" autocomplete="off" ></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">
     <el-form-item label="全勤奖金:" :label-width="formLabelWidth" >
      <el-input v-model="SalaryItem.hardwork" autocomplete="off"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
       <el-row>
 <el-col span="10">
    <el-form-item  label="额外补助:"  :label-width="formLabelWidth">
      <el-input v-model="SalaryItem.extra" autocomplete="off" ></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">
     <el-form-item label="罚款金额:" :label-width="formLabelWidth" >
      <el-input v-model="SalaryItem.forfeit"  autocomplete="off"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
       <el-row>
 <el-col span="10">
    <el-form-item  label="税收金额:"  :label-width="formLabelWidth">
      <el-input v-model="SalaryItem.tax" autocomplete="off" ></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">
     <el-form-item label="总计金额:" :label-width="formLabelWidth" >
      <el-input v-model="SalaryItem.sum" readonly="true"  autocomplete="off"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
       <el-row>
 <el-col span="10">
    <el-form-item  label="发放日期:"  :label-width="formLabelWidth">
      <el-input v-model="SalaryItem.grant" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col > 
    </el-row>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary"  @click="UpdateSalary">确 定</el-button>
  </div>
</el-dialog>
 <!-- 详情模态框 -->
    <el-dialog title="薪资信息" :visible.sync="dialogdetail">
   <el-form :model="SalaryItem"  >  
       <el-row>
 <el-col span="10">
    <el-form-item  label="员工编号:"  :label-width="formLabelWidth">
      <el-input v-model="SalaryItem.no" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">  
     <el-form-item label="创建日期:" :label-width="formLabelWidth" >
      <el-input v-model="SalaryItem.createdate" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
      <el-row>
 <el-col span="10">
    <el-form-item  label="员工姓名:"  :label-width="formLabelWidth">
      <el-input v-model="SalaryItem.name" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">
     <el-form-item label="员工部门:" :label-width="formLabelWidth" >
      <el-input v-model="SalaryItem.departmentName" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
    <el-row>
 <el-col span="10">
    <el-form-item  label="基本工资:"  :label-width="formLabelWidth">
      <el-input v-model="SalaryItem.base" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">
     <el-form-item label="午餐补贴:" :label-width="formLabelWidth" >
      <el-input v-model="SalaryItem.lunch" readonly="true"  autocomplete="off"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
       <el-row>
 <el-col span="10">
    <el-form-item  label="住房补贴:"  :label-width="formLabelWidth">
      <el-input v-model="SalaryItem.live" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">
     <el-form-item label="全勤奖金:" :label-width="formLabelWidth" >
      <el-input v-model="SalaryItem.hardwork" readonly="true"  autocomplete="off"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
       <el-row>
 <el-col span="10">
    <el-form-item  label="额外补助:"  :label-width="formLabelWidth">
      <el-input v-model="SalaryItem.extra" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">
     <el-form-item label="罚款金额:" :label-width="formLabelWidth" >
      <el-input v-model="SalaryItem.forfeit" readonly="true"  autocomplete="off"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
       <el-row>
 <el-col span="10">
    <el-form-item  label="税收金额:"  :label-width="formLabelWidth">
      <el-input v-model="SalaryItem.tax" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">
     <el-form-item label="总计金额:" :label-width="formLabelWidth" >
      <el-input v-model="SalaryItem.sum" readonly="true"  autocomplete="off"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
       <el-row>
 <el-col span="10">
    <el-form-item  label="发放日期:"  :label-width="formLabelWidth">
      <el-input v-model="SalaryItem.grant" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col > 
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
      SalaryItem: {},//单个薪资
      currentPage: 1, //默认显示第一页
      pageSize: 8, //默认每页显示8条
      totalNum: 0, //总页数
      SalaryList: [],//薪资集合
      SearchSalary: {  //查询薪资
        name: "",//要查询的姓名
        select: "1"//查询的方式1.薪资姓名，2.薪资电话，3.联系人名
      },
      loading: true,//表格加载
    };
  },
  created() {
    this.SelectAllSalary();//默认进来就加载所有的薪资
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      this.SalaryItem={};
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
     ToEditSalary(index, row) {
       this.dialogFormVisible=true
      this.SalaryItem = this.SalaryList[index + (this.currentPage - 1) * 8];
      this.activeName = "first";
    },
    TodetailSalary(index, row){
      this.dialogdetail=true
      this.SalaryItem = this.SalaryList[index + (this.currentPage - 1) * 8];
    },
    //删除薪资
   DeleteSalary(index) {
    
      var t = this;
       this.SalaryItem = this.SalaryList[index ];
      this.$axios
        .put(
          "/AcSalaryManagement/DeleteSalary",
          t.SalaryItem
        )
        .then(function(response) {
          if (response.data.code == 200 && response.data.msg=="成功") {
            t.$message.success("删除成功！");
            t.SelectAllSalary();
            t.SalaryItem = {};
          } else {
           t.$message.error(response.data.msg)
            t.SalaryItem = {};
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //查询所有薪资
    SelectAllSalary() {
      var t = this;
      this.$axios
        .get("/AcSalaryManagement/SelectAllSalary")
        .then(function(response) {
          console.log(response.data);
          t.totalNum = response.data.length;//多少页数据
          t.SalaryList = response.data;//将薪资集合给前端
          t.loading=false;//表格加载完成
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //编辑薪资信息
    UpdateSalary() {
      var t = this;
    t.dialogFormVisible=false;
      this.$axios
        .put(
          "/AcSalaryManagement/UpdateSalary",
          t.SalaryItem
        )
        .then(function(response) {
          if (response.data.code == 200) {
            t.$message.success("更新成功！");
            t.SelectAllSalary();
            t.SalaryItem = {};
          } else {
            t.$message.error("更新失败！");
            t.SalaryItem = {};
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //添加薪资信息
    AddSalary() {
      var t = this;
      this.$axios
        .post(
          "/AcSalaryManagement/AddSalary",
          t.SalaryItem
        )
        .then(function(response) {
          if (response.data.code == 200) {
            t.$message.success("添加成功！");
             t.SelectAllSalary();
            t.SalaryItem = {};
            this.activeName="first"
          } else {
            t.$message.warn("添加失败！");
            t.SalaryItem = {};
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
   //过滤
    SelectSalary(){
     
      var t=this;
      console.log(t.SearchSalary.select,t.SearchSalary.name);
      this.$axios
        .get(
          "/AcSalaryManagement/SelectAcSalaryInfo?name="+t.SearchSalary.name+"&select="+t.SearchSalary.select
        )
        .then(function(response) {
          t.SalaryList= response.data;
          t.$message.success("查询成功");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>


