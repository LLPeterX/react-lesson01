import React, { useState, ChangeEvent } from 'react'
import s from './ProfileInfo.module.css'
import defaultAvatar from '../../../assets/images/empty-avatar-png-18.png';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileEditForm from './ProfileEditForm'
import { ProfileType, ContactsType } from '../../../types/types'
import { Redirect } from 'react-router-dom';

type PropsType = {
  profile: ProfileType|null
  status: string
  isOwner: boolean
  updateStatus: (status:string) => void
  savePhoto: (file:File) => void
  saveProfile: (profile: ProfileType) => Promise<void>
}
const ProfileInfo:React.FC<PropsType> = (props) => {

  let [editMode, setEditMode] = useState(false);

  const onMainPhotoSelected = (e:ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  }

  const onSubmit = (formData:ProfileType) => {
    // todo: remove .then()
    props.saveProfile(formData).then(() => { setEditMode(false); });
    //setEditMode(false);
  }

  if (!props.profile) { return <Preloader /> }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.header__userInfo}>
          {/* ------------------- аватар  ------------------------*/}
          <div>
            <div><img src={props.profile.photos.large || defaultAvatar} alt="[Avatar]" className={s.avatar} /></div>
            {props.isOwner && <div><input type="file" onChange={onMainPhotoSelected} title=" " /></div>}
          </div>
          {/* ------------------- аватар  ------------------------*/}

          {editMode ?
            <ProfileEditForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} /> :
            <ProfileData profile={props.profile} isOwner={props.isOwner} activateEditMode={() => { setEditMode(true) }} />
          }
          <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />

        </div>
      </div>

    </div>
  );
}


// const Contact = ({ contactName, contactValue }) => {
//   return (
//     // <div>{contactName} : {beautifyURL(contactValue)}</div>
//     <tr key={contactName}>
//       <td>{contactName}</td>
//       <td>{beautifyURL(contactValue)}</td>
//     </tr>
//   )
// }

// const isEmptyContacts = (contacts:Array<ContactsType>) => {
//   let retval = Object.keys(contacts).some(key => contacts[key] != null);
//   return !retval;

// }

type ProfileDataPropsType = {
  profile: ProfileType|null
  isOwner: boolean
  activateEditMode: () => void
}
const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, activateEditMode }) => {
  if(!profile) return (<Redirect to="/"/>)
  return (
    <div className={s.profileData}>
      <div className={s.header__userInfo_userName}> {profile.fullName} </div>
      {/* <div className={s.header__userInfo_job}><b>Обо мне: </b>{profile.aboutMe}</div> */}
      <div className={s.header__userInfo_job}><b>Ищу работу: </b>{profile.lookingForAJob ? 'Да' : 'Нет'}</div>
      <div className={s.header__userInfo_job}><b>Профессиональные навыки: </b>{profile.lookingForAJobDescription}</div>
      <div className={s.contacts}>
        {/* <div className={s.contacts__title}>{!isEmptyContacts(profile.contacts) && "Контакты"}</div> */}
        <div className={s.contacts__title}>"Контакты"</div>
        <div className={s.contacts__table}>
          <table>
            <tbody>
              {/* {Object.keys(profile.contacts).map(key => {
              return (profile.contacts[key] && <Contact title={key} value={profile.contacts[key]} key={key} />)
            })
            } */}
              {Object.keys(profile.contacts).map(key => {
                return (profile.contacts[key as keyof ContactsType]
                  ? <tr key={key}><td>{key}</td><td>{profile.contacts[key as keyof ContactsType]}</td></tr>
                  : null)
              })
              }
            </tbody>
          </table>
        </div>
      </div>
      {isOwner && <button onClick={activateEditMode}>Редактировать</button>}
    </div>
  );
}

export default ProfileInfo;