import Vue from 'vue'
import Router from 'vue-router'
import Phonebook from '../views/Phonebook'
import Login from '../views/Login'
import Home from '../views/Home'
import Todolist from '../views/Todolist'
import Diary from '../views/Diary/Index'
import Entries from '../views/Diary/Entries'
import Calendar from '../views/Diary/Calendar'
import Write from '../views/Diary/Write'
import Gallery from '../views/Gallery'
import Img from '../views/Img'
import Setting from '../views/Setting'
import Help from '../views/Help'
import About from '../views/About'

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
      children: [
        {
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
        }
      ]
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
    },
    {
      path: '/about',
      component: About
    }
  ]
})

// router.afterEach((to, from) => {
//   console.log(`从${from.path}到${to.path}跳转`)
//   let temp = ''
//   Array.prototype.map.call(document.querySelectorAll('.iconfont'), val => {
//     val.addEventListener('touchstart', e => {
//       temp = e.target.style.color
//       e.target.style.color = 'black'
//     })
//   })
//   Array.prototype.map.call(document.querySelectorAll('.iconfont'), val => {
//     val.addEventListener('touchend', e => {
//       e.target.style.color = temp
//     })
//   })
// })
export default router
