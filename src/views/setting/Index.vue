<template>
    <div class="page-wrapper">
        <van-cell-group title="记账设置">
            <van-cell title="支出分类管理" to="/setting/SpendingTypeList" clickable size="large"></van-cell>
            <van-cell title="收入分类管理" to="/setting/IncomeTypeList" clickable size="large"></van-cell>
            <van-cell title="账户管理" to="/setting/AccountList" clickable size="large"></van-cell>
        </van-cell-group>
        <van-cell-group title="系统设置">
            <van-cell clickable size="large">
                <div slot="title">
                    <van-uploader accept="application/json" :after-read="inputData">
                        导入数据
                    </van-uploader>
                </div>
            </van-cell>
            <van-cell title="导出数据" @click="outputData" clickable size="large"></van-cell>
        </van-cell-group>
        <van-cell-group title="说明">
            <van-cell title="作者blog" url="https://blog.kejijie.vip/project/wallet.html" clickable size="large"></van-cell>
            <van-cell title="离线部署教程" url="https://blog.kejijie.vip/web/wallet_install.html" clickable size="large"></van-cell>
        </van-cell-group>
    </div>
</template>

<script>
    import Base64 from 'base64-utf8'
    import FileSaver from 'file-saver'

    export default {
        name: 'settingIndex',
        data () {
            return {}
        },
        computed: {
            outputState () {
                return this.$store.getters.outputState()
            }
        },
        methods: {
            outputData () {
                let data = JSON.stringify(this.outputState)
                const blob = new Blob([data], { type: '' })
                FileSaver(blob, 'ji-' + new Date().getTime() + '.json')
            },
            inputData (file) {
                let json = file.content
                let self = this
                this.$dialog.confirm({
                    message: '导入数据后原有记录将清空，请确认是否导入。'
                }).then(() => {
                    self.$toast.loading({
                        message: '导入中...',
                        forbidClick: true,
                        loadingType: 'spinner'
                    })
                    json = json.slice(json.indexOf('base64,') + 7)
                    json = Base64.decode(json)
                    let payload = JSON.parse(json)
                    self.$store.commit('importState', payload)
                    self.$toast('导入完成')
                }).catch(() => {
                    self.$toast('操作取消')
                })
            }
        }
    }
</script>

<style scoped>
</style>
