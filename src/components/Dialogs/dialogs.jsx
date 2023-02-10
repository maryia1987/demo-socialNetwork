import React from 'react';
import DialogItems from './DialogItems/dialogItems';
import s from './dialogs.module.css';
import Message from './Message/message';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControls/formsControls';
import { maxLengthCreator, required } from '../../utils/validators/validator';


const Dialogs = (props) => { 
    
    let state = props.dialogsPage;     

    let dialogsElements = state.dialogs.map ( dialog => <DialogItems name={dialog.name} key={dialog.id} id={dialog.id} />);

    let messagesElements = state.messages.map ( message => <Message message={message.message} key={message.id} />)

   /* let onSendMessageClick = () => {
      props.sendMessage();    
   } 

   let onNewMessageChange = (e) => {
    let body = e.target.value;  
    props.updateNewMessageBody(body);    
   }*/
 
   let addNewMessage = (values) => {
     props.sendMessage(values.newMessageBody);
   }

   return (
        <div className={s.dialogs}>
           <div className={s.dialogItems}>             
                           
               {dialogsElements}                
              
               {/* <DialogItems name={dialogsData[0].name} id={dialogsData[0].id} />
               <DialogItems name={dialogsData[1].name} id={dialogsData[1].id} />
               <DialogItems name={dialogsData[2].name} id={dialogsData[2].id} />               
               
              <div className={s.dialog + ' ' + s.active}>
                    <NavLink to='/dialogs'>Sasha</NavLink>
               </div>
               <div className={s.dialog}>
                    <NavLink to='/dialogs'>Maria</NavLink>
               </div>
               <div className={s.dialog}>
                    <NavLink to='/dialogs'>Pavel</NavLink>
               </div>
               */}
           </div>

           <div className={s.messages}>

              <div> {messagesElements} </div>

              {/* <div className={s.form}>
                   <textarea onChange={onNewMessageChange}
                             className={s.area}
                             placeholder='Enter your message'         
                             value={state.newMessageBody} />
                   <button onClick={onSendMessageClick} className={s.button}>Send</button>     -заменяется на form
               </div> */} 

               <AddMessageFormRedux onSubmit={addNewMessage}/>  

               {/* <Message message={messagesData[0].message} />
               <Message message={messagesData[1].message} />
               <Message message={messagesData[2].message} />
                            
              <div className={s.message}>
                    Hi!
               </div>
               <div className={s.message}>
                    How are you?
               </div>
               <div className={s.message}>
                    I'm fine. Thank you.
               </div>*/}
           </div>
        </div>
    );
}

const AddMessageForm = (props) => {
     return (
          <form onSubmit={props.handleSubmit} className={s.form}>
               <Field  component={Textarea} validate={[required, maxLengthCreator(100)]} name='newMessageBody' className={s.area} placeholder='Enter your message'/>
               
               <button className={s.button}>Send</button>
          </form>
     )    
}

const AddMessageFormRedux = reduxForm({form:'dialogAddMessageForm'})(AddMessageForm);

export default Dialogs;