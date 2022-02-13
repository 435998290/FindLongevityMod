<template>
  <div class="container">
    <div v-on:click="changeFileData" class="text-button">修改存档</div>
    <div v-on:click="toNotice" class="text-button">关于修改器</div>
    <div class="text-button">开发中</div>
  </div>
</template>

<script>
  export default {
    name: 'mainPage',
    methods: {
      changeFileData: function() {
        this.$router.push('/changeFileData')
      },
      toNotice: function() {
        this.$router.push('/notice')
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
body {
  margin: 0;
}
</style>
