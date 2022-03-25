<template>
  <div class="app-container">
    <el-row>
      <el-col :span="22">
        <el-upload
          ref="upload"
          action
          :accept="acceptFileType"
          :limit="1"
          :on-exceed="handleExceed"
          :before-upload="beforeUpload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">选取YAML格式文件</el-button>
          <div slot="tip" class="el-upload_tip">只能选择.yml文件,且不超过2M</div>
        </el-upload>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="submitUpload" type="primary" size="mini">解析文件</el-button>
    </span>
 
    <div class="app-container">
      <el-button type="primary" @click="onClickDownDaily">yml导出</el-button>
    </div>
 
    <el-input
      type="textarea"
      :autosize="{ minRows: 20, maxRows: 35}"
      placeholder="请输入内容"
      v-model="textarea2"
    ></el-input>
  </div>
</template>
 
<script>
import jsyaml from 'js-yaml'
import json2yaml from 'json2yaml'
var YAML = require('js-yaml')
var Json2yaml = require('json2yaml')

export default {
  name: 'Dashboard',
  data() {
    return {
      data: {},
      fileList: [],
      textarea2: '',
      acceptFileType: '.yml',
      yamlStr: '',
      clusterObjCfg: {},
      clusterName: '',
      labelTemplate: ''
    }
  },
  created() {
    
  },
  methods: {
  
    /**
     * 选择文件
     */
    handleExceed(files, fileList) {
      this.$message.warning('只能选择1个文件!')
    },
    submitUpload() {
      var that = this
      setTimeout(function() {
        if (that.$refs.upload.$children[0].fileList.length == 1) {
          that.$refs.upload.submit()
        } else {
          that.$message({
            type: 'error',
            showClose: true,
            duration: 3000,
            message: '请选择文件!'
          })
        }
      }, 100)
    },
    handleRemove(file, fileList) {
      //console.log(file,fileList);
    },
    handlePreview(file) {
      //console.log(file);
    },
    beforeUpload(file) {
      var that = this
      //文件类型
      var fileName = file.name.substring(file.name.lastIndexOf('.') + 1)
      if (fileName != 'yml') {
        that.$message({
          type: 'error',
          showClose: true,
          duration: 3000,
          message: '文件类型不是.yml文件!'
        })
        return false
      }
      //读取文件大小
      var fileSize = file.size
      console.log(fileSize)
      if (fileSize > 2097152) {
        that.$message({
          type: 'error',
          showClose: true,
          duration: 3000,
          message: '文件大于2M!'
        })
        return false
      }
 
      let fd = new FormData()
      fd.append('file', file)
      fd.append('_t1', new Date())
 
      let reader = new FileReader()
      if (typeof FileReader === 'undefined') {
        alert('您的浏览器不支持FileReader接口')
      }
      reader.readAsText(file, 'utf-8') //注意读取中文的是用这个编码，是utf-8
 
      setTimeout(() => {
        console.log('reader.result:', reader.result)
        this.textarea2 = reader.result
        let a = YAML.load(this.textarea2)
        let bstr = json2yaml.stringify(a)
        this.yamlStr = bstr
      }, 1000)
 
      return false
    },
 
    /**
     * yml文件导出
     *
     */
    onClickDownDaily() {
      var allStr = this.yamlStr
      var export_blob = new Blob([allStr])
      var save_link = document.createElement('a')
      save_link.href = window.URL.createObjectURL(export_blob)
      save_link.download = new Date().getTime() + '.yml'
      this.fakeClick(save_link)
    },
    /**
     * 保存
     */
    fakeClick(obj) {
      var ev = document.createEvent('MouseEvents')
      ev.initMouseEvent(
        'click',
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      )
      obj.dispatchEvent(ev)
    }
  }
}
</script>
 
 
<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/common.scss';
</style>
 
 