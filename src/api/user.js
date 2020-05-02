import { createAPI } from '@/utils/request'
// 注册
export const regedit = (data) => {
  return new Promise((resolve, reject) => {
    resolve(createAPI('/regedit', 'post', data))
  })
}
// 发送邮件
export const sendemail = (data) => {
  return new Promise((resolve, reject) => {
    resolve(createAPI(`/sendemail?email=${data}`, 'get'))
  })
}
// 登录
export const login = (data) => {
  return createAPI('/login', 'post', data)
  // return new Promise((resolve, reject) => {
  //   resolve(createAPI('/login', 'post', data))
  // })
}
// 拉取权限
export const getInfo = (data) => {
  return new Promise((resolve, reject) => {
    resolve(createAPI(`/getInfo?email=${data}`, 'get'))
  })
}
// 拉去路由表
export const getRoutes = (data) => {
  return new Promise((resolve, reject) => {
    resolve(createAPI('/getroutes', 'get'))
  })
}
