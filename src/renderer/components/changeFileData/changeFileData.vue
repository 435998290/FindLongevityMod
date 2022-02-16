<template>
  <div class="container">
    <div class="notice">{{ notice }}</div>
    <div class="box">
      <div class="select-radio">
        正式版
        <el-switch
          v-model="isTest"
          @change="switchVersion"
          active-color="#303133"
          inactive-color="#303133"
        >
        </el-switch>
        测试版
      </div>
       <div v-on:click="searchData" class="text-button">选择存档</div>
       <div v-on:click="changeCharacter" class="text-button">修改人物属性</div>
        <div v-on:click="addMedicine" class="text-button">修改背包物品</div>
      <div v-on:click="back" class="text-button">返回</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'changeFileData',
  data: function () {
    return {
      notice: '',
      character: '',
      isTest: this.$root.isTest
    }
  },
  created: function () {
    this.character = this.$root.character
    this.notice = this.character
      ? `当前存档为${this.character.name} ${this.character.level} ${this.character.time}`
      : '请选择要修改的存档'
  },
  methods: {
    back: function () {
      this.$router.back()
    },
    searchData: function () {
      this.$router.push(`/selectFile`)
    },
    changeCharacter: function () {
      this.$router.push(`/changeCharacterData`)
    },
    addMedicine: function () {
      this.$router.push(`/addMedicine`)
    },
    switchVersion: function (e) {
      this.$root.isTest = e
      this.$root.fileDir = e ? `${this.$root.fileDir}test` : this.$root.fileDir.slice(0, -4)
      console.log(this.$root.fileDir)
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
</style>
