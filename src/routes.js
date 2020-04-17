import React from 'react';

const LogOut = React.lazy(()=> import('./views/LogOut'));
const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));

const Artical = React.lazy(() => import('./views/Artical/Articals'));
const ArticalAdd = React.lazy(()=>import('./views/Artical/ArticalAdd'));
const ArticalEdit = React.lazy(()=> import('./views/Artical/ArticalEdit'));
//Category
const Category = React.lazy(()=> import('./views/Category/Category'))
const CategoryAdd = React.lazy(() => import('./views/Category/CategoryAdd'))
const CategoryEdit = React.lazy(() => import('./views/Category/CategoryEdit'))

const Register = React.lazy(() => import('./views/Register'));
const UserAdd = React.lazy(() => import('./views/Users/User.add'));
const UserEdit = React.lazy(() => import('./views/Users/User.edit'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/admin/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/logout', name: 'Dashboard', component: LogOut },
  { path: '/admin/category', name: 'Artical', component: Category },
  { path: '/admin/category-add', name: 'Category Add', component: CategoryAdd },
  { path: '/admin/category-edit', name: 'Category Edit', component: CategoryEdit },
  { path: '/admin/artical', name: 'Artical', component: Artical },
  { path: '/admin/atical-add', name: 'Artical Add', component: ArticalAdd },
  { path: '/admin/artical-edit/:id', name: 'Artical Edit', component: ArticalEdit },
  { path: '/user-add', name: 'User Add', component: UserAdd },
  { path: '/admin/users', name: 'Users', component: Users },
  { path: '/users-edit/:id', name: 'User Edit', component: UserEdit },
];

export default routes;
