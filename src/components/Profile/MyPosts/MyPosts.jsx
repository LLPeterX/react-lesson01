// точку с запятой можно не ставить
import React from 'react'
import s from "./MyPosts.module.css"
import Post from "./Post/Post";

const MyPosts = () => {
  return (
    <div className={s.content}>
      <div>
        Мои посты
        <textarea></textarea>
        <button>Новый пост</button>
      </div>
      <div className={s.posts}>
        <Post message="Привет!" likes='12'/>
        <Post message="Чувак, круто!" likes='22'/>
        <Post message="Illegal Access"/>
      </div>
    </div>
  );
}

export default MyPosts;