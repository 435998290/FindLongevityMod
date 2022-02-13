<template>
  <div class="container">
    <div class="notice-text">
        第一次尝试写游戏修改器，如果出现问题请多多包涵
        <br>本修改器不会进行任何收费，请大家放心使用
        <br>代码存在github里了，地址为：https://github.com/435998290/FindLongevityMod
        <br>任何建议，想法，问题反馈都可以加qq：435998290联系我
        <br>欢迎感兴趣的兄弟们提PR
    </div>
    <div v-on:click="back" class="text-button">返回</div>
  </div>
  
</template>

<script>
  export default {
    name: 'notice',
    methods: {
      back: function () {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
/* CSS */
/* CSS */

.header {
  margin-top: -50px;
  font-family: "dragon";
  font-size: 50px;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 800px;
  height: 394px;
  background:rgba(253, 252, 252, 0.5);
  border-radius: 5px;
}
.notice-text {
   font-family: "dragon"; 
   margin:30px;
   font-size: 18px;
   line-height: 24px;
}
body {
  margin: 0;
}
</style>
