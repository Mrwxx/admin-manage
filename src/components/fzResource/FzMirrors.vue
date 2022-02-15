<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>仿真资源管控</el-breadcrumb-item>
      <el-breadcrumb-item>仿真运行镜像资源</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <!-- 通过layout布局 -->
      <!-- 搜索域添加区域 -->
      <el-row :gutter="20">
        <!-- 每一列 -->
        <el-col :span="7">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >上传镜像</el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="mirrorList" border stripe>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="镜像名称" prop="mirrorName"></el-table-column>
        <el-table-column label="镜像系统" prop="mirrorSystem"></el-table-column>
        <el-table-column label="镜像大小" prop="mirrorSize"></el-table-column>
        <el-table-column label="镜像格式" prop="mirrorType"></el-table-column>
        <el-table-column
          label="镜像版本号"
          prop="mirrorVersion"
        ></el-table-column>
        <el-table-column label="镜像状态" prop="mirrorStatus"></el-table-column>
        <!-- <el-table-column label="仿真模型关联" prop="mirrorMapModel"></el-table-column> -->
        <!-- <el-table-column label="状态" prop="mg_state">
          作用域插槽
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column> -->
        <el-table-column label="镜像操作">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            >编辑</el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-edit"
              size="mini"
              @click="removeUserById(scope.row.id)"
            >删除</el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              enterable
            >
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
              >创建节点</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog
      title="上传镜像"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <!-- 添加用户的表单 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="镜像名称" prop="mirrorName">
          <el-input v-model="addForm.mirrorName"></el-input>
        </el-form-item>
        <el-form-item label="镜像系统" prop="mirrorSystem">
          <el-input v-model="addForm.mirrorSystem"></el-input>
        </el-form-item>
        <el-form-item label="镜像版本" prop="mirrorVersion">
          <el-input v-model="addForm.mirrorVersion"></el-input>
        </el-form-item>
        <el-form-item label="镜像文件" prop="mirrorFile">
          <el-input type="file" v-model="addForm.mirrorFile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addUser">确定</el-button>
      </span>
    </el-dialog>

    <!-- 修改镜像的对话框 -->
    <el-dialog
      title="修改镜像"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <!-- 内容主体区域 -->
      <!-- 添加用户的表单 -->
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editUserInfo">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      userList: [],
      mirrorList: [
        {
          mirrorName: "windows7-idds3.1-qt4.0",
          mirrorSystem: "windows7",
          mirrorSize: "40.00G",
          mirrorType: "RAW",
          mirrorVersion: "1.1",
          mirrorStatus: "正常使用",
        },
        {
          mirrorName: "windows7-idds3.1-qt4.0",
          mirrorSystem: "windows7",
          mirrorSize: "4.80G",
          mirrorType: "QCOW2",
          mirrorVersion: "1.1",
          mirrorStatus: "正常使用",
        },
        {
          mirrorName: "windows7-idds3.2-qt4.5",
          mirrorSystem: "windows7",
          mirrorSize: "35.00G",
          mirrorType: "RAW",
          mirrorVersion: "1.0",
          mirrorStatus: "正常使用",
        },
        {
          mirrorName: "windows7-idds3.2-qt5.5",
          mirrorSystem: "windows7",
          mirrorSize: "4.59G",
          mirrorType: "QCOW2",
          mirrorVersion: "1.1",
          mirrorStatus: "正常使用",
        },
        {
          mirrorName: "CentOS-OpenStack-Controller",
          mirrorSystem: "CentOS7.0",
          mirrorSize: "7.54G",
          mirrorType: "QCOW2",
          mirrorVersion: "1.2",
          mirrorStatus: "正常使用",
        },
        {
          mirrorName: "CentOS-OpenStack-C1",
          mirrorSystem: "CentOS7.0",
          mirrorSize: "6.10G",
          mirrorType: "QCOW2",
          mirrorVersion: "1.2",
          mirrorStatus: "正常使用",
        },
        {
          mirrorName: "CentOS-OpenStack-C2",
          mirrorSystem: "CentOS7.0",
          mirrorSize: "6.87G",
          mirrorType: "QCOW2",
          mirrorVersion: "1.2",
          mirrorStatus: "正常使用",
        },
        {
          mirrorName: "CentOS-OpenStack-C3",
          mirrorSystem: "CentOS7.0",
          mirrorSize: "6.92G",
          mirrorType: "QCOW2",
          mirrorVersion: "1.2",
          mirrorStatus: "正常使用",
        },
        {
          mirrorName: "Windows10-IDDS3.2-Qt4.5-Dev",
          mirrorSystem: "windows10",
          mirrorSize: "40.00G",
          mirrorType: "RAW",
          mirrorVersion: "1.0",
          mirrorStatus: "正常使用",
        },
        {
          mirrorName: "windows10-raw",
          mirrorSystem: "windows10",
          mirrorSize: "40.00G",
          mirrorType: "RAW",
          mirrorVersion: "1.0",
          mirrorStatus: "正常使用",
        },
      ],
      // mirrorSize: 0,
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      //   添加镜像的表单数据
      addForm: {
        mirrorName: "",
        mirrorSystem: "",
        mirrorVersion: "",
        mirrorFile: "",
      },
      //修改用户的表单数据
      editForm: {
        username: "",
        email: "",
        mobile: "",
      },
      //添加表单的验证规则对象
      addFormRules: {
        //username的验证规则
        username: [
          //必要的规则
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          //长度规则
          {
            min: 3,
            max: 10,
            message: "用户名的长度在3-10个字符",
            trigger: "blur",
          },
        ],
        //password的验证规则
        password: [
          //必要的规则
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          //长度规则
          {
            min: 6,
            max: 15,
            message: "用户名的长度在6-15个字符",
            trigger: "blur",
          },
        ],
        //email的验证规则
        email: [
          //必要的规则
          {
            required: true,
            message: "请输入邮箱地址",
            trigger: "blur",
          },
        ],
        //mobile的验证规则
        mobile: [
          //必要的规则
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
        ],
      },
      //修改表单的验证规则对象
      editFormRules: {
        //email的验证规则
        email: [
          //必要的规则
          {
            required: true,
            message: "请输入邮箱地址",
            trigger: "blur",
          },
        ],
        //mobile的验证规则
        mobile: [
          //必要的规则
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    // this.getUserList();
    this.getMirrorsList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo,
      });
      console.log(res);
      if (res.meta.status != 200) {
        return this.$message.error("获取用户列表信息失败！");
      }
      this.userList = res.data.users;
      this.total = res.data.total;
    },
    getMirrorsList() {
      this.total = this.mirrorList.length;
      console.log(this.total);
    },
    //监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getMirrorsList();
    },
    //监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getMirrorsList();
    },
    //监听switch开关状态的改变
    async userStateChanged(userinfo) {
      console.log(userinfo);
      //注意这里不应该是单引号，而是反引号，模板字符串
      const { data: res } = await this.$http.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      );
      if (res.meta.status != 200) {
        userinfo.mg_state = !userinfo.mg_state;
        return this.$message.error("更新用户状态信失败！");
      }
      this.$message.success("更新用户状态成功");
    },
    //监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    //点击按钮，添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        //验证成功，可以发起HTTP请求
        const { data: res } = await this.$http.post("users", this.addForm);
        console.log(res);
        if (res.meta.status != 201) {
          this.$message.error("添加用户失败！");
        }
        this.$message.success("添加用户成功！");
        //隐藏对话框
        this.addDialogVisible = false;
        //添加了新用户，需要重新获取用户列表数据
        this.getUserList();
      });
    },
    //展示编辑用户的对话框
    async showEditDialog(id) {
      console.log(id);
      // const { data: res } = await this.$http.get("users/" + id);
      // if (res.meta.status != 200) {
      //   return this.$message.error("查询用户信息失败");
      // }
      //用户信息
      // this.editForm = res.data;
      this.editDialogVisible = true;
    },
    //修改用户表单关闭重置验证
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    //修改用户信息提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
        //发起修改用户信息的请求
        const { data: res } = await this.$http.put(
          "users/" + this.editForm.id,
          {
            email: this.editForm.email,
            mobile: this.editForm.mobile,
          }
        );

        if (res.meta.status != 200) {
          return this.$message.error("更新用户信息失败！");
        }
        //关闭对话框
        this.editDialogVisible = false;
        //刷新数据列表
        this.getUserList();
        //提示修改成功
        this.$message.success("更新用户信息成功！");
      });
    },
    //根据Id删除对应的用户信息
    async removeUserById(id) {
      //弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户，是否继续？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      //如果用户确认删除，则返回值为confirm，否则为cancel
      if (confirmResult != "confirm") {
        return this.$message.info("已取消删除！");
      }
      const { data: res } = await this.$http.delete("users/" + id);
      if (res.meta.status != 200) {
        return this.$message.error("删除用户失败！");
      }
      this.$message.success("删除用户成功！");
      //刷新用户列表
      this.getUserList();
    },
  },
};
</script>

<style lang="less" scoped>
</style>