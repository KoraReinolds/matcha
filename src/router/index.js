import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/user/:id',
    name: 'user',
    component: () => import(/* webpackChunkName: "user_page" */ '../views/UserPage.vue'),
  },
  {
    path: '/search',
    name: 'main',
    component: () => import(/* webpackChunkName: "user_list" */ '../views/UserList.vue'),
  },
  {
    path: '/visitors',
    name: 'visitors',
    component: () => import(/* webpackChunkName: "history" */ '../views/History.vue'),
  },
  {
    path: '/history',
    name: 'history',
    component: () => import(/* webpackChunkName: "history" */ '../views/History.vue'),
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: () => import(/* webpackChunkName: "history" */ '../views/History.vue'),
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import(/* webpackChunkName: "chat" */ '../views/Chat.vue'),
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue'),
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "not_found" */ '../views/NotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  console.log(to.path, from.path);
  if (localStorage.getItem('user')) {
    if (to.path === '/login/' && from.path !== '/') next(from.path);
    else if (to.path === '/login/' && from.path === '/') next('/search');
    else next();
  } else if (to.path !== '/login/') next('/login/');
  else next();
});

export default router;
