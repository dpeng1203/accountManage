import {myPost,myGet,myDelete} from './axioxLoading'

//  登录
export const login = p => myPost('/login/phone', p);

// 用户信息
export const accountList = p => myGet('/admin/user/list',{params: p})

// 利率设置
export const accountRate = p => myPost('/user/settlement/charge', p);

//  登出
export const loginOut = () => myDelete('/own')

//  提现审核
export const auditList = p => myGet('/cash/list',{params: p})

//  到账
export const auditOk = p => myPost('/cash/success', p);

// 商户信息
export const merList = p => myGet('/user/base',{params: p})
