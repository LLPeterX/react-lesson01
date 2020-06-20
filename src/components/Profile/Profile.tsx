// точку с запятой можно не ставить
import React from 'react'
import s from "./Profile.module.css"
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from '../../types/types';

type PropsType = {
  profile: ProfileType
  status: string
  updateStatus: (status:string) => void
  isOwner: boolean
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<void>
}
const Profile:React.FC<PropsType> = (props) => {
  return (
    <div className={s.content}>
      <ProfileInfo 
         profile={props.profile} 
         status={props.status} 
         updateStatus={props.updateStatus} 
         isOwner={props.isOwner}
         savePhoto={props.savePhoto}
         saveProfile={props.saveProfile}
      />
      <MyPostsContainer />
    </div>
  );
}

export default Profile;