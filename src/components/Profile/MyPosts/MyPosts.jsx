import React from 'react'
import s from "./MyPosts.module.css"
import Post from "./Post/Post"
import { Field, reduxForm } from 'redux-form'
import {required, maxLength} from '../../../utils/validators/validators'
import { TextArea } from '../../common/FormControls/FormControls'
// import {reset} from 'redux-form';
// import {dispatch} from 'redux'

const maxLength200 = maxLength(200);

let AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name={'newPostText'} placeholder="Новый пост" component={TextArea} 
        validate={[required, maxLength200]} />
      </div>
      <div>
        {/* <button onClick={onAddPost}>Новый пост</button> */}
        <button>Новый пост</button>
      </div>
    </form>

  );
}

let AddMessageFormRedux = reduxForm({form: 'mypost'})(AddMessageForm);

let MyPosts = React.memo(props => {

  //debugger;
  let postsElements = [...props.posts].reverse().map(e => <Post message={e.message} likes={e.likes} key={e.id} />);

  const onSubmit = (formData) => {
    props.addPost(formData.newPostText);
    //dispatch(reset('mypost')); // очистить форму ввода
  };


  return (
    <div className={s.postsBlock}>
      <div>
        <h3>Мои посты</h3>

        <AddMessageFormRedux onSubmit={onSubmit}/>
      </div>

      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  );
});

export default MyPosts;