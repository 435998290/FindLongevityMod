<template>
  <div class="container">
    <ul class="file-list" style="overflow: auto">
      <ul
        v-for="(file, index) in fileList"
        :key="file.index"
        class="list-block"
      >
        <div class="file-title">存档{{ index + 1 }}</div>
        <li
          v-for="item in file"
          :key="item.index"
          class="infinite-list-item list-item"
          @click="chooseFile(item)"
        >
          {{ item.name }}&nbsp;&nbsp;&nbsp; {{ item.level }}&nbsp;&nbsp;&nbsp;
          {{ item.time }}
        </li>
      </ul>
    </ul>
    <div v-on:click="back" class="text-button">返回</div>
  </div>
</template>

<script>
const fs = require('fs')
const { LevelMap, LevelProgressMap } = require('../const')
export default {
  name: 'selectFile',
  created: function () {
    this.fileList = processUserFile(getUserFile(this.$root.fileDir), this.$root.fileDir)
  },
  data: function () {
    return {
      fileList: []
    }
  },
  methods: {
    back: function () {
      this.$router.back()
    },
    chooseFile: function (e) {
      this.$root.character = e
      this.back()
    }
  }
}
/**
 * 获取用户存档
 * @return 用户存档列表
 */
function getUserFile(fileDir) {
  return fs.readdirSync(fileDir, 'utf-8').filter((item) => {
    const rule = /^Avatar[0-9]*_[0-9]*.sav/
    return rule.test(item)
  })
}
/**
 * 处理存档信息，返回存档数据列表
 * @return {name, level}
 */
function processUserFile(userFileList, fileDir) {
  const userList = userFileList.map((item) => {
    const key = item.split('.')[0] // 存档key
    const index = item.split('_')[0].slice(6) // 获取存档编号
    const nameKey = `${key}.name` // 获取名称key
    const levelKey = `${key}.level` // 获取境界key
    const timeKey = `${key}.worldTimeMag.nowTime` // 获取时间key
    const filePath = `${fileDir}/${item}`
    const userFile = fs.readFileSync(filePath, 'utf-8') // 读取文件数据
    const userItem = JSON.parse(userFile)
    const time = userItem[timeKey].split(' ')[0].split('/') // 获取年月日信息

    return {
      key: key,
      index: index,
      name: userItem[nameKey],
      level: getLevelStr(userItem[levelKey] - 1),
      time: `${Number(time[0])}年${time[1]}月${time[2]}日`
    }
  })
  let result = [[]]
  userList.forEach((item) => {
    const { index, name, level, time, key } = item
    if (result[index]) {
      result[index].push({ key: key, name: name, level: level, time: time })
    } else {
      result[index] = [{ key: key, name: name, level: level, time: time }]
    }
  }) // 把同一人物的存档放到一个数组里
  return result
}
/**
 * 获取存档境界
 * @return 存档境界
 */
function getLevelStr(level) {
  return `${LevelMap[Math.floor(level / 3)]}${LevelProgressMap[level % 3]}`
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 800px;
  height: 394px;
  background: rgba(253, 252, 252, 0.5);
  border-radius: 5px;
}
.file-list {
  margin-bottom: 30px;
  overflow: auto;
  list-style: none;
}
.list-block {
  margin-bottom: 30px;
  list-style: none;
}
.list-item {
  font-family: sword;
  font-size: 24px;
  cursor: pointer;
}
.file-title {
  font-family: sword;
  font-size: 24px;
}
ul::-webkit-scrollbar {
  display: none;
}
</style>
