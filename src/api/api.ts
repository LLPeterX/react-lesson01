import axios from 'axios';

// создаем инстанс axios с общими настойками.
export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    "API-KEY": '8b2eb2e8-a38b-4611-967e-3487d29949d6'
  }
});

// Общий enum для resultCode
export enum ResultCodeEnum {
  SUCCESS=0,
  ERROR=1,
  CAPTCHA_REQUIRED=10
}

// Общий тип, содержащий resultCode, messages и объект data
export type ResponseType<D={}, R=ResultCodeEnum> = {
  resultCode: R
  messages: Array<string>
  data: D
}


