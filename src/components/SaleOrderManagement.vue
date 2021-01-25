<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div
        class="grid-content bg-purple"
        style="font-size:40px;"
      >销售单管理</div>
    </el-col>
    <el-col :span="18">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="销售单编号">
<<<<<<< HEAD
          <el-input
            v-model="formInline.user"
            placeholder="销售单编号"
            id="salesid"
          ></el-input>
=======
          <el-input v-model="formInline.id" placeholder="销售单编号" id="SaleID"></el-input>
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="onSelect"
            icon="el-icon-search"
          >查询</el-button>
        </el-form-item>
<<<<<<< HEAD

        <el-form-item label="产品名称">
          <el-select
            v-model="formInline.region"
            placeholder="产品名称"
            @change="getproducts"
          >
            <el-option
              v-for="item in allproducts"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            ></el-option>
=======
        <el-form-item label="产品">
          <el-select v-model="formInline.chanpin" placeholder="产品">
            <el-option label="所有产品" value="1"></el-option>
            <el-option label="所有产品" value="2"></el-option>
            <el-option label="所有产品" value="3"></el-option>
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
<<<<<<< HEAD
          <el-select
            v-model="formInline.state"
            placeholder="状态"
            @change="getstate"
          >
            <el-option
              label="待提货"
              value="1"
            ></el-option>
            <el-option
              label="待结款"
              value="2"
            ></el-option>
            <el-option
              label="已结款"
              value="3"
            ></el-option>
            <el-option
              label="待审批"
              value="0"
            ></el-option>
=======
          <el-select v-model="formInline.zt" placeholder="状态" @change="selectState">
            <el-option label="待提货" value="1"></el-option>
            <el-option label="待结款" value="2"></el-option>
            <el-option label="已结款" value="3"></el-option>
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
          </el-select>
        </el-form-item>

        <el-form-item>
