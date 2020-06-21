import Vue from 'vue'

export function login (context, user) {
  return Vue.prototype.$axios.post(`login`, user)
}

export function register (context, user) {
  return Vue.prototype.$axios.post(`register`, user)
}
