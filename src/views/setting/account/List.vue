<template>
  <div class="page-wrapper">
    <div class="account-card" v-for="(account, index) in accountList" v-bind:key="index" @click="clickAccount(account)">
      <van-icon :name="account.icon" size="24" class="icon"></van-icon>
      <div class="name">{{account.name}}</div>
      <div class="balance">{{account.balance}}</div>
    </div>
    <van-button icon="plus" type="primary" class="btn-add-account" text="添加账户" @click="createAccount" block></van-button>

    <van-action-sheet :round="false" v-model="showActionSheet" :title="actionSheetTitle" :actions="actionOptions" v-on:select="selectActionSheet" cancel-text="取消" safe-area-inset-bottom>
    </van-action-sheet>
  </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'settingAccountList',
        data: function () {
            return {
                actionSheetTitle: '',
                showActionSheet: false,
                actionOptions: [{ name: '编辑' }, { name: '删除', color: '#f44336' }],
                selectItem: {}
            }
        },
        computed: {
            ...mapState({
                accountList: state => state.accountList
            })
        },
        mounted () {
            this.$store.commit('setNavigationBarTitle', '账户管理')
        },
        methods: {
            clickAccount (account) {
                this.showActionSheet = true
                this.selectItem = account
            },
            createAccount () {
                return this.$router.push({ name: 'settingAccountCreate' })
            },
            selectActionSheet (e) {
                let self = this
                switch (e.name) {
                case '编辑':
                    return this.$router.push({ name: 'settingAccountEdit', params: { id: this.selectItem.id } })
                case '删除':
                    return this.$dialog.confirm({
                        message: '确定删除 ' + this.selectItem.name + ' 吗？',
                        showCancelButton: true,
                        beforeClose (action, done) {
                            if (action === 'confirm') {
                                self.$store.commit('deleteAccount', self.selectItem.id)
                                self.$toast.success('删除成功')
                                self.showActionSheet = false
                                done()
                            } else {
                                self.showActionSheet = false
                                done()
                            }
                        }
                    })
                default:
                    this.$toast.fail('未知操作')
                }
            }
        }
    }
</script>

<style scoped>
  .account-card{
    display: flex;
    margin: 20px 16px;
    height: 64px;
    box-shadow: 0 0 7px #e1e1e1;
    border-radius: 5px;
  }
  .account-card .icon{
    display: flex;
    align-items: center;
    margin: 0 20px;
  }
  .account-card .name{
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    line-height: 1;
  }
  .account-card .balance{
    margin-left: auto;
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-items: right;
    font-size: 18px;
    /*font-weight: bold;*/
    line-height: 1;
    color:#aaa;
  }
  .btn-add-account{
    margin: 0 auto;
    width: calc(100% - 32px);
  }
</style>
