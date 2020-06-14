import {instance, ResponseType} from './api'

type MeDataType =  
  {  id:number,  email: string,  login: string }

type LoginResponseDataType = {
  userId: number
}

export const authAPI = {
  me() {
    return instance.get<ResponseType<MeDataType>>('/auth/me'); 
   },
  login(email:string, password:string, rememberMe:boolean=false, captcha:string|null = null) {
    return instance.post<ResponseType<LoginResponseDataType>>('/auth/login',{email, password,rememberMe, captcha})
  },
  logout() {
    return instance.delete<ResponseType>('/auth/login');
  }
}