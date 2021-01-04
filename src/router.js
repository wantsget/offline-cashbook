import Vue from 'vue'
import Router from 'vue-router'
import homeBill from './views/home/Bill.vue'
import homeBuild from './views/home/Build.vue'
import accountIndex from './views/account/Index.vue'
import settingIndex from './views/setting/Index.vue'
import settingTypeList from './views/setting/type/List.vue'
import settingTypeEdit from './views/setting/type/Edit.vue'
import settingAccountList from './views/setting/account/List.vue'
import settingAccountEdit from './views/setting/account/Edit.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'homeBill',
      component: homeBill
    },
    {
      path: '/report',
      name: 'reportIndex',
      component: () => import('./views/report/Index.vue')
    },
    {
      path: '/record/create',
      name: 'recordCreate',
      component: () => import('./views/record/create/Index.vue')
    },
    {
      path: '/record/edit',
      name: 'recordEdit',
      component: () => import('./views/record/edit/Index.vue')
    },
    {
      path: '/account',
      name: 'accountIndex',
      component: accountIndex
    },
    {
      path: '/setting',
      name: 'settingIndex',
      component: settingIndex,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/setting/spendingTypeList',
      name: 'settingSpendingTypeList',
      component: settingTypeList
    },
    {
      path: '/setting/incomeTypeList',
      name: 'settingIncomeTypeList',
      component: settingTypeList
    },
    {
      path: '/setting/typeEdit',
      name: 'settingTypeEdit',
      component: settingTypeEdit
    },
    {
      path: '/setting/subTypeEdit',
      name: 'settingSubTypeEdit',
      component: settingTypeEdit
    },
    {
      path: '/setting/typeCreate',
      name: 'settingTypeCreate',
      component: settingTypeEdit
    },
    {
      path: '/setting/subTypeCreate',
      name: 'settingSubTypeCreate',
      component: settingTypeEdit
    },
    {
      path: '/setting/AccountList',
      name: 'settingAccountList',
      component: settingAccountList
    },
    {
      path: '/setting/AccountEdit',
      name: 'settingAccountEdit',
      component: settingAccountEdit
    },
    {
      path: '/setting/AccountCreate',
      name: 'settingAccountCreate',
      component: settingAccountEdit
    }
  ]
})
