import React from 'react'
import s from './ProfileInfo.module.css'

const ProfileInfo = () => {
  return (
    <div>
      <div>
        <img src="./img/mountains.jpg" alt="Montains" />
      </div>
      <div className={s.descriptionBlock}>
        avatar + descr
        </div>
    </div>
  );
}

export default ProfileInfo;