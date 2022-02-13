<template>
  <div id="app" class="home-page">
    <div class="header">觅长生修改工具</div>
    <div class="version">版本：{{version}}</div>
    <router-view>
    </router-view>
  </div>
</template>

<script>
  const packages = require('../../package.json')
  export default {
    name: 'find-longevity-mod',
    data: function() {
      return {
        version: packages.version
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
.home-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url("/static/imgs/background.png");
  background-size: 1005px 563px;
  height: 100vh;
}
.version {
  font-family: "dragon";
  position: fixed;
  right: 20px;
  bottom: 20px;
}

</style>
