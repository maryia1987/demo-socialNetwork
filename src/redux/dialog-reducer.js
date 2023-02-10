//const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
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
}

const dialogReducer = (state = initialState, action) => {
  
  /* let stateCopy = {...state};
  stateCopy.messages = [...state.messages];

  а можно одной строкой:
  let stateCopy = {
    ...state,
    messages: [...state.messages] 
  };*/

 // let stateCopy;      - а можно без переменной, а все сделать через return

    switch(action.type) {      
        case SEND_MESSAGE:          
            let body = action.newMessageBody;  //уже не из state приходит, а из action
            return  /*stateCopy =*/ {
                ...state,
              // newMessageBody: '',    - уже не надо затирать
                messages: [...state.messages, {id: 4, message: body}]    //если мы хотим запушить в конце, а если вначале, то перед ...state
              };    
              //stateCopy.messages.push(body);
              //stateCopy.newMessageBody = '';
           // return stateCopy;  
     /* case UPDATE_NEW_MESSAGE_BODY:
         return {
            ...state,
            newMessageBody: action.body
          }; */
         // stateCopy.newMessageBody = action.body; 
          //  return stateCopy;
        default:
            return state;
    }

    /*if (action.type === UPDATE_NEW_MESSAGE_BODY) {
        state.newMessageBody = action.body;        
      } else if (action.type === SEND_MESSAGE) {     
          let body = {
            id: 4,                                                     
            message: state.newMessageBody             
          };      
          state.messages.push(body);
          state.newMessageBody = '';         
      }

    return state;*/
}

export const sendMessageCreator = (newMessageBody) => {
    return {
        type: SEND_MESSAGE,
        newMessageBody        
    };
  }
/* export const updateNewMessageBodyCreator = (body) => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY,
        body: body
    };
  }*/

export default dialogReducer;