import React from "react";
import s from './users.module.css';
import Paginator from "../common/Paginator/paginator";
import User from "./user";


let Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, ...props}) => {
     
    return <div className={s.users}>         
            
        <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} />
        
        <div>
        { 
         props.users.map(u => <User key={u.id} user={u} followingInProgress={props.followingInProgress} follow={props.follow} unfollow={props.unfollow}/>)        
        };
        </div>
    </div>
}

export default Users;