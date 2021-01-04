<template>
  <div class="income-form">
    <van-field label="分类" :value="mergeText" size="large" input-align="right" readonly clickable @click="openColumnPicker"></van-field>
    <van-field label="账户" :value="accountText" size="large" input-align="right" readonly clickable @click="openAccountPicker"></van-field>
    <van-field label="金额" :value="amount" size="large" input-align="right" readonly clickable @touchstart.native.stop="openNumberKeyboard"></van-field>
    <van-field label="备注" v-model="note" size="large" input-align="right" clickable @focus="hideBtn" @blur="showBtn"></van-field>
    <van-tag size="medium" class="tag-time" @click="openTimePicker">{{dateText}}</van-tag>
    <van-button round type="info" class="btn-save" @click="saveRecord" v-if="showSaveBtn">保存</van-button>
    <!-- 对应的弹出层 -->
    <van-number-keyboard
      :show="showNumberKeyboard"
      extra-key="."
      close-button-text="完成"
      @blur="showNumberKeyboard = false"
      @input="onInput"
      @delete="onDelete">
    </van-number-keyboard>
    <van-popup v-model="showColumnPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columnData"
        @change="onColumnChange"
        @confirm="setColumn"></van-picker>
    </van-popup>
    <van-popup v-model="showAccountPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="accountData"
        :default-index="defaultAccountIndex"
        @confirm="setAccount"></van-picker>
    </van-popup>
    <van-popup v-model="showTimePicker" position="bottom">
      <van-datetime-picker
        v-model="recordTime"
        type="date"
        :max-date="maxDate"
        @confirm="setRecordTime">
      </van-datetime-picker>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'IncomeForm',
  props: {
    data: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      parentId: 0,
      childId: 0,
      accountId: 0,
      amount: '0',
      note: '',
      recordTime: new Date(),
      parentText: '',
      childText: '',
      maxDate: new Date(),
      accountText: '请选择账户',
      showNumberKeyboard: false,
      showAccountPicker: false,
      showColumnPicker: false,
      showTimePicker: false,
      showSaveBtn: true
    }
  },
  computed: {
    mergeText () {
      if (this.parentText === '' && this.childText === '') {
        return '请选择分类'
      } else {
        return this.parentText + ' > ' + this.childText
      }
    },
    typeList () {
      let data = this.$store.getters.completeTypeList('income')
      // 过滤不存在子分类的父级
      return data.filter(function (item) {
        return item.list.length !== 0
      })
    },
    columnsName () {
      // 遍历父子级的name
      let column = {}
      this.typeList.map(function (parent) {
        column[parent.name] = []
        parent.list.map(function (child) {
          column[parent.name].push(child.name)
        })
      })
      return column
    },
    columnData () {
      let columnData = [{
        values: Object.keys(this.columnsName),
        className: 'column1',
        defaultIndex: this.defaultTypeIndex
      },
      {
        values: this.columnsName[this.typeList[this.defaultTypeIndex].name],
        className: 'column2',
        defaultIndex: this.defaultSubTypeIndex
      }]
      return columnData
    },
    defaultTypeIndex () {
      let self = this
      let typeIndex = 0
      Object.keys(this.columnsName).map(function (item, index) {
        if (item === self.parentText) {
          typeIndex = index
        }
      })
      return typeIndex
    },
    defaultSubTypeIndex () {
      let self = this
      let subTypeIndex = 0
      let parentName = Object.keys(this.columnsName)[this.defaultTypeIndex]
      this.columnsName[parentName].map(function (item, index) {
        if (item === self.childText) {
          subTypeIndex = index
        }
      })
      return subTypeIndex
    },
    defaultAccountIndex () {
      return this.$utils.getIndexByField(this.$store.state.accountList, 'id', this.accountId, 0)
    },
    accountData () {
      return this.$utils.array_column(this.$store.state.accountList, 'name')
    },
    dateText () {
      let date = null
      if (this.recordTime) {
        date = new Date(this.recordTime)
      } else {
        date = new Date()
      }
      if (date.getFullYear() === new Date().getFullYear()) { // 本年的日期则忽略年份
        return (date.getMonth() + 1) + '月' + date.getDate() + '日'
      } else {
        return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
      }
    }
  },
  created () {
    // 赋值
    this.parentId = this.data.parentId
    this.childId = this.data.childId
    this.accountId = this.data.accountId
    this.amount = this.data.amount.toFixed(2)
    this.note = this.data.note
    this.recordTime = new Date(this.data.recordTime)
    // 修改账户选择器
    this.accountText = this.$store.state.accountList[this.defaultAccountIndex].name
    // 修改分类选择器显示内容 wheelIndex在columnData方法中已自动更新
    this.parentText = this.$utils.filterByField(this.$store.state.typeList, 'id', this.parentId).name
    this.childText = this.$utils.filterByField(this.$store.state.subTypeList, 'id', this.childId).name
  },
  methods: {
    hideBtn () {
      this.showSaveBtn = false
    },
    showBtn () {
      this.showSaveBtn = true
    },
    openNumberKeyboard () {
      this.showNumberKeyboard = true
    },
    openColumnPicker () {
      this.showColumnPicker = true
    },
    openAccountPicker () {
      this.showAccountPicker = true
    },
    openTimePicker () {
      this.showTimePicker = true
    },
    onInput: function (e) {
      if (this.amount === '0') { // 打出的第一个数字
        if (e !== '.') { // 为数字则替换0
          this.amount = e.toString()
          return false
        }
      }
      let dotIndex = this.amount.indexOf('.')
      if (e === '.' && dotIndex !== -1) { // 防止出现多个小数点
        return false
      }
      if (dotIndex !== -1 && (this.amount.length - (dotIndex + 1)) >= 2) { // 小数点后允许2位数字
        return false
      }
      this.amount += e.toString()
    },
    onDelete: function () {
      this.amount = this.amount.substring(0, this.amount.length - 1)
      if (this.amount === '') {
        this.amount = '0'
      }
    },
    onColumnChange: function (picker, values) {
      this.parentText = values[0]
      this.childText = this.columnsName[values[0]][0]
      picker.setColumnValues(1, this.columnsName[values[0]])
    },
    setColumn: function (name, wheels) {
      this.parentText = name[0]
      this.childText = name[1]

      this.parentId = this.typeList[wheels[0]].id
      this.childId = this.typeList[wheels[0]].list[wheels[1]].id

      this.showColumnPicker = false
    },
    setAccount: function (name, wheel) {
      this.accountText = name
      this.accountId = this.$store.state.accountList[wheel].id
      this.showAccountPicker = false
    },
    setRecordTime: function (value) {
      this.recordTime = new Date(value)
      this.showTimePicker = false
    },
    saveRecord: function () {
      if (this.parentId === 0 || this.childId === 0) {
        this.$toast('请选择分类')
        return false
      }
      if (this.accountId === 0) {
        this.$toast('请选择账户')
        return false
      }
      if (this.amount === '0') {
        this.$toast('收入不能为0元')
        return false
      }
      let data = {
        id: this.data.id,
        type: 'income',
        parentId: this.parentId,
        childId: this.childId,
        accountId: this.accountId,
        amount: parseFloat(this.amount),
        note: this.note.toString(),
        recordTime: this.recordTime.getTime()
      }
      this.$emit('onSubmit', data)
    }
  }
}
</script>

<style scoped>
  .tag-time{
    margin: 12px;
  }
  .btn-save{
    position: fixed;
    bottom:50px;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: block;
    width: 70%;
  }
</style>
