import Vue from 'vue'

export function paginatedNews ({state}) {
  return Vue.prototype.$axios.get(`news?_start=${state.start}&_end=${parseInt(state.start) + parseInt(state.limit)}`)
}

export function allNews () {
  return Vue.prototype.$axios.get(`news`)
}
