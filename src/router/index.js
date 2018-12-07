import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import adminLogin from '@/components/adminLogin'


const accountManage = resolve => require(['../components/merManagement/accountManage'], resolve);
const accountDetail = resolve => require(['../components/merManagement/accountDetail'], resolve);
const audit = resolve => require(['../components/merManagement/audit'], resolve);
const merchant = resolve => require(['../components/merManagement/merchant'], resolve);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect: '/home/accountManage',
      children:[
        {path: 'accountManage', name: 'accountManage', component: accountManage},
        {path: 'accountDetail', name: 'accountDetail', component: accountDetail},
        {path: 'audit', name: 'audit', component: audit},
        {path: 'merchant', name: 'merchant', component: merchant},
      ]
    },
    {
      path: '/',
      redirect: '/adminLogin',
      name: 'adminLogin',
      component: adminLogin
    },
    {
      path: '/adminLogin',
      name: 'adminLogin',
      component: adminLogin
    },
  ]
})





