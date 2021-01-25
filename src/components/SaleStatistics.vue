<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="grid-content bg-purple" style="font-size:40px;">销售统计</div>
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

            <el-form-item label="产品类别">
              <el-select
                v-model="formSearch.CategoryName"
                placeholder="产品类别"
              >
                <el-option
                  :label="v.key"
                  :value="v.key"
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

            <!-- <el-form-item>
              <el-button
                type="primary"
                @click="BtnSearch"
              >查询</el-button>
            </el-form-item> -->
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
            :color="(this.formSearch.year?'#0bbd87':'')"
            size="large"
          >
            <el-card>
              <h4>选择销售年份</h4>
            </el-card>
          </el-timeline-item>
          <el-timeline-item
            timestamp="第二步"
            placement="top"
            :color="(this.formSearch.CategoryName?'#0bbd87':'')"
          >
            <el-card>
              <h4>选择产品类别</h4>
            </el-card>
          </el-timeline-item>
          <el-timeline-item
            timestamp="第三步"
            placement="top"
            :color="(this.radio?'#0bbd87':'')"
          >
            <el-card>
              <h4>请选择统计图形类别</h4>
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
      mockData: [],
      loading: false,
      radio: "",
    };
  },
  methods: {
    BtnSearch() {
      var that = this;
      this.$axios
        .get(
          `/SaleManagement/AllStatisc?year=${this.formSearch.year}&SearchName=${this.formSearch.SearchName}&CategoryName=${this.formSearch.CategoryName}`
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
        });
    },
    SendLoad() {
      var that = this;
      this.$axios
        .get(
          `/SaleManagement/AllStatisc?year=${this.formSearch.year}&CategoryName=${this.formSearch.CategoryName}`
        )
        .then((res) => {
          if (res.data.entity.length != 0) {
            that.mockData = res.data.entity;
          } else {
            that.mockData = [
              {
                key: "01月",
                value: 0,
              },
            ];
          }

          if (that.radio == "1") {
            that.columnPlots();
          } else if (that.radio == "2") {
            that.piePlots();
          } else if (that.radio == "3") {
            that.linePlots();
          }
        });
    },
    async loadinfo() {
      const { data: ress } = await this.$axios.get(
        "/SaleManagement/AllCategoryName"
      );
      this.allCategoryName = ress.entity;
      // this.formSearch.CategoryName = this.allCategoryName[0];
    },
    columnPlots() {
      var that = this;
      $("#canvas").html(" ");
      //柱形
      that.columnPlot = new that.$G2.Column("canvas", {
        data: that.mockData,
        title: {
          visible: true,
          text: "柱形图",
        },
        description: {
          visible: true,
          text: "",
        },
        forceFit: true,
        padding: "auto",
        xField: "key",
        yField: "value",
        meta: {
          key: {
            alias: "销售统计",
          },
          value: {
            alias: "销售量",
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
      that.columnPlot.render();
    },
    piePlots() {
      $("#Abe").html(" ");

      const piePlot = new this.$G2.Pie(document.getElementById("Abe"), {
        forceFit: true,
        title: {
          visible: true,
          text: "多色饼图",
        },
        description: {
          visible: true,
          text: "",
        },
        radius: 0.8,
        data: this.mockData,
        angleField: "value",
        colorField: "key",
        label: {
          visible: true,
          type: "inner",
        },
      });

      piePlot.render();
    },
    linePlots() {
      var that = this;
      $("#Line").html(" ");

      //曲线
      const linePlot = new that.$G2.Line(document.getElementById("Line"), {
        title: {
          visible: true,
          text: "曲线图",
        },
        description: {
          visible: true,
          text: "",
        },
        meta: {
          key: {
            alias: "年份",
            range: [0, 1],
          },
          value: {
            alias: "销售量",
            formatter: (v) => {
              return `${v}`;
            },
          },
        },
        padding: "auto",
        forceFit: true,
        data: that.mockData,
        xField: "key",
        yField: "value",
        smooth: true,
      });

      linePlot.render();
    },
  },
  mounted() {
    this.loadinfo();
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
  watch: {
    radio(newval, oldval) {
      if (this.formSearch.CategoryName != "" && this.formSearch.year != "") {
        this.SendLoad();
      }
    },
    "formSearch.CategoryName"(newval, oldval) {
      if (this.radio != "" && this.formSearch.year != "") {
        this.SendLoad();
      }
    },
    "formSearch.year"(newval, oldval) {
      if (this.radio != "" && this.formSearch.CategoryName != "") {
        this.SendLoad();
      }
    },
  },
};
</script>