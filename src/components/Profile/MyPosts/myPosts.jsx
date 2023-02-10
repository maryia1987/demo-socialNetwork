import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validator';
import { Textarea } from '../../common/FormsControls/formsControls';
import s from './myPosts.module.css';
import Post from './Post/Post';

const MyPosts = React.memo ((props) => {
    
   let postsElements = props.posts.map( post => <Post message={post.message} count={post.count} key={post.id} />);

   // let newPostElement = React.createRef();

  /* let onAddPost = () => {
     props.addPost();
     //props.dispatch({type: 'ADD-POST'});  
    // props.dispatch(addPostActionCreator());  

   };

   let onPostChange = () => {
      let text = newPostElement.current.value;
      props.updateNewPostText(text);
    // props.dispatch({type: 'UPDATE-NEW-POST-TEXT', newText: text});
    // props.dispatch(updateNewPostTextActionCreator(text));

   }; */

   let addNewPost = (values) => {
       props.addPost(values.newPostText);
   };

    return (          
        <div className={s.posts}>
           <h3>My posts</h3>

            <AddNewPostFormRedux onSubmit={addNewPost} />

             {/* <div className={s.form}>
                   <textarea ref={newPostElement} onChange={onPostChange} value={props.newPostText} className={s.area} />
                   <button onClick={onAddPost} className={s.button}>Add post</button>
                 </div> */}                
            <div className={s.posts}>

             {postsElements}

             {/*} <Post message={postsData[0].message} count={postsData[0].count} />
                  <Post message={postsData[1].message} count={postsData[1].count} /> 
              */}           
            </div>
        </div> 
    );
})


const AddNewPostForm = (props) => {
    return (
         <form onSubmit={props.handleSubmit} className={s.form}>
              <Field  component={Textarea} name='newPostText' className={s.area} validate={[required, maxLengthCreator(10)]} />              
              <button className={s.button}>Add post</button>              
         </form>
    )    
}

const AddNewPostFormRedux = reduxForm ({form:'profileAddNewPostForm'})(AddNewPostForm);


export default MyPosts;