let Tool = {
    time: {
        /**
         * 获取月支出
         * @param that Vue
         * @param date Date
         * @returns {*}
         */
        getDaySpendingByMonth (that, date) {
            let dateRange = null
            dateRange = Tool.utils.getMonthRange(date)
            return Tool.time._getDaySpendingDateByMonth(that, dateRange)
        },
        /**
         * 获取月度支出
         * @param that Vue
         * @param date Date
         * @returns {*}
         */
        getMonthSpending (that, date) {
            let dateRange = Tool.utils.getMonthRange(date)
            return Tool.time._getSpendingDataByTimes(that, dateRange)
        },
        /**
         * 获取年度支出
         * @param that Vue
         * @param date Date
         * @returns {*}
         */
        getYearSpending (that, date) {
            let dateRange = Tool.utils.getYearRange(date)
            return Tool.time._getSpendingDataByTimes(that, dateRange)
        },
        /**
         * 获取总支出
         * @param that Vue
         * @returns {*}
         */
        getAllSpending (that) {
            return Tool.time._getSpendingDataByTimes(that, [null, null])
        },
        /**
         * 获取年度每月累计结余
         * @param that
         * @param date
         * @returns {*}
         */
        getYearBalance (that, date) {
            let dateRange = Tool.utils.getYearRange(date)
            let monthList = Tool.time._getMonthBalanceDataByTimes(that, dateRange)
            for (let i = 1; i < monthList.length; i++) {
                monthList[i].value += parseFloat(monthList[(i - 1)].value)
                monthList[i].value = monthList[i].value.toFixed(2)
            }
            console.log(monthList)
            return monthList
        },
        /**
         * 获取历年的每年结余
         * @param that
         * @returns {*}
         */
        getAllTimeBalance (that) {
            let monthList = Tool.time._getAllYearBalanceData(that)
            for (let i = 1; i < monthList.length; i++) {
                monthList[i].value = monthList[i].value.toFixed(2)
            }
            return monthList
        },
        /**
         * 获取某个时间段的支出记录 按分类
         * @param that
         * @param dateRange
         * @returns {*}
         * @private
         */
        _getSpendingDataByTimes (that, dateRange) {
            let typeList = Tool.utils.getTypeList(that, 'spending')
            let typeIds = that.$utils.array_column(typeList, 'id')
            let data = that.$store.getters.getChartsData({
                startTime: dateRange[0],
                endTime: dateRange[1],
                parentTypes: typeIds
            })
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < typeList.length; j++) {
                    if (data[i]['parentId'] === typeList[j]['id']) {
                        if (typeList[j]['value'] === undefined) typeList[j]['value'] = 0
                        typeList[j]['value'] += data[i]['amount']
                    }
                }
            }
            return typeList.filter(item => {
                item.value = item.value !== undefined ? item.value.toFixed(2) : undefined
                return item.value !== undefined
            })
        },
        /**
         * 获取某年的每月结余
         * @param that
         * @param dateRange
         * @returns {*[]}
         * @private
         */
        _getMonthBalanceDataByTimes (that, dateRange) {
            console.log(dateRange[0], dateRange[1])
            let data = that.$store.getters.getChartsData({
                startTime: dateRange[0],
                endTime: dateRange[1]
            })
            let monthList = []
            for (let i = 0; i < data.length; i++) {
                // 跳过内部互转的数据
                if (data[i].type === 'transfer' || data[i].type === 'change') continue

                if (data[i].type === 'spending') {
                    data[i].amount = -data[i].amount
                }

                // if (data[i].type === 'change' && data[i].amountType === 'spending') {
                //     data[i].amount = -data[i].amount
                // }

                let date = new Date(data[i].recordTime)
                let month = date.getMonth()
                if (monthList[month] === undefined) {
                    monthList[month] = {}
                    monthList[month].name = (date.getMonth() + 1) + '月'
                    monthList[month].value = 0.00
                }
                // console.log(data[i].type, data[i].amount, monthList[date.getMonth()].value + data[i].amount)
                monthList[date.getMonth()].value += data[i].amount
            }
            return monthList.filter(item => {
                return item.value !== undefined
            })
        },
        /**
         * 获取所有年份中的每年结余
         * @param that
         * @returns {*[]}
         * @private
         */
        _getAllYearBalanceData (that) {
            let data = that.$store.getters.getChartsData({
                startTime: that.$store.state.recordCount.minDate,
                endTime: 9999999999999
            })
            let yearList = []
            for (let i = 0; i < data.length; i++) {
                // 跳过内部互转的数据
                if (data[i].type === 'transfer' || data[i].type === 'change') continue

                if (data[i].type === 'spending') {
                    data[i].amount = -data[i].amount
                }

                let date = new Date(data[i].recordTime)
                let year = date.getFullYear()
                if (yearList[year] === undefined) {
                    yearList[year] = {}
                    yearList[year].name = (date.getFullYear()) + '年'
                    yearList[year].value = 0.00
                }
                // console.log(data[i].type, data[i].amount, monthList[date.getMonth()].value + data[i].amount)
                yearList[year].value += data[i].amount
            }
            return yearList.filter(item => {
                return item.value !== undefined
            })
        },
        /**
         * 获取某个自然月内每日的支出总额
         * @param that
         * @param dateRange
         * @private
         */
        _getDaySpendingDateByMonth (that, dateRange) {
            console.log(dateRange[0], dateRange[1])
            let data = that.$store.getters.getChartsData({
                startTime: dateRange[0],
                endTime: dateRange[1]
            })
            let dateRangeList = []
            // 构建当前月的每一天
            let endDate = new Date(dateRange[1])
            for (let i = 1; i <= endDate.getDate(); i++) {
                dateRangeList[i] = {}
                dateRangeList[i].name = (endDate.getMonth() + 1) + '-' + i
                dateRangeList[i].value = 0.00
            }
            for (let i = 0; i < data.length; i++) {
                // 只统计支出
                if (data[i].type !== 'spending') continue
                let date = new Date(data[i].recordTime)
                let day = date.getDate()
                dateRangeList[day].value += data[i].amount
            }
            return dateRangeList
        }
    },
    utils: {
        /**
         * 获取支出/收入分类的typeId
         * @param that
         * @param type
         * @returns {*}
         */
        getTypeList (that, type) {
            let data = that.$store.getters.completeTypeList(type)
            // 过滤不存在子分类的父级
            return data.filter(function (item) {
                return item.list.length !== 0
            })
        },
        /**
         * 获取某一个月的开始时间和截至时间
         * @param cur
         * @returns {number[]}
         */
        getMonthRange (cur) {
            let firstDay = new Date(cur.getFullYear() + '/' + (cur.getMonth() + 1) + '/' + cur.getDate() + ' 00:00:00')
            firstDay.setDate(1)
            let lastDay = new Date(+firstDay)
            lastDay.setMonth(lastDay.getMonth() + 1)
            lastDay.setDate(0)
            lastDay.setHours(23)
            lastDay.setMinutes(59)
            lastDay.setSeconds(59)

            return [firstDay.getTime(), lastDay.getTime()]
        },
        /**
         * 获取某一年的开始时间和截至时间
         * @param cur
         * @returns {number[]}
         */
        getYearRange (cur) {
            let firstDay = new Date(cur.getFullYear() + '/1/1 00:00:00')
            let lastDay = new Date(cur.getFullYear() + '/12/31 23:59:59')
            return [firstDay.getTime(), lastDay.getTime()]
        }
    }
}
export default Tool
