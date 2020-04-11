// точку с запятой можно не ставить
import React from 'react'
import s from "./Profile.module.css"
import MyPosts from './MyPosts/MyPosts'

const Profile = () => {
  return (
    <div className={s.content}>
        <div>
          <img src="./img/mountains.jpg" alt="Montains"/>
        </div>
        <div>
          avatar + descr
        </div>
        <MyPosts />
      </div>
  );
}

export default Profile;