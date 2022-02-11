<template>
  <div class="window">
    <div class="header">存档修改</div>
    <div class="container">
      <div v-on:click="back" class="text-button">返回</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'changeFileData',
  methods: {

    back: function() {
      this.$router.back()
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
  height: 100%;
}
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

</style>
