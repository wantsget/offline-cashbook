<template>
  <div class="page-wrapper">
    <div class="account-panel">
      <!-- 余额 -->
      <div class="balance">
        <p class="value">{{counter.balance}}</p>
        <p class="label">余额</p>
      </div>
      <!-- 总计收支 -->
      <div class="account-counter">
        <div class="spending">
          <p class="value spending-text">{{counter.spending}}</p>
          <p class="label">总支出</p>
        </div>
        <div class="income">
          <p class="value income-text">{{counter.income}}</p>
          <p class="label">总收入</p>
        </div>
      </div>
    </div>
    <!-- 账户明细 -->
    <van-cell-group>
      <van-cell
        v-for="(account, index) in accountList"
        :key="index" :title="account.name"
        :value="account.balance"
        :icon="account.icon"
        size="large"
      ></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'accountIndex',
  data () {
    return {
      counter: {},
      accountList: []
    }
  },
  mounted () {
    this.counter = Object.assign({}, this.$store.state.recordCount)
    this.accountList = Object.assign([], this.$store.state.accountList)
  }
}
</script>

<style scoped>
  .account-panel{
    padding: 30px 12px;
    border-bottom: 1px solid #f1f1f1;
  }
  .account-panel .balance{
    padding: 15px 0 24px;
    text-align: center;
  }
  .account-panel .value{
    font-size: 30px;
    line-height: 1;
    font-weight: bold;
    color: #444;
  }
  .account-panel .label{
    margin-top: 6px;
    font-size: 14px;
    color: #999;
  }
  .account-counter{
    display: flex;
    align-items: center;
    justify-items: center;
    text-align: center;
  }
  .account-counter .spending,.account-counter .income{
    flex: 1;
    width: 50%;
  }
  .account-counter div+div{
    border-left: 1px solid #d1d1d1;
  }
  .account-counter .value{
    font-size: 24px;
    line-height: 1;
    font-weight: bold;
    text-align: center;
  }
  .account-counter .spending-text{
    color: #31a336;
  }
  .account-counter .income-text{
    color: #f44336;
  }
  .account-counter .label{
    margin-top: 3px;
    font-size: 14px;
    color: #999;
  }
</style>
