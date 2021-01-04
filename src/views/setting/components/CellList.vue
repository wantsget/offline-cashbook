<template>
  <div class="cell-list-wrapper">
    <div class="cell-list" v-for="(cellList, index) in data" v-bind:key="index">
      <van-cell icon="wap-nav" v-bind:title="cellList.name" >
        <van-icon slot="right-icon" name="setting-o" style="line-height: inherit;" v-on:click="$emit('clickParent', {id: cellList.id, name: cellList.name})"></van-icon>
      </van-cell>
      <van-cell-group>
        <van-cell v-for="(cellItem, cIndex) in cellList.list" v-bind:key="cIndex" clickable size="large" v-bind:title="cellItem.name" v-on:click="$emit('clickChild', cellItem)"></van-cell>
        <van-cell v-if="cellList.list.length === 0" title="无子分类" v-on:click="$emit('clickChild', {parentId: cellList.id, name: cellList.name})"></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'CellList',
        props: {
            data: {
                type: Array,
                default: function () {
                    return []
                }
            }
        }
    }
</script>

<style scoped>
  .cell-list-wrapper{
    background-color: #f1f1f1;
  }
  .cell-list + .cell-list{
    margin-top: 8px;
  }
  .van-cell-group__title{
    background-color: #fff;
    font-size:12px;
    padding: 9px 15px 3px;
  }
</style>
