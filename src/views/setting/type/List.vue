<template>
  <div class="page-wrapper type-list-wrapper">
    <CellList v-bind:data="TypeListData" v-on:clickChild="clickChild" v-on:clickParent="clickParent"></CellList>
    <div class="option-wrap">
      <van-button type="primary" size="large" icon="plus" text="添加分类" class="reset-btn-add" v-on:click="createParent"></van-button>
    </div>
    <van-action-sheet :round="false" v-model="showActionSheet" :title="actionSheetTitle" :actions="actionOptions" v-on:select="selectActionSheet" cancel-text="取消" safe-area-inset-bottom>
    </van-action-sheet>
  </div>
</template>

<script>
    import CellList from '../components/CellList.vue'
    export default {
        name: 'settingTypeList',
        components: {
            CellList
        },
        data: function () {
            return {
                actionSheetTitle: '',
                showActionSheet: false,
                actionOptions: [],
                selectItem: {}
            }
        },
        computed: {
            TypeListData () {
                let type = (this.$route.name === 'settingSpendingTypeList') ? 'spending' : 'income'
                let title = (type === 'spending') ? '支出分类管理' : '收入分类管理'
                this.$store.commit('setNavigationBarTitle', title)
                return this.$store.getters.completeTypeList(type)
            }
        },
        mounted () {
            this.$store.commit('setNavigationBarBoldBorder')
        },
        methods: {
            // 点击子分类
            clickChild (e) {
                let actions = []
                if (e.id === undefined) { // 父类下不存在子分类
                    this.actionSheetTitle = ''
                    actions = Object.assign([], [
                        { name: '添加' }
                    ])
                } else {
                    this.actionSheetTitle = e.title
                    actions = [
                        { name: '编辑' },
                        { name: '删除', color: '#f44336' }
                    ]
                }
                this.showActionSheet = true
                this.actionOptions = Object.assign([], actions)
                this.selectItem = Object.assign(e, { isParent: false })
            },
            clickParent (e) {
                this.showActionSheet = true
                this.actionOptions = Object.assign([], [
                    { name: '添加' },
                    { name: '编辑' },
                    { name: '删除', color: '#f44336' }
                ])
                this.selectItem = Object.assign(e, { isParent: true })
            },
            selectActionSheet (e) {
                let self = this
                let redirect
                switch (e.name) {
                case '添加': // 此处的添加只处理添加子分类
                    let type = (this.$route.name === 'settingSpendingTypeList') ? 'spending' : 'income'
                    let parentId = this.selectItem.parentId || this.selectItem.id
                    return this.$router.push({ name: 'settingSubTypeCreate', params: { type: type, parentId: parentId, parentName: this.selectItem.name } })
                case '编辑':
                    redirect = this.selectItem.isParent ? 'settingTypeEdit' : 'settingSubTypeEdit'
                    return this.$router.push({ name: redirect, params: { id: this.selectItem.id } })
                case '删除':
                    return this.$dialog.confirm({
                        message: '确定删除 ' + this.selectItem.name + ' 吗？',
                        showCancelButton: true,
                        beforeClose (action, done) {
                            if (action === 'confirm') {
                                let event = self.selectItem.isParent ? 'deleteType' : 'deleteSubType'
                                self.$store.commit(event, self.selectItem.id)
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
            },
            createParent () { // 创建父分类
                let type = (this.$route.name === 'settingSpendingTypeList') ? 'spending' : 'income'
                return this.$router.push({ name: 'settingTypeCreate', params: { type: type } })
            }
        }
    }
</script>

<style scoped>
.type-list-wrapper{
  background: #f1f1f1;
}
.option-wrap{
  display: block;
  overflow: hidden;
  padding: 12px;
  background: #f1f1f1;
}
</style>
