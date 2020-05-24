import * as axios from 'axios';

// создаем инстанс axios с общими настойками.
const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    "API-KEY": '8b2eb2e8-a38b-4611-967e-3487d29949d6'
  }
});


export const usersAPI = {
  getUsers: (currentPage = 1, pageSize = 10) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => { return response.data });
  },
  follow: (userId) => {
    console.log("call api follow()");
    
    return instance.post(`follow/${userId}`).then(response => { return response.data });
  },
  unfollow: (userId) => {
    return instance.delete(`follow/${userId}`).then(response => { return response.data });
  },
  getProfile: (userId) => {
    return profileAPI.getProfile(userId);
  }
}

export const authAPI = {
  me() {  return instance.get('/auth/me'); },
  login(email, password,rememberMe=false) {
    console.log('Call authAPI.login with '+email+' '+password);
    return instance.post('/auth/login',{email, password,rememberMe})
  },
  logout() {
    return instance.delete('/auth/login');
  }
}

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`);
  },
  getStatus(userId) {
    return instance.get(`profile/status/${userId}`);
  },
  updateStatus(status) {
    return instance.put(`profile/status`,{status});
  }
}

