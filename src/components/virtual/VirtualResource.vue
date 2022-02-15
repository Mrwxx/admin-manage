<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>虚拟资源管控</el-breadcrumb-item>
      <el-breadcrumb-item>虚拟资源分析</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-button type="info">虚拟资源池</el-button>

      <!-- 2.为Echarts准备一个具备大小的DOM -->
      <el-row>
        <el-col :span="6">
          <div id="cpu" style="width: 600px; height: 280px"></div>
          <span class="cpuText">虚拟CPU核心数/物理CPU核心数：2.0</span>
        </el-col>
        <el-col :span="6">
          <div id="mem" style="width: 600px; height: 280px"></div>
          <span class="memText">虚拟内存量/物理内存量：1.0</span>
        </el-col>
        <el-col :span="6">
          <div id="hard" style="width: 600px; height: 280px"></div>
        </el-col>
        <el-col :span="6">
          <div id="network" style="width: 600px; height: 280px"></div>
        </el-col>
      </el-row>
    </el-card>

    <el-card>
      <!-- 添加角色按钮区域 -->
      <el-row>
        <el-col>
          <!-- 可跳转到openstack的资源池中 -->
          <el-button type="info">OpenStack节点</el-button>
          <!-- <el-button type="primary" @click="goAddpage">添加商品</el-button> -->
        </el-col>
      </el-row>

      <!-- 角色列表区域 -->
      <el-table :data="pointList" border stripe>
        <!-- 展开列 -->

        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="节点名称" prop="pointName"></el-table-column>
        <el-table-column label="节点类型" prop="pointType"></el-table-column>
        <el-table-column label="CPU类型" prop="cpuType"></el-table-column>
        <el-table-column label="CPU核心数" prop="cpuCore"></el-table-column>
        <el-table-column label="内存大小" prop="memNum"></el-table-column>
        <el-table-column label="磁盘存储" prop="hardNum"></el-table-column>
        <el-table-column label="显卡类型" prop="mediaType"></el-table-column>
        <el-table-column label="显卡内存" prop="mediaNum"></el-table-column>
        <el-table-column label="节点位置" prop="pointAt"></el-table-column>
        <el-table-column label="节点状态" prop="pointStatus"></el-table-column>
        <!-- <el-table-column label="节点操作" prop="pointCommand"></el-table-column> -->

        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-upload2"
              >上线</el-button
            >
            <el-button size="mini" type="danger" icon="el-icon-download"
              >下线</el-button
            >
            <el-button size="mini" type="warning" icon="el-icon-edit"
              >配置</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
// 导入echarts
import * as echarts from "echarts";

