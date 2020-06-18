import React from 'react'
import s from "./MyPosts.module.css"
import Post from "./Post/Post"
import AddPostForm  from './AddPostForm'
import {PostType} from '../../../redux/profile-reducer'
import { reset } from 'redux-form'
import { AddPostFormValuesType } from  './AddPostForm'


type PropsType = {
  posts: Array<PostType>
  addPost: (newPostText:string) => void
}

let MyPosts:React.FC<PropsType> = (props) => {
  let postsElements = [...props.posts].reverse().map(e => <Post message={e.message} likes={e.likes} key={e.id} />);

  const onAddPost = (formData:AddPostFormValuesType) => {
    props.addPost(formData.newPostText);
    //dispatch(reset('addPostForm')); // очистить форму ввода
    reset('addPostForm'); // чистим форму
  };

  return (
    <div className={s.postsBlock}>
      <div>
        <h3>Мои посты</h3>

        <AddPostForm onSubmit={onAddPost}/>
      </div>

      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  );
};

const MemorizedMyPosts = React.memo(MyPosts);

export default MemorizedMyPosts;