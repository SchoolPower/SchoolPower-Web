import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import Attendance from '@/components/Attendance';
import Main from '@/components/Main';
import Login from '@/components/Login';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '',
          component: Dashboard,
        },
        {
          path: '/dashboard',
          component: Dashboard,
        },
        {
          path: '/attendance',
          component: Attendance,
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ],
});
