<template>
  <div class="container">
    <div class="notice">{{ notice }}</div>
    <a class="a-upload">
      <input
        ref="filElem"
        type="file"
        style="display: none"
        @change="getFile"
        webkitdirectory
      />
    </a>
    <div class="box">
      <div @click="selectSteamFile" class="text-button">
        更新获取游戏物品信息(请选择觅长生游戏目录)
      </div>
      <div @click="back" class="text-button">返回</div>
    </div>
  </div>
</template>

<script>
// const fs = require('fs')
// const os = require('os')
// const path = require('path')
// const { LevelMap, LevelProgressMap } = require('../../const')
// const home = os.homedir()
// let dirPath = '/AppData/LocalLow/yusuiInc/觅长生'
// let spareDir = '/AppData/LocalLow/yusuiInc/觅长生Spare'
// let userItem = {}

export default {
  name: 'addMedicine',
  created: function () {
  },
  data: function () {
    return {
      fileList: [],
      isTest: false,
      fileData: {},
      gamePath: '',
      notice: '',
      form: {}
    }
  },
  methods: {
    back: function () {
      this.$route.params.isTest = this.isTest
      this.$router.back()
    },
    selectSteamFile: function () {
      this.$alert(
        '该操作将读取游戏目录内文件来更新最新的物品数据，请选择觅长生游戏文件夹，若游戏平台为Steam，则路径为steam/steamapps/common/觅长生',
        '请选择觅长生游戏目录',
        {
          confirmButtonText: '确定',
          callback: (action) => {
            if (action === 'confirm') {
              console.log(this.$root.home)
              this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
            }
          }
        }
      )
    },
    getFile: function (e) {
      const path = e.path[0].files[0].path
      const name = e.path[0].files[0].name
      if (name !== '觅长生') {
        this.$message.error('请选择觅长生游戏文件夹!')
        return
      }
      console.log(path, name)
    }
  }
}
</script>

<style scoped>
/* CSS */
/* CSS */
.header {
  margin-top: -50px;
  font-family: 'dragon';
  font-size: 50px;
}
.container {
  width: 800px;
  height: 394px;
  background: rgba(253, 252, 252, 0.5);
  border-radius: 5px;
}
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
}
.notice {
  position: fixed;
  font-size: 18px;
  font-family: sword;
  margin: 30px;
}
.change-data-form {
  font-family: sword;
  height: 200px;
  overflow-y: scroll;
}
.change-data-form::-webkit-scrollbar {
  display: none;
}
.label-value {
  display: inline-block;
  width: 80px;
}
</style>
