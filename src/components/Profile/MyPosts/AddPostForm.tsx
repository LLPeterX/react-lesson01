import React from 'react'
import {reduxForm, InjectedFormProps } from 'redux-form'
import {maxLength,required} from '../../../utils/validators/validators'
import { TextArea, createField, GetStringKeys } from '../../common/FormControls/FormControls'

const maxLength200 = maxLength(200);

export type AddPostFormValuesType = {
  newPostText: string
}
//type AddPostFormValuesKeysType = Extract<keyof AddPostFormValuesType, string>
type AddPostFormValuesKeysType = GetStringKeys<AddPostFormValuesType>
type PropsType = {}

let PostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {/* <Field name={'newPostText'} placeholder="Новый пост" component={TextArea} 
        validate={[required, maxLength200]} /> */}
        {createField<AddPostFormValuesKeysType>("Новый пост",'newPostText',[required, maxLength200],TextArea)}
      </div>
      <div>
        {/* <button onClick={onAddPost}>Новый пост</button> */}
        <button>Новый пост</button>
      </div>
    </form>

  );
}

export default reduxForm<AddPostFormValuesType,PropsType>({form: 'addPostForm'})(PostForm);
