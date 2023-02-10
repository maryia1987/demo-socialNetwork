import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './../dialogs.module.css';


const DialogItems = (props) => {
    let path = '/dialogs/' + props.id;

    return (       
        <div className={s.dialog + ' ' + s.active}>
            <div className={s.dialog_ava}></div>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    );
}

export default DialogItems;