<<<<<<< HEAD
          <!-- <el-button type="primary" @click="onSelect" icon="el-icon-circle-plus-outline">添加</el-button> -->
          <!-- <el-button
            type="primary"
            @click="dialogVisible = true"
            icon="el-icon-circle-plus-outline"
          >添加</el-button>-->
          <el-dialog
            title="审批"
            :visible.sync="dialogVisibleShenPi"
            width="20%"
            :before-close="handleClose"
          >
            <div
              class="grid-content bg-purple"
              style="font-size:30px;"
            >是否审批通过？</div>
            <el-input
              v-model="aaa"
              style="width:110%;display:none"
            ></el-input>
            <br><br>
            <el-button
              type="primary"
              @click="onShenPiTwo(1)"
            >通过</el-button>
            <el-button
              type="primary"
              @click="onShenPiTwo(-1)"
            >不通过</el-button>
          </el-dialog>

          <el-dialog
            title="添加销售订单"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose"
          >
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="AddForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item
                label="销售单号"
                prop="no"
              >
                <el-input
                  v-model="ruleForm.no"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="产品名称"
                prop="productId"
              >
                <el-select
                  v-model="ruleForm.productId"
                  placeholder="请选择产品名称"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in allproducts"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="用户名称"
                prop="customerId"
              >
                <el-select
                  v-model="ruleForm.customerId"
                  placeholder="请选择用户名称"
                >
                  <el-option
                    v-for="item in allusers"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="订单编号"
                prop="orderId"
                style="margin-left:-16px;"
              >
                <!-- <el-select v-model="ruleForm.orderId" placeholder="请选择订单编号">
                  <el-option label="区域一" value="1"></el-option>
                </el-select>-->
                <el-input
                  v-model="ruleForm.orderId"
                  readonly="readonly"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="销售日期"
                prop="saleDate"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm.saleDate"
                  style="width: 95%;"
                ></el-date-picker>
              </el-form-item>

              <el-form-item
                label="结算方式"
                prop="amountWay"
                style="margin-left:-30px;"
              >
                <el-select
                  v-model="ruleForm.amountWay"
                  placeholder="请选择结算方式"
                >
                  <el-option
                    label="现金"
                    value="现金"
                  ></el-option>
                  <el-option
                    label="微信"
                    value="微信"
                  ></el-option>
                  <el-option
                    label="支付宝"
                    value="支付宝"
                  ></el-option>
                  <el-option
                    label="银行卡"
                    value="银行卡"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="总金额"
                prop="amount"
              >
                <el-input
                  type="number"
                  v-model="ruleForm.amount"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="数量"
                prop="nums"
              >
                <el-input
                  type="number"
                  v-model="ruleForm.nums"
                  style="width:110%"
                ></el-input>
              </el-form-item>
              <br />
              <br />

              <el-form-item
                label="应收金额"
                prop="amountReceivable"
              >
                <el-input
                  type="number"
                  v-model="ruleForm.amountReceivable"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="实收金额"
                prop="amountReceived"
              >
                <el-input
                  type="number"
                  v-model="ruleForm.amountReceived"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="经手人"
                prop="handleId"
              >
                <el-select
                  v-model="ruleForm.handleId"
                  placeholder="请选择经手人名称"
                >
                  <el-option
                    v-for="item in allstaff"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="操作员"
                prop="operatorId"
                style="margin-left:-16px;"
              >
                <el-select
                  v-model="ruleForm.operatorId"
                  placeholder="请选择操作员名称"
                >
                  <el-option
                    v-for="item in allstaff"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="销售状态"
                prop="orderStatus"
              >
                <el-input
                  v-model="ruleForm.orderStatus"
                  readonly="readonly"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="备注"
                prop="remark"
              >
                <el-input
                  v-model="ruleForm.remark"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <br />
              <el-form-item style="margin-left:430px;">
                <el-button
                  type="primary"
                  @click="dialogVisible = false"
                >取 消</el-button>
                <el-button
                  type="primary"
                  @click="resetForm('ruleForm')"
                >重置</el-button>
                <el-button
                  type="success"
                  @click="submitForm('AddForm')"
                >立即添加</el-button>
              </el-form-item>
            </el-form>
            <!-- <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>-->
          </el-dialog>

          <el-dialog
            title="编辑销售订单"
            :visible.sync="dialogVisible2"
            width="50%"
            :before-close="handleClose"
          >
            <el-form
              :model="ruleForm2"
              :rules="rules"
              ref="EditruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item
                label="销售单号"
                prop="no"
              >
                <el-input
                  v-model="ruleForm2.no"
                  readonly="readonly"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="产品名称"
                prop="productName"
              >
                <el-select
                  v-model="ruleForm2.productName"
                  placeholder="请选择产品名称"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in allproducts"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="用户名称"
                prop="customerName"
              >
                <el-select
                  v-model="ruleForm2.customerName"
                  placeholder="请选择用户名称"
                >
                  <el-option
                    v-for="item in allusers"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="订单编号"
                prop="orderId"
                style="margin-left:-16px;"
              >
                <!-- <el-select v-model="ruleForm.orderId" placeholder="请选择订单编号">
                  <el-option label="区域一" value="1"></el-option>
                </el-select>-->
                <el-input
                  v-model="ruleForm2.orderId"
                  readonly="readonly"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="销售日期"
                prop="saleDate"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm2.saleDate"
                  style="width: 95%;"
                ></el-date-picker>
              </el-form-item>

              <el-form-item
                label="结算方式"
                prop="amountWay"
                style="margin-left:-30px;"
              >
                <el-select
                  v-model="ruleForm2.amountWay"
                  placeholder="请选择结算方式"
                >
                  <el-option
                    label="现金"
                    value="现金"
                  ></el-option>
                  <el-option
                    label="微信"
                    value="微信"
                  ></el-option>
                  <el-option
                    label="支付宝"
                    value="支付宝"
                  ></el-option>
                  <el-option
                    label="银行卡"
                    value="银行卡"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="总金额"
                prop="amount"
              >
                <el-input
                  type="number"
                  v-model="ruleForm2.amount"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="数量"
                prop="nums"
              >
                <el-input
                  type="number"
                  v-model="ruleForm2.nums"
                  style="width:110%"
                ></el-input>
              </el-form-item>
              <br />
              <br />

              <el-form-item
                label="应收金额"
                prop="amountReceivable"
              >
                <el-input
                  type="number"
                  v-model="ruleForm2.amountReceivable"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <!-- <el-form-item label="实收金额" prop="amountReceived">
                <el-input type="number" v-model="ruleForm2.amountReceived" style="width:110%"></el-input>
              </el-form-item>

              <el-form-item label="经手人" prop="handleId">
                <el-select v-model="ruleForm2.handleId" placeholder="请选择经手人名称">
                  <el-option
                    v-for="item in allstaff"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="操作员" prop="operatorId" style="margin-left:-16px;">
                <el-select v-model="ruleForm2.operatorId" placeholder="请选择操作员名称">
                  <el-option
                    v-for="item in allstaff"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="销售状态" prop="orderStatus">
                <el-input v-model="ruleForm2.orderStatus" readonly="readonly" style="width:110%"></el-input>
              </el-form-item> -->

              <el-form-item
                label="备注"
                prop="remark"
              >
                <el-input
                  v-model="ruleForm2.remark"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <br />
              <el-form-item style="margin-left:430px;">
                <el-button
                  type="primary"
                  @click="dialogVisible2 = false"
                >取 消</el-button>
                <el-button
                  type="primary"
                  @click="resetForm('ruleForm2')"
                >重置</el-button>
                <el-button
                  type="success"
                  @click="submitForm2('EditruleForm')"
                >立即修改</el-button>
              </el-form-item>
            </el-form>
            <!-- <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>-->
          </el-dialog>

          <el-dialog
            title="结款"
            :visible.sync="dialogVisible3"
            width="50%"
            :before-close="handleClose"
          >
            <el-form
              :model="ruleForm3"
              :rules="rules"
              ref="MoneyruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item
                label="销售单号"
                prop="no"
              >
                <el-input
                  v-model="ruleForm3.no"
                  readonly="readonly"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="产品名称"
                prop="productName"
              >
                <el-select
                  v-model="ruleForm3.productName"
                  placeholder="请选择产品名称"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in allproducts"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="用户名称"
                prop="customerName"
              >
                <el-select
                  v-model="ruleForm3.customerName"
                  placeholder="请选择用户名称"
                >
                  <el-option
                    v-for="item in allusers"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="订单编号"
                prop="orderId"
                style="margin-left:-16px;"
              >
                <!-- <el-select v-model="ruleForm.orderId" placeholder="请选择订单编号">
                  <el-option label="区域一" value="1"></el-option>
                </el-select>-->
                <el-input
                  v-model="ruleForm3.orderId"
                  readonly="readonly"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="销售日期"
                prop="saleDate"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm3.saleDate"
                  style="width: 95%;"
                ></el-date-picker>
              </el-form-item>

              <el-form-item
                label="结算方式"
                prop="amountWay"
                style="margin-left:-30px;"
              >
                <el-select
                  v-model="ruleForm3.amountWay"
                  placeholder="请选择结算方式"
                >
                  <el-option
                    label="现金"
                    value="现金"
                  ></el-option>
                  <el-option
                    label="微信"
                    value="微信"
                  ></el-option>
                  <el-option
                    label="支付宝"
                    value="支付宝"
                  ></el-option>
                  <el-option
                    label="银行卡"
                    value="银行卡"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="总金额"
                prop="amount"
              >
                <el-input
                  type="number"
                  v-model="ruleForm3.amount"
                  readonly="readonly"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="数量"
                prop="nums"
              >
                <el-input
                  type="number"
                  v-model="ruleForm3.nums"
                  readonly="readonly"
                  style="width:110%"
                ></el-input>
              </el-form-item>
              <br />
              <br />

              <el-form-item
                label="应收金额"
                prop="amountReceivable"
              >
                <el-input
                  type="number"
                  v-model="ruleForm3.amountReceivable"
                  readonly="readonly"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="实收金额"
                prop="amountReceived"
              >
                <el-input
                  type="number"
                  v-model="ruleForm3.amountReceived"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <!-- <el-form-item label="经手人" prop="handleId">
                <el-select v-model="ruleForm3.handleId" placeholder="请选择经手人名称">
                  <el-option
                    v-for="item in allstaff"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="操作员" prop="operatorId" style="margin-left:-16px;">
                <el-select v-model="ruleForm3.operatorId" placeholder="请选择操作员名称">
                  <el-option
                    v-for="item in allstaff"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="销售状态" prop="orderStatus">
                <el-input v-model="ruleForm3.orderStatus" readonly="readonly" style="width:110%"></el-input>
              </el-form-item> -->

              <el-form-item
                label="备注"
                prop="remark"
              >
                <el-input
                  v-model="ruleForm3.remark"
                  style="width:110%"
                ></el-input>
              </el-form-item>

              <br />
              <el-form-item style="margin-left:430px;">
                <el-button
                  type="primary"
                  @click="dialogVisible2 = false"
                >取 消</el-button>
                <el-button
                  type="primary"
                  @click="resetForm('ruleForm3')"
                >重置</el-button>
                <el-button
                  type="success"
                  @click="submitForm3('MoneyruleForm')"
                >立即修改</el-button>
              </el-form-item>
            </el-form>
            <!-- <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>-->
          </el-dialog>

          <!-- <el-button type="primary" @click="onSelectALL" icon="el-icon-refresh">刷新</el-button> -->
