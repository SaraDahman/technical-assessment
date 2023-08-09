import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Books from '../components/Books.vue';
import Archived from '../components/Archived.vue';
import AddBook from '../components/AddBook.vue';
import OneBook from '../components/OneBook.vue';


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'signUp',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: '',
        component: Books,
        name: 'books',
      },
      {
        path: 'archived',
        component: Archived,
        name: 'archived'
      },
      {
        path: 'add-book',
        component: AddBook,
        name: 'add-book'
      },
      {
        path: ':id',
        component: OneBook,
        name: 'oneBook'

      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
