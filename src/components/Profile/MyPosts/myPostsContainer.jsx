//import React from 'react';
import { addPostActionCreator } from '../../../redux/profile-reduser';
import MyPosts from './myPosts';
import {connect} from 'react-redux';

/*const MyPostsContainer = (props) => {  

   let state = props.store.getState();

   let addPost = () => {
     props.store.dispatch(addPostActionCreator());  

   }

   let onPostChange = (text) => {
    let action = updateNewPostTextActionCreator(text);
     props.store.dispatch(action);

 }

    return (<MyPosts updateNewPostText={onPostChange} addPost={addPost} posts={state.profilePage.posts}
                                                                        newPostText={state.profilePage.newPostText} />)
}*/

let mapStateToProps = (state) => {
  return { 
      posts: state.profilePage.posts,
      newPostText: state.profilePage.newPostText
  }

};

let mapDispatchToProps = (dispatch) => {
  return {
    /*  updateNewPostText: (text) => {
          dispatch(updateNewPostTextActionCreator(text));
      }, */
      addPost: (newPostText) => {
          dispatch(addPostActionCreator(newPostText));
      }
  }
  
};

const MyPostsContainer = connect (mapStateToProps, mapDispatchToProps) (MyPosts);

export default MyPostsContainer;