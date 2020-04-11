// точку с запятой можно не ставить
import React from 'react'
import s from "./Post.module.css"

const Post = (props) => {
  //console.log(props);
  //debugger;
  return (
    <div className={s.item}>
      <img src="./img/my_avatar_64.jpg" alt="Avatar" />
          {props.message}
          <p>Лайков: {props.likes}</p>
      <div>
        <span>Нравится</span>
      </div>
    </div >
   );
}
export default Post;