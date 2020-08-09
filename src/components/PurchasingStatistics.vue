<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="24">
        <div
          class="grid-content bg-purple"
          style="float:right"
        >
          <!-- 查询 -->
          <el-form
            :inline="true"
            :model="formSearch"
            class="demo-form-inline"
          >

            <el-form-item label="年份">
              <el-select
                v-model="formSearch.year"
                placeholder="年份"
              >
                <el-option
                  :label="2020"
                  :value="2020"
                ></el-option>

                <el-option
                  :label="2019"
                  :value="2019"
                ></el-option>

                <el-option
                  :label="2018"
                  :value="2018"
                ></el-option>

                <el-option
                  :label="2017"
                  :value="2017"
                ></el-option>

                <el-option
                  :label="2016"
                  :value="2016"
                ></el-option>

              </el-select>
            </el-form-item>

            <el-form-item label="商品类别">
              <el-select
                v-model="formSearch.CategoryName"
                placeholder="商品类别"
              >
                <el-option
                  :label="v"
                  :value="v"
                  v-for="(v,i) in allCategoryName"
                  :key="i"
                ></el-option>

              </el-select>
            </el-form-item>

            <el-form-item>
              <el-radio
                v-model="radio"
                label="1"
              >柱型图</el-radio>
              <el-radio
                v-model="radio"
                label="2"
              >饼型图</el-radio>
              <el-radio
                v-model="radio"
                label="3"
              >曲线图</el-radio>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                @click="BtnSearch"
              >查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>

    </el-row>

    <div v-show="Allvisable==false">
      <div class="block">
        <el-timeline>
          <el-timeline-item
            timestamp="第一步"
            placement="top"
            v-show="!this.formSearch.year"
            color="#0bbd87"
            size="large"
          >
            <el-card>
              <h4>选择采购年份</h4>
              <!-- <p>王小虎 提交于 2018/4/12 20:46</p> -->
            </el-card>
          </el-timeline-item>
          <el-timeline-item
            timestamp="第二步"
            placement="top"
            v-show="!this.formSearch.CategoryName"
          >
            <el-card>
              <h4>选择商品类别</h4>
              <!-- <p>王小虎 提交于 2018/4/3 20:46</p> -->
            </el-card>
          </el-timeline-item>
          <el-timeline-item
            timestamp="第三步"
            placement="top"
            v-show="!this.radio"
          >
            <el-card>
              <h4>请选择统计图形类别</h4>
              <!-- <p>王小虎 提交于 2018/4/2 20:46</p> -->
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>

    <div
      id="canvas"
      v-loading="loading"
      v-show="Allvisable==true&&radio==1"
    ></div>

    <div
      id="Abe"
      v-loading="loading"
      v-show="Allvisable==true&&radio==2"
    ></div>

    <div
      id="Line"
      v-loading="loading"
      v-show="Allvisable==true&&radio==3"
    ></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formSearch: {
        year: "",
        CategoryName: "",
      },
      //当年份和类别有一个为空时就不显示
      activities: [
        {
          content: "支持使用图标",
          timestamp: "2018-04-12 20:46",
          size: "large",
          type: "primary",
          icon: "el-icon-more",
        },
      ],
      PurchaseList: [],
      PurchaseEditObj: {},
      allCategoryName: [],
      mockData: [
        {
          type: "家具家电",
          sales: 38,
        },
        {
          type: "粮油副食",
          sales: 52,
        },
        {
          type: "生鲜水果",
          sales: 61,
        },
        {
          type: "美容洗护",
          sales: 145,
        },
        {
          type: "母婴用品",
          sales: 48,
        },
        {
          type: "进口食品",
          sales: 38,
        },
        {
          type: "食品饮料",
          sales: 38,
        },
        {
          type: "家庭清洁",
          sales: 38,
        },
      ],
      loading: false,
      radio: "",
    };
  },
  methods: {
    BtnSearch() {
      var that = this;
      this.$axios
        .get(
          `/PurchasingManagement/AllStatisc?year=${this.formSearch.year}&SearchName=${this.formSearch.SearchName}&CategoryName=${this.formSearch.CategoryName}`
        )
        .then((res) => {
          if (res.data.entity.length != 0) {
            res.data.entity.forEach((element) => {
              element.purchaseDate = element.purchaseDate.substring(0, 10);
            });
          }
          that.PurchaseList = res.data.entity;
          that.totalNum =
            Number(res.data.msg) % 2 == 0
              ? Number(res.data.msg) / that.pageSize
              : Number(res.data.msg) / that.pageSize + 1;
          console.log(that.totalNum);
        });
    },
    async loadinfo() {
      // const { data: res } = await this.$axios.get(
      //   "/PurchasingManagement/AllStatisc"
      // );
      // this.loading = false;
      // if (res.entity.length != 0) {
      //   res.entity.forEach((element) => {
      //     element.purchaseDate = element.purchaseDate.substring(0, 10);
      //   });
      // }
      // this.PurchaseList = res.entity;
      const { data: ress } = await this.$axios.get(
        "/PurchasingManagement/AllCategoryName"
      );
      this.allCategoryName = ress.entity;
      // this.formSearch.CategoryName = this.allCategoryName[0];
    },
  },
  mounted() {
    this.loadinfo();
    //柱形
    const columnPlot = new this.$G2.Column("canvas", {
      data: this.mockData,
      title: {
        visible: true,
        text: "",
      },
      description: {
        visible: true,
        text: "",
      },
      forceFit: true,
      padding: "auto",
      xField: "type",
      yField: "sales",
      meta: {
        type: {
          alias: "采购统计",
        },
        sales: {
          alias: "销售额(万)",
        },
      },
      label: {
        visible: true,
        style: {
          fill: "#0D0E68",
          fontSize: 12,
          fontWeight: 600,
          opacity: 0.6,
        },
      },
    });
    columnPlot.render();

    //饼型
    const piePlot = new this.$G2.Pie(document.getElementById("Abe"), {
      forceFit: true,
      title: {
        visible: true,
        text: "",
      },
      description: {
        visible: true,
        text: "",
      },
      radius: 0.8,
      data: this.mockData,
      angleField: "sales",
      colorField: "type",
      label: {
        visible: true,
        type: "spider",
      },
    });

    piePlot.render();

    //曲线

    const linePlot = new this.$G2.Line(document.getElementById("Line"), {
      title: {
        visible: true,
        text: "",
      },
      description: {
        visible: true,
        text: "",
      },
      padding: "auto",
      forceFit: true,
      data: this.mockData,
      xField: "type",
      yField: "sales",
      smooth: true,
    });

    linePlot.render();
  },
  computed: {
    Allvisable() {
      if (
        this.radio == "" ||
        this.formSearch.CategoryName == "" ||
        this.formSearch.year == ""
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>
<style>
/* .el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
} */
</style>
