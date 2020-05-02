import { getToken, setToken, setEmail, getEmail } from '@/utils/localstore'
import { getInfo, login, getRoutes } from '@/api/user'
import Layout from '@/views/Layout'
const loadView = (view) => { // 路由懒加载
  return () => import(`@/views/${view}`)
}
const dynamicRoute = (routes) => {
  // routes.forEach(item => {
  //   if (item.name && item.name === 'Layout') {
  //     item.component = Layout
  //   } else {
  //     // const component = item.component
  //     // loadView(component)
  //     item.component = '1111'
  //   }
  //   if (item.children) {
  //     dynamicRoute(item.children)
  //   }
  // })
  // const asyncRoutes = routes

  // return asyncRoutes
  const accessedRouters = routes.filter(router => {
    if (router.component !== 'undefind') {
      if (router.name && router.name === 'Layout') { // Layout组件特殊处理
        router.component = Layout
      } else {
        if (!router.children || !router.children.length) {
          const component = router.component
          router.component = loadView(component)
        }
      }
    }
    if (router.children && router.children.length) {
      dynamicRoute(router.children)
    }
    return true
  })
  return accessedRouters
}
const hasPermission = (roles, route) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
const filterAsyncRoutes = (routes, roles) => {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
const user = {
  state: {
    token: getToken(),
    email: getEmail(),
    nickname: '',
    roles: [],
    routes: [],
    sidebar: []
  },
  mutations: {
    SET_SIDEBAR: (state, sidebar) => {
      state.sidebar = sidebar
    },
    SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    loginActions: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        login(data).then((res) => {
          const { data: { code, data: { token, email } } } = res
          commit('SET_TOKEN', token)
          commit('SET_EMAIL', email)
          setToken(token)
          setEmail(email)
          resolve(code)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    getInfo: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        getInfo(getEmail()).then((res) => {
          const { data: { data: { nickname, roles } } } = res
          commit('SET_NICKNAME', nickname)
          commit('SET_ROLES', roles)
          resolve(roles)
        })
      })
    },
    getRoutes: ({ commit, state }, roles) => {
      return new Promise((resolve, reject) => {
        getRoutes().then(res => {
          let asyncRoutes
          const { data: { data: { routes } } } = res
          if (roles.includes('admin')) {
            asyncRoutes = routes
          } else {
            asyncRoutes = filterAsyncRoutes(routes, roles)
          }
          commit('SET_SIDEBAR', asyncRoutes)
          dynamicRoute(asyncRoutes)
          resolve(asyncRoutes)
        })
      })
    }
  }
}

export default user
