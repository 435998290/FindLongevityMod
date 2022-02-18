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
      <div @click="selectSteamFile" class="text-button">获得物品数据</div>
      <div @click="back" class="text-button">返回</div>
    </div>
  </div>
</template>

<script>
const fs = require('fs')
const path = require('path')
const { ItemFlag, FlagName } = require('../const')
const { DataObjGenerator } = require('./util')
// let userItem = {}

export default {
  name: 'addMedicine',
  created: function () {},
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
        '该操作将读取游戏目录内文件来更新最新的物品数据，请选择觅长生游戏文件夹，若游戏平台为Steam，则路径为/steam/steamapps/common/觅长生。第一次使用本修改器时本操作为必选项，后续可以跳过本操作。',
        '请选择觅长生游戏目录',
        {
          confirmButtonText: '确定',
          callback: (action) => {
            if (action === 'confirm') {
              this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
            }
          }
        }
      )
    },
    getFile: function (e) {
      const gameDir = e.path[0].files[0].path
      const name = e.path[0].files[0].name
      if (name !== '觅长生') {
        this.$message.error('请选择觅长生游戏文件夹!')
        return
      }
      this.$root.gameRoot = path.join(gameDir, '/觅长生_Data/Res/Effect/json')
      const itemPath = path.join(this.$root.gameRoot, '/d_items.py.datas.json')
      const itemJson = fs.readFileSync(itemPath, 'utf-8') // 读取文件数据
      const itemData = JSON.parse(itemJson)
      const dataObj = {}
      for (const [key, value] of Object.entries(ItemFlag)) {
        dataObj[key] = DataObjGenerator(value)
      }
      console.log(itemData)
      dataObj.else = DataObjGenerator(0)
      /** 将不同品类物品分类后放在对应OBJ内 */
      for (const item of Object.values(itemData)) {
        const { ItemFlag: itemFlag, name, quality, typePinJie, id } = item
        const flagName = FlagName[itemFlag[0]]
        console.log()
        if (dataObj[flagName]) {
          switch (itemFlag[0]) {
            case ItemFlag.arms:
            case ItemFlag.armor:
            case ItemFlag.decorations:
            case ItemFlag.shentong:
            case ItemFlag.gongfa:
              const levelKey = `${quality}${typePinJie}`
              if (!dataObj[flagName][levelKey]) {
                break
              }
              dataObj[flagName][levelKey][name] = id
              break
            case ItemFlag.medicine:
            case ItemFlag.medicineMaterial:
            case ItemFlag.material:
            case ItemFlag.medicinePrescription:
            case ItemFlag.stove:
            case ItemFlag.ship:
              if (!dataObj[flagName][quality]) {
                break
              }
              dataObj[flagName][quality][name] = id
              break
            default:
              if (!dataObj[flagName][quality]) {
                break
              }
              dataObj[flagName][quality][name] = id
              break
          }
        } else {
          if (!dataObj.else[quality]) {
            break
          }
          dataObj.else[quality][name] = id
        }
      }
      console.log(dataObj)
      if (!fs.existsSync(this.$root.jsonDataDir)) {
        fs.mkdirSync(this.$root.jsonDataDir)
      }
      // const medicineJson = JSON.stringify(medicineData)
      // fs.writeFileSync(filePath, JSON.stringify(medicineJson), {
      //   flag: 'w+'
      // }) // 修改存档数据
    },
    processItemData: function (itemData) {}
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
