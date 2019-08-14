import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import App from './../App'
import goods from './../components/goods/goods'
import ratings from './../components/ratings/ratings'
import seller from './../components/seller/seller'
Vue.use(Router)
Vue.use(VueResource) // 全局注册
export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    }
  ]
})
