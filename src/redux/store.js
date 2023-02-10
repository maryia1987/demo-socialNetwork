import dialogReducer from "./dialog-reducer";
import profileReducer from "./profile-reduser";

/*const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';*/

let store = {
  _state: {          /*_ значит для разработчиков,что это является скрытой информацией, приватным свойством store*/ 
    profilePage: {
        posts: [
            {id: 1, message: 'Hi, how are you?', count: 15},
            {id: 2, message: 'It is my first post!', count: 20}
          ],
        newPostText: ''
    },
    
    dialogsPage: {
        dialogs: [
            {id: 1, name: 'Sasha'},
            {id: 2, name: 'Maria'},       
            {id: 3, name: 'Pavel'}
          ],
        messages:  [
            {id: 1, message: 'Hi!'},
            {id: 2, message: 'How are you?'},
            {id: 3, message: 'I am fine. Thank you.'}
          ],
        newMessageBody: ''
    },

    sidebar: {
        friends: [
           {id: 1, name: 'Sasha'},
           {id: 2, name: 'Maria'},       
           {id: 3, name: 'Pavel'}
          ]
    }    
  },
  _callSuscriber () {      /*это и есть rerenderEntireTree*/

  },

  getState () {        /*метод, с помощью которого store получает доступ к state, т.к. он приватный */
    return this._state;
  },
  subscribe (observer) {
    this._callSuscriber = observer;
  },

  /*addPost () {

    let newPost = {
      id: 3, 
      message: this._state.profilePage.newPostText,        - везде вставляем this, т.к. все эти методы и свойства теперь инкапсултрованы внутри store, и так идет к ним доступ 
      count: 0
    };
  
    this._state.profilePage.posts.push(newPost);
    this._state.profilePage.newPostText = '';
    this._callSuscriber(this._state);
  },
  updateNewPostText (newText) {               - очищает поле после добавления поста

    this._state.profilePage.newPostText = newText;
    this._callSuscriber(this._state);
  }
  */
  
  dispatch (action) {                 //action объект, который изменяет state, он создается с помощью actionCreator

    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogReducer(this._state.dialogsPage, action);

    this._callSuscriber(this._state);

   /* if (action.type === ADD_POST) {
      let newPost = {
        id: 3, 
        message: this._state.profilePage.newPostText, 
        count: 0
      };
    
      this._state.profilePage.posts.push(newPost);
      this._state.profilePage.newPostText = '';
      this._callSuscriber(this._state);
    } else if (action.type === UPDATE_NEW_POST_TEXT) {
      this._state.profilePage.newPostText = action.newText;
      this._callSuscriber(this._state);                           //эта функция сообщает, что state изменился
    } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
      this._state.dialogsPage.newMessageBody = action.body;
      this._callSuscriber(this._state);
    } else if (action.type === SEND_MESSAGE) {     
        let body = {
          id: 4,                                                      // или let body = this._state.dialogsPage.newMessageBody;
          message: this._state.dialogsPage.newMessageBody             // this._state.dialogsPage.messages.push({id: 4, message: body});
        };      
        this._state.dialogsPage.messages.push(body);
        this._state.dialogsPage.newMessageBody = '';
        this._callSuscriber(this._state);
    }*/
  }

}

/*export const addPostActionCreator = () => {
  return {
      type: ADD_POST        
  };
}
export const updateNewPostTextActionCreator = (text) => {
  return {
      type: UPDATE_NEW_POST_TEXT,
      newText: text
  };
}

export const sendMessageCreator = () => {
  return {
      type: SEND_MESSAGE        
  };
}
export const updateNewMessageBodyCreator = (body) => {
  return {
      type: UPDATE_NEW_MESSAGE_BODY,
      body: body
  };
}



let rerenderEntireTree = () => {      - это же callSuscriber

}

let state = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi, how are you?', count: 15},
            {id: 2, message: 'It is my first post!', count: 20}
          ],
        newPostText: 'welcome'
    },
    
    dialogsPage: {
        dialogs: [
            {id: 1, name: 'Sasha'},
            {id: 2, name: 'Maria'},       
            {id: 3, name: 'Pavel'}
          ],
        messages:  [
            {id: 1, message: 'Hi!'},
            {id: 2, message: 'How are you?'},
            {id: 3, message: 'I am fine. Thank you.'}
          ]
    },

    sidebar: {
        friends: [
           {id: 1, name: 'Sasha'},
           {id: 2, name: 'Maria'},       
           {id: 3, name: 'Pavel'}
          ]
    }
    
}

export const addPost = () => {

  let newPost = {
    id: 3, 
    message: state.profilePage.newPostText, 
    count: 0
  };

  state.profilePage.posts.push(newPost);
  state.profilePage.newPostText = '';
  rerenderEntireTree(state);
}

export const updateNewPostText = (newText) => {

  state.profilePage.newPostText = newText;
  rerenderEntireTree(state);
}

export const subscribe = (observer) => {
  rerenderEntireTree = observer;
}*/

export default store;