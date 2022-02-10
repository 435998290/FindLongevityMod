<template>
  <div id="app" class="window">
    <div  class="header">觅长生修改工具</div>
    <div class="container"></div>
  </div>
</template>

<script>
export default {
  name: 'find-longevity-mod'
}
</script>

<style>
/* CSS */
/* CSS */
@font-face {
    font-family: dragon;
    src: url("/static/font/dragon.ttf");
  }
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
  font-family: "dragon";
  font-size: 50px;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 394px;
  background-color: white;
}
</style>
