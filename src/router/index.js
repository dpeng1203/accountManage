import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import adminLogin from '@/components/adminLogin'

//商户管理
const merchant = resolve => require(['../components/merManagement/merchant'], resolve);
const merManage = resolve => require(['../components/merManagement/merManage'], resolve);
const merDetail = resolve => require(['../components/merManagement/merDetail'], resolve);
const merRate = resolve => require(['../components/merManagement/merRate'], resolve);

//提现列表
const cashList = resolve => require(['../components/cashList/cashList'], resolve);

//通道管理、
const channel = resolve => require(['../components/channelAndPayBank/channel'], resolve);
//代付管理
const payBank = resolve => require(['../components/channelAndPayBank/payBank'], resolve);


//主页详情
const homeDetail = resolve => require(['../components/homeDetail/homeDetail'], resolve);

//交易管理
const billDetail = resolve => require(['../components/billManage/billDetail'], resolve);
const oneBillDetail = resolve => require(['../components/billManage/oneBillDetail'], resolve);

// 系统产品管理
const sysApp = resolve => require(['../components/sysApp/sysApp'], resolve);
const addSysApp = resolve => require(['../components/sysApp/addSysApp'], resolve);
const changeSysApp = resolve => require(['../components/sysApp/changeSysApp'], resolve);


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
      redirect: '/home/homeDetail',
      children:[
        {path: 'merchant', name: 'merchant', component: merchant},
        {path: 'merManage', name: 'merManage', component: merManage},
        {path: 'merDetail', name: 'merDetail', component: merDetail},
        {path: 'merRate', name: 'merRate', component: merRate},

        //提现列表
        {path: 'cashList', name: 'cashList', component: cashList},
        //通道管理
        {path: 'channel', name: 'channel', component: channel},
        //代付管理
        {path: 'payBank', name: 'payBank', component: payBank},

        // 主页详情
        {path: 'homeDetail', name: 'homeDetail', component: homeDetail},

        //交易管理
        {path: 'billDetail', name: 'billDetail', component: billDetail},
        {path: 'oneBillDetail', name: 'oneBillDetail', component: oneBillDetail},

        //系统产品管理
        {path: 'sysApp', name: 'sysApp', component: sysApp},
        {path: 'addSysApp', name: 'addSysApp', component: addSysApp},
        {path: 'changeSysApp', name: 'changeSysApp', component: changeSysApp},

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





