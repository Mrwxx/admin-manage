<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>仿真任务管控</el-breadcrumb-item>
      <el-breadcrumb-item>仿真任务构建</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 提示区域 -->
      <el-alert
        title="按照步骤完成仿真环境构建"
        type="info"
        center
        show-icon
        :closable="false"
      ></el-alert>

      <el-row>
        <el-col :span="18" push="3">
          <!-- 步骤条区域 -->
          <el-steps
            :space="500"
            :active="activeIndex - 0"
            finish-status="success"
            align-center
          >
            <el-step title="仿真任务描述"></el-step>
            <el-step title="仿真资源规划"></el-step>
            <el-step title="虚拟资源规划"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
        </el-col>
      </el-row>

      <!-- tab栏区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        label-position="top"
      >
        <el-tabs
          v-model="activeIndex"
          :tab-position="'left'"
          :before-leave="beforeTabLeave"
        >
          <el-tab-pane label="仿真任务描述" name="0" class="left-tab">
            <el-row :gutter="200">
              <el-col :span="8" push="3">
                <el-card class="inner-card">
                  <el-form-item
                    label="仿真任务名称"
                    prop="task_name"
                    class="form-label"
                  >
                    <el-input
                      v-model="addForm.task_name"
                      class="form-input"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="仿真任务环境数量"
                    prop="task_desc"
                    class="form-label"
                  >
                    <el-input
                      v-model="addForm.task_desc"
                      type="text"
                      class="form-input"
                    ></el-input>
                  </el-form-item>

                  <el-form-item
                    label="仿真任务描述"
                    prop="task_desc"
                    class="form-label"
                  >
                    <el-input
                      v-model="addForm.task_desc"
                      type="textarea"
                      rows="10"
                      class="form-input"
                    ></el-input>
                  </el-form-item>
                </el-card>
              </el-col>

              <el-col :span="8" push="3">
                <el-card class="inner-card">
                  <el-form-item
                    label="仿真任务资源规划配置"
                    prop="task_prop"
                    class="form-label"
                  >
                    <el-input
                      v-model="addForm.task_prop"
                      type="file"
                      class="form-input"
                    ></el-input>

                    <!-- 富文本编辑器 -->
                    <quill-editor
                      v-model="addForm.goods_introduce"
                      class="form-input"
                    ></quill-editor>

                    <el-button type="primary" class="inner-save">
                      保存
                    </el-button>
                  </el-form-item>
                </el-card>
              </el-col>

              <el-col :span="1" push="3">
                <el-button type="primary" class="next-page">
                  下一页
                  <i class="el-icon-arrow-right el-icon--right"> </i>
                </el-button>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="仿真资源规划" name="1" class="left-tab">
            <!-- 2.为Echarts准备一个具备大小的DOM -->
            <!-- <div id="main" style="width: 600px; height: 400px"></div> -->
            <el-row :gutter="200">
              <el-col :span="5" push="3">
                <el-card class="inner-card">
                  <el-form-item
                    label="仿真模型选择"
                    prop="task_models"
                    class="form-label"
                  >
                    <el-input v-model="addForm.task_models"></el-input>
                  </el-form-item>
                </el-card>
              </el-col>

              <el-col :span="5" push="3">
                <el-card class="inner-card">
                  <el-form-item
                    label="仿真支撑软件选择"
                    prop="task_softwares"
                    class="form-label"
                  >
                    <el-input v-model="addForm.task_softwares"></el-input>
                  </el-form-item>
                </el-card>
              </el-col>

              <el-col :span="5" push="3">
                <el-card class="inner-card">
                  <el-form-item
                    label="仿真数据文件选择"
                    prop="task_datas"
                    class="form-label"
                  >
                    <el-input v-model="addForm.task_datas"></el-input>
                  </el-form-item>
                </el-card>
              </el-col>

              <el-col :span="1" push="2">
                <el-button type="primary" class="prev-page">
                  上一页
                  <i class="el-icon-arrow-left el-icon--left"> </i>
                </el-button>
              </el-col>

              <el-col :span="1" push="2">
                <el-button type="primary" class="next-page">
                  下一页
                  <i class="el-icon-arrow-right el-icon--right"> </i>
                </el-button>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="虚拟资源规划" name="2" class="left-tab">
            <el-form-item label="CPU核心数" prop="task_cpuCore">
              <el-input v-model="addForm.task_cpuCore"></el-input>
            </el-form-item>
            <el-form-item label="内存大小" prop="task_memSize">
              <el-input v-model="addForm.task_memSize"></el-input>
            </el-form-item>
            <el-form-item label="根磁盘大小" prop="task_rootDisk">
              <el-input v-model="addForm.task_rootDisk"></el-input>
            </el-form-item>
            <el-form-item label="挂载磁盘大小" prop="task_mountDisk">
              <el-input v-model="addForm.task_mountDisk"></el-input>
            </el-form-item>
            <el-form-item label="二层网络" prop="task_secondNet">
              <el-input v-model="addForm.task_secondNet"></el-input>
            </el-form-item>
            <el-form-item label="初始化脚本" prop="task_initBat">
              <el-input v-model="addForm.task_initBat"></el-input>
            </el-form-item>
            <el-form-item label="计算节点选择" prop="task_computeNode">
              <el-input v-model="addForm.task_rootDisk"></el-input>
            </el-form-item>
          </el-tab-pane>
          <!-- <el-tab-pane label="商品内容" name="4"> -->
          <!-- 富文本编辑器 -->
          <!-- <quill-editor v-model="addForm.goods_introduce"></quill-editor> -->
          <!-- 添加按钮 -->
          <!-- <el-button type="primary" class="btnAdd">添加商品</el-button> -->
          <!-- </el-tab-pane> -->
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 导入echarts
import * as echarts from "echarts";

