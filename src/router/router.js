import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import Home from '@/components/Home'
import Registration from '@/components/Auth/Registration'
import Login from '@/components/Auth/Login'
import Ad from '@/components/Ads/Ad'
import AdList from '@/components/Ads/AdList'
import NewAd from '@/components/Ads/NewAd'
import Orders from '@/components/User/Orders'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/ad/:id',
      props: true, // свойство для доступа к id внутри компонента
      name: 'Ad',
      component: Ad
    },
    {
      path: '/list',
      name: 'AdList',
      component: AdList
    },
    {
      path: '/new',
      name: 'NewAd',
      component: NewAd
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders,
    },
  ]
})
