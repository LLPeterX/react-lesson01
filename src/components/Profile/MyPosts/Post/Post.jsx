// точку с запятой можно не ставить
import React from 'react'
import s from "./Post.module.css"
import myAvatar from '../../../../assets/images/my_avatar_64.jpg';

const Post = (props) => {
  //console.log(props);
  //debugger;
  return (
    <div className={s.item}>
      <img src={myAvatar} alt="Avatar" />
      {props.message}
      <p>Лайков: {props.likes}</p>
      <div className="like">
        <span>Нравится</span>
      </div>
    </div >
  );
}
export default Post;