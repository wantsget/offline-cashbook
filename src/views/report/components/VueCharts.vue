<template>
    <div :id="idAttr"></div>
</template>

<script>
    export default {
        name: 'VueCharts',
        data () {
            return {
                idAttr: 'charts_' + (new Date().getTime() + Math.ceil(Math.random() * 89999999999 + 10000000000)),
                showChart: true
            }
        },
        methods: {
            /**
             *
             * @param params
             * @returns Vue.$echarts
             */
            init (params) {
                params.theme = params.theme || ''
                if (this.$utils.isEmpty(params.options)) {
                    throw new Error('options未定义')
                }
                let elementById = document.getElementById(this.idAttr)
                let echarts = this.$echarts.init(elementById, params.theme, {
                    width: params.width || 'auto',
                    height: params.height || 'auto'
                })
                echarts.setOption(params.options)
                return echarts
            }
        }
    }
</script>

<style scoped>
    div {
        min-height: 240px;
    }
</style>
