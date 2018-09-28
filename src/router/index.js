import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import Attendance from '@/components/Attendance';
import Main from '@/components/Main';
import Login from '@/components/Login';
import Settings from '@/components/Settings';

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
        {
          path: '/settings',
          component: Settings,
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
