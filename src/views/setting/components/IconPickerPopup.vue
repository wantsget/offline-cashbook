<template>
  <van-popup v-model="showIconPanel" position="bottom" :style="{ height: '100%' }">
    <van-tabs class="reset-van-tabs" swipeable>
      <van-tab v-for="(column, index) in iconColumn" :key="index" :title="column.title">
        <van-grid :gutter="4" :column-num="4" clickable square>
          <van-grid-item
            v-for="(icon, cIndex) in column.icons"
            :key="cIndex"
            :icon="icon"
            v-on:click="$emit('clickIcon', icon)"
          ></van-grid-item>
        </van-grid>
      </van-tab>
    </van-tabs>
  </van-popup>
</template>

<script>
    export default {
        name: 'IconPickerPopup',
        data () {
            return {
            }
        },
        props: {
            showIconPanel: {
                type: Boolean,
                default: function () {
                    return false
                }
            },
            iconColumn: {
                type: Array,
                default: function () {
                    return [{
                        title: '分类一',
                        icons: ['location-o', 'like-o', 'star-o', 'phone-o', 'setting-o', 'fire-o', 'coupon-o', 'cart-o',
                                'location-o', 'like-o', 'star-o', 'phone-o', 'setting-o', 'fire-o', 'coupon-o', 'cart-o',
                                'location-o', 'like-o', 'star-o', 'phone-o', 'setting-o', 'fire-o', 'coupon-o', 'cart-o',
                                'location-o', 'like-o', 'star-o', 'phone-o', 'setting-o', 'fire-o', 'coupon-o', 'cart-o']
                    }, {
                        title: '分类二',
                        icons: ['shopping-cart-o', 'cart-circle-o', 'friends-o', 'gem-o', 'point-gift-o', 'send-gift-o']
                    }]
                }
            }
        }
    }
</script>

<style scoped>
  .reset-van-tabs{
    height: inherit;
  }
  .reset-van-tabs >>> .van-tabs__content{
    height: calc(100% - 1.173rem);
    overflow-y: scroll;
  }
</style>
