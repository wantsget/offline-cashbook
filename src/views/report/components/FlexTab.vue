<template>
    <div class="flex-tab">
        <div v-for="(tab, index) in tabs"
             :key="index"
             class="tab-item"
             :class="activeTabIndex === index ? 'active' : ''"
             @click="handlerChange(index)">
            <p class="sub-title">{{tab.subTitle}}</p>
            <p class="title">{{tab.title}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FlexTab',
        data () {
            return {
                tabs: [],
                activeTabIndex: 0
            }
        },
        methods: {
            render (params) {
                if (!params) {
                    return false
                } else if (Object.prototype.toString.call(params) === '[object Array]') {
                    this.activeTabIndex = 0
                    this.tabs = params
                }
            },
            handlerChange (index) {
                this.activeTabIndex = index
                this.$emit('change', this.tabs[index])
            }
        }
    }
</script>

<style scoped>
    .flex-tab {
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
        align-items: center;
        justify-items: center;
        border-bottom: 5px solid #f5f5f5;
        text-align: center;
    }
    .flex-tab .tab-item {
        position: relative;
        flex: 1;
        padding: 0 40px;
        margin: 10px 0;
        filter: grayscale(100%);
        opacity: 0.3;
    }
    .flex-tab .active {
        filter: grayscale(0);
        opacity: 1;
    }
    .flex-tab .active:before{
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom:-10px;
        margin: 0 auto;
        display: block;
        height: 3px;
        width: 65%;
        background-color: rgb(15,134,245);
    }
    .tab-item + .tab-item{
        border-left: 1px solid #f0f0f0;
    }
    .flex-tab .tab-item .sub-title{
        font-size: 14px;
        margin-bottom: 5px;
    }
    .flex-tab .tab-item .title{
        font-size: 18px;
    }
    .flex-tab .tab-item .title:before{
        font-size: 16px;
        content: "￥"
    }
</style>
