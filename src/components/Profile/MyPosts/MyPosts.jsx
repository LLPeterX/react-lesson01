// точку с запятой можно не ставить
import React from 'react'
import s from "./MyPosts.module.css"
import Post from "./Post/Post";

let postData = [
  {id:1, message:"Gotta to break free!", likes:10},
  {id:2, message:"Помоги с Excel!", likes:12},
  {id:3, nmessage: "Сделай отчет по активам. Лежит в папке N:\\HOME", likes:1},
  {id:4, message: "Я завхоз и не ебите мне мозги", likes:2},
  {id:5, message: "Я поехал в налоговую за документами", likes:1},
  {id:101,message: "Стоять, блять! Кто идет?", likes:0}
];

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
        <Post message={postData[0].message} likes={postData[0].likes} />
        <Post message={postData[1].message} likes={postData[1].likes} />
        <Post message={postData[2].message} likes={postData[2].likes} />
      </div>
    </div>
  );
}

export default MyPosts;