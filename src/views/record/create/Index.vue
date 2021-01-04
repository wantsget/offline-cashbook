<template>
  <div class="page-wrapper">
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="(title, index) in tabTitle" :key="index" :title="title">
        <SpendingForm v-if="index === 0" @onSubmit="createRecord"></SpendingForm>
        <IncomeForm v-if="index === 1" @onSubmit="createRecord"></IncomeForm>
        <TransferForm v-if="index === 2" @onSubmit="createRecord"></TransferForm>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
    import SpendingForm from './components/SpendingForm'
    import IncomeForm from './components/IncomeForm'
    import TransferForm from './components/TransferForm'
    export default {
        name: 'recordCreate',
        components: {
            SpendingForm,
            IncomeForm,
            TransferForm
        },
        data () {
            return {
                active: 0,
                tabTitle: ['支出', '收入', '内部转账']
            }
        },
        created () {
            this.$store.commit('setNavigationBarTitle', '记账')
        },
        methods: {
            createRecord (e) {
                this.$store.commit('createRecord', e)
                this.$router.back()
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
