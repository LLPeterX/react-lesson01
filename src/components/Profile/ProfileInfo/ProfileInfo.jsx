import React, { useState } from 'react'
import s from './ProfileInfo.module.css'
import defaultAvatar from '../../../assets/images/empty-avatar-png-18.png';
import Preloader from '../../common/Preloader/Preloader';
//import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = (props) => {

  let [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />
  }
  return (
    <div className={s.container}>

      <div className={s.header}>
        {/* <div className={s.header__userInfo}>
          <div className={s.header__userInfo_userName}>  {props.profile.fullName}  </div>
          <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
          <div className={s.header__userInfo_job}>{props.lookingForAJob ? 'Ищу работу' : 'Не хочу работать'}</div>
          {props.lookingForAJobDescription && <div className={s.header__userInfo_job}>{props.lookingForAJobDescription}</div>}
        </div> */}
        {editMode ? <ProfileDataForm {...props} /> : <ProfileData {...props} />}

        {/* <div>
          <div><img src={props.profile.photos.large || defaultAvatar} alt="[Avatar]" className={s.avatar} /></div>
          <div><button>Изменить</button></div>
        </div> */}
        {/* <Avatar profile={props.profile}/> */}
      </div>
      <div className="contacts">
        <div className={s.contacts__title}>Контакты</div>
        <div className={s.contacts__body}>
          {Object.keys(props.profile.contacts).map(key => {
            return <Contact title={key} value={props.profile.contacts[key]} key={key} />
          })
          }
        </div>
      </div>
    </div>
  );
}

const Contact = ({ title, value }) => {
  return (value ? <div><b>{title}: </b>{value}</div> : "")
}

const ProfileData = (props) => {
  return (
    <>
      <div className={s.header__userInfo}>
        <div className={s.header__userInfo_userName}>  {props.profile.fullName}  </div>
        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
        <div className={s.header__userInfo_job}>{props.lookingForAJob ? 'Ищу работу' : 'Не хочу работать'}</div>
        {props.lookingForAJobDescription && <div className={s.header__userInfo_job}>{props.lookingForAJobDescription}</div>}
      </div>
      <div>
        <div><img src={props.profile.photos.large || defaultAvatar} alt="[Avatar]" className={s.avatar} /></div>
        {props.isOwner && <div><button>Изменить</button></div>}
      </div>
    </>
  );
}

const ProfileDataForm = (props) => {
  return (
    <>
    <div className={s.header__userInfo}>
      <div className={s.header__userInfo_userName}>  {props.profile.fullName}  </div>
      <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
      <div className={s.header__userInfo_job}>{props.lookingForAJob ? 'Ищу работу' : 'Не хочу работать'}</div>
      {props.lookingForAJobDescription && <div className={s.header__userInfo_job}>{props.lookingForAJobDescription}</div>}
    </div>
    <div>
      <div><img src={props.profile.photos.large || defaultAvatar} alt="[Avatar]" className={s.avatar} /></div>
      {props.isOwner && <div><button>Изменить</button></div>}
    </div>
  </>
  );
}

// const Avatar = ({profile}) => {
//   return <div>
//           <div><img src={profile.photos.large || defaultAvatar} alt="[Avatar]" className={s.avatar} /></div>
//           <div><button>Изменить</button></div>
//         </div>
// }

export default ProfileInfo;