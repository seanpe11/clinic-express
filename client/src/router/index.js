import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Admin from '../views/Admin.vue';
import Billing from '../views/Billing.vue';

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
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/billing',
    name: 'Billing',
    component: Billing,
    meta: {
      requiresAuth: true,
      isAdmin: true,
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
      let user = localStorage.getItem('isAdmin');
      user = (user === 'true');
      if (to.matched.some((record) => record.meta.isAdmin)) {
        if (user === true) { // true = is an admin
          console.log(user);
          // next({ path: '/admin',
          // params: { nextUrl: to.fullPath }, });
          next();
        } else {
          console.log('two');
          next({ path: '/' });
        }
      } else {
        console.log('three');
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
