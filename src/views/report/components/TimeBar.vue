<template>
    <div class="time-bar">
        <van-divider class="divider" :style="{ borderColor: '#e4e4e4' }">
            <div slot="default" @click="openTimePicker">
                <van-tag size="large" color="#f5f5f5" text-color="#333" round>{{formatDate}}</van-tag>
            </div>
        </van-divider>
        <van-popup v-model="showPickerPopup" position="bottom" style="min-height:336.03px">
            <van-nav-bar
                left-text="取消"
                right-text="确定"
                @click-left="handlerCancel"
                @click-right="handlerComplete">
            </van-nav-bar>
            <div class="tab-type">
                <van-tabs type="card" v-model="activeTabIndex" @click="setPicker">
                    <van-tab title="全部" name="all"></van-tab>
                    <van-tab title="按年" name="year"></van-tab>
                    <van-tab title="按月" name="month"></van-tab>
                </van-tabs>
            </div>
            <van-picker ref="yearPicker" v-if="showYearPicker" :columns="yearColumn" @change="onChange"></van-picker>
            <van-datetime-picker
                v-if="showMonthPicker"
                v-model="currentDate"
                type="year-month"
                :min-date="minYear"
                :max-date="maxYear"
                :show-toolbar="false"
                :formatter="formatter">
            </van-datetime-picker>
        </van-popup>
    </div>
</template>

<script>
    export default {
        name: 'TimeBar',
        computed: {
            formatDate () {
                switch (this.nowType) {
                case 'year':
                    return new Date(this.timestamp).getFullYear() + '年'
                case 'month':
                    return new Date(this.timestamp).getFullYear() + '年' + (new Date(this.timestamp).getMonth() + 1) + '月'
                case 'all':
                    return '全部'
                default:
                    return ''
                }
            }
        },
        data () {
            return {
                nowType: 'month',
                activeTabIndex: 'month',
                timestamp: null,
                showPickerPopup: false,
                showYearPicker: false,
                showMonthPicker: true,
                yearColumn: [],
                minYear: null,
                maxYear: null,
                currentDate: new Date(),
                yearDate: ''
            }
        },
        methods: {
            init (params) {
                if (!params) return false
                this.timestamp = params.timestamp ? params.timestamp : new Date().getTime()
                // 设置区间
                this.minYear = this.$store.state.recordCount.minDate ? new Date(this.$store.state.recordCount.minDate) : new Date()
                this.maxYear = new Date()
                // 设置 年picker
                for (let year = this.minYear.getFullYear(); year <= this.maxYear.getFullYear(); year++) {
                    this.yearColumn.push(year)
                }
                // 首次加载触发
                this.$emit('change', {
                    type: this.nowType,
                    date: new Date(this.timestamp)
                })
            },
            render (params) {
                this.init(params)
            },
            handlerCancel () {
                this.showPickerPopup = false
            },
            handlerComplete () {
                this.nowType = this.activeTabIndex
                switch (this.nowType) {
                case 'year':
                    if (this.yearDate === '') {
                        this.yearDate = this.yearColumn[0]
                    }
                    this.timestamp = new Date().setFullYear(this.yearDate)
                    break
                case 'month':
                    this.timestamp = new Date(this.currentDate).getTime()
                    break
                case 'all':
                    this.timestamp = 9999999999999
                    break
                }
                this.handlerCancel()
                this.$emit('change', {
                    type: this.nowType,
                    date: new Date(this.timestamp)
                })
            },
            openTimePicker () {
                this.setPicker(this.nowType)
                this.showPickerPopup = true
            },
            setPicker (type) {
                this.activeTabIndex = type
                switch (type) {
                case 'year':
                    if (this.yearDate && this.$refs.yearPicker) { // 如果设置了年 则显示上次设置的值
                        this.$refs.yearPicker.setValues([this.yearDate])
                    }
                    this.showMonthPicker = false
                    this.showYearPicker = true
                    break
                case 'month':
                    this.showYearPicker = false
                    this.showMonthPicker = true
                    break
                case 'all':
                    this.showYearPicker = false
                    this.showMonthPicker = false
                    break
                default:
                    break
                }
            },
            onChange () {
                let res = this.$refs.yearPicker.getValues()
                if (Object.prototype.toString.call(res) === '[object Array]') {
                    this.yearDate = res[0]
                }
            },
            formatter (type, value) {
                if (type === 'year') {
                    return `${value}年`
                } else if (type === 'month') {
                    return `${value}月`
                }
                return value
            }
        }
    }
</script>

<style scoped>
    .tab-type {
        padding: 20px 0;
        display: block;
    }

    .popup-tool-bar .cancel {
        margin-right: auto;
    }

    .popup-tool-bar .complete {
        margin-left: auto;
    }
</style>
