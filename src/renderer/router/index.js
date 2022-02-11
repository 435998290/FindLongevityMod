import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: require('@/components/mainPage/mainPage').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/changeFileData',
      name: 'changeFileData',
      component: require('@/components/changeFileData/changeFileData').default
    }
  ]
})
