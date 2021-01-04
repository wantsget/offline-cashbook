<template>
  <van-tabbar style="border-top: 1px solid #eaeaea;" route safe-area-inset-bottom>
    <van-tabbar-item icon="balance-list-o" to="/">账单</van-tabbar-item>
    <van-tabbar-item icon="bar-chart-o" to="/report">报表</van-tabbar-item>
    <van-tabbar-item icon="plus" to="/record/create" class="btn-center"></van-tabbar-item>
    <van-tabbar-item icon="vip-card-o" to="/account">账户</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to="/setting">设置</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style scoped>
  .btn-center{
    position: relative;
  }
  .btn-center >>> .van-tabbar-item__icon::before{
    content: '';
    position: absolute;
    z-index: 1;
    top:-12px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 65px;
    height: 65px;
    border: 1px solid #eaeaea;
    border-radius: 100%;
    background-color: #fff;
  }
  .btn-center >>> .van-tabbar-item__icon{
    position: initial;
    z-index: 3;
  }
  .btn-center >>> .van-tabbar-item__icon::after{
    content: '';
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    display: block;
    height: 60px;
    background-color: #fff;
  }
  .btn-center >>> .van-tabbar-item__icon .van-icon{
    position: absolute;
    z-index: 3;
    left: 0;
    right: 0;
    top: -4px;
    margin: 0 auto;
    box-sizing: border-box;
    width: 48px;
    height: 48px;
    border-radius: 100%;
    background-color: #2196f3;
    color:#fff;
    font-size: 36px;
    padding: 6px;
  }
</style>
