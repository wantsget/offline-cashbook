<template>
  <div class="home-build-wrapper">
    <div class="tips">
      <van-icon name="underway-o icon"></van-icon>
      <p>页面制作中</p>
    </div>

  </div>
</template>

<script>
    export default {
        name: 'homeBuild'
    }
</script>

<style scoped>
  .home-build-wrapper{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-items: center;
    text-align: center;
  }
  .tips{
    margin-top: -80px;
    flex: 1;
    font-size: 18px;
    font-weight: 700;
    color: #7d7e80;
  }
  .tips .icon{
    font-size: 40px;
    margin-bottom: 20px;
  }
</style>
