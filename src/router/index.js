import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import adminLogin from '@/components/adminLogin'


const accountManage = resolve => require(['../components/merManagement/accountManage'], resolve);
const accountDetail = resolve => require(['../components/merManagement/accountDetail'], resolve);
const audit = resolve => require(['../components/merManagement/audit'], resolve);
const merchant = resolve => require(['../components/merManagement/merchant'], resolve);
const merManage = resolve => require(['../components/merManagement/merManage'], resolve);
const merDetail = resolve => require(['../components/merManagement/merDetail'], resolve);
const sysApp = resolve => require(['../components/merManagement/sysApp'], resolve);
const addSysApp = resolve => require(['../components/merManagement/addSysApp'], resolve);
const changeSysApp = resolve => require(['../components/merManagement/changeSysApp'], resolve);
const merRate = resolve => require(['../components/merManagement/merRate'], resolve);


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
        {path: 'merManage', name: 'merManage', component: merManage},
        {path: 'merDetail', name: 'merDetail', component: merDetail},
        {path: 'sysApp', name: 'sysApp', component: sysApp},
        {path: 'addSysApp', name: 'addSysApp', component: addSysApp},
        {path: 'changeSysApp', name: 'changeSysApp', component: changeSysApp},
        {path: 'merRate', name: 'merRate', component: merRate},
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





