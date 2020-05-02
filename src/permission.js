import router from './router'
import store from './store'
import { getToken } from './utils/localstore'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// const whiteList = ['/login', '/auth-redirect']
NProgress.configure({ showSpinner: false })
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.state.user.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const roles = await store.dispatch('getInfo')
          const routes = await store.dispatch('getRoutes', roles)
          console.log(routes)
          router.addRoutes(routes)
          next({ ...to, replace: true })
          NProgress.done()
        } catch (err) {
          console.log(err)
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next()
      NProgress.done()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
  NProgress.done()

  // if (to.path === '/login') {
  //   next()
  //   NProgress.done()
  //   return
  // }
  // if (!getToken()) {
  //   next({ path: '/login' })
  //   NProgress.done()
  // } else {
  //   console.log(router, '-----router')
  //   try {
  //     console.log(to)
  //     const roles = await store.dispatch('getInfo')
  //     const routes = await store.dispatch('getRoutes', roles)
  //     // console.log(routes, '------路由守卫')
  //     router.addRoutes(routes)
  //     console.log(router, '------op')
  //     next()
  //     NProgress.done()
  //   } catch (err) {
  //     console.log(err)
  //     location.reload()
  //   }
  // }

  // if (getToken()) {
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     // determine whether the user has obtained his permission roles through getInfo
  //     const hasRoles = store.getters.roles && store.getters.roles.length > 0
  //     if (hasRoles) {
  //       next()
  //     } else {
  //       try {
  //         // get user info
  //         // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
  //         const roles = await store.dispatch('getInfo')

  //         // generate accessible routes map based on roles
  //         const routes = await store.dispatch('getRoutes', roles)

  //         // dynamically add accessible routes
  //         router.addRoutes(routes)

  //         // hack method to ensure that addRoutes is complete
  //         // set the replace: true, so the navigation will not leave a history record
  //         next({ ...to, replace: true })
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token */
  //   NProgress.done()
  //   next()
  //   // if (whiteList.indexOf(to.path) !== -1) {
  //   //   // in the free login whitelist, go directly
  //   //   next()
  //   // } else {
  //   //   // other pages that do not have permission to access are redirected to the login page.
  //   //   next(`/login?redirect=${to.path}`)
  //   //
  //   // }
  // }
})
