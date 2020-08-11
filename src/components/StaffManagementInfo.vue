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
              <el-option label="员工电话" value="2"></el-option>
              <el-option label="联系人名" value="3"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" style="width:150px;" @click="SelectStaff"></el-button>
          </el-input>
        </el-row>
        <el-table
          :data="StaffList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column prop="id" label="员工编号" width="120"></el-table-column>
             <el-table-column prop="name" label="员工名称" width="120"></el-table-column>
            <el-table-column prop="sexName" label="性别" width="120"></el-table-column>
              <el-table-column prop="no" label="工号" width="120"></el-table-column>
          <el-table-column prop="address" label="员工地址"></el-table-column>
            <el-table-column prop="tel" label="电话"></el-table-column>
          <el-table-column prop="departmentName" label="所属部门" width="100"></el-table-column>
          <el-table-column prop="statusName" label="状态"></el-table-column>
      
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
              >添加员工</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="员工姓名">
                <el-input v-model="StaffItem.name" placeholder="员工姓名"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="邮政编码">
                <el-input v-model="StaffItem.postcode" placeholder="邮政编码"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="员工地址">
                <el-input v-model="StaffItem.address" placeholder="员工地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="联系电话">
                <el-input v-model="StaffItem.custtel" placeholder="联系电话"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系人">
                <el-input v-model="StaffItem.linkman" placeholder="联系人"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系人电话">
                <el-input v-model="StaffItem.linktel" placeholder="联系人电话"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="邮箱账号">
                <el-input v-model="StaffItem.email" placeholder="邮箱账号"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="员工性别">
                <el-input v-model="StaffItem.sex" placeholder="员工性别"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="员工生日">
                <el-input v-model="StaffItem.birthday" placeholder="员工生日"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="员工爱好">
                <el-input v-model="StaffItem.love" placeholder="员工爱好"></el-input>
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
 <el-col span="10">
    <el-form-item  label="员工姓名:"  :label-width="formLabelWidth">
      <el-input v-model="StaffItem.name" autocomplete="off"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">  
     <el-form-item label="性别:" :label-width="formLabelWidth" >
      <el-input v-model="StaffItem.sexName" autocomplete="off"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
      <el-row>
 <el-col span="10">
    <el-form-item  label="工号:"  :label-width="formLabelWidth">
      <el-input v-model="StaffItem.no" autocomplete="off"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">
     <el-form-item label="员工地址:" :label-width="formLabelWidth" >
      <el-input v-model="StaffItem.address" autocomplete="off"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
    <el-row>
 <el-col span="10">
    <el-form-item  label="电话:"  :label-width="formLabelWidth">
      <el-input v-model="StaffItem.tel" autocomplete="off"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">
     <el-form-item label="所属部门:" :label-width="formLabelWidth" >
      <el-input v-model="StaffItem.departmentName" autocomplete="off"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
    <el-row>
 <el-col span="10">
    <el-form-item  label="状态:"  :label-width="formLabelWidth">
      <el-input v-model="StaffItem.statusName" autocomplete="off"></el-input>
    </el-form-item>
     </el-col >
      <el-col span="10">
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
      <el-input v-model="StaffItem.departmentName" readonly="true"  autocomplete="off"></el-input>
    </el-form-item>
     </el-col>
    </el-row>
    <el-row>
 <el-col span="10">
    <el-form-item  label="状态:" style="readonly"  :label-width="formLabelWidth">
      <el-input v-model="StaffItem.statusName" readonly="true" autocomplete="off"></el-input>
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
      gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
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
  },
  methods: {
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
      var th = this;
      var t = this.StaffList[index + (th.currentPage - 1) * 8];
      console.log(t);
      //请求删除员工的接口

      this.$confirm("确定要删除员工码?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .delete(
              "http://localhost:56567/api/StaffManagement/DeleteStaffInfo?id=" +
                t.id
            )
            .then(function(response) {
              // alert(response.data.code);
              if (response.data.code === 400) {
                th.$message.success("删除成功!");
                th.StaffList.splice(index + (th.currentPage - 1) * 8, 1);
              } else {
                th.$message.warn("删除失败!");
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "success",
            message: "已取消删除"
          });
        });
    },
    //查询所有员工
    SelectAllStaff() {
      var t = this;
      this.$axios
        .get("http://localhost:56567/api/StaffManagement/GetAllStaffInfo")
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
      t.dialogFormVisible = false
      this.$axios
        .put(
          "http://localhost:56567/api/StaffManagement/UpdateStaffInfo",
          t.StaffItem
        )
        .then(function(response) {
          console.log(response.data.code == 400);
          if (response.data.code == 400) {
            t.$message.success("更新成功！");
            t.StaffItem = {};
          } else {
            t.$message.warn("更新失败！");
            t.StaffItem = {};
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    AddStaff() {
      var t = this;
      this.$axios
        .post(
          "http://localhost:56567/api/StaffManagement/AddStaffInfo",
          t.StaffItem
        )
        .then(function(response) {
          console.log(response.data.code == 400);
          if (response.data.code == 400) {
            t.$message.success("添加成功！");
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
    SelectStaff(){
      var t=this;
      console.log(t.SearchStaff.select,t.SearchStaff.name);
      this.$axios
        .get(
          "http://localhost:56567/api/StaffManagement/SelectStaffInfo?name="+t.SearchStaff.name+"&select="+t.SearchStaff.select
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


