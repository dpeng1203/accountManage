import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import adminLogin from '@/components/adminLogin'


const accountManage = resolve => require(['../components/merManagement/accountManage'], resolve);
const accountDetail = resolve => require(['../components/merManagement/accountDetail'], resolve);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      children:[
        {path: 'accountManage', name: 'accountManage', component: accountManage},
        {path: 'accountDetail', name: 'accountDetail', component: accountDetail},
      ]
    },
    {
      path: '/adminLogin',
      name: 'adminLogin',
      component: adminLogin
    },
    {
      path: '/',
      redirect: '/adminLogin',
      name: 'adminLogin',
      component: adminLogin
    }
  ]
})





