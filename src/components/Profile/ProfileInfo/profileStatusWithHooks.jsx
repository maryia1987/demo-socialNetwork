import React  from 'react';
import { useEffect, useState } from 'react';
import s from './profileInfo.module.css';


const ProfileStatusWithHooks = (props) => {      
  
//let stateWithSetState = useState(true);  
//let editMode = stateWithSetState[0];
//let setEditMode = stateWithSetState[1];
// или можно записать как ниже -деструктурированное присваивание

let [editMode, setEditMode] = useState(false);
let [status, setStatus] = useState(props.status);   // сюда приходит пустой статус

useEffect(() => {
  setStatus(props.status);
}, [props.status] )

const activatedEditMode = () => {
    setEditMode(true);
}

const deactivatedEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
}

const onStatusChange = (e) => {
  setStatus(e.currentTarget.value)
}
 
    return (
        <div>
            <div className={s.status}>
            {!editMode &&
              <span onDoubleClick={activatedEditMode}>{props.status || 'no status'}</span>
            }
            {editMode &&
              <input onChange={onStatusChange} autoFocus={true} onBlur={deactivatedEditMode} value={status} />
            }
            </div>        
        </div>
    );
  }


export default ProfileStatusWithHooks;