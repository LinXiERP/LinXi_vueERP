<template>
  <div id="StaffManage">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="员工列表" name="first">
        <el-row>
          <el-input placeholder="请输入内容" v-model="SearchStaff.name"  class="input-with-select">
            <el-select
              v-model="SearchStaff.select"
              slot="prepend"
              placeholder="请选择"
              style="width:150px;"
            >
              <el-option label="员工姓名" value="1"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" style="width:150px;" @click="SelectStaff"></el-button>
          </el-input>
        </el-row>
        <el-table
          :data="StaffList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column prop="id" label="员工编号"></el-table-column>
             <el-table-column prop="name" label="员工名称" ></el-table-column>
            <el-table-column prop="sexName" label="性别"></el-table-column>
              <el-table-column prop="no" label="工号" ></el-table-column>
          <el-table-column prop="address" label="员工地址"></el-table-column>
            <el-table-column prop="tel" label="电话"></el-table-column>
          <el-table-column prop="deparmentName" label="所属部门" width="100"></el-table-column>
          <el-table-column prop="statusStr" label="状态"></el-table-column>
      
          <el-table-column label width="300">
            <template slot-scope="scope">
            <!-- Form -->
<el-button  type="primary" @click="ToEditStaff(scope.$index, scope.row)">编辑</el-button>
              <el-button
                type="danger"
                @click="DeleteStaff(scope.$index, scope.row)"
              >删除</el-button>
              <el-button
                type="primary"
                @click="TodetailStaff(scope.$index, scope.row)"
              >详情</el-button>
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
      <el-tab-pane label="添加用户" name="fourth">
        <el-form ref="Staff" :model="StaffItem" label-width="90px" size="medium">
          <el-row>
            <el-col :span="24">
              <div
                class="grid-content bg-purple-dark"
                style="text-align:center;font-size:25px;margin-bottom:15px;"
              > </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="员工姓名">
                <el-input v-model="StaffItem.name" placeholder="员工姓名"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="性别">
                 <el-select
              v-model="StaffItem.sex"
          
              placeholder="请选择"
             style="width:330px"
            >
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工号">
                <el-input v-model="StaffItem.no" placeholder="工号"></el-input>
              </el-form-item>
            </el-col>
           
          </el-row>
          <el-row>
             <el-col :span="8">
              <el-form-item label="联系电话">
                <el-input v-model="StaffItem.tel" placeholder="联系电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="员工地址">
                <el-input v-model="StaffItem.address" placeholder="员工地址"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="所属部门">
                  <el-Select style="width:330px" v-model="StaffItem.deparmentName">
                    <el-Option v-for="item in departmentList" :value="item.name" :key="item.id" >{{
                        item.name }}
                    </el-Option>
                </el-Select>

              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
             <el-col :span="8">
              <el-form-item label="目前状态">
             <el-select
              v-model="StaffItem.status"
          
              placeholder="请选择"
             style="width:330px"
            >
              <el-option label="正常" value="1"></el-option>
              <el-option label="冻结" value="0"></el-option>
            </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备注">
                <el-input v-model="StaffItem.remark" placeholder="备注"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item>
              <el-col :span="10">
                <el-button type="primary" style="width:90%;height:50px;" @click="AddStaff">提交</el-button>
              </el-col>
              <el-col :span="10">
                <el-button type="warning" style="width:90%;height:50px;">重置</el-button>
              </el-col>
            </el-form-item>
          </el-row>
          
        </el-form>
      </el-tab-pane>
    </el-tabs>
     <!-- 编辑模态框 -->
    <el-dialog title="员工信息" :visible.sync="dialogFormVisible">
   <el-form :model="StaffItem"  >  
       <el-row>
 <el-col :span="10">
    <el-form-item  label="员工姓名:"  :label-width="formLabelWidth">
      <el-input v-model="StaffItem.name" autocomplete="off"></el-input>
    </el-form-item>
     </el-col >
      <el-col :span="10">  
     <el-form-item label="性别:" :label-width="formLabelWidth" >
      <el-input v-model="StaffItem.sexName" autocomplete="off"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
      <el-row>
 <el-col :span="10">
    <el-form-item  label="工号:"  :label-width="formLabelWidth">
      <el-input v-model="StaffItem.no" autocomplete="off"></el-input>
    </el-form-item>
     </el-col >
      <el-col :span="10">
     <el-form-item label="员工地址:" :label-width="formLabelWidth" >
      <el-input v-model="StaffItem.address" autocomplete="off"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
    <el-row>
 <el-col :span="10">
    <el-form-item  label="电话:"  :label-width="formLabelWidth">
      <el-input v-model="StaffItem.tel" autocomplete="off"></el-input>
    </el-form-item>
     </el-col >
      <el-col :span="10">
     <el-form-item label="部门:" :label-width="formLabelWidth" >
      <el-input v-model="StaffItem.deparmentName" autocomplete="off"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
    <el-row>
 <el-col :span="10">
    <el-form-item  label="状态:"  :label-width="formLabelWidth">
      <el-input v-model="StaffItem.statusStr" autocomplete="off"></el-input>
    </el-form-item>
     </el-col >
      <el-col :span="10">
    </el-col>
    </el-row>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="UpdateStaff">确 定</el-button>
  </div>
