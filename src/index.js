import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './redux/redux-store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

/*import { addPost, updateNewPostText } from './redux/state';
import state, { subscribe } from './redux/state';*/

const root = ReactDOM.createRoot(document.getElementById('root'));

//export let rerenderEntireTree = (state) => {
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <Provider store={store}> 
            <App /*state={state} dispatch={store.dispatch.bind(store)} store={store} addPost={store.addPost.bind(store)} updateNewPostText={store.updateNewPostText.bind(store)}*/ />
          </Provider>
        </BrowserRouter>
      </React.StrictMode>
    )
//};

//rerenderEntireTree();

/*store.subscribe( () => {
  rerenderEntireTree();
});

rerenderEntireTree(store.getState());

store.subscribe( () => {
  let state = store.getState();
  rerenderEntireTree(state);
});*/

//store.subscribe(rerenderEntireTree);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
