import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
//const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

const DELETE_POST = 'DELETE_POST';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', count: 15},
        {id: 2, message: 'It is my first post!', count: 20}
      ],
  //  newPostText: '',
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST:  {
            let newPost = {
                id: 3, 
                message: action.newPostText, 
                count: 0
              }; 
             return /*let stateCopy =*/ {
                  ...state,
                  newPostText: '',
                  posts: [...state.posts, newPost]
                };
              //stateCopy.posts = [...state.posts];
              //stateCopy.posts.push(newPost); 
              //stateCopy.newPostText = '';
               // return stateCopy;     
              //state.posts.push(newPost);
              //state.newPostText = '';
            //return state;
            }
            case DELETE_POST: {
              return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
            }

       /* case UPDATE_NEW_POST_TEXT: {
          return {
               ...state,
               newPostText: action.newText
              }; 
           // stateCopy.newPostText = action.newText;
           // return stateCopy;
          } */
        case SET_USER_PROFILE: {
          return {
              ...state,
              profile: action.profile
            };
          }
        case SET_STATUS: {
          return {
              ...state,
              status: action.status
          };
        }
        default:                //вместо break, чтобы case не проваливался в следующий case
            return state;      //если придет action, которого нет
        
    }    
    
    /*if (action.type === ADD_POST) {
        let newPost = {
          id: 3, 
          message: state.newPostText, 
          count: 0
        };      
        state.posts.push(newPost);
        state.newPostText = '';        
      } else if (action.type === UPDATE_NEW_POST_TEXT) {
        state.newPostText = action.newText;                             
      }

      return state;*/
}

export const addPostActionCreator = (newPostText) => {
    return {
        type: ADD_POST,
        newPostText        
    };
  }

/*export const updateNewPostTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    };
  }*/

export const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId       
    };
  }

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });

export const getUserProfile = (userId) => {

  return async (dispatch) => {

   let response = await usersAPI.getProfile(userId);                                           
        dispatch(setUserProfile(response.data));                  
      }
};

export const setStatus = (status) => ({ type: SET_STATUS, status });   // добавить пост

export const getStatus = (userId) => {                                 //получить пост с сервера

  return (dispatch) => {

    profileAPI.getStatus(userId)
      .then(response => {                                     
            dispatch(setStatus(response.data));                  
        });
  }
};

export const updateStatus = (status) => {

  return (dispatch) => {

    profileAPI.updateStatus(status)
      .then(response => { 
         if (response.data.resultCode === 0) {                                   
            dispatch(setStatus(status)); 
          }                 
      });      
  }
}


export default profileReducer;