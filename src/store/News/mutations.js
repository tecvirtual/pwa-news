import {uniqBy} from 'lodash'

export function setStart (state, start) {
  state.start = start
}

export function setLimit (state, limit) {
  state.limit = limit
}

export function setNews (state, data) {
  if ( state.start === 0) {
    state.news = data
  } else {
    let news = state.news.concat(data)
    state.news = uniqBy(news, function (n) {
      return n.id
    })
  }
}

export function setOfflineNews (state, offlineNews) {
  state.offlineNews = offlineNews
}

export function setSingleNew (state, singleNew) {
  state.singleNew = singleNew
}

