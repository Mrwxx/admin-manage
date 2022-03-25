<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>仿真资源异常监控</el-breadcrumb-item>
      <el-breadcrumb-item>仿真实验环境监控</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="head-card">
      <el-row>
        <el-col :span="8">
          <div class="monitor-task-div">
            <i class="el-icon-mobile-phone"></i>
            仿真实验数
            <br />
            <span class="monitor-task-span">{{ this.fzEnvNum }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="monitor-point-div">
            <i class="el-icon-monitor"></i>
            仿真节点数
            <br />
            <span class="monitor-point-span">{{ this.fzPointNum }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="monitor-data-div">
            <i class="el-icon-document"></i>
            仿真样本数
            <br />
            <span class="monitor-data-span">{{ this.fzFileNum }}</span>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="point-card" v-for="item in fzEnvBasic">
      <el-row>
        <el-col :span="6">
          <el-button type="info" class="monitor-title-button">
            <div class="monitor-title-task">
              <span>仿真环境:</span>
              <span>{{ item.fzEnvName }}</span>
              &nbsp;
              <span>{{ item.fzFileName }}</span>
            </div>
          </el-button>
        </el-col>

        <el-col :span="14">
          <div class="monitor-title-status">
            <span
              >仿真节点运行状态:
              <span class="monitor-larger">{{
                item.fzPointStatus == "running" ? "正常" : "异常"
              }}</span>
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span
              >仿真进程运行状态:
              <span class="monitor-larger">{{
                item.fzExeStatus == "running" ? "正常" : "异常"
              }}</span>
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span
              >仿真环境网络状态:
              <span class="monitor-larger">{{
                item.fzNetStatus == "running" ? "正常" : "异常"
              }}</span>
            </span>
          </div>
        </el-col>

        <el-col :span="1" :push="1">
          <el-button
            type="primary"
            class="copyBtn"
            @click="snapEnv(item.fzEnvName)"
            >快照</el-button
          >
        </el-col>
        <el-col :span="1" :push="1">
          <el-button
            type="primary"
            class="redoBtn"
            @click="resumeEnv(item.fzEnvName)"
            >恢复</el-button
          >
        </el-col>
        <el-col :span="1" :push="1">
          <el-button
            type="primary"
            class="stopBtn"
            @click="freeEnv(item.fzEnvName)"
            >终止</el-button
          >
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="6" v-for="fzPoint in item.fzPoints">
          <el-card :body-style="{ padding: '0px' }">
            <el-row>
              <el-col :span="12">
                <span class="monitor-img">
                  <span>{{ fzPoint.fzPointName }}</span>
                </span>
                <img :src="require('../../img/' + item.fzEnvName + '/' + fzPoint.fzPointName + '.png' )" class="image" />
                <div style="padding: 14px">
                  <div class="bottom clearfix"></div>
                </div>
              </el-col>

              <el-col :span="8" class="monitor-img-text">
                <div>
                  <span class="monitor-img-text">
                    部署计算节点:
                    <span class="monitor-large">{{ fzPoint.computeNode }}</span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    CPU:
                    <span class="monitor-large">
                      {{ fzPoint.cpuCores }}核
                    </span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    内存:
                    <span class="monitor-large">
                      {{ (fzPoint.memSize / 1024.0) | numFilter }}GB
                    </span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    根磁盘:
                    <span class="monitor-large">
                      {{ fzPoint.rootDisk | numFilter }}GB
                    </span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    挂载磁盘:
                    <span class="monitor-large">
                      {{ fzPoint.mountDisk | numFilter }}GB
                    </span>
                  </span>
                </div>
              </el-col>

              <el-col :span="4" class="monitor-img-use">
                <div>
                  <div class="monitor-img-light"></div>
                </div>
                <br />
                <div>
                  <span class="monitor-img-use monitor-img-use-arct">
                    {{ fzPoint.cpuPer | numFilter }}%
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-use monitor-img-use-arct">
                    {{ fzPoint.memPer | numFilter }}%
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-use monitor-img-use-arct">
                    {{ fzPoint.rootDiskPer | numFilter }}%
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-use monitor-img-use-arct">
                    {{ fzPoint.mountDiskPer | numFilter }}%
                  </span>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
// 导入echarts
import * as echarts from "echarts";

export default {
  data() {
    return {
      //实验总体信息
      fzEnvNum: 0,
      fzPointNum: 0,
      fzFileNum: 0,

      //实验基本信息
      fzEnvBasic: [],
    };
  },
  created() {
    this.getEnvTotal();
    this.getEnvBasic();
  },
  methods: {
    getEnvTotal() {
      let self = this;
      this.$http.get("/vueCon/fzEnvTotal").then((res) => {
        console.log(res);
        self.fzEnvNum = res.data.data.fzEnvNum;
        self.fzPointNum = res.data.data.fzPointNum;
        self.fzFileNum = res.data.data.fzFileNum;
      });
    },

    getEnvBasic() {
      let self = this;
      this.$http.get("/vueCon/fzEnvBasic").then((res) => {
        console.log(res);
        self.fzEnvBasic = res.data.data;
      });
    },

    snapEnv(val) {
      console.log(val);
      this.$confirm("即将对仿真实验环境执行快照,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.get("/vueCon/fzEnvSnap", val).then((res) => {
            console.log(res);
            if (res.data.status == 200) {
              this.$message({
                type: "success",
                message: "请求快照成功!请等待快照结果...",
              });
            } else {
              this.$message({
                type: "error",
                message: "请求快照失败!请重试...",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消快照！",
          });
        });
    },

    resumeEnv(val) {
      console.log(val);
      this.$confirm("即将对仿真实验环境执行恢复,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.get("/vueCon/fzEnvResume", val).then((res) => {
            console.log(res);
            if (res.data.status == 200) {
              this.$message({
                type: "success",
                message: "请求恢复成功!请等待恢复结果...",
              });
            } else {
              this.$message({
                type: "error",
                message: "请求恢复失败!请重试...",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消恢复！",
          });
        });
    },

    freeEnv(val) {
      console.log(val);
      this.$confirm("即将对仿真实验环境执行释放,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.get("/vueCon/fzEnvFree", val).then((res) => {
            console.log(res);
            if (res.data.status == 200) {
              this.$message({
                type: "success",
                message: "请求释放成功!请等待释放结果...",
              });
            } else {
              this.$message({
                type: "error",
                message: "请求释放失败!请重试...",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消释放！",
          });
        });
    },
  },
  filters: {
    numFilter(value) {
      let realVal = parseFloat(value).toFixed(2);
      return realVal;
    },
  },
};
</script>

<style lang="less" scoped>
.monitor-task-div {
  position: relative;
  font-size: 20px;
  cursor: pointer;
  padding: 8px 12px;
  left: 300px;
  top: 34px;
}

.monitor-task-span {
  position: relative;
  font-size: 36px;
  cursor: pointer;
  padding: 8px 12px;
  left: 25px;
  top: 3px;
}

.monitor-point-div {
  position: relative;
  font-size: 20px;
  cursor: pointer;
  padding: 8px 12px;
  left: 300px;
  top: 34px;
}

.monitor-point-span {
  position: relative;
  font-size: 36px;
  cursor: pointer;
  padding: 8px 12px;
  left: 25px;
  top: 3px;
}

.monitor-data-div {
  position: relative;
  font-size: 20px;
  cursor: pointer;
  padding: 8px 12px;
  left: 300px;
  top: 34px;
}

.monitor-data-span {
  position: relative;
  font-size: 36px;
  cursor: pointer;
  padding: 8px 12px;
  left: 25px;
  top: 3px;
}

.head-card {
  height: 200px;
  position: relative;
  left: 2%;
  top: 10px;
  width: 96%;
}

.point-card {
  position: relative;
  left: 2%;
  width: 96%;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 250px;
  height: 150px;
  display: block;
  position: relative;
  left: 20px;
  top: 20px;
  border-radius: 20px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.monitor-img {
  position: relative;
  font-size: 20px;
  cursor: pointer;
  padding: 8px 12px;
  left: 20px;
  top: 10px;
}

.monitor-img-text {
  position: relative;
  font-size: 15px;
  cursor: pointer;
  padding: 2px 2px;
  left: 5px;
  top: 5px;
  margin-bottom: 10px;
  margin-top: 0px;
}

.monitor-img-use {
  position: relative;
  font-size: 15px;
  cursor: pointer;
  padding: 2px 2px;
  left: 5px;
  top: 5px;
  margin-bottom: 10px;
  margin-top: 0px;
  text-shadow: 0 0 1px #000;
}

.monitor-title-status {
  position: relative;
  font-size: 20px;
  cursor: pointer;
  padding: 2px 2px;
  left: 50px;
  top: 5px;
  margin-bottom: 10px;
  margin-top: 5px;
}

.monitor-title-button {
  height: 40px;
  width: 500px;
  position: relative;
  font-size: 20px;
  cursor: pointer;
  padding: 2px 2px;
  left: 0px;
  top: 5px;
  margin-bottom: 20px;
  margin-top: 0px;
}

.monitor-img-light {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  border: 3px solid black;
  background-color: green;
  position: relative;
  left: 25px;
}

.monitor-img-use-arct {
  height: 10px;
  width: 20px;
  border: 3px solid rgb(20, 19, 19);
  border-radius: 10px;
}

.monitor-large {
  position: relative;
  font-size: 16px;
  cursor: pointer;
  text-shadow: 0 0 1px #000;
  padding: 2px 2px;
  left: 10px;
  top: 0px;
}

.monitor-larger {
  position: relative;
  font-size: 22px;
  cursor: pointer;
  text-shadow: 0 0 1px #000;
}

.el-row {
  margin-top: 20px;
  margin-bottom: 10px;
}
.redoBtn {
  float: right;
  position: inherit;
  right: 15px;
}

.stopBtn {
  float: right;
  position: inherit;
  right: 0px;
}

.copyBtn {
  float: right;
  position: inherit;
  right: 30px;
}
</style>