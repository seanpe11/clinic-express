import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true,
    },
  },
  {
    path: '/patients/envelope/:id',
    name: 'PatientEnvelope',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PatientEnvelope.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/patients/visits/:id/:visit_id',
    component: () => import('../views/Visit.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/patient/visit/files',
    component: () => import('../views/SupportFiles.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath },
      });
    } else {
      const user = localStorage.getItem('isAdmin');
      if (to.matched.some((record) => record.meta.isAdmin)) {
        if (user === true) { // true = is an admin
          // next({ path: '/' }) go to admin page
          next();
        } else {
          next({ path: '/' });
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next({ });
    } else {
      next({ path: '/' });
    }
  } else {
    next();
  }
});

export default router;
