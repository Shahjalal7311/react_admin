import React from 'react';

const LogOut = React.lazy(()=> import('./views/LogOut'));
const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Register = React.lazy(() => import('./views/Register'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/logout', name: 'Dashboard', component: LogOut },
  { path: '/user-add', name: 'Dashboard', component: Register },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
