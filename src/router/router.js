import Vue from 'vue'
import Router from 'vue-router'
import Address from '../components/Address.vue'
import Home from '../components/Home.vue'
import Todolist from '../components/Todolist.vue'
import Diary from '../components/Diary.vue'
import Entries from '../components/Entries.vue'
import Calendar from '../components/Calendar.vue'
import Write from '../components/Write.vue'

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
            path: '/address',
            component: Address
        },
        {
            path: '/todolist',
            component: Todolist
        }
    ]
})

export default router
