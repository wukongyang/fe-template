import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

export const layoutRoutes: Array<RouteRecordRaw> = [
  {
    path: 'index',
    name: 'index',
    meta: {
      title: 'index',
    },
    component: () => import('@/pages/index.vue'),
  },
];

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   component: () => import('@/layout/index.vue'),
  //   redirect: '/index',
  //   // 需要layout的页面
  //   children: layoutRoutes,
  // },
  // 不需要layout的页面

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
