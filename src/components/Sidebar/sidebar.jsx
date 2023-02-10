import React from 'react';
import s from './sidebar.module.css';
import { NavLink } from 'react-router-dom';

const Sidebar = (props) => {

  let path = '/sidebar/' + props.id;
  
    return (           

        <div className={s.sidebar}>            
            <div className={s.friend}>
              <NavLink to={path}>{props.name}
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzbw2a5a4v6QiDtvGkj4pExwkxfSKLHANBrw&usqp=CAU' alt='' />
              </NavLink>
            </div>
            <div className={s.friend}>
              <NavLink to={path}>{props.name}
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzbw2a5a4v6QiDtvGkj4pExwkxfSKLHANBrw&usqp=CAU' alt=''/>
              </NavLink>
            </div>
            <div className={s.friend}>
              <NavLink to={path}>{props.name}
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzbw2a5a4v6QiDtvGkj4pExwkxfSKLHANBrw&usqp=CAU' alt=''/>
              </NavLink>
            </div>
        </div>
             
    );
}

export default Sidebar;