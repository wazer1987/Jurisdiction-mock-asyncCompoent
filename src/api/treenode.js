import { createAPI } from '@/utils/request'
export const gettreenode = (data) => {
  return new Promise((resolve, reject) => {
    resolve(createAPI(`/gettreenode?id=${data}`, 'get'))
  })
}
export const gettestdata = (data) => {
  return new Promise((resolve, reject) => {
    resolve(createAPI('/gettestdata', 'get'))
  })
}
