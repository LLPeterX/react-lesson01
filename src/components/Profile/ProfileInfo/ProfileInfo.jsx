import React, { useState } from 'react'
import s from './ProfileInfo.module.css'
import defaultAvatar from '../../../assets/images/empty-avatar-png-18.png';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileEditForm from './ProfileEditForm'

const ProfileInfo = (props) => {

  let [editMode, setEditMode] = useState(false);

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  }

  const onSubmit = (formData) => {
    console.log(formData);
    setEditMode(false);
  }

  if (!props.profile) {
    return <Preloader />
  }
  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.header__userInfo}>
          {/* ------------------- аватар  ------------------------*/}
          <div>
            <div><img src={props.profile.photos.large || defaultAvatar} alt="[Avatar]" className={s.avatar} /></div>
            {props.isOwner && <div><input type="file" onChange={onMainPhotoSelected} /></div>}
          </div>
          {/* ------------------- аватар  ------------------------*/}

          {editMode ?
            <ProfileEditForm profile={props.profile} onSubmit={onSubmit}/> :
            <ProfileData profile={props.profile} isOwner={props.isOwner} activateEditMode={() => { setEditMode(true) }} />}

          <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />

        </div>
      </div>

    </div>
  );
}

const Contact = ({ title, value }) => {
  return (<div>{title}:{value}</div>)
}

const ProfileData = ({ profile, isOwner, activateEditMode }) => {
  return (
    <div className={s.profileData}>
      <div className={s.header__userInfo_userName}> {profile.fullName} </div>
      <div className={s.header__userInfo_job}><b>Обо мне: </b>{profile.aboutMe}</div>
      <div className={s.header__userInfo_job}><b>Ищу работу: </b>{profile.lookingForAJob ? 'Да' : 'Нет'}</div>
      <div className={s.header__userInfo_job}><b>Профессиональные навыки: </b>{profile.lookingForAJobDescription}</div>
      <div className={s.contacts}>
        <div className={s.contacts__title}>Контакты</div>
        <div className={s.contacts__body}>
          {Object.keys(profile.contacts).map(key => {
            return <Contact title={key} value={profile.contacts[key]} key={key} />
          })
          }
        </div>
      </div>

      {isOwner && <button onClick={activateEditMode}>Редактировать</button>}

    </div>
  );
}

// const ProfileEditForm = ({ profile }) => {
//   return (
//     <div className={s.profileData}>
//       <div>Режим редактирования</div>
//       <div className={s.header__userInfo_userName}>  {profile.fullName}  </div>
//       <div className={s.header__userInfo_job}>Ищу работу: {profile.lookingForAJob ? 'Да' : 'Нет'}</div>
//       <div className={s.header__userInfo_job}>Интересы: {profile.lookingForAJobDescription}</div>

//     </div>
//   );
// }


export default ProfileInfo;