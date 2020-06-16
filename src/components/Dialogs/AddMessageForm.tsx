import React from 'react'
//import s from './Dialogs.module.css';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { TextArea, createField } from '../common/FormControls/FormControls';
import { required, maxLength } from '../../utils/validators/validators';
import {NewMessageFormValuesType} from './Dialogs'

const  maxLength50=maxLength(50);

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>
type PropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {/* <Field name={'newMessageBody'} placeholder="Введите свое сообщение" component={TextArea} 
        validate={[required, maxLength20]}/> */}
        {createField<NewMessageFormValuesKeysType>("Введите свое сообщение",'newMessageBody',[required, maxLength50],TextArea)}
      </div>
      <div>
        <button>Добавить сообщение</button>
      </div>
    </form>

  );
}

export default reduxForm<NewMessageFormValuesType,PropsType>({form: 'dialogsForm'})(AddMessageForm);