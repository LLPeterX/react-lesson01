import {instance, ResponseType} from './api'
import { ProfileType, PhotosType } from '../types/types'


export const profileAPI = {
  getProfile(userId:number|null) {
    return instance.get<ProfileType>(`profile/${userId}`).then(response => response.data);
  },
  getStatus(userId:number) {
    return instance.get<string>(`profile/status/${userId}`).then(response => response.data);
  },
  updateStatus(status:string) {
    return instance.put<ResponseType>(`profile/status`,{status}).then(response => response.data);
  },
  savePhoto(file:File) {
    let formData = new FormData();
    formData.append('image',file);
    let queryHeaders = { headers: { 'Content-Type': 'multipart/form-data'} };
    return instance.put<ResponseType<PhotosType>>('profile/photo', formData, queryHeaders).then(response => response.data);
  },
  saveProfile(profile:ProfileType) {
    return instance.put<ResponseType>('profile',profile).then(response => response.data);
  }
}
