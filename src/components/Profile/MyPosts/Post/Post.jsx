import React from 'react';
import s from './Post.module.css';


const Post = (props) => {
    return (        
        <div className={s.item}>
            <img src='https://trikky.ru/wp-content/blogs.dir/1/files/2017/04/2a57bfab998b8c853269f4e700e30f5b.jpg' alt=''/>
            {props.message}
            <div>
                <span>Like</span> {props.count}
            </div>
        </div>           
    );
}

export default Post;