=======
          <el-button type="primary" @click="onSelectALL" icon="el-icon-refresh">刷新</el-button>
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="success" @click="addgsForm" icon="el-icon-edit">添加</el-button> -->
          <el-button type="primary" @click="dialogFormVisible = true,aa" icon="el-icon-circle-plus-outline">添加</el-button>

<el-dialog title="添加销售单" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="销售单号" :label-width="formLabelWidth">
      <el-input v-model="form.name" name="no" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="产品名字" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择产品">
        <!-- <el-option v-for="item in selectItem" :label="item.dict_desc" :value="item.dict_id" :key="item.dict_id"></el-option> -->
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
        </el-form-item>       
      </el-form>
    </el-col>

<<<<<<< HEAD
    <el-table
      :data="tableData"
      v-loading="loading"
      border
      style="width: 100%"
      :header-cell-style="thStyleFun"
      :cell-style="cellStyleFun"
    >
      <el-table-column
        prop="no"
        label="销售单编号"
      ></el-table-column>
      <el-table-column
        prop="productName"
        label="产品名称"
      ></el-table-column>
      <el-table-column
        prop="customerName"
        label="客户名称"
      ></el-table-column>
      <el-table-column
        prop="nums"
        label="销售数量"
      ></el-table-column>
      <el-table-column
        prop="saleDate"
        label="销售日期"
        :formatter="formatDate"
      ></el-table-column>
      <el-table-column
        prop="orderStatus"
        label="销售状态"
        :formatter="formatterColumnstate"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- @click="onEdit(scope.$index, scope.row)" -->
          <el-button
            v-if="scope.row.auditStatus ==0"
            type="primary"
            @click="onShenPi(scope.$index, scope.row)"
            icon="el-icon-edit"
          >审批</el-button>
          <el-button
            v-if="scope.row.auditStatus ==-1"
            type="danger"
            icon="el-icon-circle-close"
          >未通过</el-button>
          <el-button
            v-if="scope.row.orderStatus==1"
            type="primary"
            @click="onEdit(scope.row.no)"
            icon="el-icon-edit"
          >编辑</el-button>
          <el-button
            v-else-if="scope.row.orderStatus==2"
            type="primary"
            @click="onMoney(scope.row.no)"
            icon="el-icon-coin"
          >结款</el-button>
          <el-button
            v-else-if="scope.row.orderStatus==3"
            type="success"
            icon="el-icon-circle-check"
          >完成</el-button>
          <!-- <el-button v-else type="danger" style @click="onSubmit" icon="el-icon-circle-close">未知</el-button> -->
          <!-- <el-button
            type="danger"
            style
            @click="onDelete(scope.$index, scope.row)"
            icon="el-icon-delete"
          >删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-row style="text-align:center;float:right;margin-right:6%;margin-top:3%">
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
  </el-row>
