import { sendMessageCreator } from '../../redux/dialog-reducer';
import Dialogs from './dialogs';
import {connect} from 'react-redux';
import { WithAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';


/*const DialogsContainer = (props) => {    

    let state = props.store.getState().dialogsPage;     

    let onSendMessageClick = () => {
     props.store.dispatch(sendMessageCreator());
   } 

   let onNewMessageChange = (body) => {       
    props.store.dispatch(updateNewMessageBodyCreator(body));

    return (<Dialogs updateNewMessageBody={onNewMessageChange} sendMessage={onSendMessageClick} dialogsPage={state} />)
        
}*/

//let AuthRedirectComponent = WithAuthRedirect(Dialogs);  // hoc - который потом засовываем в compose

let mapStateToProps = (state) => {
    return { 
        dialogsPage: state.dialogsPage        
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
      /*  updateNewMessageBody: (body) => {
            dispatch(updateNewMessageBodyCreator(body));
        }, */
        sendMessage: (newMessageBody) => {
            dispatch(sendMessageCreator(newMessageBody));
        }
    }
    
};

//const DialogsContainer = connect (mapStateToProps, mapDispatchToProps) (AuthRedirectComponent);  -засовываем в compose


export default compose (connect (mapStateToProps, mapDispatchToProps), WithAuthRedirect) (Dialogs);

//DialogsContainer;