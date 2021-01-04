<template>
    <div class="page-wrapper">
        <TimeBar ref="timeBar" @change="timeChange"></TimeBar>
        <VueCharts ref="pieChart"></VueCharts>
        <VueCharts ref="spendingChart"></VueCharts>
    </div>
</template>

<script>
    import VueCharts from './components/VueCharts'
    import TimeBar from './components/TimeBar'
    import ChartsDataTool from '../../utils/charts-data-tool'

    export default {
        name: 'reportIndex',
        components: {
            TimeBar,
            VueCharts
        },
        data () {
            return {
                chartsTool: null
            }
        },
        mounted () {
            this.$refs.timeBar.init({})
        },
        methods: {
            timeChange (data) {
                // 消费饼图
                this.initPie(data)
                // 结余折线图
                this.initBar(data)
            },
            initPie (data) {
                let that = this
                let chartsData = null
                let title = ''
                switch (data.type) {
                case 'year':
                    title = data.date.getFullYear() + '年度消费统计'
                    chartsData = ChartsDataTool.time.getYearSpending(that, data.date)
                    break
                case 'month':
                    title = data.date.getFullYear() + '年' + (data.date.getMonth() + 1) + '月消费统计'
                    chartsData = ChartsDataTool.time.getMonthSpending(that, data.date)
                    break
                case 'all':
                    title = '历史消费统计'
                    chartsData = ChartsDataTool.time.getAllSpending(that, data.date)
                    break
                }
                let options = {
                    height: '260',
                    theme: 'light',
                    options: {
                        title: {
                            text: title,
                            x: 'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: '{b}<br/>({d}%)'
                        },
                        series: [
                            {
                                name: '',
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '50%'],
                                data: chartsData,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    }
                }
                this.$refs.spendingChart.init(options)
            },
            initBar (data) {
                let that = this
                let chartsData = null
                let title = ''
                switch (data.type) {
                case 'year':
                    title = data.date.getFullYear() + '年度结余表'
                    chartsData = ChartsDataTool.time.getYearBalance(that, data.date)
                    break
                case 'month':
                    title = '每日支出'
                    chartsData = ChartsDataTool.time.getDaySpendingByMonth(that, data.date)
                    break
                case 'all':
                    title = '历年结余表'
                    chartsData = ChartsDataTool.time.getAllTimeBalance(that)
                    break
                default:
                    return false
                }
                let xData = this.$utils.array_column(chartsData, 'name')
                let yData = this.$utils.array_column(chartsData, 'value')
                let options = {
                    height: '240',
                    theme: 'light',
                    options: {
                        title: {
                            text: title,
                            x: 'center'
                        },
                        grid: {
                            left: '1%',
                            right: '1%',
                            top: '15%',
                            bottom: '10%',
                            containLabel: true
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: '{b} ￥{c}'
                        },
                        xAxis: {
                            type: 'category',
                            data: xData
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: yData,
                            type: 'line',
                            smooth: true,
                            center: ['50%', '50%']
                        }]
                    }
                }
                this.$refs.pieChart.init(options)
            }
        }
    }
</script>

<style scoped>
    .divider {
        padding: 10px 0;
    }
</style>
