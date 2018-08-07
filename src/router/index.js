import Vue from 'vue'
import Router from 'vue-router'
import Home  from '../Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/search',
      name: 'search',
      component: ()=>import('../view/search')
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: ()=>import('../view/Detail')
    },
    {
      path: '/Publish',
      name: 'Publish',
      component: ()=>import('../view/Publish')
    },
    {
      path: '/register',
      name: 'register',
      component: ()=>import('../view/register')
    },
    {
      path: '/my',
      name: 'my',
      component: ()=>import('../view/my')
    },
  ]
})
