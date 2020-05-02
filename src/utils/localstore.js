const KEY = 'token'
const EMAIL = 'emai'
export const setToken = (token) => {
  window.localStorage.setItem(KEY, token)
}
export const getToken = (token) => {
  return window.localStorage.getItem(KEY)
}
export const setEmail = (email) => {
  window.localStorage.setItem(EMAIL, email)
}
export const getEmail = (email) => {
  return window.localStorage.getItem(EMAIL)
}
