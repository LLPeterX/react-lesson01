// точку с запятой можно не ставить
import React from 'react'
import s from "./Profile.module.css"
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from '../../types/types';

type PropsType = {
  profile: ProfileType
  status: string | null
  updateStatus: (status:string) => void
  isOwner: boolean
  savePhoto: (File) => void
  saveProfile: (any) => void
}
const Profile = (props:PropsType) => {
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