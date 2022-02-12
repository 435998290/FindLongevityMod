<template>
  <div class="container">
    <div class="notice">{{ notice }}</div>
    <div class="box">
      <div class="select-radio">
        正式版
        <el-switch
          v-model="isTest"
          active-color="#303133"
          inactive-color="#303133"
        >
        </el-switch>
        测试版
      </div>
       <div v-on:click="searchData" class="text-button">选择存档</div>
       <div v-on:click="changeCharacter" class="text-button">修改人物属性</div>
      <div v-on:click="back" class="text-button">返回</div>
    </div>
  </div>
</template>

<script>
let character
let isTest
export default {
  name: 'changeFileData',
  beforeRouteEnter(to, from, next) {
    isTest = from.params.isTest
    if (from.path === '/selectFile') {
      character = from.params.character
    }
    next()
  },
  data: function () {
    return {
      notice: '',
      character: '',
      isTest: false
    }
  },
  created: function () {
    this.character = character
    this.isTest = isTest === 'true'
    this.notice = this.character
      ? `当前存档为${character.name} ${this.character.level} ${this.character.time}`
      : '请选择要修改的存档'
  },
  methods: {
    back: function () {
      this.$router.back()
    },
    searchData: function () {
      this.$router.push(`/selectFile?isTest=${this.isTest}`)
    },
    changeCharacter: function () {
      this.$router.push(`/changeCharacterData?isTest=${this.isTest}&key=${this.character.key}`)
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
