<template>
  <div id="userManage">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="账户信息" name="first">
        <el-row>
          <el-input placeholder="请输入内容" v-model="Searchuser.name"  class="input-with-select">
            <el-select
              v-model="Searchuser.select"
              slot="prepend"
              placeholder="请选择"
              style="width:150px;"
            >
              <el-option label="员工姓名" value="1"></el-option>
             
            </el-select>
            <el-button slot="append" icon="el-icon-search" style="width:150px;"  @click="Selectuser" ></el-button>
          </el-input>
        </el-row>
        <el-table
          :data="userList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column prop="account" label="用户名"></el-table-column>
             <el-table-column prop="name" label="真实姓名" ></el-table-column>
               <el-table-column prop="departmentName" label="所属部门" width="100"></el-table-column>
            <el-table-column prop="sexName" label="性别" ></el-table-column>
              <el-table-column prop="roleName" label="角色" ></el-table-column>
               <el-table-column prop="statustr" label="状态" ></el-table-column>
          <el-table-column label width="300">
            <template slot-scope="scope">
            <!-- Form -->
<el-button  type="primary" @click="ToEdituser(scope.$index, scope.row)">编辑</el-button>
              <el-button
                type="danger"
                @click="DeleteAccount(scope.$index, scope.row)"
              >删除</el-button>
              <el-button
                type="primary"
                @click="Todetailuser(scope.$index, scope.row)"
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
      <el-tab-pane label="添加账户" name="fourth">
        <el-form ref="user" :model="userItem" label-width="90px" size="medium">
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
              <el-form-item label="用户名">
                <el-input v-model="userItem.account" placeholder="用户名"></el-input>
              </el-form-item>
            </el-col>
              <el-col :span="8">
              <el-form-item label="员工编号">
                <el-input v-model="userItem.staffId" placeholder="员工编号"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="密码">
                <el-input v-model="userItem.pwd" type="password" placeholder="密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
             <el-form-item label="性别">
                 <el-select
              v-model="userItem.sex"
          
              placeholder="请选择"
             style="width:330px"
            >
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="角色">
                <el-Select style="width:330px" v-model="userItem.roleId">
                    <el-Option v-for="item in roleList" :value="item.id" :key="item.id" :label="item.name" >
                    </el-Option>
                </el-Select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属部门">
                  <el-Select style="width:330px" v-model="userItem.departmentName">
                    <el-Option v-for="item in departmentList" :value="item.name" :key="item.id" >{{
                        item.name }}
                    </el-Option>
                </el-Select>

              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item>
              <el-col :span="10">
                <el-button type="primary" style="width:90%;height:50px;" @click="Adduser">提交</el-button>
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
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
   <el-form :model="userItem"  >  
       <el-row>
 <el-col :span="10">
    <el-form-item  label="用户名:"  :label-width="formLabelWidth">
      <el-input v-model="userItem.account" autocomplete="off"></el-input>
    </el-form-item>
     </el-col >
      <el-col :span="10">  
     <el-form-item label="性别:" :label-width="formLabelWidth" >
      <el-input v-model="userItem.sexName" autocomplete="off"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
      <el-row>
 <el-col :span="10">
    <el-form-item  label="真实姓名:"  :label-width="formLabelWidth">
      <el-input v-model="userItem.name" autocomplete="off"></el-input>
    </el-form-item>
     </el-col >
      <el-col :span="10">
     <el-form-item label="所属部门:" :label-width="formLabelWidth" >
      <el-input v-model="userItem.departmentName" autocomplete="off"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
    <el-row>
 <el-col :span="10">
    <el-form-item  label="角色:"  :label-width="formLabelWidth">
      <el-input v-model="userItem.roleName" autocomplete="off"></el-input>
    </el-form-item>
     </el-col >
      
    </el-row>
   
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="UpdateUser">确 定</el-button>
  </div>
