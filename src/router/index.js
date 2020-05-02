import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/regedit',
    name: 'regedit',
    component: () => import('../views/regedit.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  }
  // {
  //   path: '/',
  //   name: 'Layout',
  //   redirect: '/dashboard',
  //   component: () => import('../views/Layout.vue'),
  //   meta: {
  //     roles: ['admin', 'manager', 'member'] // or you can only set roles in sub nav
  //   },
  //   children: [
  //     {
  //       path: 'dashboard',
  //       name: 'pageone',
  //       meta: {
  //         roles: ['admin', 'manager', 'member'] // or you can only set roles in sub nav
  //       },
  //       component: () => import('../views/pages/pageone.vue')
  //     },
  //     {
  //       path: '/pagetwo',
  //       name: 'pagetwo',
  //       meta: {
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       },
  //       component: () => import('../views/pages/pagetwo.vue')
  //     },
  //     {
  //       path: '/pagethree',
  //       name: 'pagethree',
  //       meta: {
  //         roles: ['admin', 'manager'] // or you can only set roles in sub nav
  //       },
  //       component: () => import('../views/pages/pagethree.vue')
  //     },
  //     {
  //       path: '/pagefour',
  //       name: 'pagefour',
  //       meta: {
  //         roles: ['admin', 'manager'] // or you can only set roles in sub nav
  //       },
  //       component: () => import('../views/pages/pagefour.vue')
  //     },
  //     {
  //       path: '/pagefive',
  //       name: 'pagefive',
  //       meta: {
  //         roles: ['admin', 'manager', 'member'] // or you can only set roles in sub nav
  //       },
  //       component: () => import('../views/pages/pagefive.vue')
  //     }
  //   ]
  // }
  // {
  //   path: '/404',
  //   name: '404',
  //   component: () => import('../views/pages/404.vue')
  // }
  // {
  //   path: '*',
  //   component: () => import('../views/pages/404.vue')
  // }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