=======
    <el-table :data="tableData" border style="width: 100%" :header-cell-style="thStyleFun" :cell-style="cellStyleFun">
      <el-table-column prop="no" label="销售单编号" ></el-table-column>
      <el-table-column prop="product_id" label="产品名称" ></el-table-column>
      <el-table-column prop="customer_id" label="客户名称"  ></el-table-column>
      <el-table-column prop="nums" label="销售数量" ></el-table-column>
      <el-table-column prop="sale_date" label="销售日期" ></el-table-column>
      <el-table-column prop="order_status" label="销售状态"  :formatter="formatterColumnState"></el-table-column>
      <el-table-column  label="操作">
        <!-- <el-button v-for="item in tableData"  :key="item.no" type="primary" @click="onSubmit" icon="el-icon-edit">编辑</el-button> -->
        <div >
          <el-button v-if="tableData[3].order_status==0" type="primary" @click="onSubmit" icon="el-icon-edit">编辑</el-button>
              <el-button v-else-if="tableData[3].order_status==1" type="primary" @click="onSubmit" icon="el-icon-edit">结款</el-button>
              <el-button v-else-if="tableData[3].order_status==2" type="success" @click="onSubmit" icon="el-icon-circle-check">结束</el-button>
              <el-button v-else="" type="danger" @click="onSubmit" icon="el-icon-circle-check">未知</el-button>
              <el-button type="danger" @click="onSubmit" icon="el-icon-delete">删除</el-button>
        </div>
              
      </el-table-column>     
    </el-table>
  </el-row>  
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
</template>

