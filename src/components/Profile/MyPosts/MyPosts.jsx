// точку с запятой можно не ставить
import React from 'react'
import s from "./MyPosts.module.css"
import Post from "./Post/Post";

let postsData = [
  {id:1, message:"Gotta to break free!", likes:10},
  {id:2, message:"Помоги с Excel!", likes:12},
  {id:3, nmessage: "Сделай отчет по активам. Лежит в папке N:\\HOME", likes:1},
  {id:4, message: "Я завхоз и не ебите мне мозги", likes:2},
  {id:5, message: "Я поехал в налоговую за документами", likes:1},
  {id:101,message: "Стоять, блять! Кто идет?", likes:0}
];

let postsElements = postsData.map(e => {
  return <Post message={e.message} likes={e.likes} />;
})

const MyPosts = () => {
  return (
    <div className={s.postsBlock}>
      <div>
        <h3>Мои посты</h3>
        <div>
          <textarea></textarea>
        </div>
        <div>
          <button>Новый пост</button>
        </div>
      </div>
      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  );
}

export default MyPosts;