<template>
  <div class="page-wrapper">
    <van-cell-group>
      <van-field label="分类名称" v-model="name" placeholder="输入名称" size="large" input-align="right"></van-field>
      <van-field label="分类图标" @click="openIconPanel" disabled size="large">
        <van-icon
          slot="right-icon"
          :name="icon"
          style="font-size:0.6rem"
        >
        </van-icon>
      </van-field>
      <van-field
        v-if="!isParent && action !== 'edit'"
        label="所属分类"
        v-model="parentName"
        placeholder="输入名称"
        size="large"
        input-align="right"
        readonly
        @click="openTypePicker"
      ></van-field>
    </van-cell-group>

    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="typeColumns"
        :value-key="name"
        @cancel="showPicker = false"
        @confirm="setParent"></van-picker>
    </van-popup>

    <van-button type="primary" size="large" :text="submitText" class="button-submit" block @click="onSubmit"></van-button>
    <IconPickerPopup v-bind:showIconPanel="showIconPanel" v-on:clickIcon="setTypeIcon"></IconPickerPopup>
  </div>
</template>

<script>
    import IconPickerPopup from '../components/IconPickerPopup.vue'
    import { mapState } from 'vuex'
    export default {
        name: 'settingTypeEdit',
        components: {
            IconPickerPopup
        },
        data () {
            return {
                name: '',
                icon: '',
                parentId: 0,
                parentName: '',
                isParent: false, // 是否为一级分类
                action: '', // 访问动作 create|edit
                submitText: '', // 按钮文本
                showPicker: false,
                showIconPanel: false,
                typeColumns: []
            }
        },
        computed: {
            TypeItem () {
                if (this.$route.params.hasOwnProperty('id')) {
                    let typeId = this.$route.params.id
                    return this.$store.getters.typeData(typeId, this.isParent)
                }
                return {}
            },
            ...mapState({
                typeList: state => state.typeList
            })
        },
        created () {
            this.isParent = (this.$route.name.indexOf('settingType') > -1)
            this.action = (this.$route.name.indexOf('Edit') > -1) ? 'edit' : 'create'
            let navTitle = (this.action === 'edit') ? '编辑分类' : '添加分类'
            if (this.action === 'edit' && this.$utils.isEmpty(this.$route.params)) { // 编辑操作 未带id
                this.$toast({
                    message: '未获取到需要编辑的分类Id',
                    onClose: () => {
                        // this.$router.back()
                    }
                })
                return false
            }
            this.submitText = navTitle
            this.$store.commit('setNavigationBarBoldBorder')
            this.$store.commit('setNavigationBarTitle', navTitle)
        },
        mounted () {
            if (this.action === 'edit') {
                this.name = this.TypeItem.name
                this.icon = this.TypeItem.icon
            }
            if (this.action === 'create' && !this.isParent) {
                this.parentId = this.$route.params.hasOwnProperty('parentId') ? this.$route.params.parentId : 0
                this.parentName = this.$route.params.hasOwnProperty('parentName') ? this.$route.params.parentName : ''
            } else if (this.action === 'edit' && !this.isParent) {
                this.parentName = this.TypeItem.parent.name
                this.parentId = this.TypeItem.parent.id
            }
            if (this.$route.params.hasOwnProperty('type')) {
                let pickerType = this.$route.params.type
                let pickerList = this.typeList.filter(item => item.type === pickerType)
                this.typeColumns = this.$utils.array_column(pickerList, 'name')
            }
        },
        methods: {
            openIconPanel: function () {
                this.showIconPanel = true
            },
            openTypePicker: function () {
                this.showPicker = true
            },
            setParent: function (selectName) {
                let selectItem = this.$utils.filterByField(this.typeList, 'name', selectName)
                if (selectItem) {
                    this.parentId = selectItem.id
                    this.parentName = selectItem.name
                    this.showPicker = false
                } else {
                    this.$toast('选择的分类不存在！')
                }
            },
            setTypeIcon: function (e) {
                this.showIconPanel = false
                this.icon = e
            },
            onSubmit: function () {
                let params = {}
                if (this.action === 'edit' && this.$route.params.hasOwnProperty('id')) {
                    params.id = this.$route.params.id
                    params.name = this.name
                    params.icon = this.icon
                    let event = this.isParent ? 'editType' : 'editSubType'
                    this.$store.commit(event, params)
                    this.$toast.success({
                        message: '编辑成功',
                        duration: 1500,
                        onClose: () => {
                            this.$router.back()
                        }
                    })
                } else if (this.action === 'create' && this.$route.params.hasOwnProperty('type')) {
                    params.type = this.$route.params.type
                    params.name = this.name
                    params.icon = this.icon
                    if (!this.isParent) params.parentId = this.parentId
                    let event = this.isParent ? 'createType' : 'createSubType'
                    this.$store.commit(event, params)
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
