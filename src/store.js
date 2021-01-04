import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
// import http from './utils/http'
import utils from './utils/utils'
import APP_CONFIG from './config/appConfig'

Vue.use(Vuex)

const vuexLocal = new VuexPersist({
    storage: window.localStorage // localStorage/sessionStorage/indexDB
})
// TODO： 写一个utils方法处理所有进行浮点数运算的地方
export default new Vuex.Store({
    state: {
        showTabBar: true,
        showNavigationBar: false,
        navigationBar: {
            title: '',
            extraClass: ''
        },
        primaryKey: { // 维护自增主键
            nextTypeId: 13,
            nextSubTypeId: 51,
            nextAccountId: 4,
            nextRecordId: 1
        },
        recordCount: { // 统计记录中的一些数据
            balance: '0',
            spending: '0',
            income: '0',
            minDate: '' // 拉取月账单时的最老限制 默认为10年前
        },
        typeList: [
            {
                'id': 1,
                'type': 'spending',
                'name': '衣服饰品',
                'icon': 'cash'
            },
            {
                'id': 2,
                'type': 'spending',
                'name': '食品酒水',
                'icon': 'cash'
            },
            {
                'id': 3,
                'type': 'spending',
                'name': '居家物业',
                'icon': 'cash'
            },
            {
                'id': 4,
                'type': 'spending',
                'name': '行车交通',
                'icon': 'cash'
            },
            {
                'id': 5,
                'type': 'spending',
                'name': '交流通讯',
                'icon': 'cash'
            },
            {
                'id': 6,
                'type': 'spending',
                'name': '休闲娱乐',
                'icon': 'cash'
            },
            {
                'id': 7,
                'type': 'spending',
                'name': '学习进修',
                'icon': 'cash'
            },
            {
                'id': 8,
                'type': 'spending',
                'name': '人情往来',
                'icon': 'cash'
            },
            {
                'id': 9,
                'type': 'spending',
                'name': '医疗保健',
                'icon': 'cash'
            },
            {
                'id': 10,
                'type': 'spending',
                'name': '金融保险',
                'icon': 'cash'
            },
            {
                'id': 11,
                'type': 'spending',
                'name': '其他杂项',
                'icon': 'cash'
            },
            {
                'id': 12,
                'type': 'income',
                'name': '职业收入',
                'icon': 'cash'
            }
        ], // 一级分类
        subTypeList: [
            {
                'id': 1,
                'type': 'spending',
                'parentId': 1,
                'name': '化妆饰品',
                'icon': 'cash'
            },
            {
                'id': 2,
                'type': 'spending',
                'parentId': 1,
                'name': '鞋帽包包',
                'icon': 'cash'
            },
            {
                'id': 3,
                'type': 'spending',
                'parentId': 1,
                'name': '衣服裤子',
                'icon': 'cash'
            },
            {
                'id': 4,
                'type': 'spending',
                'parentId': 2,
                'name': '水果零食',
                'icon': 'cash'
            },
            {
                'id': 5,
                'type': 'spending',
                'parentId': 2,
                'name': '烟酒茶',
                'icon': 'cash'
            },
            {
                'id': 6,
                'type': 'spending',
                'parentId': 2,
                'name': '早午晚餐',
                'icon': 'cash'
            },
            {
                'id': 7,
                'type': 'spending',
                'parentId': 3,
                'name': '维修保养',
                'icon': 'cash'
            },
            {
                'id': 8,
                'type': 'spending',
                'parentId': 3,
                'name': '物业管理',
                'icon': 'cash'
            },
            {
                'id': 9,
                'type': 'spending',
                'parentId': 3,
                'name': '房租',
                'icon': 'cash'
            },
            {
                'id': 10,
                'type': 'spending',
                'parentId': 3,
                'name': '水电煤气',
                'icon': 'cash'
            },
            {
                'id': 11,
                'type': 'spending',
                'parentId': 3,
                'name': '日常用品',
                'icon': 'cash'
            },
            {
                'id': 12,
                'type': 'spending',
                'parentId': 4,
                'name': '私家车费用',
                'icon': 'cash'
            },
            {
                'id': 13,
                'type': 'spending',
                'parentId': 4,
                'name': '打车租车',
                'icon': 'cash'
            },
            {
                'id': 14,
                'type': 'spending',
                'parentId': 4,
                'name': '公共交通',
                'icon': 'cash'
            },
            {
                'id': 15,
                'type': 'spending',
                'parentId': 5,
                'name': '邮寄费',
                'icon': 'cash'
            },
            {
                'id': 16,
                'type': 'spending',
                'parentId': 5,
                'name': '上网费',
                'icon': 'cash'
            },
            {
                'id': 17,
                'type': 'spending',
                'parentId': 5,
                'name': '手机费',
                'icon': 'cash'
            },
            {
                'id': 18,
                'type': 'spending',
                'parentId': 5,
                'name': '座机费',
                'icon': 'cash'
            },
            {
                'id': 19,
                'type': 'spending',
                'parentId': 6,
                'name': '旅游度假',
                'icon': 'cash'
            },
            {
                'id': 20,
                'type': 'spending',
                'parentId': 6,
                'name': '宠物宝贝',
                'icon': 'cash'
            },
            {
                'id': 21,
                'type': 'spending',
                'parentId': 6,
                'name': '休闲玩乐',
                'icon': 'cash'
            },
            {
                'id': 22,
                'type': 'spending',
                'parentId': 6,
                'name': '腐败聚会',
                'icon': 'cash'
            },
            {
                'id': 23,
                'type': 'spending',
                'parentId': 6,
                'name': '运动健身',
                'icon': 'cash'
            },
            {
                'id': 24,
                'type': 'spending',
                'parentId': 7,
                'name': '数码装备',
                'icon': 'cash'
            },
            {
                'id': 25,
                'type': 'spending',
                'parentId': 7,
                'name': '培训进修',
                'icon': 'cash'
            },
            {
                'id': 26,
                'type': 'spending',
                'parentId': 7,
                'name': '书报杂志',
                'icon': 'cash'
            },
            {
                'id': 27,
                'type': 'spending',
                'parentId': 8,
                'name': '慈善捐助',
                'icon': 'cash'
            },
            {
                'id': 28,
                'type': 'spending',
                'parentId': 8,
                'name': '还人钱财',
                'icon': 'cash'
            },
            {
                'id': 29,
                'type': 'spending',
                'parentId': 8,
                'name': '孝敬家长',
                'icon': 'cash'
            },
            {
                'id': 30,
                'type': 'spending',
                'parentId': 8,
                'name': '送礼请客',
                'icon': 'cash'
            },
            {
                'id': 31,
                'type': 'spending',
                'parentId': 9,
                'name': '治疗费',
                'icon': 'cash'
            },
            {
                'id': 32,
                'type': 'spending',
                'parentId': 9,
                'name': '美容费',
                'icon': 'cash'
            },
            {
                'id': 33,
                'type': 'spending',
                'parentId': 9,
                'name': '保健费',
                'icon': 'cash'
            },
            {
                'id': 34,
                'type': 'spending',
                'parentId': 9,
                'name': '药品费',
                'icon': 'cash'
            },
            {
                'id': 35,
                'type': 'spending',
                'parentId': 10,
                'name': '赔偿罚款',
                'icon': 'cash'
            },
            {
                'id': 36,
                'type': 'spending',
                'parentId': 10,
                'name': '利息支出',
                'icon': 'cash'
            },
            {
                'id': 37,
                'type': 'spending',
                'parentId': 10,
                'name': '消费税收',
                'icon': 'cash'
            },
            {
                'id': 38,
                'type': 'spending',
                'parentId': 10,
                'name': '按揭还款',
                'icon': 'cash'
            },
            {
                'id': 39,
                'type': 'spending',
                'parentId': 10,
                'name': '投资亏损',
                'icon': 'cash'
            },
            {
                'id': 40,
                'type': 'spending',
                'parentId': 10,
                'name': '银行手续',
                'icon': 'cash'
            },
            {
                'id': 41,
                'type': 'spending',
                'parentId': 11,
                'name': '其他',
                'icon': 'cash'
            },
            {
                'id': 42,
                'type': 'spending',
                'parentId': 11,
                'name': '烂账损失',
                'icon': 'cash'
            },
            {
                'id': 43,
                'type': 'spending',
                'parentId': 11,
                'name': '意外丢失',
                'icon': 'cash'
            },
            {
                'id': 44,
                'type': 'spending',
                'parentId': 11,
                'name': '其他支出',
                'icon': 'cash'
            },
            {
                'id': 45,
                'type': 'income',
                'parentId': 12,
                'name': '加班收入',
                'icon': 'cash'
            },
            {
                'id': 46,
                'type': 'income',
                'parentId': 12,
                'name': '奖金收入',
                'icon': 'cash'
            },
            {
                'id': 47,
                'type': 'income',
                'parentId': 12,
                'name': '投资收入',
                'icon': 'cash'
            },
            {
                'id': 48,
                'type': 'income',
                'parentId': 12,
                'name': '兼职收入',
                'icon': 'cash'
            },
            {
                'id': 49,
                'type': 'income',
                'parentId': 12,
                'name': '利息收入',
                'icon': 'cash'
            },
            {
                'id': 50,
                'type': 'income',
                'parentId': 12,
                'name': '工资收入',
                'icon': 'cash'
            }
        ], // 二级分类
        accountList: [
            {
                'id': 1,
                'name': '支付宝',
                'icon': 'alipay',
                'balance': '0'
            },
            {
                'id': 2,
                'name': '银行卡',
                'icon': 'card',
                'balance': '0'
            },
            {
                'id': 3,
                'name': '微信',
                'icon': 'wechat',
                'balance': '0'
            }
        ], // 账号列表
        recordList: [] // 记录列表
    },
    getters: {
        /**
         * 导出vuex
         * @returns {function()}
         */
        outputState: (state) => () => {
            let denyField = ['showTabBar', 'showNavigationBar', 'navigationBar']
            let output = {}
            for (let key in state) {
                if (utils.inArray(denyField, key)) {
                    continue
                }
                output[key] = state[key]
            }
            return output
        },
        /**
         * 生产父子级列表
         * @param state
         * @returns {function(*): Array}
         */
        completeTypeList: (state) => (type) => {
            let tempList = []
            state.typeList.map(function (item) {
                if (item.type === type) {
                    let tempItem = Object.assign({}, item)
                    tempItem['list'] = state.subTypeList.filter(cItem => cItem.parentId === item.id)
                    tempList.push(tempItem)
                }
            })
            return tempList
        },
        /**
         * 输出某个分类的内容
         * @param state
         * @returns {Function}
         */
        typeData: (state) => (typeId, isParent) => {
            let tempItem = isParent ? state.typeList : state.subTypeList
            tempItem = utils.filterByField(tempItem, 'id', typeId)
            if (tempItem) {
                if (!isParent) {
                    let parentData = utils.filterByField(state.typeList, 'id', tempItem.parentId)
                    if (parentData) {
                        tempItem.parent = Object.assign({}, parentData)
                    }
                }
                return Object.assign({}, tempItem)
            }
            return false
        },
        /**
         * 读取月账单
         * @param state
         * @returns {function(*): Array}
         */
        monthRecords: (state) => (date) => {
            let year = date.getFullYear()
            let month = date.getMonth()
            let startTime = new Date(year, month)
            if (month === 11) { // 12月则进1
                year++
                month = 0
            } else {
                month++
            }
            let endTime = new Date(year, month)
            let monthRecords = []
            for (let key = 0; key < state.recordList.length; key++) {
                if (state.recordList[key]['recordTime'] >= startTime && state.recordList[key]['recordTime'] < endTime) {
                    monthRecords.push(state.recordList[key])
                }
            }
            return monthRecords
        },
        getChartsData: (state) => (option) => {
            option.startTime = option.startTime || state.recordCount.minDate
            option.endTime = option.endTime || 9999999999999 // 对应时间 2286-11-21 01:46:39，我应该活不到这一天
            option.recordType = option.recordType || null // 记录类型 默认全部
            // 查询金额的区间
            option.minAmount = option.minAmount || null
            option.maxAmount = option.maxAmount || null
            // 从哪些分类里筛选 数组格式
            option.parentTypes = option.parentTypes || []
            option.childTypes = option.childTypes || []
            // 从哪些账户里筛选
            option.accounts = option.accounts || []
            console.log('init store getChartsData', option, state.recordList.length)
            let records = []
            for (let key = 0; key < state.recordList.length; key++) {
                // 不符合时间限制
                if (state.recordList[key]['recordTime'] < option.startTime || state.recordList[key]['recordTime'] > option.endTime) {
                    // console.log(state.recordList[key]['recordTime'], '不符合时间限制')
                    continue
                }
                // 不符合记录类型
                if (option.recordType !== null && option.recordType !== state.recordList[key]['type']) {
                    console.log(state.recordList[key]['type'], '不符合记录类型')
                    continue
                }
                // 查记录对应的分类
                if (Object.prototype.toString.call(option.parentTypes) === '[object Array]' && option.parentTypes.length > 0) {
                    let parentId = state.recordList[key]['parentId']
                    // 父分类不匹配
                    if (utils.inArray(option.parentTypes, parentId) === false) {
                        console.log(parentId, '父分类不匹配')
                        continue
                    }
                }
                if (Object.prototype.toString.call(option.childTypes) === '[object Array]' && option.childTypes.length > 0) {
                    let childId = state.recordList[key]['childId']
                    // 子分类不匹配
                    if (utils.inArray(option.childTypes, childId) === false) {
                        console.log(childId, '子分类不匹配')
                        continue
                    }
                }
                // 查金额区间
                if (option.minAmount !== null && option.minAmount > state.recordList[key]['amount']) {
                    console.log(state.recordList[key]['amount'], 'minAmount不符合')
                    continue
                }
                if (option.maxAmount !== null && option.maxAmount < state.recordList[key]['amount']) {
                    console.log(state.recordList[key]['amount'], 'maxAmount不符合')
                    continue
                }
                // 查账户类型
                if (Object.prototype.toString.call(option.accounts) === '[object Array]' && option.accounts.length > 0) {
                    switch (state.recordList[key]['type']) {
                        case 'spending':
                        case 'income':
                        case 'change':
                            // 父分类不匹配
                            let accountId = state.recordList[key]['accountId']
                            if (utils.inArray(option.accounts, accountId) === false) {
                                console.log(accountId, 'accountId不符合')
                                continue
                            }
                            break
                        case 'transfer':
                            let spendingAccount = state.recordList[key]['spendingAccount']
                            let incomeAccount = state.recordList[key]['incomeAccount']
                            if (utils.inArray(option.accounts, spendingAccount) === false && utils.inArray(option.accounts, incomeAccount) === false) {
                                console.log(accountId, 'accountId不符合')
                                continue
                            }
                            break
                    }
                }
                // console.log('符合记录', state.recordList[key])
                records.push(Object.assign({}, state.recordList[key]))
            }
            return records
        }
    },
    mutations: {
        /**
         * 导入state
         * @param state
         * @param payload
         */
        importState (state, payload) {
            for (let key in payload) {
                switch (Object.prototype.toString.call(typeof (payload[key]))) {
                    case '[object Object]':
                        state[key] = Object.assign({}, payload[key])
                        break
                    case '[object Array]':
                        state[key] = Object.assign([], payload[key])
                        break
                    default:
                        state[key] = payload[key]
                }
            }
        },
        updateAppBarStatus (state, payload) {
            // 重置navigationBar
            state.navigationBar = { title: '', extraClass: '' }
            // 判断是否显示tab或者NavigationBar
            state.showTabBar = Boolean(APP_CONFIG.tabBar.list.filter(item => item.link === payload).length)
            state.showNavigationBar = !state.showTabBar
        },
        setNavigationBarTitle (state, payload) {
            state.navigationBar.title = payload
        },
        setNavigationBarBoldBorder (state) {
            state.navigationBar.extraClass = 'bold-border-line'
        },
        /**
         * 创建记录
         * @param state
         * @param record
         */
        createRecord (state, record) {
            // 不存在id属性则视为新增记录
            // 存在id属性时是从editRecord调用创建
            if (record.id === undefined) {
                record.id = state.primaryKey.nextRecordId
                state.primaryKey.nextRecordId++
            }
            switch (record.type) {
                case 'spending':
                case 'income':
                    state.accountList.map(function (account, index) {
                        if (account.id === record.accountId) {
                            if (record.type === 'spending') {
                                state.accountList[index]['balance'] = (parseFloat(state.accountList[index]['balance']) - record.amount).toFixed(2)
                            } else {
                                state.accountList[index]['balance'] = (parseFloat(state.accountList[index]['balance']) + record.amount).toFixed(2)
                            }
                        }
                    })
                    if (record.type === 'spending') {
                        state.recordCount.spending = (parseFloat(state.recordCount.spending) + record.amount).toFixed(2)
                        state.recordCount.balance = (parseFloat(state.recordCount.balance) - record.amount).toFixed(2)
                    } else {
                        state.recordCount.income = (parseFloat(state.recordCount.income) + record.amount).toFixed(2)
                        state.recordCount.balance = (parseFloat(state.recordCount.balance) + record.amount).toFixed(2)
                    }
                    break
                case 'transfer':
                    state.accountList.map(function (account, index) {
                        if (account.id === record.spendingAccount) {
                            state.accountList[index]['balance'] = (parseFloat(state.accountList[index]['balance']) - record.amount).toFixed(2)
                        } else if (account.id === record.incomeAccount) {
                            state.accountList[index]['balance'] = (parseFloat(state.accountList[index]['balance']) + record.amount).toFixed(2)
                        }
                    })
                    break
                case 'change': // 余额变更的数据在editAccount中生成
                    if (record.amountType === 'spending') {
                        state.recordCount.spending = (parseFloat(state.recordCount.spending) + record.amount).toFixed(2)
                        state.recordCount.balance = (parseFloat(state.recordCount.balance) - record.amount).toFixed(2)
                    } else {
                        state.recordCount.income = (parseFloat(state.recordCount.income) + record.amount).toFixed(2)
                        state.recordCount.balance = (parseFloat(state.recordCount.balance) + record.amount).toFixed(2)
                    }
                    break
            }
            state.recordList.push(record)
            // 设置minDate
            if (state.recordCount.minDate && record.recordTime < state.recordCount.minDate) {
                state.recordCount.minDate = record.recordTime
            } else if (!state.recordCount.minDate) {
                state.recordCount.minDate = record.recordTime
            }
        },
        /**
         * 修改记录
         * @param state
         * @param record
         */
        editRecord (state, record) {
            let oldRecord = utils.filterByField(state.recordList, 'id', record.id)
            // 删除旧记录后重建记录
            if (oldRecord) {
                this.commit('deleteRecord', record.id)
                this.commit('createRecord', record)
            }
        },
        /**
         * 删除记录
         * @param state
         * @param id
         */
        deleteRecord (state, id) {
            // 取出删除的消息，回滚记录
            let record = utils.filterByField(state.recordList, 'id', id)
            switch (record.type) {
                case 'spending':
                case 'income':
                    state.accountList.map(function (account, index) {
                        if (account.id === record.accountId) {
                            if (record.type === 'spending') {
                                state.accountList[index]['balance'] = (parseFloat(state.accountList[index]['balance']) + record.amount).toFixed(2)
                                state.recordCount.spending = (parseFloat(state.recordCount.spending) - record.amount).toFixed(2)
                                state.recordCount.balance = (parseFloat(state.recordCount.balance) + record.amount).toFixed(2)
                            } else {
                                state.accountList[index]['balance'] = (parseFloat(state.accountList[index]['balance']) - record.amount).toFixed(2)
                                state.recordCount.income = (parseFloat(state.recordCount.income) - record.amount).toFixed(2)
                                state.recordCount.balance = (parseFloat(state.recordCount.balance) - record.amount).toFixed(2)
                            }
                        }
                    })
                    break
                case 'transfer':
                    state.accountList.map(function (account, index) {
                        if (account.id === record.spendingAccount) {
                            state.accountList[index]['balance'] = (parseFloat(state.accountList[index]['balance']) + record.amount).toFixed(2)
                        } else if (account.id === record.incomeAccount) {
                            state.accountList[index]['balance'] = (parseFloat(state.accountList[index]['balance']) - record.amount).toFixed(2)
                        }
                    })
                    break
                case 'change': // 余额变更的数据在editAccount中生成
                    state.accountList.map(function (account, index) {
                        if (account.id === record.accountId) {
                            if (record.amountType === 'spending') {
                                state.accountList[index]['balance'] = (parseFloat(state.accountList[index]['balance']) + record.amount).toFixed(2)
                                state.recordCount.spending = (parseFloat(state.recordCount.spending) - record.amount).toFixed(2)
                                state.recordCount.balance = (parseFloat(state.recordCount.balance) + record.amount).toFixed(2)
                            } else {
                                state.accountList[index]['balance'] = (parseFloat(state.accountList[index]['balance']) - record.amount).toFixed(2)
                                state.recordCount.income = (parseFloat(state.recordCount.income) - record.amount).toFixed(2)
                                state.recordCount.balance = (parseFloat(state.recordCount.balance) - record.amount).toFixed(2)
                            }
                        }
                    })
                    break
            }
            // 检测更新minDate
            state.recordList = state.recordList.filter((item) => {
                return item.id !== id
            })
            if (state.recordList.length === 0) { // 如果删除了所有记录，重置记录主键和清除最小时间
                state.primaryKey.nextRecordId = 0
                state.recordCount.minDate = ''
            } else {
                state.recordCount.minDate = utils.getMinByArrayField(state.recordList, 'recordTime')
            }
        },
        createType (state, type) {
            type.id = state.primaryKey.nextTypeId
            state.typeList.push(type)
            state.primaryKey.nextTypeId++
        },
        editType (state, type) {
            state.typeList.map(function (typeItem, index) {
                if (typeItem.id === type.id) {
                    state.typeList[index] = Object.assign({}, typeItem, type)
                }
            })
        },
        deleteType (state, id) {
            // 删除子分类
            let self = this
            state.subTypeList.map(function (subType) {
                if (subType.parentId === id) {
                    self.commit('deleteSubType', subType.id)
                }
            })
            state.typeList = state.typeList.filter((item) => {
                return item.id !== id
            })
        },
        createSubType (state, subType) {
            subType.id = state.primaryKey.nextSubTypeId
            state.subTypeList.push(subType)
            state.primaryKey.nextSubTypeId++
        },
        editSubType (state, subType) {
            state.subTypeList.map(function (subTypeItem, index) {
                if (subTypeItem.id === subType.id) {
                    state.subTypeList[index] = Object.assign({}, subTypeItem, subType)
                }
            })
        },
        deleteSubType (state, subId) {
            // 删除该子分类关联的记录（回滚后删除）
            let self = this
            state.recordList.map(function (record) {
                switch (record.type) {
                    case 'spending':
                    case 'income':
                        if (record.childId === subId) {
                            self.commit('deleteRecord', record.id)
                        }
                        break
                }
            })
            state.subTypeList = state.subTypeList.filter((item) => {
                return item.id !== subId
            })
        },
        setAccountList (state, payload) {
            state.accountList = payload
        },
        setAccountItem (state, item) {
            state.accountList.map(function (subTypeItem, index) {
                if (subTypeItem.id === item.id) {
                    state.accountList[index] = Object.assign([], item.data)
                }
            })
        },
        createAccount (state, account) {
            account.id = state.primaryKey.nextAccountId
            state.accountList.push(account)
            state.primaryKey.nextAccountId++
        },
        editAccount (state, account) {
            let self = this
            state.accountList.map(function (accountItem, index) {
                if (accountItem.id === account.id) {
                    // <!-- 插入 余额变更记录 -->
                    let record = {
                        type: 'change',
                        icon: 'after-sale',
                        name: '余额变更',
                        accountId: account.id,
                        // amount: ,
                        note: '',
                        recordTime: new Date().getTime()
                    }
                    if (account.balance > accountItem.balance) {
                        record.amount = (account.balance - accountItem.balance)
                        record.amountType = 'income'
                    } else {
                        record.amount = accountItem.balance - account.balance
                        record.amountType = 'spending'
                    }
                    self.commit('createRecord', record)
                    // <!-- end 余额变更记录 -->
                    delete account.accountId
                    state.accountList[index] = Object.assign({}, accountItem, account)
                }
            })
        },
        deleteAccount (state, accountId) {
            let self = this
            // 删除该账户关联的记录（回滚后删除）
            state.recordList.map(function (record) {
                switch (record.type) {
                    case 'spending':
                    case 'income':
                    case 'change':
                        if (record.accountId === accountId) {
                            self.commit('deleteRecord', record.id)
                        }
                        break
                    case 'transfer':
                        if (record.spendingAccount === accountId || record.incomeAccount === accountId) {
                            self.commit('deleteRecord', record.id)
                        }
                        break
                }
            })
            state.accountList = state.accountList.filter((item) => {
                return item.id !== accountId
            })
        }
    },
    actions: {},
    plugins: [vuexLocal.plugin]
})
