import {myPost,myGet,myDelete} from './axioxLoading'

//  登录
export const login = p => myPost('/login/phone', p);

// 用户信息
export const accountList = p => myGet('/admin/user/list',{params: p})

// 利率设置
export const accountRate = p => myPost('/user/settlement/charge', p);

//  登出
export const loginOut = () => myDelete('/own')