</el-dialog>
 <!-- 详情模态框 -->
    <el-dialog title="用户信息" :visible.sync="dialogdetail">
   <el-form :model="userItem"  >  
       <el-row>
 <el-col span="10">
    <el-form-item  label="用户名:"  :label-width="formLabelWidth">
      <el-input v-model="userItem.account" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">  
     <el-form-item label="性别:" :label-width="formLabelWidth" >
      <el-input v-model="userItem.sexName" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
      <el-row>
 <el-col span="10">
    <el-form-item  label="真实姓名:"  :label-width="formLabelWidth">
      <el-input v-model="userItem.name" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">
     <el-form-item label="所属部门:" :label-width="formLabelWidth" >
      <el-input v-model="userItem.departmentName" autocomplete="off" readonly="true"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
    <el-row>
 <el-col span="10">
    <el-form-item  label="角色:"  :label-width="formLabelWidth">
      <el-input v-model="userItem.roleName" autocomplete="off" readonly="true"></el-input>
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
      roleList:[],
      departmentList:[],
      dialogdetail:false,
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '120px',
      activeName: "first",
      select: "",
      userItem: {},//单个员工
      currentPage: 1, //默认显示第一页
      pageSize: 8, //默认每页显示8条
      totalNum: 0, //总页数
      userList: [],//员工集合
      Searchuser: {  //查询员工
        name: "",//要查询的姓名
        select: "1"//查询的方式1.员工姓名，2.员工电话，3.联系人名
      },
      loading: true,//表格加载
    };
  },
  created() {
    this.SelectAlluser();//默认进来就加载所有的账户
    this.GetAllDeparmentInfo();
    this.GetAllRoleInfo();//默认进来就加载所有的部门
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
     //获取所有角色信息
      GetAllRoleInfo() {
      var t = this;
      this.$axios
        .get("/AcUserInfo/GetAllRoleInfo")
        .then(function(response) {
          console.log(response.data);
          t.totalNum = response.data.length;//多少页数据
          t.roleList = response.data;//将部门集合给前端
          t.loading=false;//表格加载完成
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
      this.userItem={};
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
     ToEdituser(index, row) {
       this.dialogFormVisible=true
      this.userItem = this.userList[index + (this.currentPage - 1) * 8];
      this.activeName = "first";
    },
    Todetailuser(index, row){
      this.dialogdetail=true
      this.userItem = this.userList[index + (this.currentPage - 1) * 8];
    },
    //删除员工
   DeleteAccount(index, row) {
      
      var t = this;
       this.userItem = this.userList[index + (this.currentPage - 1) * 8];
      this.$axios
        .put(
          "/AcUserInfo/DeleteAccount",
          t.userItem
        )
        .then(function(response) {
          if (response.data.code == 200 && response.data.msg=="成功") {
            t.$message.success("注销成功！");
            t.SelectAlluser();
            t.$options.methods.SelectAlluser();
            t.userItem = {};
          } else {
           t.$message.error(response.data.msg)
            t.userItem = {};
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //查询所有账户
    SelectAlluser() {
      var t = this;
      this.$axios
        .get("/AcUserInfo/GetAlluserInfo")
        .then(function(response) {
          console.log(response.data);
          t.totalNum = response.data.length;//多少页数据
          t.userList = response.data;//将员工集合给前端
          t.loading=false;//表格加载完成
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //编辑账户信息
    UpdateUser() {
      var t = this;
      t.dialogFormVisible=false
      this.$axios
        .put(
          "/AcUserInfo/UpdateUser",
          t.userItem
        )
        .then(function(response) {
          if (response.data.code == 200) {
            t.$message.success("更新成功！");
            t.SelectAlluser();
            t.userItem = {};
          } else {
            t.$message.error("更新失败！");
            t.userItem = {};
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //添加账户
    Adduser() {
      var t = this;
      this.$axios
        .post(
          "/AcUserInfo/Adduser",
          t.userItem
        )
        .then(function(response) {
          if (response.data.code == 200) {
            t.$message.success("添加成功！");
            t.SelectAlluser();
            t.userItem = {};
            this.activeName="first"
          } else {
            t.$message.warn("添加失败！");
            t.userItem = {};
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    Selectuser(){
      var t=this;
      console.log(t.Searchuser.select,t.Searchuser.name);
      this.$axios
        .get(
          "/AcUserInfo/SelectUserInfo?name="+t.Searchuser.name+"&select="+t.Searchuser.select
        )
        .then(function(response) {
          t.userList= response.data;
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


