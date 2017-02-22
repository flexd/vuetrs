import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Ticket from '../views/Ticket'
import Queue from '../views/Queue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
    path: '/q/:name',
    component: Queue,
    name: 'queue'
    },
    {
    path: '/t/:tn',
    component: Ticket,
    name: 'ticket'
    }
  ]
})
