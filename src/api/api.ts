import axios from 'axios';
import { ProfileType, UserType, PhotosType, ResultCodeEnum } from '../types/types';

// создаем инстанс axios с общими настойками.
const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    "API-KEY": '8b2eb2e8-a38b-4611-967e-3487d29949d6'
  }
});

// Общий enum для resultCode

// Общий тип, содержащий resultCode, messages и объект data
type CommonResponseType = {
  data: Object
  resultCode: ResultCodeEnum
  messages: Array<string>
}


// ---------------------------- Users API --------------------------------------

// types
type UsersResponseType = {
  items: Array<UserType>
  totalCount: number
  error: string
}

export const usersAPI = {
  getUsers: (currentPage:number = 1, pageSize:number = 10) => {
    return instance.get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => { return response.data });
  },
  follow: (userId:number) => {
    return instance.post<CommonResponseType>(`follow/${userId}`).then(response => { return response.data });
  },
  unfollow: (userId:number) => {
    return instance.delete<CommonResponseType>(`follow/${userId}`).then(response => { return response.data });
  },
  getProfile: (userId:number) => {
    return profileAPI.getProfile(userId);
  }
}

// ------------------------------- auth API --------------------------------------------------
// типы для authAPI
type MeResponseType =  {
  data: {  id:number,  email: string,  login: string }
  resultCode: ResultCodeEnum
  messages: Array<string>
}

export const authAPI = {
  me() {
    return instance.get<MeResponseType>('/auth/me'); 
   },
  login(email:string, password:string, rememberMe:boolean=false, captcha:string|null = null) {
    return instance.post<CommonResponseType>('/auth/login',{email, password,rememberMe, captcha})
  },
  logout() {
    return instance.delete<CommonResponseType>('/auth/login');
  }
}
 // ---------------------------- Profile API --------------------------------------------------------
 type SavePhotoResponseType = {
   data: PhotosType
   resultCode: ResultCodeEnum
   messages: Array<string>
 }
export const profileAPI = {
  getProfile(userId:number) {
    return instance.get<ProfileType>(`profile/${userId}`);
  },
  getStatus(userId:number) {
    return instance.get<string>(`profile/status/${userId}`);
  },
  updateStatus(status:string) {
    return instance.put<CommonResponseType>(`profile/status`,{status});
  },
  savePhoto(file:string) {
    let formData = new FormData();
    formData.append('image',file);
    let queryHeaders = { headers: { 'Content-Type': 'multipart/form-data'} };
    return instance.put<SavePhotoResponseType>('profile/photo', formData, queryHeaders);
  },
  saveProfile(profile:ProfileType) {
    return instance.put<CommonResponseType>('profile',profile);
  }
}
// ------------------------------- Security API -------------------------------------

type CaptchaUrlType = {
  url: string
}
export const securityAPI = {
  getCaptchaURL() {
      return instance.get<CaptchaUrlType>('/security/get-captcha-url'); 
  }
}

authAPI.me().then(r => r.data);

