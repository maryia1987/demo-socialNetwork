import profileReducer, { addPostActionCreator, deletePost } from "./profile-reduser";


it('length of posts should be incremented', () => {
//1. test data
let state = {
    posts: [
        {id: 1, message: 'Hi, how are you?', count: 15},
        {id: 2, message: 'It is my first post!', count: 20}
      ]  
}; 
let action = addPostActionCreator('test-1');
//2. action
let newState = profileReducer (state, action);
//3. expectation
    expect(newState.posts.length).toBe(3);
    expect(newState.posts[4].message).toBe('test-1');
  });


it('after deleting length of messages should be decrement', () => {
    //1. test data
    let state = {
        posts: [
            {id: 1, message: 'Hi, how are you?', count: 15},
            {id: 2, message: 'It is my first post!', count: 20}
          ]  
    }; 
    let action = deletePost(1);
    //2. action
    let newState = profileReducer (state, action);
    //3. expectation
        expect(newState.posts.length).toBe(1);        
      });