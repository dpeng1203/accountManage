import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import adminLogin from '@/components/adminLogin'


const audit = resolve => require(['../components/merManagement/audit'], resolve);
const merchant = resolve => require(['../components/merManagement/merchant'], resolve);
const merManage = resolve => require(['../components/merManagement/merManage'], resolve);
const merDetail = resolve => require(['../components/merManagement/merDetail'], resolve);
const sysApp = resolve => require(['../components/merManagement/sysApp'], resolve);
const addSysApp = resolve => require(['../components/merManagement/addSysApp'], resolve);
const changeSysApp = resolve => require(['../components/merManagement/changeSysApp'], resolve);
const merRate = resolve => require(['../components/merManagement/merRate'], resolve);
const billDetail = resolve => require(['../components/merManagement/billDetail'], resolve);
const oneBillDetail = resolve => require(['../components/merManagement/oneBillDetail'], resolve);
const dataDetail = resolve => require(['../components/merManagement/dataDetail'], resolve);
const channel = resolve => require(['../components/merManagement/channel'], resolve);
const payBank = resolve => require(['../components/merManagement/payBank'], resolve);

//代理管理
const agentList = resolve => require(['../components/agent/agentList'], resolve);
const addAgent = resolve => require(['../components/agent/addAgent'], resolve);
const childAgent = resolve => require(['../components/agent/childAgent'], resolve);
const addChildAgent = resolve => require(['../components/agent/addChildAgent'], resolve);



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect: '/home/dataDetail',
      children:[
        {path: 'audit', name: 'audit', component: audit},
        {path: 'merchant', name: 'merchant', component: merchant},
        {path: 'merManage', name: 'merManage', component: merManage},
        {path: 'merDetail', name: 'merDetail', component: merDetail},
        {path: 'sysApp', name: 'sysApp', component: sysApp},
        {path: 'addSysApp', name: 'addSysApp', component: addSysApp},
        {path: 'changeSysApp', name: 'changeSysApp', component: changeSysApp},
        {path: 'merRate', name: 'merRate', component: merRate},
        {path: 'billDetail', name: 'billDetail', component: billDetail},
        {path: 'oneBillDetail', name: 'oneBillDetail', component: oneBillDetail},
        {path: 'dataDetail', name: 'dataDetail', component: dataDetail},
        {path: 'channel', name: 'channel', component: channel},
        {path: 'payBank', name: 'payBank', component: payBank},

        //  代理管理
        {path: 'agentList', name: 'agentList', component: agentList},
        {path: 'addAgent', name: 'addAgent', component: addAgent},
        {path: 'childAgent', name: 'childAgent', component: childAgent},
        {path: 'addChildAgent', name: 'addChildAgent', component: addChildAgent},

      ]
    },
    {
      path: '/',
      redirect: '/adminLogin'
    },
    {
      path: '/adminLogin',
      name: 'adminLogin',
      component: adminLogin
    },
  ]
})





