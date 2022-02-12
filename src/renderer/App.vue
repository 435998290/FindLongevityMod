<template>
  <div id="app" class="home-page">
    <div class="header">觅长生修改工具</div>
    <router-view>
    </router-view>
  </div>
</template>

<script>
  export default {
    name: 'find-longevity-mod'
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
.home-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url("/static/imgs/background.png");
  background-size: 1000px 563px;
  height: 100vh;
}

</style>
