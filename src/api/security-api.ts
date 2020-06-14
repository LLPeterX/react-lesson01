import {instance} from './api'
import {authAPI} from './auth-api'

type CaptchaUrlType = {
  url: string
}
export const securityAPI = {
  getCaptchaURL() {
      return instance.get<CaptchaUrlType>('/security/get-captcha-url').then(response => response.data); 
  }
}

authAPI.me().then(response => response.data);

