import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    userId: null,
    email: null,                               
    login: null, 
    isAuth: false       //когда приходят данные, мы залогинены isAuth: true                         
  };

const authReducer = (state = initialState, action) => {
   
    switch(action.type) {       
        case SET_USER_DATA:                 
          return {
                ...state,              //... - деструктуризация   
                ...action.data,          //т.к. data (userId, email, login - с server) ниже находится, то перезатрет то что в state                       
            };       

        default: 
            return state;             
    }     
}

export const setAuthUserData = (userId, email, login, isAuth) => ( {type: SET_USER_DATA, data: {userId, email, login, isAuth} });   

export const getAuthUserData = () => (dispatch) => {

   return authAPI.me().then(response => {                //т.к. me() ничего не принимает => getAuthUserData = () - ничего не передаем
            
            if (response.data.resultCode === 0) {
               let {id, email, login} = response.data.data;
                dispatch(setAuthUserData(id, email, login, true));              
            }                 
             
         }); 

    }


export const login = (email, password, rememberMe) => {

    return (dispatch) => {

        authAPI.login(email, password, rememberMe).then(response => {               
            
            if (response.data.resultCode === 0) {
               dispatch(getAuthUserData());              
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some Error';    //с сервера придет ошибка
                dispatch(stopSubmit('login', {_error: message}));
            }            
         }); 
    }
}

export const logout = () => {

    return (dispatch) => {

        authAPI.logout().then(response => {               
            
            if (response.data.resultCode === 0) {
               dispatch(setAuthUserData(null, null, null, false));              
            }             
         });
    }
}

export default authReducer;