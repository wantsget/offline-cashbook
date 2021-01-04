<template>
  <van-nav-bar
    id="navigationBar"
    :class="navigationBar.extraClass"
    :title="navigationBar.title"
    left-arrow
    @click-left="onClickLeft">
  </van-nav-bar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'NavigationBar',
  data () {
    return {}
  },
  computed: {
    ...mapState({
      navigationBar: state => state.navigationBar
    })
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.bold-border-line{
  border-bottom: 5px solid #f1f1f1;
}
</style>
