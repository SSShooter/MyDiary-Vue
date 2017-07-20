import Vue from 'vue'
import Router from 'vue-router'
import Phonebook from '../views/Phonebook.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Todolist from '../views/Todolist.vue'
import Diary from '../views/Diary.vue'
import Entries from '../views/Entries.vue'
import Calendar from '../views/Calendar.vue'
import Write from '../views/Write.vue'
import Gallery from '../views/Gallery.vue'
import Img from '../views/Img.vue'
import Setting from '../views/Setting.vue'
import Help from '../views/Help.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/diary',
      component: Diary,
      children: [{
        path: 'entries',
        component: Entries
      },
      {
        path: 'calendar',
        component: Calendar
      },
      {
        path: 'write',
        component: Write
      }]
    },
    {
      path: '/phonebook',
      component: Phonebook
    },
    {
      path: '/todolist',
      component: Todolist
    },
    {
      path: '/gallery',
      component: Gallery
    },
    {
      path: '/img',
      component: Img
    },
    {
      path: '/setting',
      component: Setting
    },
    {
      path: '/help',
      component: Help
    }
  ]
})

export default router
