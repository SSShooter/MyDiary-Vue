import Vue from 'vue'
import Router from 'vue-router'
import Phonebook from '../components/Phonebook.vue'
import Home from '../components/Home.vue'
import Todolist from '../components/Todolist.vue'
import Diary from '../components/Diary.vue'
import Entries from '../components/Entries.vue'
import Calendar from '../components/Calendar.vue'
import Write from '../components/Write.vue'
import Gallery from '../components/Gallery.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
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
        }
    ]
})

export default router
