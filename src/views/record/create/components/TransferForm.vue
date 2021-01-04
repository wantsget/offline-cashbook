<template>
    <div class="transfer-form">
        <div class="transfer-field">
            <p @click="openAccountPicker('spending')">{{spendingAccountText}}</p>
            <van-icon name="arrow" class="icon"></van-icon>
            <p @click="openAccountPicker('income')">{{incomeAccountText}}</p>
        </div>
        <van-field label="金额" :value="amount" size="large" input-align="right" readonly clickable
                   @touchstart.native.stop="openNumberKeyboard"></van-field>
        <van-field label="备注" v-model="note" size="large" input-align="right" clickable></van-field>
        <van-tag size="medium" class="tag-time" @click="openTimePicker">{{dateText}}</van-tag>
        <van-button round type="info" class="btn-save" @click="saveRecord" v-if="showSaveBtn">保存</van-button>
        <!-- 账户列表 -->
        <van-popup v-model="showAccountPicker" position="bottom">
            <van-picker
                show-toolbar
                :columns="accountData"
                @confirm="setAccount"></van-picker>
        </van-popup>
        <!-- 数字键盘 -->
        <van-number-keyboard
            :show="showNumberKeyboard"
            extra-key="."
            close-button-text="完成"
            @blur="showNumberKeyboard = false"
            @input="onInput"
            @delete="onDelete">
        </van-number-keyboard>
        <!-- 时间选择器 -->
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
        name: 'TransferForm',
        data () {
            return {
                spendingAccount: 0,
                incomeAccount: 0,
                amount: '0',
                note: '',
                recordTime: new Date(),
                spendingAccountText: '请选择转出账户',
                incomeAccountText: '请选择转入账户',
                maxDate: new Date(),
                accountPickerType: 'spending',
                showAccountPicker: false,
                showNumberKeyboard: false,
                showTimePicker: false,
                showSaveBtn: true,
                screenHeight: document.body.clientHeight, // 这里是给到了一个默认值 （这个很重要），
                originHeight: document.body.clientHeight // 默认高度在watch里拿来做比较
            }
        },
        computed: {
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
            },
            accountData () {
                return this.$utils.array_column(this.$store.state.accountList, 'name')
            }
        },
        watch: {
            screenHeight (val) {
                if (this.originHeight !== val) {
                    this.showSaveBtn = false
                } else {
                    this.showSaveBtn = true
                }
            }
        },
        mounted () {
            const that = this
            window.onresize = () => {
                return (() => {
                    window.screenHeight = document.body.clientHeight
                    that.screenHeight = window.screenHeight
                })()
            }
        },
        methods: {
            openNumberKeyboard () {
                this.showNumberKeyboard = true
            },
            openTimePicker () {
                this.showTimePicker = true
            },
            openAccountPicker (type) {
                this.accountPickerType = type
                this.showAccountPicker = true
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
            setAccount: function (name, wheel) {
                if (this.accountPickerType === 'spending') {
                    this.spendingAccountText = name
                    this.spendingAccount = this.$store.state.accountList[wheel].id
                } else {
                    this.incomeAccountText = name
                    this.incomeAccount = this.$store.state.accountList[wheel].id
                }
                this.showAccountPicker = false
            },
            setRecordTime: function (value) {
                this.recordTime = new Date(value)
                this.showTimePicker = false
            },
            saveRecord: function () {
                if (this.spendingAccount === 0 || this.incomeAccount === 0) {
                    this.$toast('请选择转入转出账户')
                    return false
                }
                if (this.spendingAccount === this.incomeAccount) {
                    this.$toast('转入转出账户不能相同')
                    return false
                }
                if (this.amount === '0') {
                    this.$toast('转账金额不能为0元')
                    return false
                }
                let data = {
                    type: 'transfer',
                    icon: 'cash-back-record',
                    name: this.spendingAccountText + ' 转账至 ' + this.incomeAccountText,
                    spendingAccount: this.spendingAccount,
                    incomeAccount: this.incomeAccount,
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
    .transfer-field {
        display: flex;
        align-items: center;
        justify-items: center;
        text-align: center;
        border-bottom: 1px solid #f1f1f1;
    }

    .transfer-field p {
        flex: 3;
        font-size: 16px;
        padding: 12px 0;
        font-weight: bold;
    }

    .transfer-field .icon {
        color: #333;
        font-size: 14px;
    }

    .tag-time {
        margin: 12px;
    }

    .btn-save {
        position: fixed;
        bottom: 50px;
        left: 0;
        right: 0;
        margin: 0 auto;
        display: block;
        width: 70%;
    }
</style>
