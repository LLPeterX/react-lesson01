import React from 'react'
import s from './ProfileInfo.module.css'
import defaultAvatar from '../../../assets/images/empty-avatar-png-18.png';
import Preloader from '../../common/Preloader/Preloader';
//import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }
  return (
    <div className={s.container}>
      
      <div className={s.header}>
        <div className={s.header__userInfo}>
          <div className={s.header__userInfo_userName}>{props.profile.fullName}</div>
          <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
        </div>
        <div>
          <img src={props.profile.photos.large != null ? props.profile.photos.large : defaultAvatar} alt="[Avatar]" className={s.avatar} />
        </div>
      </div>

      <div className="contacts">
        <div className={s.contacts__title}>Контакты</div>
                {/*  блок контактов */}
      </div>



    </div>
  );
}

export default ProfileInfo;