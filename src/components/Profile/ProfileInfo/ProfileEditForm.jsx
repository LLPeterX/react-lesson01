import React from 'react'
import s from './ProfileInfo.module.css'



const ProfileEditForm = ({ profile }) => {
  return (
    <form>
      <div className={s.profileData}>
        <div><i>Режим редактирования</i></div>
        <div className={s.header__userInfo_userName}>  {profile.fullName}  </div>
        <div className={s.header__userInfo_job}>Ищу работу: {profile.lookingForAJob ? 'Да' : 'Нет'}</div>
        <div className={s.header__userInfo_job}>Интересы: {profile.lookingForAJobDescription}</div>
        
        {/* <div className={s.contacts}>
          <div className={s.contacts__title}>Контакты</div>
          <div className={s.contacts__body}>
            {Object.keys(profile.contacts).map(key => {
              return <Contact title={key} value={profile.contacts[key]} key={key} />
            })
            }
          </div>
        </div> */}

        <button>Сохранить</button>
      </div>
    </form>
  );
}

export default ProfileEditForm