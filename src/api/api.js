import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',   
    withCredentials: true,
    headers: {
           'API-KEY': '8b1bd601-4a0b-432c-8b23-8383e49dfa70'
    }
}); 

export const usersAPI = {
    getUsers (currentPage, pageSize) {

        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
               .then( response => response.data );     //в итоге возвращается не весь response, а только нужное - data(это и есть цепочка promise)
    },

    follow (userId) {
        return instance.post(`follow/${userId}`)
    },

    unfollow (userId) {        
        return  instance.delete(`follow/${userId}`)
    },

    getProfile (userId) {
        return profileAPI.getProfile(userId);
    }   
    
}

export const profileAPI = {
    
    getProfile (userId) {
        return instance.get(`profile/` + userId);
    },
    
    getStatus (userId) {
        return instance.get(`profile/status/` + userId);    
    },
   

    updateStatus (status) {
        return instance.put(`profile/status`, {status: status});
    }
    
}

export const authAPI = {
    me () {
        return instance.get(`auth/me`);
    },
    login (email, password, rememberMe = false) {                                  //эти данные приходят
        return instance.post(`auth/login`, {email, password, rememberMe});
    },
    logout () {                                  
        return instance.delete(`auth/login`);
    }   
}