<script>
export default {
  data() {
    return {
<<<<<<< HEAD
      currentPage: 1, //默认显示第一页
      pageSize: 10, //默认每页显示15条
      totalNum: 0, //总数量
      loading: false,
      aaa: "",
      allusers: [],
      allstaff: [],
      allproducts: [],
      formInline: {
        user: "",
        region: "",
        state: "",
      },
      ruleForm: {
        id: 1,
        no: "",
        productId: "",
        customerId: "",
        orderId: "非订单",
        saleDate: "",
        nums: "",
        amount: "",
        amountWay: "",
        amountReceivable: "",
        amountReceived: "",
        orderStatus: "待提货",
        handleId: "",
        operatorId: "",
        operatorTime: "",
        remark: "",
      },
      ruleForm2: {
        id: 1,
        no: "",
        productId: "",
        customerId: "",
        orderId: 1,
        saleDate: "",
        nums: "",
        amount: "",
        amountWay: "",
        amountReceivable: "",
        amountReceived: "",
        orderStatus: 1,
        handleId: "",
        operatorId: "",
        operatorTime: "",
        remark: "",
      },
      ruleForm3: {
        id: 1,
        no: "",
        productId: "",
        customerId: "",
        orderId: 1,
        saleDate: "",
        nums: "",
        amount: "",
        amountWay: "",
        amountReceivable: "",
        amountReceived: "",
        orderStatus: 1,
        handleId: "",
        operatorId: "",
        operatorTime: "",
        remark: "",
      },
      rules: {
        amountReceivable: [
          { required: true, message: "请应收金额", trigger: "change" },
        ],
        nums: [{ required: true, message: "请输入数量", trigger: "change" }],
        amount: [
          { required: true, message: "请选择总金额", trigger: "change" },
        ],
      },

      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisibleShenPi: false,
      tableData: [],
    };
  },
  created() {
    this.SelectAllSlSaleOrder(); //默认进来就加载所有销售信息
    this.SelectAllproducts(); //默认进来就加载所有的产品
  },
  watch: {
    "ruleForm2.amountReceivable"(newval, oldval) {
      if (newval <= 0) {
        this.$message.error("金额不可小于1!");
        this.ruleForm2.amountReceivable = 1;
      } else {
        this.ruleForm2.amount = this.ruleForm2.amountReceivable;
      }
    },
    "ruleForm2.amount"(newval, oldval) {
      if (newval <= 0) {
        this.$message.error("金额不可小于1!");
        this.ruleForm2.amount = 1;
      } else {
        this.ruleForm2.amountReceivable = this.ruleForm2.amount;
      }
    },
    "ruleForm2.nums"(newval, oldval) {
      if (newval <= 0) {
        this.$message.error("数量不可小于1!");
        this.ruleForm2.nums = 1;
      }
    },
    "ruleForm3.amountReceived"(newval, oldval) {
      if (newval <= 0) {
        this.$message.error("金额不可小于1!");
        this.ruleForm3.amountReceived = 1;
      } else if (newval > this.ruleForm3.amountReceivable) {
        this.$message.error("实付金额不应大于应付金额!");
        this.ruleForm3.amountReceived = this.ruleForm3.amountReceivable;
      }
    },
  },
  methods: {
    //默认进来就加载所有销售信息
    SelectAllSlSaleOrder() {
      this.loading = true;
      var that = this;
      this.$axios
        .get("/SaleManagement/GetSSO?pageIndex=1")
        .then(function (response) {
          console.log(response.data);
          that.tableData = response.data.entity;
          that.loading = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    }, //默认进来就加载所有的产品
    SelectAllproducts() {
      var that = this;
      this.$axios
        .get("/QualityManagement/GetALLPP")
        .then(function (response) {
          console.log(response.data);
          that.allproducts = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
=======
      allusers:[],
      allstaff:[],
      allproducts:[],
      formInline: {
        id: "",
        chanpin: "",
        zt: ""
      },//销售状态转换
      formatterColumnState(row, column) {
            switch(row.order_status){
                case "0":
                    return '待提货';
                    break;
                case "1":
                    return '待结款';
                    break;
                case "2":
                    return '已结款';
                    break;
                default:
                    return '未知';
            }
      },//客户姓名转换
      // formatterColumnCust(row, column) {
      //   this.$axios
      //   .get(
      //     "/SaleManagement/GetSSOID",{
      //       params: {
      //          id: row.customer_id,
      //       }
      //     }
      //   )
      //   .then(function(response) {
      //     console.log(response.data);
      //     return response.data.name;
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
      // },
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
      formLabelWidth: '100px',
      tableData: [
        {
          no: "20160502",
          product_id: "手机",
          customer_id:1,
          nums: "10",
          sale_date:"2020-08-08",
          order_status:"0"
        },
        {
          no: "20160503",
          product_id: "平板",
          customer_id:1,
          nums: "10",
          sale_date:"2020-08-08",
          order_status:"0"
        },
        {
          no: "20160504",
          product_id: "电脑",
          customer_id:1,
          nums: "10",
          sale_date:"2020-08-08",
          order_status:"1"
        },
        {
          no: "20160505",
          product_id: "显示器",
          customer_id:1,
          nums: "10",
          sale_date:"2020-08-08",
          order_status:"2"
        }
      ],
      ProData:[]
    };
  },
  methods: {   
thStyleFun() {
     return 'text-align:center'
 },
 cellStyleFun() {
    return 'text-align:center'
 },
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
    onSubmit() {
      this.$message.error("还未完成!");
    },//以订单号查询
    onSelect() {
      const that=this;
      var saleid=$("#SaleID").val();
      if(saleid==""){
        this.$message.error("请输入订单号!");
      }
      else{
      this.$axios
        .get(
          "/SaleManagement/GetSSOID",{
            params: {
<<<<<<< HEAD
              id: saleid,
            },
          })
          .then(function (response) {
            that.tableData = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }, //产品名称查询信息
    getproducts(value) {
      var that = this;
      this.$axios
        .get("/SaleManagement/GetSSOProName", {
          params: {
            id: value,
          },
        })
        .then(function (response) {
          that.tableData = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }, //状态转换
    formatterColumnstate(row, column) {
      switch (row.orderStatus) {
        case 1:
          return "待取货";
          break;
        case 2:
          return "待结款";
          break;
        case 3:
          return "已结款";
          break;
        case 0:
          return "待审批";
          break;
        case -1:
          return "未通过";
          break;
        default:
          return "未知";
=======
               id: saleid,
            }
          }
        )
        .then(function(response) {
          console.log(response.data);
          that.tableData=[];
          that.tableData=response.data;
          console.log(that.tableData);
        })
        .catch(function(error) {
          console.log(error);
        });
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
      }
    },//查询所有订单
    onSelectALL() {
      const that=this;
      this.$axios
<<<<<<< HEAD
        .get("/SaleManagement/GetSSO")
        .then(function (response) {
          console.log(response.data);
          that.tableData = response.data;
=======
        .get(
          "/SaleManagement/GetSSO"
          )
        .then(function(response) {
          // console.log(response.data);
          // that.tableData=[];
          // that.tableData=response.data;
          // console.log(that.tableData);
          that.tableData=[
        {
          no: "20160502",
          product_id: "手机",
          customer_id:"李白",
          nums: "10",
          sale_date:"2020-08-08",
          order_status:"待提货"
        },
        {
          no: "20160503",
          product_id: "平板",
          customer_id:"曜",
          nums: "10",
          sale_date:"2020-08-08",
          order_status:"待提货"
        },
        {
          no: "20160504",
          product_id: "电脑",
          customer_id:"不知火舞",
          nums: "10",
          sale_date:"2020-08-08",
          order_status:"待提货"
        },
        {
          no: "20160505",
          product_id: "显示器",
          customer_id:"嬴政",
          nums: "10",
          sale_date:"2020-08-08",
          order_status:"待提货"
        }
      ]
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
        })
        .catch(function (error) {
          console.log(error);
        });
<<<<<<< HEAD
    }, //状态得到信息
    getstate(value) {
      var that = this;
      this.$axios
        .get("/SaleManagement/GetSSOState", {
          params: {
            id: value,
          },
        })
        .then(function (response) {
          that.tableData = response.data;
=======
    },//以状态下拉框查询
    selectState(value) {
      const that=this;
      this.$axios
        .get(
          "/SaleManagement/GetSSOState",{
            params: {
               id: value,
            }
          }
        )
        .then(function(response) {
          that.tableData=[];
          that.tableData=response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
   aa(){
     const that=this;
      this.$axios
        .get(
          "/SaleManagement/GetSSOState",
        )
        .then(function(response) {
          that.ProData=response.data;
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
        })
        .catch(function (error) {
          console.log(error);
        });
<<<<<<< HEAD
    }, //时间转换
    formatDate(row, column) {
      var currdate = new Date(row.saleDate);
      var year = currdate.getFullYear();
      var month = currdate.getMonth() + 1;
      return year + "年" + month + "月";
    }, //删除
    onDelete(index, row) {
      this.$confirm("确定要删除销售单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //this.$message.error("暂无数据，请勿操作!");
          this.$axios
            .get("/SaleManagement/Delete", {
              params: {
                id: row.no,
              },
            })
            .then(function (response) {
              this.$message.success("删除成功!");
              onSelectALL();
            })
            .catch(function (error) {
              this.$message.error("删除失败!");
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "success",
            message: "已取消删除",
          });
        });
    }, //模态框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    }, //添加
    submitForm(AddForm) {
      this.$refs.AddForm.validate((valid) => {
        if (valid) {
          //this.$message.error("暂无数据，请勿操作!");

          var that = this;
          console.log(that.ruleForm);
          this.$axios
            .post("/SaleManagement/AddSlSaleOrder", that.ruleForm)
            .then(function (response) {
              console.log(response.data);
              if (response.data > 0) {
                that.$message.success("添加成功！");
                that.ruleForm = {};
                that.SelectAllSlSaleOrder();
              } else {
                that.$message.error("添加失败！");
                that.ruleForm = {};
              }
            })
            .catch(function (error) {
              that.$message.error("添加失败error2！");
            });
        } else {
          console.log("valid错误!");
          return false;
        }
      });
    }, //编辑(第一次查询)
    onEdit(id) {
      this.dialogVisible2 = true; //dialog对话窗口打开
      var index = this.tableData.findIndex((item) => item.id == id);
      var task = this.tableData[index];
      this.ruleForm2 = task;
    }, //编辑(修改数据)
    submitForm2(EditruleForm) {
      var that = this;
      this.$refs.EditruleForm.validate((valid) => {
        if (valid) {
          console.log(this.ruleForm2);
          //this.$message.error("暂无数据，请勿操作!");
          this.$axios
            .put("/SaleManagement/EditSlSaleOrder", this.ruleForm2)
            .then(function (response) {
              console.log(response.data);
              that.$message.success("修改成功！");
              that.dialogVisible2 = false;
              that.SelectAllSlSaleOrder();
            })
            .catch(function (error) {
              //that.$message.error("添加失败error2！");
            });
        } else {
          console.log("valid错误!");
          return false;
        }
      });
    }, //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //审批
    onShenPi(index, row) {
      this.dialogVisibleShenPi = true; //dialog对话窗口打开
      this.aaa = row.no;
    }, //审批第二次
    onShenPiTwo(obj) {
      var that = this;
      console.log(obj);
      console.log(this.aaa);
      this.$axios
        .put("/SaleManagement/ShenPi?id=" + this.aaa + "&&status=" + obj)
        .then(function (response) {
          console.log(response.data);
          that.$message.success("审批完成");
          that.dialogVisibleShenPi = false;
          that.SelectAllSlSaleOrder();
        })
        .catch(function (error) {
          //that.$message.error("删除失败!");
          console.log(error);
        });
    }, //结款1111
    onMoney(id) {
      this.dialogVisible3 = true; //dialog对话窗口打开
      var index = this.tableData.findIndex((item) => item.id == id);
      var task = this.tableData[index];
      this.ruleForm3 = task;
    }, //结款2222
    submitForm3(MoneyruleForm) {
      var that = this;
      this.$refs.MoneyruleForm.validate((valid) => {
        if (valid) {
          console.log(this.ruleForm2);
          //this.$message.error("暂无数据，请勿操作!");
          this.$axios
            .put("/SaleManagement/EditSlSaleOrderMoney", this.ruleForm3)
            .then(function (response) {
              console.log(response.data);
              that.$message.success("修改成功！");
              that.dialogVisible3 = false;
              that.SelectAllSlSaleOrder();
            })
            .catch(function (error) {
              //that.$message.error("添加失败error2！");
            });
        } else {
          console.log("valid错误!");
          return false;
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      var that = this;
      this.$axios
        .get(
          `/SaleManagement/GetSSO?pageIndex=${val}`
        )
        .then((res) => {
          // if (res.data.entity.length != 0) {
          //   res.data.entity.forEach((element) => {
          //     element.purchaseDate = element.purchaseDate.substring(0, 10);
          //   });
          // }
          that.tableData = res.data.entity;
          that.totalNum = Number(res.data.msg);
        });
    },
  },
=======
   }
  }
>>>>>>> c6dff6bf87a5d2d759e0dd318189b7d5083d7c25
};
</script>