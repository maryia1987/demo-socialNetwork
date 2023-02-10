import React from 'react';
import MyPostsContainer from './MyPosts/myPostsContainer';
import s from './profile.module.css';
import ProfileInfo from './ProfileInfo/profileInfo';

//let s = {'content': 'profile_content__flZub';}
//когда два класса:
//{`${s.content} ${s.active}`}

const Profile = (props) => {    
    
    return (       
        <div className={s.content}>
             <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/> 
             <MyPostsContainer store={props.store}/>              
        </div>
    );
}

export default Profile;