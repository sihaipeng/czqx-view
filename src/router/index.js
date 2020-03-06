import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/page/layout'
import User from '@/components/user/user'
import Role from '@/components/role/role'
import Login from '@/page/login'
import Menu from '@/components/menu/menu'

Vue.use(Router)
export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
    },
    {
      path:'/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      component: Layout,
      name: '系统管理',
      children:[
        {path:'/user/list',component: User,name: '用户管理'},
        {path:'/role/list',component: Role,name: '角色管理'},
        {path:'/menu/list',component: Menu,name: '菜单管理'}
        ]
    }
  ]
})
