import api from '@/http/api'

//用户登录
export function login(param){
  return api.resolvePost("/bibao/login",param)
}

//自动登陆
export function autologin(param){
  return api.resolvePost("/bibao/autologin",param)
}
