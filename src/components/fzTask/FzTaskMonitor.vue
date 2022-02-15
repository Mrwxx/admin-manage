<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>仿真任务管控</el-breadcrumb-item>
      <el-breadcrumb-item>仿真任务监控</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="head-card">
      <el-row>
        <el-col :span="8">
          <div class="monitor-task-div">
              <i class="el-icon-mobile-phone"></i>
            仿真任务数
            <br />
            <span class="monitor-task-span">2</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="monitor-point-div">
              <i class="el-icon-monitor"></i>
            仿真节点数
            <br />
            <span class="monitor-point-span">6</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="monitor-data-div">
              <i class="el-icon-document"></i>
            仿真样本数
            <br />
            <span class="monitor-data-span">2</span>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="point-card">
      <el-row>
        <el-col :span="5">
          <el-button type="info" class="monitor-title-button">
            <div class="monitor-title-task">
              
              <span>仿真任务:BS-ENV1</span>
              &nbsp;
              <span>仿真样本:雷达探测想定测试1-2.xml</span>
            </div>
          </el-button>
        </el-col>

        <el-col :span="12">
          <div class="monitor-title-status">
            <span
              >仿真周期(S):
              <span class="monitor-larger">600</span>
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span
              >备份周期(S):
              <span class="monitor-larger">500</span>
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span
              >仿真模型运行状态:
              <span class="monitor-larger">正常</span>
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span
              >仿真节点运行状态:
              <span class="monitor-larger">正常</span>
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span
              >仿真任务网络状态:
              <span class="monitor-larger">正常</span>
            </span>
          </div>
        </el-col>

        <el-col :span="1" push="5">
          <el-button type="primary">回滚仿真</el-button>
        </el-col>
        <el-col :span="1" push="5">
          <el-button type="primary">终止仿真</el-button>
        </el-col>
      </el-row>

      <el-row :gutter="100">
        <el-col :span="6" >
          <el-card :body-style="{ padding: '0px' }">
            <el-row>
              <el-col :span="12">
                <span class="monitor-img">
                  <span> BS-MBMN-ENV1节点 </span>
                </span>
                <img src="../../img/单个目标模拟.png" class="image" />
                <div style="padding: 14px">
                  <div class="bottom clearfix"></div>
                </div>
              </el-col>

              <el-col :span="8" class="monitor-img-text">
                <div>
                  <span class="monitor-img-text">
                    部署计算节点:
                    <span class="monitor-large">C2</span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    CPU:
                    <span class="monitor-large"> 4核 </span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    内存:
                    <span class="monitor-large"> 4.00G </span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    根磁盘:
                    <span class="monitor-large"> 40.00G </span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    挂载磁盘:
                    <span class="monitor-large"> 100.00G </span>
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
                    42.77%
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-use monitor-img-use-arct">
                    44.60%
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-use monitor-img-use-arct">
                    58.22%
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-use monitor-img-use-arct">
                    16.02%
                  </span>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <el-row>
              <el-col :span="12">
                <span class="monitor-img">
                  <span> BS-CSJLD-ENV1节点 </span>
                </span>
                <img src="../../img/单个雷达模拟.png" class="image" />
                <div style="padding: 14px">
                  <div class="bottom clearfix"></div>
                </div>
              </el-col>

              <el-col :span="8" class="monitor-img-text">
                <div>
                  <span class="monitor-img-text">
                    部署计算节点:
                    <span class="monitor-large">C1</span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    CPU:
                    <span class="monitor-large"> 4核 </span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    内存:
                    <span class="monitor-large"> 4.00G </span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    根磁盘:
                    <span class="monitor-large"> 40.00G </span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    挂载磁盘:
                    <span class="monitor-large"> 50.00G </span>
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
                    33.78%
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-use monitor-img-use-arct">
                    55.28%
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-use monitor-img-use-arct">
                    43.76%
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-use monitor-img-use-arct">
                    28.29%
                  </span>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>

        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <el-row>
              <el-col :span="12">
                <span class="monitor-img">
                  <span> BS-LDXS-ENV1节点 </span>
                </span>
                <img src="../../img/单个雷达探测.png" class="image" />
                <div style="padding: 14px">
                  <div class="bottom clearfix"></div>
                </div>
              </el-col>

              <el-col :span="8" class="monitor-img-text">
                <div>
                  <span class="monitor-img-text">
                    部署计算节点:
                    <span class="monitor-large">C3</span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    CPU:
                    <span class="monitor-large"> 4核 </span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    内存:
                    <span class="monitor-large"> 4.00G </span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    根磁盘:
                    <span class="monitor-large"> 50.00G </span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    挂载磁盘:
                    <span class="monitor-large"> 50.00G </span>
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
                    67.15%
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-use monitor-img-use-arct">
                    77.00%
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-use monitor-img-use-arct">
                    33.15%
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-use monitor-img-use-arct">
                    31.90%
                  </span>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>

      </el-row>
    </el-card>

    <el-card class="point-card">
      <el-row>
        <el-col :span="5">
          <el-button type="info" class="monitor-title-button">
            <div class="monitor-title-task">
              <span>仿真任务:BS-ENV2</span>
              &nbsp;
              <span>仿真样本:雷达探测想定测试1-1.xml</span>
            </div>
          </el-button>
        </el-col>

        <el-col :span="12">
          <div class="monitor-title-status">
            <span
              >仿真周期(S):
              <span class="monitor-larger">1300</span>
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span
              >备份周期(S):
              <span class="monitor-larger">1000</span>
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span
              >仿真模型运行状态:
              <span class="monitor-larger">正常</span>
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span
              >仿真节点运行状态:
              <span class="monitor-larger">正常</span>
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span
              >仿真任务网络状态:
              <span class="monitor-larger">正常</span>
            </span>
          </div>
        </el-col>

        <el-col :span="1" push="5">
          <el-button type="primary">回滚仿真</el-button>
        </el-col>
        <el-col :span="1" push="5">
          <el-button type="primary">终止仿真</el-button>
        </el-col>
      </el-row>

      <el-row :gutter="100">
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <el-row>
              <el-col :span="12">
                <span class="monitor-img">
                  <span> BS-LDXS-ENV2节点 </span>
                </span>
                <img src="../../img/雷达探测-2.png" class="image" />
                <div style="padding: 14px">
                  <div class="bottom clearfix"></div>
                </div>
              </el-col>

              <el-col :span="8" class="monitor-img-text">
                <div>
                  <span class="monitor-img-text">
                    部署计算节点:
                    <span class="monitor-large">C3</span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    CPU:
                    <span class="monitor-large"> 4核 </span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    内存:
                    <span class="monitor-large"> 4.00G </span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    根磁盘:
                    <span class="monitor-large"> 50.00G </span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    挂载磁盘:
                    <span class="monitor-large"> 50.00G </span>
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
                    22.39%
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-use monitor-img-use-arct">
                    58.12%
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-use monitor-img-use-arct">
                    38.40%
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-use monitor-img-use-arct">
                    21.00%
                  </span>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <el-row>
              <el-col :span="12">
                <span class="monitor-img">
                  <span> BS-CSJLD-ENV2节点 </span>
                </span>
                <img src="../../img/雷达模拟-2.png" class="image" />
                <div style="padding: 14px">
                  <div class="bottom clearfix"></div>
                </div>
              </el-col>

              <el-col :span="8" class="monitor-img-text">
                <div>
                  <span class="monitor-img-text">
                    部署计算节点:
                    <span class="monitor-large">C2</span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    CPU:
                    <span class="monitor-large"> 4核 </span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    内存:
                    <span class="monitor-large"> 4.00G </span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    根磁盘:
                    <span class="monitor-large"> 30.00G </span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    挂载磁盘:
                    <span class="monitor-large"> 50.00G </span>
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
                    19.35%
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-use monitor-img-use-arct">
                    68.90%
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-use monitor-img-use-arct">
                    22.10%
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-use monitor-img-use-arct">
                    25.00%
                  </span>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>

        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <el-row>
              <el-col :span="12">
                <span class="monitor-img">
                  <span> BS-LDXS-ENV2节点 </span>
                </span>
                <img src="../../img/目标模拟-2.png" class="image" />
                <div style="padding: 14px">
                  <div class="bottom clearfix"></div>
                </div>
              </el-col>

              <el-col :span="8" class="monitor-img-text">
                <div>
                  <span class="monitor-img-text">
                    部署计算节点:
                    <span class="monitor-large">C3</span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    CPU:
                    <span class="monitor-large"> 4核 </span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    内存:
                    <span class="monitor-large"> 4.00G </span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    根磁盘:
                    <span class="monitor-large"> 40.00G </span>
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-text">
                    挂载磁盘:
                    <span class="monitor-large"> 100.00G </span>
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
                    51.12%
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-use monitor-img-use-arct">
                    66.90%
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-use monitor-img-use-arct">
                    55.00%
                  </span>
                </div>
                <br />
                <div>
                  <span class="monitor-img-use monitor-img-use-arct">
                    21.00%
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
      rightsList: [],
      pointList: [
        "BS-CSJLD-ENV1",
        "BS-LDTC-ENV1",
        "BS-CSJLD-ENV1",
        "BS-CSJLD-ENV1",
      ],
    };
  },
  created() {
    //获取所有的权限
    // this.getRightsList();
  },
  methods: {
    //获取权限列表
    async getRightsList() {
      const { data: res } = await this.$http.get("rights/list");
      if (res.meta.status != 200) {
        return this.$message.error("获取权限列表失败！");
      }
      this.rightsList = res.data;
      console.log(this.rightsList);
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
  left: 40px;
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
  width: 550px;
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
</style>