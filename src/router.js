import Router from 'vue-router'
import Index from './screens/Index.vue';
import Contact from './screens/Contact.vue'
import About from './screens/About.vue'



export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/contact',
            name: 'contact',
            component: Contact
        },
        {
            path: '*',
            redirect: '/'
        }

    ]
})