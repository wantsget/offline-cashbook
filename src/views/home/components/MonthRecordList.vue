<template>
  <div class="month-record-list" >
    <div class="month-record-item" v-for="(dayRecord, day) in monthRecordList" :key="day">
      <p class="time">
        <span class="num date" v-if="dayRecord.date !== '今天' && dayRecord.date !== '昨天'">{{dayRecord.date}}</span>
        <span class="date" v-if="dayRecord.date === '今天' || dayRecord.date === '昨天'">{{dayRecord.date}}</span>
        <span class="day">{{dayRecord.day}}</span>
      </p>
      <div class="item-list">
        <div class="item" v-for="(record, index) in dayRecord.list" :key="index" @click="$emit('click',record)">
          <van-icon :name="record.icon" class="item-icon"></van-icon>
          <div class="title">
            <p class="value">{{record.name}}</p>
            <p class="label" v-if="record.note || record.accountText">
              <span class="account" v-if="record.accountText">{{record.accountText}}</span>
              <span class="note" v-if="record.note">{{record.note}}</span>
            </p>
          </div>
          <div class="amount spending" v-if="record.type === 'spending'">{{record.amount}}</div>
          <div class="amount income" v-if="record.type === 'income'">{{record.amount}}</div>
          <div class="amount income" v-if="record.type === 'transfer'">{{record.amount}}</div>
          <div :class="'amount ' + record.amountType" v-if="record.type === 'change'">{{record.amount}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'MonthRecordList',
        props: {
            monthRecordList: {
                type: Object,
                default: function () {
                    return {}
                }
            }
        }
    }
</script>

<style scoped>
  .month-record-list{
    display: block;
    box-sizing: border-box;
    min-height: calc(100% - 80px);
    background-color: #f1f1f1;
    padding: 12px;
  }
  .month-record-item .time{
    padding: 6px 0 6px 12px;
    font-weight: 500;
    color: #83898f;
  }
  .month-record-item .time .date{
    font-size: 14px;
    margin-right: 6px;
  }
  .month-record-item .time .num{
    font-size: 16px;
  }
  .month-record-item .time .day{
    font-size: 12px;
  }
  .month-record-item .item-list{
    display: block;
    background-color: #fff;
    box-shadow:0 0 10px #e1e1e1;
  }
  .month-record-item .item-list .item{
    position: relative;
    overflow: hidden;
    display: flex;
    height: 56px;
    align-items: center;
    justify-items: center;
  }
  .month-record-item .item-list .item:active{
    background-color: #f1f1f1;
  }
  .month-record-item .item-list .item:before{
    content: '';
    position: absolute;
    bottom:0;
    right:0;
    display: block;
    width: calc(100% - 48px);
    height: 1px;
    background-color: #f1f1f1;
  }
  .month-record-item .item-list .item:last-child::before{
    content: none;
  }
  .month-record-item .item-list .item .item-icon{
    padding: 0 12px;
    font-size: 24px;
  }
  .month-record-item .item-list .item .title{
    flex: 3;
  }
  .month-record-item .item-list .item .title .value{
    font-size: 14px;
  }
  .month-record-item .item-list .item .title .label{
    font-size: 12px;
    color:#bbb;
  }
  .month-record-item .item-list .item .title .label .account{
    margin-right: 8px;
  }
  .month-record-item .item-list .item .amount{
    flex: 1;
    text-align: right;
    padding-right: 12px;
    font-size: 14px;
  }
  .month-record-item .item-list .item .spending{
    color: #31a336
  }
  .month-record-item .item-list .item .spending:before{
    content: '- ';
  }
  .month-record-item .item-list .item .income{
    color: #f44336
  }
  .month-record-item .item-list .item .income:before{
    content: '+ ';
  }
</style>
