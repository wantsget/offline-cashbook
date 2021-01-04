<template>
  <div class="page-wrapper">
    <van-cell-group>
      <van-field label="账户名称" v-model="name" placeholder="输入名称" size="large" input-align="right"></van-field>
      <van-field label="图标" @click="openIconPanel" disabled size="large">
        <van-icon
          slot="right-icon"
          :name="icon"
          style="font-size:0.6rem"
        >
        </van-icon>
      </van-field>
      <van-field label="余额" :value="balance" size="large" input-align="right" readonly clickable @touchstart.native.stop="openNumberKeyboard"></van-field>
    </van-cell-group>

    <van-button type="primary" size="large" :text="submitText" class="button-submit" block @click="onSubmit"></van-button>
    <IconPickerPopup v-bind:showIconPanel="showIconPanel" v-on:clickIcon="setTypeIcon"></IconPickerPopup>
    <van-number-keyboard
      :show="showNumberKeyboard"
      extra-key="."
      close-button-text="完成"
      @blur="showNumberKeyboard = false"
      @input="onInput"
      @delete="onDelete">
    </van-number-keyboard>
  </div>
</template>

<script>
    import IconPickerPopup from '../components/IconPickerPopup.vue'
    export default {
        name: 'settingAccountEdit',
        components: {
            IconPickerPopup
        },
        data () {
            return {
                id: 0,
                name: '',
                icon: '',
                balance: '0',
                action: '', // 访问动作 create|edit
                submitText: '', // 按钮文本
                showIconPanel: false,
                showNumberKeyboard: false
            }
        },
        computed: {
            account () {
                if (this.$route.params.hasOwnProperty('id')) {
                    let accountId = this.$route.params.id
                    let data = this.$utils.filterByField(this.$store.state.accountList, 'id', accountId)
                    if (data.balance === '0.00') { // 余额为0.00时直接输入数字无法编辑
                        data.balance = '0'
                    }
                    return data
                } else {
                    return {}
                }
            }
        },
        created () {
            this.action = (this.$route.name.indexOf('Edit') > -1) ? 'edit' : 'create'
            let navTitle = (this.action === 'edit') ? '编辑账户' : '创建账户'
            if (this.action === 'edit' && this.$utils.isEmpty(this.$route.params)) { // 编辑操作 未带id
                this.$toast({
                    message: '未获取到需要编辑的账户Id',
                    onClose: () => {
                        this.$router.back()
                    }
                })
                return false
            }
            this.submitText = navTitle
            this.$store.commit('setNavigationBarBoldBorder')
            this.$store.commit('setNavigationBarTitle', navTitle)
        },
        mounted () {
            if (this.action === 'edit') { // 编辑
                this.id = this.account.id
                this.name = this.account.name
                this.icon = this.account.icon
                this.balance = this.account.balance
            }
        },
        methods: {
            openIconPanel: function () {
                this.showIconPanel = true
            },
            openNumberKeyboard: function () {
                this.showNumberKeyboard = true
            },
            setTypeIcon: function (e) {
                this.showIconPanel = false
                this.icon = e
            },
            onInput: function (e) {
                if (this.balance === '0') { // 打出的第一个数字
                    if (e !== '.') { // 为数字则替换0
                        this.balance = e.toString()
                        return false
                    }
                }
                let dotIndex = this.balance.indexOf('.')
                if (e === '.' && dotIndex !== -1) { // 防止出现多个小数点
                    return false
                }
                if (dotIndex !== -1 && (this.balance.length - (dotIndex + 1)) >= 2) { // 小数点后允许2位数字
                    return false
                }
                this.balance += e.toString()
            },
            onDelete: function () {
                this.balance = this.balance.substring(0, this.balance.length - 1)
                if (this.balance === '') {
                    this.balance = '0'
                }
            },
            onSubmit: function () {
                if (this.balance.indexOf('.') === -1) { // 余额不存在 .00 时，补齐.00
                    this.balance += '.00'
                }
                if (this.balance.indexOf('.') + 1 === this.balance.length) { // 余额最后一位为小数点时，补齐00
                    this.balance += '00'
                }
                let params = {
                    name: this.name,
                    icon: this.icon,
                    balance: this.balance
                }
                if (this.action === 'edit') {
                    params.accountId = this.id
                    params.id = this.id
                    this.$store.commit('editAccount', params)
                    this.$toast.success({
                        message: '编辑成功',
                        duration: 1500,
                        onClose: () => {
                            this.$router.back()
                        }
                    })
                } else if (this.action === 'create') {
                    this.$store.commit('createAccount', params)
                    this.$toast.success({
                        message: '创建成功',
                        duration: 1500,
                        onClose: () => {
                            this.$router.go(-1)
                        }
                    })
                } else {
                    this.$toast.fail('未知操作')
                    return false
                }
            }
        }
    }
</script>

<style scoped>
.page-wrapper{
  background-color: #f1f1f1;
}
.button-submit{
  margin: 24px auto 0;
  width: 90%;
}
</style>
