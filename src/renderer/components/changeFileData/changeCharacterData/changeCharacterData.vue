<template>
  <div class="container">
    <div class="notice">{{ notice }}</div>
    <div class="box">
      <el-form
        size="mini"
        class="change-data-form"
        ref="form"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="灵石">
          <div class="label-value">{{ fileData.money }}</div>
          <el-input
            type="number"
            v-model="form.money"
            style="width: 80px"
          ></el-input>
        </el-form-item>
        <el-form-item label="寿元">
          <div class="label-value">{{ fileData.liveTime }}</div>
          <el-input
            type="number"
            v-model="form.liveTime"
            style="width: 80px"
          ></el-input>
        </el-form-item>
        <el-form-item label="生命上限">
          <div class="label-value">{{ fileData.HPMax }}</div>
          <el-input
            type="number"
            v-model="form.HPMax"
            style="width: 80px"
          ></el-input>
        </el-form-item>
        <el-form-item label="遁速">
          <div class="label-value">{{ fileData.dunSu }}</div>
          <el-input
            type="number"
            v-model="form.dunSu"
            style="width: 80px"
          ></el-input>
        </el-form-item>
        <el-form-item label="神识">
          <div class="label-value">{{ fileData.shenShi }}</div>
          <el-input
            type="number"
            v-model="form.shenShi"
            style="width: 80px"
          ></el-input>
        </el-form-item>
        <el-form-item label="悟性">
          <div class="label-value">{{ fileData.wuXing }}</div>
          <el-input
            type="number"
            v-model="form.wuXing"
            style="width: 80px"
          ></el-input>
        </el-form-item>
        <el-form-item label="悟道点">
          <div class="label-value">{{ fileData.wuDaoDian }}</div>
          <el-input
            type="number"
            v-model="form.wuDaoDian"
            style="width: 80px"
          ></el-input>
        </el-form-item>
        <el-form-item label="资质">
          <div class="label-value">{{ fileData.ziZhi }}</div>
          <el-input
            type="number"
            v-model="form.ziZhi"
            style="width: 80px"
          ></el-input>
        </el-form-item>
        <el-form-item label="丹毒">
          <div class="label-value">{{ fileData.danDu }}</div>
          <el-input
            type="number"
            v-model="form.danDu"
            style="width: 80px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div v-on:click="submit" class="text-button">保存修改</div>
      <div v-on:click="back" class="text-button">返回</div>
    </div>
  </div>
</template>

<script>
const fs = require('fs')
const { keyMap } = require('./const')
const { LevelMap, LevelProgressMap } = require('../const')
let userItem = {}

export default {
  name: 'changeCharacterData',
  created: function () {
    if (!this.$root.character.key) {
      this.$message.error('请先选择存档!!!')
      return
    }
    this.key = this.$root.character.key
    this.fileData = fetchFileData(this.key, this.$root.fileDir)
    this.notice = this.fileData.name
      ? `当前存档为${this.fileData.name} ${this.fileData.level} ${this.fileData.time}`
      : '请选择要修改的存档'
    this.form = { ...this.fileData }
  },
  data: function () {
    return {
      fileList: [],
      isTest: this.$root.isTest,
      fileData: {},
      key: '',
      notice: '',
      form: {}
    }
  },
  methods: {
    back: function () {
      this.$route.params.isTest = this.isTest
      this.$router.back()
    },
    chooseFile: function (e) {
      this.$route.params.character = e
      this.back()
    },
    submit: function () {
      const key = this.key.split('.')[0] // 存档key
      const fileKey = key.slice(6) // 存档index
      const filePath = `${this.$root.fileDir}/${key}.sav`
      const time = getTime()
      const spareDir = `${this.$root.fileDir}_spare`
      const sparePath = `${spareDir}/${fileKey}_${time}.sav`
      const keys = Object.keys(keyMap) // 存档Json文件key
      if (!fs.existsSync(spareDir)) {
        fs.mkdir(spareDir)
      }
      fs.writeFileSync(sparePath, JSON.stringify({ ...userItem }), {
        flag: 'wx+'
      }) // 创建一个备用文件，防止修改出现问题无法回滚
      keys.forEach((item) => {
        const userItemKey = `${key}.${keyMap[item]}`
        if (userItem[userItemKey]) {
          userItem[userItemKey] = Number(this.form[item])
        }
      }) // 把改动的数据写入存档对象内
      fs.writeFileSync(filePath, JSON.stringify(userItem), {
        flag: 'w+'
      }) // 修改存档数据
      this.fileData = fetchFileData(this.key, this.$root.fileDir)
      this.form = { ...this.fileData }
    }
  }
}

function fetchFileData(fileKey, dirPath) {
  const key = fileKey.split('.')[0] // 存档key
  const index = key.slice(6) // 获取存档编号
  const nameKey = `${key}.name` // 获取名称key
  const levelKey = `${key}.level` // 获取境界key
  const timeKey = `${key}.worldTimeMag.nowTime` // 获取时间key
  const filePath = `${dirPath}/${key}.sav`
  const userFile = fs.readFileSync(filePath, 'utf-8') // 读取文件数据
  userItem = JSON.parse(userFile)
  const time = userItem[timeKey].split(' ')[0].split('/') // 获取年月日信息
  const fileDataResult = {
    key: key,
    index: index,
    name: userItem[nameKey],
    level: getLevelStr(userItem[levelKey] - 1),
    time: `${Number(time[0])}年${time[1]}月${time[2]}日`
  }
  Object.keys(keyMap).forEach((item) => {
    const itemKey = `${key}.${keyMap[item]}`
    fileDataResult[item] = userItem[itemKey]
  })
  return fileDataResult
}
/**
 * 获取存档境界
 * @return 存档境界
 */
function getLevelStr(level) {
  return `${LevelMap[Math.floor(level / 3)]}${LevelProgressMap[level % 3]}`
}

function getTime() {
  const myDate = new Date()
  const myHour = myDate.getHours() // 获取当前小时数(0-23)
  const myMinute = myDate.getMinutes() // 获取当前分钟数(0-59)
  const mySecond = myDate.getSeconds() // 获取当前秒数(0-59)
  return `${myHour}h${myMinute}m${mySecond}s`
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
