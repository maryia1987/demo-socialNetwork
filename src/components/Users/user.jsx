import React from "react";
import s from './users.module.css';
import userPhoto from '../../assets/images/user.png';
import { NavLink } from "react-router-dom";


let User = ({user, followingInProgress, unfollow, follow}) => {     
              
    return  <div className={s.usersContent}>
                   <span className={s.usersAva}>
                      <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img src ={user.photos.small != null ? user.photos.small : userPhoto} alt='' className={s.userPhoto}/>
                        </NavLink>
                      </div>
                      <div>
                           { user.followed ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {                            
                           
                           unfollow(user.id);

                           /*props.toggleFollowingProgress(true, u.id);

                            usersAPI.unfollow(u.id)

                            -axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                     {withCredentials: true})-
                            .then(response => {
                                if (response.data.resultCode === 0) {
                                    props.unfollow(u.id);
                                }
                            props.toggleFollowingProgress(false, u.id);                            
                            });*/
                            
                        }} className={s.followButton}>Unfollow</button> 
                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {

                            follow(user.id);

                           /* props.toggleFollowingProgress(true, u.id);

                            usersAPI.follow(u.id)

                           -axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {},
                                        {withCredentials: true})-
                            .then(response => {
                                if (response.data.resultCode === 0) {
                                    props.follow(u.id);
                                }
                            props.toggleFollowingProgress(false, u.id);
                            })*/

                        }} className={s.followButton}>Follow</button>}
                      </div>
                   </span>
                   <span className={s.usersInfo}>
                       <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                       </span>
                       <span>
                            <div>{'u.location.city'}</div>
                            <div>{'u.location.country'}</div>
                       </span>
                   </span>
            </div>
                      
}      


export default User;