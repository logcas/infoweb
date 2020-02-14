import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        component: () => import('@/views/News'),
        path: '/',
        name: 'news'
      },
      {
        component: () => import('@/views/About'),
        path: '/about',
        name: 'about'
      },
      {
        path: '/news',
        redirect: '/'
      }
    ]
  });
}