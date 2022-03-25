<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>仿真实验管控</el-breadcrumb-item>
      <el-breadcrumb-item>仿真实验环境构建</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="outerCard">
      <!-- 提示区域 -->
      <el-alert
        title="按照步骤完成仿真环境构建"
        type="info"
        center
        show-icon
        :closable="false"
      ></el-alert>

      <el-row>
        <el-col :span="18" :push="3">
          <!-- 步骤条区域 -->
          <el-steps
            :space="500"
            :active="activeIndex - 0"
            finish-status="success"
            align-center
          >
            <el-step title="仿真实验描述"></el-step>
            <el-step title="仿真资源规划"></el-step>
            <el-step title="虚拟资源规划"></el-step>
            <!-- <el-step title="完成"></el-step> -->
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
          :tab-position="'right'"
          :before-leave="beforeTabLeave"
          @tab-click="handleClick"
        >
          <el-tab-pane label="仿真实验描述" name="0" class="left-tab">
            <el-row :gutter="20">
              <el-col :span="8" :push="4">
                <el-card class="inner-card">
                  <el-form-item
                    label="仿真实验名称"
                    prop="task_name"
                    class="form-label"
                  >
                    <el-input
                      v-model="addForm.task_name"
                      class="form-input"
                    ></el-input>
                  </el-form-item>

                  <el-form-item
                    label="仿真实验记录"
                    prop="task_desc"
                    class="form-label"
                  >
                    <el-input
                      v-model="addForm.task_desc"
                      type="textarea"
                      rows="4"
                      class="form-input"
                    ></el-input>
                  </el-form-item>
                </el-card>
              </el-col>

              <el-col :span="8" :push="4">
                <el-card class="inner-card">
                  <el-form-item
                    label="仿真实验环境数量"
                    prop="task_desc"
                    class="form-label"
                  >
                    <el-input-number
                      v-model="addForm.task_envNum"
                      type="text"
                      class="form-input"
                    ></el-input-number>
                  </el-form-item>

                  <el-form-item
                    label="仿真运行环境镜像选择"
                    prop="task_desc"
                    class="form-label"
                  >
                    <el-card>
                      <el-select
                        v-model="envId"
                        multiple
                        @change="fzEnvChange"
                        placeholder="请选择镜像"
                      >
                        <el-option
                          v-for="item in mirrorList"
                          :key="item.index"
                          :label="item.envName"
                          :value="item.index"
                        >
                        </el-option>
                      </el-select>
                    </el-card>
                  </el-form-item>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>

          <el-tab-pane label="仿真资源规划" name="1" class="left-tab">
            <!-- 2.为Echarts准备一个具备大小的DOM -->
            <!-- <div id="main" style="width: 600px; height: 400px"></div> -->
            <el-row :gutter="200">
              <el-col :span="16" :push="4">
                <el-card class="inner-card">
                  <div style="text-align: center" class="edit_dev">
                    <el-transfer
                      style="text-align: left; display: inline-block"
                      v-model="simuVal"
                      filterable
                      :left-default-checked="[2, 3]"
                      :right-default-checked="[1]"
                      :titles="['仿真模型资源', '已规划模型']"
                      :button-texts="['撤回', '添加']"
                      :format="{
                        noChecked: '${total}',
                        hasChecked: '${checked}/${total}',
                      }"
                      @change="simuChange"
                      :data="fzModelData"
                    >
                    </el-transfer>
                  </div>
                </el-card>
              </el-col>

              <el-col :span="16" :push="4">
                <el-card class="inner-card">
                  <div style="text-align: center" class="edit_dev">
                    <el-transfer
                      style="text-align: left; display: inline-block"
                      v-model="softVal"
                      filterable
                      :left-default-checked="[2, 3]"
                      :right-default-checked="[1]"
                      :titles="['仿真支撑资源', '已规划支撑软件']"
                      :button-texts="['撤回', '添加']"
                      :format="{
                        noChecked: '${total}',
                        hasChecked: '${checked}/${total}',
                      }"
                      @change="softChange"
                      :data="fzSoftData"
                    >
                    </el-transfer>
                  </div>
                </el-card>
              </el-col>

              <el-col :span="16" :push="4">
                <el-card class="inner-card">
                  <div style="text-align: center" class="edit_dev">
                    <el-transfer
                      style="text-align: left; display: inline-block"
                      v-model="fileVal"
                      filterable
                      :left-default-checked="[]"
                      :right-default-checked="[]"
                      :titles="['仿真数据资源', '已规划想定文件']"
                      :button-texts="['撤回', '添加']"
                      :format="{
                        noChecked: '${total}',
                        hasChecked: '${checked}/${total}',
                      }"
                      @change="fileChange"
                      :data="fzFileData"
                    >
                    </el-transfer>
                  </div>
                </el-card>
              </el-col>

              <el-col :span="1" :push="4">
                <el-button type="primary" class="prev-page">
                  上一页
                  <i class="el-icon-arrow-left el-icon--left"> </i>
                </el-button>
              </el-col>

              <el-col :span="1" :push="4">
                <el-button type="primary" class="next-page">
                  下一页
                  <i class="el-icon-arrow-right el-icon--right"> </i>
                </el-button>
              </el-col>
            </el-row>
          </el-tab-pane>

          <el-tab-pane label="虚拟资源规划" name="2" class="left-tab">
            <el-row>
              <el-col :span="16" :push="4">
                <el-tabs
                  type="border-card"
                  tab-position="bottom"
                  class="virTabs"
                >
                  <el-tab-pane
                    v-for="item in fzPoints"
                    :key="item.name"
                    :label="item.text"
                    :name="item.name"
                  >
                    <el-form
                      label-width="120px"
                      :label-position="labelPosition"
                      inline
                    >
                      <el-row :gutter="8">
                        <el-col :span="10" :push="4">
                          <el-form-item label="CPU核心数(颗)">
                            <el-input-number
                              :value="cpuNum"
                              :step="1"
                            ></el-input-number>
                          </el-form-item>
                        </el-col>

                        <el-col :span="10" :push="4">
                          <el-form-item label="内存大小(MB)">
                            <el-input-number
                              :value="memNum"
                              :step="1024"
                            ></el-input-number>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row :gutter="4">
                        <el-col :span="10" :push="4">
                          <el-form-item label="根磁盘大小(GB)">
                            <el-input-number
                              :value="rootDisk"
                              :step="10"
                            ></el-input-number>
                          </el-form-item>
                        </el-col>

                        <el-col :span="10" :push="4">
                          <el-form-item label="挂载磁盘大小(GB)">
                            <el-input-number
                              :value="mountDisk"
                              :step="10"
                            ></el-input-number>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row :gutter="10">
                        <el-col :span="10" :push="4">
                          <el-form-item label="Region区域">
                            <el-select
                              placeholder="nova"
                              @change="selectChanged"
                            >
                              <el-option label="nova" value="nova"> </el-option>
                              <el-option
                                label="other"
                                value="other"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>

                        <el-col :span="10" :push="4">
                          <el-form-item label="安全组">
                            <el-select placeholder="basic">
                              <el-option
                                label="no-rule"
                                value="shanghai"
                              ></el-option>
                              <el-option
                                label="default"
                                value="beijing"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row :gutter="10">
                        <el-col :span="10" :push="4">
                          <el-form-item label="二层网络">
                            <el-select placeholder="outer">
                              <el-option
                                label="outer"
                                value="shanghai"
                              ></el-option>
                              <el-option
                                label="inter"
                                value="beijing"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>

                        <el-col :span="10" :push="4">
                          <el-form-item label="子网选择">
                            <el-select placeholder="sub-outer">
                              <el-option
                                label="sub-outer"
                                value="shanghai"
                              ></el-option>
                              <el-option
                                label="sub-inter"
                                value="beijing"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row :gutter="10">
                        <el-col :span="10" :push="4">
                          <el-form-item label="部署计算节点选择">
                            <el-radio-group @change="selectChanged">
                              <el-radio label="1" border>C1</el-radio>
                              <el-radio label="2" border>C2</el-radio>
                              <el-radio label="3" border>C3</el-radio>
                            </el-radio-group>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                  </el-tab-pane>
                </el-tabs>
              </el-col>

              <el-col :span="2" :push="4" class="taskCreateBtnCol">
                <el-button
                  type="primary"
                  class="taskCreateBtn"
                  @click="createEnv"
                >
                  构建
                </el-button>
              </el-col>
            </el-row>
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
      mirrorList: [],
      envName: [],
      envId: [],

      cpuNum: 2,
      memNum: 2048,
      rootDisk: 40,
      mountDisk: 40,

      text: "请输入仿真资源规划",

      labelPosition: "right",

      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },

      fzModelData: [],
      fzSoftData: [],
      fzFileData: [],
      value: [1, 4],
      simuVal: [],
      softVal: [],
      fileVal: [],
      simuSelect: [],
      softSelect: [],
      fileSelect: [],
      fzPoints: [],
      activeIndex: 0,

      //添加商品的表单数据对象
      addForm: {
        task_name: "请输入仿真实验名称",
        task_envNum: 1,
        task_desc: "请输入仿真实验记录",
      },
      addFormRules: {
        task_name: [
          {
            required: true,
            message: "请输入仿真实验名称",
            trigger: "blur",
          },
        ],
        task_desc: [
          {
            required: true,
            message: "请输入仿真实验记录",
            trigger: "blur",
          },
        ],
        task_envNum: [
          {
            required: true,
            message: "请设置仿真实验环境数量",
            trigger: "blur",
          },
        ],
      },
      //是否可以跳转tab
      changeTab: false,
    };
  },
  created() {
    this.getMirrorsList();
    this.getSimuList();
    this.getSoftList();
    this.getFileList();
  },
  async mounted() {},
  methods: {
    //获取多选框选中的值
    fzEnvChange(value) {
      console.log(value);
      this.envName = [];
      for (let i = 0; i < value.length; ++i) {
        this.mirrorList.find((item) => {
          if (item.index == value[i]) {
            console.log(item.envName);
            this.envName.push(item.envName);
          }
        });
      }
      console.log(this.envName);
    },

    getMirrorsList() {
      this.$http.get("/vueCon/fzEnvName").then((res) => {
        console.log(res);
        this.mirrorList = res.data.data;
        console.log(res.data.data.length);
        console.log(this.mirrorList);
      });
    },

    getSimuList() {
      this.$http.get("/vueCon/fzSimuName").then((res) => {
        res.data.data.forEach((item) => {
          this.fzModelData.push({
            label: item.chnName,
            key: item.index,
          });
        });
      });
    },

    getSoftList() {
      this.$http.get("/vueCon/fzSoftName").then((res) => {
        res.data.data.forEach((item) => {
          this.fzSoftData.push({
            label: item.chnName,
            key: item.index,
          });
        });
      });
    },

    getFileList() {
      this.$http.get("/vueCon/fzFileName").then((res) => {
        res.data.data.forEach((item) => {
          this.fzFileData.push({
            label: item.chnName,
            key: item.index,
          });
        });
      });
    },

    simuChange(value, direction, movedKeys) {
      console.log(value);
      this.simuSelect = [];
      for (let i = 0; i < value.length; ++i) {
        this.fzModelData.find((item) => {
          if (item.key == value[i]) {
            console.log(item.label);
            this.simuSelect.push({
              text: item.label,
              name: item.key,
            });
          }
        });
      }
      //每次更新都会刷新规划节点data
      this.fzPoints = [];
      // this.fzPoints.splice(index, 1);
      var fzPointSize = 0;

      this.simuSelect.forEach((item) => {
        fzPointSize = this.fzPoints.length;
        this.fzPoints.push({
          text: item.text,
          name: fzPointSize + 1,
        });
      });
      this.softSelect.forEach((item) => {
        fzPointSize = this.fzPoints.length;
        this.fzPoints.push({
          text: item.text,
          name: fzPointSize + 1,
        });
      });
      console.log(this.fzPoints);
    },

    softChange(value, direction, movedKeys) {
      // console.log(this.fzModelData);
      console.log(value);
      this.softSelect = [];
      for (let i = 0; i < value.length; ++i) {
        this.fzSoftData.find((item) => {
          if (item.key == value[i]) {
            console.log(item.label);
            this.softSelect.push({
              text: item.label,
              name: item.key,
            });
          }
        });
      }
      //每次更新都会刷新规划节点data
      this.fzPoints = [];
      // this.fzPoints.splice(index, 1);
      var fzPointSize = 0;
      this.simuSelect.forEach((item) => {
        fzPointSize = this.fzPoints.length;
        this.fzPoints.push({
          text: item.text,
          name: fzPointSize + 1,
        });
      });
      this.softSelect.forEach((item) => {
        fzPointSize = this.fzPoints.length;
        this.fzPoints.push({
          text: item.text,
          name: fzPointSize + 1,
        });
      });
      console.log(this.fzPoints);
    },

    //切换tab页面
    handleClick(tab, event) {
      console.log(tab, event);
    },

    createEnv() {
      this.$confirm("此操作将开始创建仿真实验环境, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.post("/vueCon/fzEnvCreate", this.envInfo).then((res) => {
            console.log(res);
            if (res.data.status == 200) {
              this.$message({
                type: "success",
                message: "请求创建成功!",
              });
            } else {
              this.$message({
                type: "error",
                message: "请求创建失败!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消创建",
          });
        });
    },

    // 改变的值
    selectChanged() {
      // 强制刷新
      this.$forceUpdate();
      // this.$nextTick(() => {
      //   this.$forceUpdate();
      // });
    },
    refreshData(val) {
      this.$$forceUpdate();
    },

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
.el-transfer-panel__list.is-filterable {
  width: 300px !important;
  height: 200px !important;
}

.el-transfer-panel {
  width: 300px !important;
  height: 300px !important;
}

.taskCreateBtnCol {
  float: right;
  position: absolute;
  width: 30px;
  height: 30px;
  left: 60px;
  top: 400px;
  right: 10px;
}

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

.virTabs {
  position: relative;
  top: 0px;
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

.outerCard {
  height: 1200px;
}
.inner-card {
  position: relative;
  height: 300px;
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
  right: 15px;
}
.inner-load {
  float: right;
  position: relative;
  top: 5px;
  right: 15px;
}
.inner-create {
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
  width: 100px;
  height: 200px;
}
</style>