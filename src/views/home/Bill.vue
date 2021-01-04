<template>
  <div class="page-wrapper">
    <monthPanel @changeMonth="changeMonth" :spending="monthSpending" :income="monthIncome" :parentDate="currentDate"></monthPanel>
    <monthRecordList :monthRecordList="monthRecordList" @click="openActionSheet"></monthRecordList>
    <!-- 弹出菜单 -->
    <van-action-sheet
      :round="false"
      v-model="showActionSheet"
      :actions="actions"
      @select="onSelect"
      cancel-text="取消">
    </van-action-sheet>
  </div>
</template>

<script>
    import monthPanel from './components/MonthPanel.vue'
    import monthRecordList from './components/MonthRecordList.vue'
    export default {
        name: 'homeBill',
        components: {
            monthPanel,
            monthRecordList
        },
        data () {
            return {
                currentDate: new Date(),
                monthSpending: 0,
                monthIncome: 0,
                showActionSheet: false,
                actions: [],
                selectItem: {},
                records: []
            }
        },
        computed: {
            monthRecordList () {
                let self = this
                let monthSpending = 0
                let monthIncome = 0
                let monthRecordList = {}
                this.records.map(function (record) {
                    // 计算收支 transfer和change不计入总收支
                    switch (record.type) {
                    case 'spending':
                        monthSpending += record.amount
                        break
                    case 'income':
                        monthIncome += record.amount
                        break
                    }
                    if (record.type !== 'transfer') { // 获取操作的账户名
                        let account = self.$utils.filterByField(self.$store.state.accountList, 'id', record.accountId)
                        if (account) {
                            record.accountText = account.name
                        }
                    }
                    if (record.type === 'spending' || record.type === 'income') { // 获取分类图标
                        let typeData = self.$store.getters.typeData(record.childId, false)
                        record.icon = typeData.icon
                        record.name = typeData.name
                    }
                    // 按天区分记录
                    let dateKey = new Date(record.recordTime).setHours(0, 0, 0, 0)
                    let day = new Date(record.recordTime).getDay()
                    let dayTextArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
                    if (monthRecordList[dateKey] === undefined) {
                        monthRecordList[dateKey] = {}
                    }
                    if (monthRecordList[dateKey]['list'] === undefined) {
                        monthRecordList[dateKey]['list'] = []
                    }
                    monthRecordList[dateKey]['day'] = dayTextArr[day]
                    monthRecordList[dateKey]['date'] = new Date(record.recordTime).getDate()
                    if (new Date(record.recordTime).getDate() < 10) {
                        monthRecordList[dateKey]['date'] = '0' + new Date(record.recordTime).getDate()
                    }
                    monthRecordList[dateKey]['list'].push(record)
                    // 区分今天和昨天
                    let todayTime = new Date().setHours(0, 0, 0, 0)
                    if (record.recordTime - todayTime >= 0) {
                        monthRecordList[dateKey]['date'] = '今天'
                    } else if (record.recordTime < todayTime && record.recordTime > (todayTime - 86400000)) {
                        monthRecordList[dateKey]['date'] = '昨天'
                    }
                })
                self.monthSpending = parseFloat(monthSpending.toFixed(2))
                self.monthIncome = parseFloat(monthIncome.toFixed(2))
                return self.$utils.object_reverse(monthRecordList)
            }
        },
        mounted () {
            this.currentDate = this.$route.params.month || new Date()
            this.changeMonth(this.currentDate)
        },
        methods: {
            openActionSheet (record) {
                let action = []
                if (record.type !== 'change') {
                    action.push({ name: '编辑' })
                }
                action.push({ name: '删除' })
                this.actions = action
                this.selectItem = record
                this.showActionSheet = true
            },
            onSelect (action) {
                let self = this
                switch (action.name) {
                case '编辑':
                    return this.$router.push({ name: 'recordEdit', params: { id: this.selectItem.id } })
                case '删除':
                    return this.$dialog.confirm({
                        message: '确定删除该条记录吗？',
                        showCancelButton: true,
                        beforeClose (action, done) {
                            if (action === 'confirm') {
                                self.$store.commit('deleteRecord', self.selectItem.id)
                                self.$toast.success('删除成功')
                                self.showActionSheet = false
                                done()
                            } else {
                                self.showActionSheet = false
                                done()
                            }
                        }
                    })
                }
            },
            changeMonth (e) {
                this.$toast.loading({
                    message: '读取中...',
                    forbidClick: true,
                    loadingType: 'spinner'
                })
                this.records = this.$store.getters.monthRecords(e)
                this.$toast.clear()
            }
        }
    }
</script>

<style scoped>
</style>
