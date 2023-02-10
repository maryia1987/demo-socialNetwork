import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/validators/objects-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 10,                          //колиство отбраженных user на странице
    totalUsersCount: 0,                   //количество user общее
    currentPage: 1,                       //текущая страница
    isFetching: true,                     //делаем загрузку страниц
    followingInProgress: []               //чтобы кнопка follow не могла много раз нажиматься, делаем ее disabled    
  };                                      // массив id, если кнопка с id=1 и в массиве есть id=1, то она станет disabled с помощью метода some

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case FOLLOW:            
          return {
                ...state,                 
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})  //зарефакторили дублирование кода         
                
              /*  users: state.users.map( u => {
                  if (u.id === action.userId) {
                     return {...u, followed: true}        - делаем копию того users, которого нужно поменять
                  }
                  return u;
                })*/
          };              
             
        case UNFOLLOW: 
          return {
                ...state, 
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})

                /*users: state.users.map( u => {
                  if (u.id === action.userId) {
                     return {...u, followed: false}             
                  }
                return u;
              })*/
          };
          
        case SET_USERS:
          return {            
           // ...state, users: [...state.users, ...action.users]    - в старый state добавляется новый через action
            ...state, users: action.users         //обновляется на новое
          };

        case SET_CURRENT_PAGE:
          return {            
            ...state, currentPage: action.currentPage         //делаем переключение страниц, которое теперь нужно сделать dispatch при клике 
          };
          
        case SET_TOTAL_USERS_COUNT:
          return {            
              ...state, totalUsersCount: action.count         //чтобы приходили данные сервера 
          }; 
          
        case TOGGLE_IS_FETCHING:
          return {            
              ...state, isFetching: action.isFetching        
          };
          
        case TOGGLE_IS_FOLLOWING_PROGRESS:
          return {            
              ...state, 
              followingInProgress: action.isFetching ? [...state.followingInProgress, action.userId]
                                   : state.followingInProgress.filter(id => id !== action.userId)     
          };  

        default: 
            return state;             
    }     
}

export const followSuccess = (userId) => ( {type: FOLLOW, userId} );          // action creator, который добавляет друга
export const unfollowSuccess = (userId) => ( {type: UNFOLLOW, userId} );       // action creator, который удаляет друга
export const setUsers = (users) => ( {type: SET_USERS, users} );         // action creator, который добавляет пользователей с сервера
export const setCurrentPage = (currentPage) => ( {type: SET_CURRENT_PAGE, currentPage} );
export const setUsersTotalCount = (totalUsersCount) => ( {type: SET_TOTAL_USERS_COUNT, count: totalUsersCount} );
export const toggleIsFetching = (isFetching) => ( {type: TOGGLE_IS_FETCHING, isFetching} );
export const toggleFollowingProgress = (isFetching, userId) => ( {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId} );

export const requestUsers = (page, pageSize) => {
  
 return (dispatch) => {
     
  dispatch(toggleIsFetching(true));                         

  usersAPI.getUsers(page, pageSize).then(data => {
      dispatch(toggleIsFetching(false));     
      dispatch(setCurrentPage(page));                    
      dispatch(setUsers(data.items));                    
      dispatch(setUsersTotalCount(data.totalCount)); 
    })
  }
};

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {  
      
  dispatch(toggleFollowingProgress(true, userId));

  let response = await apiMethod(userId)   
    
        if (response.data.resultCode === 0) {
            dispatch(actionCreator(userId));
        }

    dispatch(toggleFollowingProgress(false, userId));   
  
 };

 export const follow = (userId) => {
  
  return async (dispatch) => {    

    followUnfollowFlow(dispatch, userId, usersAPI.follow, followSuccess);    
   }
 };

 export const unfollow = (userId) => {

  return async (dispatch) => {    

  followUnfollowFlow(dispatch, userId, usersAPI.unfollow, unfollowSuccess);
 
 }
}

/* избавляемся от дублируещегося кода
export const follow = (userId) => {
  
  return (dispatch) => {
      
    dispatch(toggleFollowingProgress(true, userId));

    usersAPI.follow(userId)   
    .then(response => {
        if (response.data.resultCode === 0) {
            dispatch(followSuccess(userId));
        }
    dispatch(toggleFollowingProgress(false, userId));
    })
   }
 };

 export const unfollow = (userId) => {

  return (dispatch) => {
  
  dispatch(toggleFollowingProgress(true, userId));

  usersAPI.unfollow(userId)  
  .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(unfollowSuccess(userId));
      }
  dispatch(toggleFollowingProgress(false, userId));                            
  });
 }
}*/




export default usersReducer;