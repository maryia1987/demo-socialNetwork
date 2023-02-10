import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './header.module.css';

const Header = (props) => {
    return (
        <header className={s.header}>
            <img src='https://cdn.dribbble.com/users/60166/screenshots/16953545/media/6046ed03ade41de8c2eac342c688a348.jpg' alt='' />

            <div className={s.loginBlock}>
                {props.isAuth 
                ? <div>
                  <div className={s.loginName}> {props.login} </div>
                  <button onClick={props.logout} className={s.loginBtn}>Log out</button> </div> : <NavLink to={'/login'}>Login</NavLink>}               
            </div>
        </header>
    );
}

export default Header;