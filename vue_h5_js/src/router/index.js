import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/index',
  },

  {
    path: '/index',
    name: 'index',
    meta: {
      title: 'index',
    },
    component: () => import('@/pages/index/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'login',
    },
    component: () => import('@/pages/login/index.vue'),
  },
  // 替代vue2中的'*'通配符路径
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHashHistory(), // history 模式则使用 createWebHistory()
  routes,
});
export default router;
