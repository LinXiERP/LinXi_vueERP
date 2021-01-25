<template>
  <div id="departmentManage">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="部门列表" name="first">
        <el-row>
          <el-input placeholder="请输入内容" v-model="Searchdepartment.name"  class="input-with-select">
            <el-select
              v-model="Searchdepartment.select"
              slot="prepend"
              placeholder="请选择"
              style="width:150px;"
            >
              <el-option label="部门名称" value="1"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" style="width:150px;" @click="Selectdepartment"></el-button>
          </el-input>
        </el-row>
        <el-table
          :data="departmentList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          style="width: 100%"
          v-loading="loading"
        >
        <el-table-column prop="id" label="序号"></el-table-column>
             <el-table-column prop="name" label="部门名称"></el-table-column>
                <el-table-column prop="remark" label="描述" ></el-table-column>
          <el-table-column label width="300">
            <template slot-scope="scope">
            <!-- Form -->
<el-button  type="primary" @click="ToEditdepartment(scope.$index, scope.row)">编辑</el-button>
              <el-button  type="primary" @click="Todetaildepartment(scope.$index, scope.row)">详情</el-button>
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
      <el-tab-pane label="新增部门" name="fourth">
        <el-form ref="department" :model="departmentItem" label-width="90px" size="medium">
          <el-row>
            <el-col :span="24">
              <div
                class="grid-content bg-purple-dark"
                style="text-align:center;font-size:25px;margin-bottom:15px;"
              > </div>
            </el-col>
          </el-row>
              <el-form-item label="部门名称">
                <el-input v-model="departmentItem.name" placeholder="请输入部门名称"></el-input>
              </el-form-item>
                <el-form-item label="描述">
                <el-input v-model="departmentItem.remark" placeholder="请输入部门名称"></el-input>
              </el-form-item>
                <el-form-item>
              <el-col :span="10">
                <el-button type="primary" style="width:90%;height:50px;" @click="Adddepartment">提交</el-button>
              </el-col>
              <el-col :span="10">
                <el-button type="warning" style="width:90%;height:50px;">重置</el-button>
              </el-col>
            </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
     <!-- 编辑模态框 -->
    <el-dialog title="部门信息" :visible.sync="dialogFormVisible">
   <el-form :model="departmentItem"  >  
    
 
    <el-form-item  label="部门名称"  :label-width="formLabelWidth">
      <el-input v-model="departmentItem.name" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="描述:" :label-width="formLabelWidth" >
      <el-input v-model="departmentItem.remark" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="Updatedepartment">确 定</el-button>
  </div>
</el-dialog>
 <!-- 详情模态框 -->
    <el-dialog title="部门信息" :visible.sync="dialogdetail">
   <el-form :model="departmentItem"  >  
    <el-form-item  label="部门名称:"  :label-width="formLabelWidth">
      <el-input v-model="departmentItem.name" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     <el-form-item label="描述:" :label-width="formLabelWidth" >
      <el-input v-model="departmentItem.remark" autocomplete="off" readonly="true"></el-input>
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
      departmentItem: {},//单个部门
      currentPage: 1, //默认显示第一页
      pageSize: 8, //默认每页显示8条
      totalNum: 0, //总页数
      departmentList: [],//部门集合
      Searchdepartment: {  //查询部门
        name: "",//要查询的姓名
        select: "1"//查询的方式1.部门姓名，2.部门电话，3.联系人名
      },
      loading: true,//表格加载
    };
  },
  created() {
    this.GetAllDeparmentInfo();//默认进来就加载所有的部门
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      this.departmentItem={};
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
     ToEditdepartment(index, row) {
       this.dialogFormVisible=true
      this.departmentItem = this.departmentList[index + (this.currentPage - 1) * 8];
      this.activeName = "first";
    },
    Todetaildepartment(index, row){
      this.dialogdetail=true
      this.departmentItem = this.departmentList[index + (this.currentPage - 1) * 8];
    },
    //查询所有部门
    GetAllDeparmentInfo() {
      var t = this;
      this.$axios
        .get("/AcDepartment/GetAllDeparmentInfo")
        .then(function(response) {
          console.log(response.data);
          t.totalNum = response.data.length;//多少页数据
          t.departmentList = response.data;//将部门集合给前端
          t.loading=false;//表格加载完成
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //编辑部门信息
    Updatedepartment() {
      var t = this;
      t.dialogFormVisible=false
      this.$axios
        .put(
          "/AcDepartment/Updatedepartment",
          t.departmentItem
        )
        .then(function(response) {
          if (response.data.code == 200) {
            t.$message.success("更新成功！");
            t.departmentItem = {};
          } else {
            t.$message.error("更新失败！");
            t.departmentItem = {};
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //添加部门
    Adddepartment() {
      var t = this;
      this.$axios
        .post(
          "/AcDepartment/Adddepartment",
          t.departmentItem
        )
        .then(function(response) {
          if (response.data.code == 200) {
            t.$message.success("添加成功！");
            t.GetAllDeparmentInfo();
              t.departmentItem = {};
             this.activeName="first"
          } else {
            t.$message.warn("添加失败！");
            t.departmentItem = {};
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //过滤部门信息
    Selectdepartment(){
      var t=this;
      console.log(t.Searchdepartment.select,t.Searchdepartment.name);
      this.$axios
        .get(
          "/AcDepartment/SelectAcDepartmentInfo?name="+t.Searchdepartment.name+"&select="+t.Searchdepartment.select
        )
        .then(function(response) {
          t.departmentList= response.data;
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


