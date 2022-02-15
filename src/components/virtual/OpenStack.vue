<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>虚拟资源管控</el-breadcrumb-item>
      <el-breadcrumb-item>OpenStack云管</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->

    <el-card class="openstackFrame">
      <div>
        <iframe
          id="iframeId"
          :src="url"
          frameborder="0"
          class="testFrame"
          scrolling="auto"
          
        >
        </iframe>
      </div>
    </el-card>
  </div>
</template>

<script>

// import  {bypass} from '../../x-frame-bypass'
// import {customs} from '../../custom-elements-builtin'

export default {
  data() {
    return {
      rightsList: [],
      // url: "https://music.163.com/",
      url: "http://127.0.0.1",
    };
  },
  created() {
    //获取所有的权限
    // this.getRightsList()
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

    check(url) {
      window.location.href = url;
    },
  },
};
</script>

<style lang="less" scoped>
.testFrame {
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 2600px;
  height: 1000px;
  background: #fff;
  overflow-y: hidden;
}

.el-card {
  position: relative;
  width: 2600px;
  height: 1100px;
}
</style>