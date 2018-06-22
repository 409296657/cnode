import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/pages/MainPage/MainPage'
import Topic from '@/pages/Topic/Topic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },{
      path: '/topic/:id',
      name: 'Topic',
      component: Topic
    }
  ]
})