export default {
  data() {
    return {
      activeIndex: 0,
      //添加商品的表单数据对象
      addForm: {
        goods_name: "",
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        //商品的详情描述
        goods_introduce: "",
      },
      addFormRules: {
        goods_name: [
          {
            required: true,
            message: "请输入商品名称",
            trigger: "blur",
          },
        ],
        goods_price: [
          {
            required: true,
            message: "请输入商品价格",
            trigger: "blur",
          },
        ],
        goods_weight: [
          {
            required: true,
            message: "请输入商品重量",
            trigger: "blur",
          },
        ],
        goods_number: [
          {
            required: true,
            message: "请输入商品数量",
            trigger: "blur",
          },
        ],
      },
      //是否可以跳转tab
      changeTab: false,
    };
  },
  created() {},
  async mounted() {
    //3.基于准备好的DOM，初始化Echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    // const {data:res} = await this.$http.get('reports/type/1')
    // if(res.meta.status != 200){
    //     return this.$message.error('获取折线图数据失败！')
    // }
    // myChart.setOption(res.data)
    //4. 准备数据和配置项
    // var option = {
    //   title: {
    //     text: "ECharts 入门示例",
    //   },
    //   tooltip: {},
    //   xAxis: {
    //     data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    //   },
    //   yAxis: {},
    //   series: [
    //     {
    //       name: "销量",
    //       type: "bar",
    //       data: [5, 20, 36, 10, 10, 20],
    //     },
    //   ],
    // };
    // // 5.展示数据
    // myChart.setOption(option);

    var option1 = {
      series: [
        {
          type: "pie",
          data: [
            {
              value: 335,
              name: "直接访问",
            },
            {
              value: 234,
              name: "联盟广告",
            },
            {
              value: 1548,
              name: "搜索引擎",
            },
          ],
        },
      ],
    };
    myChart.setOption(option1);
  },
  methods: {
    beforeTabLeave(activeName, oldActiveName) {
      console.log("即将离开的标签页：" + oldActiveName);
      console.log("即将进入的标签页：" + activeName);
      if (oldActiveName == "0") {
        //校验是否填写
        this.$refs.addFormRef.validate((valid) => {
          console.log(valid);
          if (!valid) {
            //提示
            this.$message.error("当前页面有信息未填写！");
          } else {
            this.changeTab = true;
          }
        });
        return this.changeTab;
      }
    },
  },
};
</script>

<style >
.btnAdd {
  margin-top: 15px;
}

.el-input {
  margin-bottom: 5px;
  position: relative;
  top: 0px;
  width: 80%;
}

el-tab-pane {
  height: 100px;
  font-size: 100px;
}

el-steps {
  position: relative;
  left: 50%;
}

.monitorTop {
  /*// position: relative;  相对定位,*/
    position: relative;
    /*vw是width of view(port)的缩写；
  100vw表示百分之百的视图宽度；
  123px是需要减去的宽度；
  减号的两边必须都有至少一个空格*/
  height: calc(100% - 123px);
}

.el-tabs__item {
  font-size: 20px;
  height: 100px;
  padding: 40 20px;
  line-height: 100px;
  /* font-size: 22px;
  cursor: pointer;
  text-shadow: 0 0 1px #000; */
}

.inner-card {
  position: relative;
  height: 570px;
  width: 100%;
  top: 10px;
}

.next-page {
  /* float: right; */
  position: relative;
  left: 200px;
  top: 530px;
}

.prev-page {
  position: relative;
  left: 280px;
  top: 530px;
}

.inner-save {
  float: right;
  position: relative;
  top: 5px;
  right: 5px;
}

.form-label .el-form-item__label {
  color: black;
  font-size: 18px;
  text-shadow: tomato;
}

.form-input .el-form-item__label {
  position: relative;
  top: 0px;
  width: 80%;
}
</style>