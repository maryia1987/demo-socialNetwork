import React from 'react';
import Preloader from '../../common/preloader/preloader';
import s from './profileInfo.module.css';
//import ProfileStatus from './profileStatus';
import ava from '../../../assets/images/ava.jpg';
import photoProfile from '../../../assets/images/photoProfile.jpg';
import ProfileStatusWithHooks from './profileStatusWithHooks';


const ProfileInfo = ({profile, status, updateStatus}) => {
    if (!profile) {         // ! это eсли null или undefined
        <Preloader />
    };

    return (
        <div>
          <div className={s.image}>
              <img src={photoProfile} alt='' />
          </div>
          <div className={s.info}>  
              <div className={s.avatar}>        
                  <img src={profile?.photos?.large || ava} alt=''/> 
              </div>  
              <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>         
        </div>          
          </div> 
         
    );
}

export default ProfileInfo;