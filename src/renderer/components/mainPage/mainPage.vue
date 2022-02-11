<template>
  <div class="window">
    <div class="header">觅长生修改工具</div>
    <div id="container">
      <div v-on:click="changeFileData" class="text-button">修改存档</div>
    </div>
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

<style>
/* CSS */
/* CSS */

.window {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url("/static/imgs/background.png");
  background-size: 1000px 563px;
  height: 100vh;
  
}
.header {
  margin-top: -50px;
  font-family: "dragon";
  font-size: 50px;
}
#container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 394px;
  background:rgba(253, 252, 252, 0.5);
  border-radius: 5px;
}

</style>
