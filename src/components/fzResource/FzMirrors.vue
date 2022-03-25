<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>仿真资源云端管理</el-breadcrumb-item>
      <el-breadcrumb-item>仿真运行镜像资源</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <!-- 通过layout布局 -->
      <!-- 搜索域添加区域 -->

      <!-- 用户列表区域 -->
      <el-table :data="mirrorList" border stripe>
        <el-table-column label="序号" type="index">

        </el-table-column>
        <el-table-column label="镜像名称" prop="envName" width="300">

        </el-table-column>
        <el-table-column label="镜像系统" prop="envSystem" width="200">

        </el-table-column>
        <el-table-column 
          label="大小(GB)" 
          prop="envSize"
          :formatter="fixTwo"
          width="200">
        </el-table-column>
        <el-table-column label="存储格式" prop="storageFormat" width="200">

        </el-table-column>
        <el-table-column label="存储方式" prop="storageMode" width="200">

        </el-table-column>
        <el-table-column 
          label="仿真系统" 
          prop="simulationSystem"
          :formatter="simuSysType" width="200">
          
        </el-table-column>
        <el-table-column 
          label="版本号" 
          prop="version"
          :formatter="simuSysVersion"
          width="200">

        </el-table-column>
        <el-table-column 
          label="通信域" 
          prop="region"
          :formatter="regionType"
          width="200">

        </el-table-column>
        <el-table-column label="状态" prop="status" width="200">

        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            >修改</el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-edit"
              size="mini"
              @click="removeEnvById(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>

    </el-card>

        <!-- 修改仿真运行镜像的对话框 -->
    <el-dialog title="修改仿真运行镜像" :visible.sync="editDialogVisible" 
    width="50%" @close="editDialogClosed">
      <!-- 内容主体区域 -->
      <el-form
        :model="editForm"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="镜像名称" prop="fzEnvName">
          <el-input v-model="editForm.fzEnvName"></el-input>
        </el-form-item> -->
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
      mirrorList:[
      ],
      //   添加镜像的表单数据
      addForm: {
        mirrorName: "",
        mirrorSystem: "",
        mirrorVersion: "",
        mirrorFile: "",
      },
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      total: 9,
      //修改镜像的表单数据
      editForm: {
          fzEnvName: "",
      },
      editDialogVisible: false,
    };
  },
  created() {
    this.getMirrorsList();
  },
  methods: {
    //展示编辑镜像资源的对话框
    async showEditDialog(id) {
        console.log(id);
        const {data: res} = await this.$http.get('/fzEnvInfo/' + id)
        if(res.meta.status != 200){
            return this.$message.error('查询仿真运行镜像信息失败')
        }
        this.editForm = res.data
        this.editDialogVisible = true
    },

    //根据Id删除对应的运行镜像信息
    async removeEnvById(id) {
        //弹框询问运行镜像信息是否删除
        const confirmResult = await this.$confirm('此操作将永久删除该仿真运行镜像，是否继续？',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).catch(err => err)

        //如果确认删除，则返回值为confirm，否则为cancel
        if(confirmResult != 'confirm'){
            return this.$message.info('已取消删除！')
        }
        const {data: res} = await this.$http.delete('fzEnvInfo/' + id)
        if(res.meta.status != 200){
            return this.$message.error('删除仿真运行镜像失败！')
        }
        this.$message.success('删除仿真运行镜像成功！')
        this.getMirrorsList()
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
    fixTwo(row, column){
      return parseFloat(row[column.property]).toFixed(2);
    },
    simuSysType(row, column, cellValue){
      if(cellValue == null){
        return "——"
      }else{
        return cellValue
      }
    },
    simuSysVersion(row, column, cellValue){
      if(cellValue == 0){
        return "——"
      }else{
        return cellValue
      }
    },
    regionType(row, column, cellValue){
      if(cellValue == 0){
        return "——"
      }else{
        return cellValue
      }
    },

    getMirrorsList() {
      this.$http.get('/vueCon/fzEnvInfo')
      .then((res) =>
      {
        console.log(res);
        this.mirrorList = res.data.data;
        console.log(this.mirrorList);
      });
      this.total = res.data.data.length;
      console.log(this.total);
    },
    
  },
};
</script>

<style lang="less" scoped>
</style>