export default {
  data() {
    return {
      //所有角色列表数据
      roleList: [],
      //所有openstack节点列表数据
      pointList: [
        {
          pointName: "ct",
          pointType: "控制节点",
          cpuType: "E5-2660 C2（双路）",
          cpuCore: "16核",
          memNum: "64G",
          hardNum: "2TB",
          mediaType: "GTX 1050ti",
          mediaNum: "4G",
          pointAt: "北京",
          pointStatus: "已激活",
        },
        {
          pointName: "c1",
          pointType: "计算节点/存储节点",
          cpuType: "E5-2660 C2（双路）",
          cpuCore: "16核",
          memNum: "64G",
          hardNum: "1TB",
          mediaType: "GTX 1050ti",
          mediaNum: "4G",
          pointAt: "北京",
          pointStatus: "已激活",
        },
        {
          pointName: "c2",
          pointType: "计算节点/存储节点",
          cpuType: "E5-2670 C2（单路）",
          cpuCore: "8核",
          memNum: "32G",
          hardNum: "2TB",
          mediaType: "GTX 1050ti",
          mediaNum: "4G",
          pointAt: "北京",
          pointStatus: "已激活",
        },
        {
          pointName: "c3",
          pointType: "计算节点/存储节点",
          cpuType: "E5-2670 C2（双路）",
          cpuCore: "16核",
          memNum: "64G",
          hardNum: "2TB",
          mediaType: "GTX 1060",
          mediaNum: "6G",
          pointAt: "北京",
          pointStatus: "已激活",
        },
      ],
    };
  },
  created() {
    this.getRoleList();
  },
  mounted() {
    this.getVirtualRes();
  },
  methods: {
    //获取所有角色的列表
    async getRoleList() {
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status != 200) {
        return this.$message.error("获取角色列表失败！");
      }

      this.roleList = res.data;
    },
    goAddpage() {
      this.$router.push("/goods/add");
    },
    //显示虚拟资源池
    getVirtualRes() {
      //3.基于准备好的DOM，初始化Echarts实例
      var cpuChart = echarts.init(document.getElementById("cpu"));
      var memChart = echarts.init(document.getElementById("mem"));
      var hardChart = echarts.init(document.getElementById("hard"));
      var networkChart = echarts.init(document.getElementById("network"));
      var cpuInfo = {
        // title: {
        //   text: "公里总里程",
        //   x: "center",
        //   textStyle: {
        //     color: "#FFFFFF",
        //     fontSize: 25,
        //   },
        // },
        title: {
          text: "CPU使用情况",
          //   subtext: "aaa",
          x: "center",
          y: "buttom",
        },
        series: [
          {
            type: "pie",
            data: [
              {
                value: 24,
                name: "CPU已使用核心数",
                itemStyle: {
                  normal: {
                    color: "#E0E0E0",
                  },
                },
              },
              {
                value: 32,
                name: "剩余CPU核心数",
                itemStyle: {
                  normal: {
                    // color: "#0080FF",
                  },
                },
              },
            ],
            //饼图的半径
            radius: "60%",
            //饼图的位置
            center: ["50%", "50%"],
            label: {
              normal: {
                show: true,
                formatter: "{b}:{c}",
                textStyle: {
                  fontWeight: 300,
                  fontSize: 16,
                },
              },
            },
          },
        ],
      };
      var memInfo = {
        title: {
          text: "内存使用情况",
          //   subtext: "aaa",
          x: "center",
          y: "buttom",
        },
        series: [
          {
            type: "pie",
            data: [
              {
                value: 24,
                name: "已使用内存量",
                itemStyle: {
                  normal: {
                    color: "#E0E0E0",
                  },
                },
              },
              {
                value: 232,
                name: "剩余内存总量",
              },
            ],
            //饼图的半径
            radius: "60%",
            //饼图的位置
            center: ["50%", "50%"],
            label: {
              normal: {
                show: true,
                formatter: "{b}:{c}G",
                textStyle: {
                  fontWeight: 300,
                  fontSize: 16,
                },
              },
            },
          },
        ],
      };
      var hardInfo = {
        title: {
          text: "磁盘使用情况",
          //   subtext: "aaa",
          x: "center",
          y: "buttom",
        },
        series: [
          {
            type: "pie",
            data: [
              {
                value: 660,
                name: "已使用磁盘存储",
                itemStyle: {
                  normal: {
                    color: "#E0E0E0",
                  },
                },
              },
              {
                value: 6508,
                name: "剩余磁盘存储",
              },
            ],
            //饼图的半径
            radius: "60%",
            //饼图的位置
            center: ["50%", "50%"],
            label: {
              normal: {
                show: true,
                formatter: "{b}:{c}G",
                textStyle: {
                  fontWeight: 300,
                  fontSize: 16,
                },
              },
            },
          },
        ],
      };
      var networkInfo = {
        title: {
          text: "网络使用情况",
          //   subtext: "aaa",
          x: "center",
          y: "buttom",
        },
        series: [
          {
            type: "pie",
            data: [
              {
                value: 1,
                name: "已使用二层网络",
                itemStyle: {
                  normal: {
                    color: "#E0E0E0",
                  },
                },
              },
              {
                value: 1,
                name: "剩余二层网络",
              },
            ],
            //饼图的半径
            radius: "60%",
            //饼图的位置
            center: ["50%", "50%"],
            label: {
              normal: {
                show: true,
                formatter: "{b}:{c}条",
                textStyle: {
                  fontWeight: 300,
                  fontSize: 16,
                },
              },
            },
          },
        ],
      };
      cpuChart.setOption(cpuInfo);
      memChart.setOption(memInfo);
      hardChart.setOption(hardInfo);
      networkChart.setOption(networkInfo);
    },
  },
};
</script>

<style lang="less" scoped>
el-col {
  left: 0;
  right: 0;
  top: 0%;
  bottom: 0%;
  margin-top: 0px;
}

el-button {
  position: relative;
  top: 10%;
}

.cpuText {
  position: relative;
  left: 28%;
  font-weight: 300;
  font-size: 16;
  font-color: "#E0E0E0";
}

.memText {
  position: relative;
  left: 34%;
  top: 25%;
  font-weight: 300;
  font-size: 16;
  font-color: "#E0E0E0";
}
</style>