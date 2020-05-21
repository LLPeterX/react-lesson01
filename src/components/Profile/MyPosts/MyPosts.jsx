import React from 'react'
import s from "./MyPosts.module.css"
import Post from "./Post/Post";
import { Field, reduxForm } from 'redux-form';
import {required, maxLength} from '../../../utils/validators/validators';
import { TextArea } from '../../common/FormControls/FormControls';

const maxLength10 = maxLength(10);

let AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name={'newPostText'} placeholder="Новый пост" component={TextArea} 
        validate={[required, maxLength10]} />
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
  let postsElements = props.posts.map(e => <Post message={e.message} likes={e.likes} key={e.id} />);

  const onSubmit = (formData) => {
    props.addPost(formData.newPostText);
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