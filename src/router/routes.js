
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/AppLayout.vue'),
    children: [
      { path: '', component: () => import('@/pages/Index.vue') },
      { path: 'login', component: () => import('@/pages/Login.vue') },
      { path: 'register', component: () => import('@/pages/Register.vue') },
      { path: 'news', component: () => import('@/pages/News.vue'), meta: { requiresAuth: true} },
      { path: 'news/:id', name: 'news-detail', component: () => import('@/pages/NewsDetail.vue'), meta: { requiresAuth: true} },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('@/pages/Error404.vue')
  })
}

export default routes
