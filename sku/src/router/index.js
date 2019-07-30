import Vue from 'vue'
import Router from 'vue-router'
import sign from '@/components/sign'
import warehousing from '@/components/warehousing'
import uppershelf from '@/components/uppershelf'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/sign'
    },
    {
      path: '/sign',
      name: 'sign',
      component: sign
    },
    {
      path: '/warehousing',
      name: 'warehousing',
      component: warehousing

    },
    {
      path: '/uppershelf',
      name: 'uppershelf',
      component: uppershelf

    }
  ]
})
