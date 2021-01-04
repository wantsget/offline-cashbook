<template>
  <div class="month-panel">
    <div class="month-picker" v-on:click="openPicker">
      <van-icon name="notes-o" class="month-picker-icon"></van-icon>
      <p class="month-picker-label">{{monthText}}</p>
    </div>
    <div class="month-spending">
      <p class="value">-{{spending}}</p>
      <p class="label">月支出</p>
    </div>
    <div class="month-income">
      <p class="value">+{{income}}</p>
      <p class="label">月收入</p>
    </div>
    <div class="month-balance">
      <p class="value" :style="balanceStyle">{{balance}}</p>
      <p class="label">结余</p>
    </div>
    <van-popup
      v-model="showPicker"
      position="bottom"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="changeMonth"
        @cancel="showPicker = false">
      </van-datetime-picker>
    </van-popup>
  </div>
</template>

<script>
    export default {
        name: 'MonthPanel',
        data () {
            return {
                maxDate: new Date(),
                showPicker: false,
                currentDate: new Date(),
                selectDate: new Date()
            }
        },
        props: {
            parentDate: {
                type: Date,
                default: function () {
                    return new Date()
                }
            },
            spending: {
                type: Number,
                default: function () {
                    return 0.00
                }
            },
            income: {
                type: Number,
                default: function () {
                    return 0.00
                }
            }
        },
        computed: {
            monthText () {
                return this.selectDate.getFullYear() + '年' + (this.selectDate.getMonth() + 1) + '月'
            },
            minDate () {
                if (this.$store.state.recordCount.minDate) {
                    return new Date(this.$store.state.recordCount.minDate)
                } else {
                    return new Date(new Date().getFullYear() - 10, 0)
                }
            },
            balance () {
                return parseFloat((this.income - this.spending).toFixed(2))
            },
            balanceStyle () {
                return (this.income - this.spending > 0) ? 'color:#f44336' : 'color:#31a336'
            }
        },
        watch: {
            parentDate () {
                if (this.parentDate) {
                    this.currentDate = this.parentDate
                    this.selectDate = this.parentDate
                }
            }
        },
        methods: {
            openPicker: function () {
                this.currentDate = this.selectDate
                this.showPicker = true
            },
            formatter: function (type, value) {
                if (type === 'year') {
                    return `${value}年`
                } else if (type === 'month') {
                    return `${value}月`
                }
                return value
            },
            changeMonth: function (value) {
                this.selectDate = value
                this.$emit('changeMonth', value)
                this.showPicker = false
            }
        }
    }
</script>

<style scoped>
  .month-panel{
    display: flex;
    height: 80px;
    align-items: center;
    justify-items: center;
    text-align: center;
  }
  .month-panel .month-picker, .month-panel .month-spending, .month-panel .month-income, .month-panel .month-balance{
    flex: 1;
  }
  .month-panel .month-picker .month-picker-icon{
    font-size: 24px;
    margin-bottom: 4px;
  }
  .month-panel .month-spending .value, .month-panel .month-income .value, .month-panel .month-balance .value{
    font-size: 20px;
    font-weight: 600;
  }
  .month-panel .month-spending .label, .month-panel .month-income .label, .month-panel .month-balance .label{
    color: #ccc;
  }
  .month-panel .month-spending .value {
    color: #31a336
  }
  .month-panel .month-income .value {
    color: #f44336
  }
</style>
