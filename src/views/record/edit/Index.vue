<template>
  <div class="page-wrapper">
    <SpendingForm v-if="recordData.type === 'spending'" :data="recordData" @onSubmit="editRecord"></SpendingForm>
    <IncomeForm v-if="recordData.type === 'income'" :data="recordData" @onSubmit="editRecord"></IncomeForm>
    <TransferForm v-if="recordData.type === 'transfer'" :data="recordData" @onSubmit="editRecord"></TransferForm>
  </div>
</template>

<script>
import SpendingForm from './components/SpendingForm'
import IncomeForm from './components/IncomeForm'
import TransferForm from './components/TransferForm'
export default {
  name: 'recordEdit',
  components: {
    SpendingForm,
    IncomeForm,
    TransferForm
  },
  data () {
    return {
      previousUrl: '',
      recordData: {},
      active: 0,
      tabTitle: ['支出', '收入', '内部转账']
    }
  },
  created () {
    let self = this
    if (this.$route.params.hasOwnProperty('id')) {
      let recordId = this.$route.params.id
      this.recordData = this.$utils.filterByField(this.$store.state.recordList, 'id', recordId)
    } else {
      this.$toast.fail({
        message: '获取失败',
        onClose: function () {
          self.$router.go(-1)
        }
      })
    }
    this.$store.commit('setNavigationBarTitle', '修改记录')
  },
  beforeRouteEnter (to, from, next){
    next(vm => {
      // 通过 `vm` 访问组件实例,将值传入oldUrl
      vm.previousUrl = from
    })
  },
  mounted () {
    // this.$nextTick(() => {
    //   console.log(self.previousUrl, this.previousUrl)
    // })
  },
  methods: {
    editRecord (e) {
      this.$nextTick(() => {
        this.$store.commit('editRecord', e)
        this.returnPrevious(this.previousUrl, e)
      })
    },
    returnPrevious (from, data) {
      this.$router.push({
        name: from.name,
        params: {
          month: new Date(data.recordTime)
        }
      })
    }
  }
}
</script>

<style scoped>
  .page-wrapper >>> .van-tabs{
    display: block;
    height: 100%;
  }
  .page-wrapper >>> .van-tabs .van-tabs__content{
    height: calc(100% - 44px);
  }
  .page-wrapper >>> .van-tabs .van-tabs__line{
    background-color: #2196f3;
  }
  .page-wrapper >>> .van-picker__cancel{
    visibility: hidden;
  }
</style>
