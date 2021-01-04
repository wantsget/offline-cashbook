<template>
    <div class="grid-wrapper" v-if="data">
      <div class="grid-item" v-for="(item, index) in data" v-bind:key="index">
        <div class="value">{{item.value}}</div>
        <div class="title">{{item.title}}</div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'DashBoardGrid',
  data () {
    return {
    }
  },
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
  }
}
</script>

<style scoped>
  .grid-wrapper{
    display: flex;
    margin: 16px 8px;
    background: #f0f3f6;
    box-shadow: 0 8px 12px #ebedf0a6;
    border-radius: 6px;
  }
  .grid-item{
    flex: 1;
    padding: 20px 8px;
    text-align: center;
  }
  .grid-item + .grid-item{
    border-left:1px solid #eaeaea;
  }
  .grid-item .title{
    margin-top: 8px;
    font-size:14px;
    color:#bcb8b8;
  }
  .grid-item .value{
    font-size: 24px;
    font-weight: bold;
  }
</style>
