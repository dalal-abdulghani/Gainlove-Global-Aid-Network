import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'
import Toast, { POSITION } from "vue-toastification";

import 'aos/dist/aos.css'
import AOS from 'aos'

AOS.init()


import Home from './views/Home.vue'
import About from './views/About.vue'
import Gallery from './views/Gallery.vue'
import Dashboard from './views/Dashboard.vue'
import NotFound from './views/NotFound.vue'

const router = createRouter({
      history: createWebHistory(),
      routes: [
            {
                  path: '/',
                  name: 'Home',
                  component: Home
            },
            {
                  path: '/about',
                  name: 'About',
                  component: About
            },
            {
                  path: '/gallery',
                  name: 'Gallery',
                  component: Gallery
            },
          
            {
                  path: '/dashboard',
                  name: 'Dashboard',
                  component: Dashboard,
                  meta: { showNavigation: false }
            },
            {
                  path: '/:pathMatch(.*)*',
                  name: 'NotFound',
                  component: NotFound
            }
      ],
      scrollBehavior(to, from, savedPosition) {
            if (savedPosition) {
                  return savedPosition
            } else {
                  return { top: 0 }
            }
      }
})
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = localStorage.getItem('auth') !== null

  if (to.path === '/dashboard' && !isAuthenticated) {
    next({ path: '/' })
  } else {
    next()
  }
})
const app = createApp(App)

app.use(router)
app.mount('#app') 