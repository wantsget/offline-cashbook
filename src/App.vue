<template>
  <div id="app" :class="appExtraClass">
    <NavigationBar v-if="showNavigationBar"></NavigationBar>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" class="page-wrapper"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" class="page-wrapper"></router-view>
    <TabBar v-if="showTabBar"></TabBar>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import TabBar from './components/TabBar.vue'
import NavigationBar from './components/NavigationBar.vue'
export default {
  name: 'App',
  components: {
    TabBar,
    NavigationBar
  },
  data () {
    return {
      appExtraClass: '1'
    }
  },
  // 监听,当路由发生变化的时候执行
  watch: {
    '$route' (to) {
      this.$store.commit('updateAppBarStatus', to.path)
      if (this.showNavigationBar) {
        this.appExtraClass = 'hasNavigationBar'
      } else if (this.showTabBar) {
        this.appExtraClass = 'hasTabBar'
      }
    }
  },
  computed: {
    ...mapState({
      showNavigationBar: state => state.showNavigationBar,
      showTabBar: state => state.showTabBar
    })
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
html,body{
  display: block;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: block;
  height: 100%;
}
.hasTabBar .page-wrapper{
  height: calc(100% - 51px);
}
.hasNavigationBar .page-wrapper{
  height: calc(100% - 46px);
}
.page-wrapper {
  display: block;
  overflow: auto;
  height: 100%;
  -webkit-overflow-scrolling: touch;
}
</style>
