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
          <div class="label-value">{{ fileData.wuXin }}</div>
          <el-input
            type="number"
            v-model="form.wuXin"
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
      </el-form>
      <div v-on:click="submit" class="text-button">保存修改</div>
      <div v-on:click="back" class="text-button">返回</div>
    </div>
  </div>
</template>

<script>
const fs = require('fs')
const os = require('os')
const path = require('path')
const { keyMap } = require('./const')
const home = os.homedir()
const { LevelMap, LevelProgressMap } = require('../const')
let dirPath = '/AppData/LocalLow/yusuiInc/觅长生'
let spareDir = '/AppData/LocalLow/yusuiInc/觅长生Spare'
let userItem = {}

export default {
  name: 'changeCharacterData',
  created: function () {
    this.isTest = this.$route.query.isTest
    this.key = this.$route.query.key
    dirPath = `/AppData/LocalLow/yusuiInc/觅长生${
      this.isTest === 'true' ? 'test' : ''
    }`
    this.fileData = fetchFileData(this.key)
    this.notice = this.fileData.name
      ? `当前存档为${this.fileData.name} ${this.fileData.level} ${this.fileData.time}`
      : '请选择要修改的存档'
    this.form = { ...this.fileData }
  },
  data: function () {
    return {
      fileList: [],
      isTest: false,
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
      const filePath = `${dirPath}/${key}.sav`
      const time = getTime()
      const sparePath = `${spareDir}/${key}_${time}.sav`
      const keys = Object.keys(keyMap) // 存档Json文件key
      if (!fs.existsSync(path.join(home, spareDir))) {
        fs.mkdir(path.join(home, spareDir))
      }
      fs.writeFileSync(
        path.join(home, sparePath),
        JSON.stringify({ ...userItem }),
        {
          flag: 'wx+'
        }
      )
      keys.forEach((item) => {
        const userItemKey = `${key}.${keyMap[item]}`
        if (userItem[userItemKey]) {
          console.log(userItemKey)
          userItem[userItemKey] = this.form[item]
        }
      })
      fs.writeFileSync(path.join(home, filePath), JSON.stringify(userItem), {
        flag: 'w+'
      })
    }
  }
}

function fetchFileData(fileKey) {
  const key = fileKey.split('.')[0] // 存档key
  const index = fileKey.split('_')[0].slice(6) // 获取存档编号
  const nameKey = `${key}.name` // 获取名称key
  const levelKey = `${key}.level` // 获取境界key
  const timeKey = `${key}.worldTimeMag.nowTime` // 获取时间key
  const money = `${key}.money` // 获取金钱key
  const liveTime = `${key}.shouYuan` // 获取寿元key
  const HPMax = `${key}._HP_Max` // 获取血量上限key
  const dunSu = `${key}._dunSu` // 获取遁速key
  const ziZhi = `${key}.ZiZhi` // 获取资质key
  const wuXin = `${key}.wuXin` // 获取悟性key
  const shenShi = `${key}._shengShi` // 获取神识key
  const filePath = `${dirPath}/${key}.sav`
  const userFile = fs.readFileSync(path.join(home, filePath), 'utf-8') // 读取文件数据
  userItem = JSON.parse(userFile)
  const time = userItem[timeKey].split(' ')[0].split('/') // 获取年月日信息
  return {
    key: key,
    index: index,
    name: userItem[nameKey],
    level: getLevelStr(userItem[levelKey] - 1),
    time: `${Number(time[0])}年${time[1]}月${time[2]}日`,
    money: userItem[money],
    liveTime: userItem[liveTime],
    HPMax: userItem[HPMax],
    dunSu: userItem[dunSu],
    ziZhi: userItem[ziZhi],
    wuXin: userItem[wuXin],
    shenShi: userItem[shenShi]
  }
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
  return `${myHour}${myMinute}${mySecond}`
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