</el-dialog>
 <!-- 详情模态框 -->
    <el-dialog title="员工信息" :visible.sync="dialogdetail">
   <el-form :model="StaffItem"  >  
       <el-row>
 <el-col span="10">
    <el-form-item  label="员工姓名:"  :label-width="formLabelWidth">
      <el-input v-model="StaffItem.name" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">  
     <el-form-item label="性别:" :label-width="formLabelWidth" >
      <el-input v-model="StaffItem.sexName" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
      <el-row>
 <el-col span="10">
    <el-form-item  label="工号:"  :label-width="formLabelWidth">
      <el-input v-model="StaffItem.no" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">
     <el-form-item label="员工地址:" :label-width="formLabelWidth" >
      <el-input v-model="StaffItem.address" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
    <el-row>
 <el-col span="10">
    <el-form-item  label="电话:"  :label-width="formLabelWidth">
      <el-input v-model="StaffItem.tel" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">
     <el-form-item label="所属部门:" :label-width="formLabelWidth" >
      <el-input v-model="StaffItem.deparmentName" readonly="true"  autocomplete="off"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
    <el-row>
 <el-col span="10">
    <el-form-item  label="状态:" style="readonly"  :label-width="formLabelWidth">
      <el-input v-model="StaffItem.statusStr" readonly="true" autocomplete="off"></el-input>
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
      departmentList:[],
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
      StaffItem: {},//单个员工
      currentPage: 1, //默认显示第一页
      pageSize: 8, //默认每页显示8条
      totalNum: 0, //总页数
      StaffList: [],//员工集合
      SearchStaff: {  //查询员工
        name: "",//要查询的姓名
        select: "1"//查询的方式1.员工姓名，2.员工电话，3.联系人名
      },
      loading: true,//表格加载
    };
  },
  created() {
    this.SelectAllStaff();//默认进来就加载所有的员工
    this.GetAllDeparmentInfo();//默认进来就加载所有的部门
  },
  methods: {
    //获取所有部门信息
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
    handleClick(tab, event) {
      console.log(tab, event);
      this.StaffItem={};
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
     ToEditStaff(index, row) {
       this.dialogFormVisible=true
      this.StaffItem = this.StaffList[index + (this.currentPage - 1) * 8];
      this.activeName = "first";
    },
    TodetailStaff(index, row){
      this.dialogdetail=true
      this.StaffItem = this.StaffList[index + (this.currentPage - 1) * 8];
    },
    //删除员工
   DeleteStaff(index, row) {
    
      var t = this;
       this.StaffItem = this.StaffList[index + (this.currentPage - 1) * 8];
      this.$axios
        .put(
          "/StaffManagement/DeleteStaff",
          t.StaffItem
        )
        .then(function(response) {
          if (response.data.code == 200 && response.data.msg=="成功") {
            t.$message.success("删除成功！");
            t.SelectAllStaff();
            t.$options.methods.SelectAllStaff();
            t.StaffItem = {};
          } else {
           t.$message.error(response.data.msg)
            t.StaffItem = {};
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //查询所有员工
    SelectAllStaff() {
      var t = this;
      this.$axios
        .get("/StaffManagement/GetAllStaffInfo")
        .then(function(response) {
          console.log(response.data);
          t.totalNum = response.data.length;//多少页数据
          t.StaffList = response.data;//将员工集合给前端
          t.loading=false;//表格加载完成
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //编辑员工信息
    UpdateStaff() {
      var t = this;
      t.dialogFormVisible=false
      this.$axios
        .put(
          "/StaffManagement/UpdateStaff",
          t.StaffItem
        )
        .then(function(response) {
          if (response.data.code == 200) {
            t.$message.success("更新成功！");
             this.SelectAllStaff();
            t.StaffItem = {};
          } else {
            t.$message.error("更新失败！");
            t.StaffItem = {};
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //添加员工
    AddStaff() {
      var t = this;
      this.$axios
        .post(
          "/StaffManagement/AddStaff",
          t.StaffItem
        )
        .then(function(response) {
         
          if (response.data.code == 200) {
            t.$message.success("添加成功！");
            t.SelectAllStaff();
            this.activeName="first"
            t.StaffItem = {};
          } else {
            t.$message.warn("添加失败！");
            t.StaffItem = {};
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //过滤
    SelectStaff(){
      var t=this;
      console.log(t.SearchStaff.select,t.SearchStaff.name);
      this.$axios
        .get(
          "/StaffManagement/SelectAcStaffInfo?name="+t.SearchStaff.name+"&select="+t.SearchStaff.select
        )
        .then(function(response) {
          t.StaffList= response.data;
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


