<template>
  <div class="container">
    <div v-on:click="changeFileData" class="text-button">修改存档</div>
  </div>
</template>

<script>
  export default {
    name: 'mainPage',
    methods: {
      changeFileData: function() {
        this.$router.push('/changeFileData')
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
  width: 800px;
  height: 394px;
  background:rgba(253, 252, 252, 0.5);
  border-radius: 5px;
}
body {
  margin: 0;
}
</style>
