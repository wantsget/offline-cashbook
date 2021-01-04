import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import APP_CONFIG from './config/appConfig'
import './registerServiceWorker'
import 'lib-flexible'
import {
    Icon,
    Dialog,
    Toast,
    ActionSheet,
    Field,
    Picker,
    Popup,
    Grid,
    GridItem,
    NavBar,
    Tabbar,
    TabbarItem,
    Tab,
    Tabs,
    Cell,
    CellGroup,
    Collapse,
    CollapseItem,
    Row,
    Col,
    Button,
    NumberKeyboard,
    DatetimePicker,
    Uploader,
    Tag,
    Divider
} from 'vant'
import 'vant/lib/icon/local.css'
import utils from './utils/utils'
// 图表库
import echarts from 'echarts'

Vue.use(Icon).use(Button).use(Dialog).use(Toast).use(ActionSheet).use(Field)
    .use(Popup).use(NumberKeyboard).use(DatetimePicker).use(Uploader).use(Picker).use(Tag).use(Divider)
    .use(Grid).use(GridItem)
    .use(NavBar).use(Tabbar).use(TabbarItem)
    .use(Tab).use(Tabs)
    .use(Collapse).use(CollapseItem)
    .use(Cell).use(CellGroup)
    .use(Row).use(Col)
Vue.config.productionTip = false

Vue.prototype.$appConfig = APP_CONFIG
Vue.prototype.$utils = utils
Vue.prototype.$echarts = echarts

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
