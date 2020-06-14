import {instance, ResponseType} from './api'
import {GetUsersType} from '../types/types'
import { AxiosPromise } from 'axios';


export const usersAPI = {
  getUsers: (currentPage:number = 1, pageSize:number = 10) => {
    return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => { return response.data });
  },
  follow: (userId:number) => {
    return instance.post<ResponseType>(`follow/${userId}`).then(response => { return response.data });
  },
  unfollow: (userId:number) => {
    // возвоащаемое значение не нужно, но всё равно надо типизировать
    return instance.delete(`follow/${userId}`) as AxiosPromise<ResponseType>
  }
}