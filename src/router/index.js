import Vue from 'vue'
import Router from 'vue-router'
import Desktop from '@/components/Desktop/Desktop'
import TransactionStatus from '@/components/TransactionStatus'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Desktop',
      component: Desktop
    },
    {
      path: '/transactions',
      name: 'TransactionStatus',
      component: TransactionStatus
    }
  ]
})
