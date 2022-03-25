<template>
  <el-container class="home-container">

    <!-- 头部区域 -->
    <el-header>

      <div>
        <img src="../img/尖刀对抗.jpeg" class="header-title-img">
        <span style="font-size:20px" class="header-title-text">对抗仿真试验云端管控</span>
      </div>
      <el-avatar :size="50" :src="circleUrl" class="header-user-img" icon="el-icon-user-solid"></el-avatar>
      <span class="header-user-text">FangSC</span>

      <el-button type="info" @click="logout" class="header-logout"> 退出 </el-button>
    </el-header>

    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width=" isCollapse ? '64px' :  '200px' ">
        <div class="toggle-button" @click="toggleCollapse">
          <br>
        </div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >

          <!-- 一级菜单：虚拟资源管控
          <el-submenu
            :index="'1'"
          >
            <!-- 一级菜单的模板区域 -->
            <!-- <template slot="title"> -->
              <!-- 图标 -->
              <!-- <i class="el-icon-cloudy"></i> -->
              <!-- 文本 -->
              <!-- <span>虚拟资源管控</span> -->
            <!-- </template> -->
            <!-- <el-menu-item -->
              <!-- :index="'/virtualResource'" -->
              <!-- @click="saveNavState('/virtualResource')" -->
            <!-- > -->
              <!-- 二级菜单：虚拟资源 -->
              <!-- <template slot="title"> -->
                <!-- 图标 -->
                <!-- <i class="el-icon-coin"></i> -->
                <!-- 文本 -->
                <!-- <span>虚拟资源分析</span> -->
              <!-- </template> -->
            <!-- </el-menu-item> -->
                        <!-- <el-menu-item -->
              <!-- :index="'/openStack'" -->
              <!-- @click="saveNavState('/openStack')" -->
            <!-- > -->
              <!-- 二级菜单：openstack -->
              <!-- <template slot="title"> -->
                <!-- 图标 -->
                <!-- <i class="el-icon-coin"></i> -->
                <!-- 文本 -->
                <!-- <span>openstack云管</span> -->
              <!-- </template> -->
            <!-- </el-menu-item> -->
          <!-- </el-submenu> --> -->

          <!-- 一级菜单 ：仿真资源管控-->
          <el-submenu
            :index="'1'"
          >
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-ship"></i>
              <!-- 文本 -->
              <span>仿真资源云端管理</span>
            </template>
                        <el-menu-item
              :index="'/fzVirtual'"
              @click="saveNavState('/fzVirtual')"
            >
              <!-- 二级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-coin"></i>
                <!-- 文本 -->
                <span>虚拟资源</span>
              </template>
            </el-menu-item>
            <el-menu-item
              :index="'/fzMirrors'"
              @click="saveNavState('/fzMirrors')"
            >
              <!-- 二级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-coin"></i>
                <!-- 文本 -->
                <span>仿真运行镜像资源</span>
              </template>
            </el-menu-item>
                        <el-menu-item
              :index="'/fzModels'"
              @click="saveNavState('/fzModels')"
            >
              <!-- 二级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-coin"></i>
                <!-- 文本 -->
                <span>仿真模型资源</span>
              </template>
            </el-menu-item>
                        <el-menu-item
              :index="'/fzSoft'"
              @click="saveNavState('/fzSoft')"
            >
              <!-- 二级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-coin"></i>
                <!-- 文本 -->
                <span>仿真支撑资源</span>
              </template>
            </el-menu-item>
                        </el-menu-item>
                        <el-menu-item
              :index="'/fzData'"
              @click="saveNavState('/fzData')"
            >
              <!-- 二级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-coin"></i>
                <!-- 文本 -->
                <span>仿真数据资源</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <!-- 一级菜单：仿真任务管控 -->
          <el-submenu
            :index="'2'"
          >
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-mobile-phone"></i>
              <!-- 文本 -->
              <span>仿真实验管控</span>
            </template>
            <el-menu-item
              :index="'fzTaskCreate'"
              @click="saveNavState('/fzTaskCreate')"
            >
              <!-- 二级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-plus"></i>
                <!-- 文本 -->
                <span>仿真实验环境构建</span>
              </template>
            </el-menu-item>

          </el-submenu>
          
          <!-- 一级菜单 ：微服务管控-->
          <el-submenu
            :index="'4'"
          >
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-location"></i>
              <!-- 文本 -->
              <span>仿真资源异常监控</span>
            </template>
                                    <el-menu-item
              :index="'/fzTaskMonitor'"
              @click="saveNavState('/fzTaskMonitor')"
            >
              <!-- 二级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-monitor"></i>
                <!-- 文本 -->
                <span>仿真实验环境监控</span>
              </template>
            </el-menu-item>
          
          </el-submenu>

                    <!-- 一级菜单：用户管理 -->
          <el-submenu
            :index="'0'"
          >
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-user"></i>
              <!-- 文本 -->
              <span>用户管理</span>
            </template>
            <el-menu-item
              :index="'/users'"
              @click="saveNavState('/users')"
            >
              <!-- 二级菜单：用户列表 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-user"></i>
                <!-- 文本 -->
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <!-- 一级菜单：仿真任务数据分析 -->

        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      //左侧菜单数据
      menulist: [],
      //是否折叠菜单
      isCollapse: false,
      //被激活的路由链接
      activePath: "",
      //头像url
      circleUrl: "../assets/logo.png",
    };
  },
  //   生命周期函数
  created() {
    //   获取菜单列表
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      //跳转
      this.$router.push("/login");
    },
    //获取所有的菜单
    async getMenuList() {
      //获取menus地址的数据
      const { data: res } = await this.$http.get("menus");
      console.log(res);
      if (res.meta.status != 200) return this.$message.error(res.meta.msg);
      this.menulist = res.data;
    },
    //点击按钮，切换菜单的展开与折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 保存路由链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 30px;
  div {
    display: flex;
    align-items: center;
    img {
      height: 40px;
      border-radius: 10px;
    }
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}
//侧边栏小图标
.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
}

.header-user-img {
  float: right;
  position: relative;
  left: 53%;
}

.header-user-text {
  font-size: 20px;
  float: right;
  position: relative;
  left: 26%;
}

.header-title-img {
  float: left;
  position: relative;
  left: 10%;
}

.header-title-text {
  float: left;
  position: relative;
  left: 11%;
}

.header-logout {
  float: right;
  position: relative;
  right: 1%;
}
</style>