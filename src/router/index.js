import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/patient',
    name: 'PatientEnvelope',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PatientEnvelope.vue'),
  },
  {
    path: '/patient/visit',
    component: () => import('../views/Visit.vue'),
  },
  {
    path: '/patient/visit/files',
    component: () => import('../views/SupportFiles.vue'),
  },
  {
    path: '/patient/add',
    name: 'AddPatient',
    component: () => import('../views/AddPatient.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
