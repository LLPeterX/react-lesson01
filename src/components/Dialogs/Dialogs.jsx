import React from 'react'
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { TextArea } from '../common/FormControls/FormControls';
import { required, maxLength } from '../../utils/validators/validators';


// redux forms
const  maxLength20=maxLength(20);

const DialogForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name={'newMessageBody'} placeholder="Введите свое сообщение" component={TextArea} 
        validate={[required, maxLength20]}/>
      </div>
      <div>
        <button>Добавить сообщение</button>
      </div>
    </form>

  );
}

let DialogFormRedux = reduxForm({form: 'dialogsForm'})(DialogForm);

const Dialogs = (props) => {
  let state = props.dialogsPage;
  let dialogElements = state.usersData.map(e => <DialogItem name={e.name} key={e.id} id={e.id} />); // список юзеров
  let messageElements = state.msgData.map(m => <Message message={m.message} key={m.id} />); // список нагих сообщений

  if (!props.isAuth) return <Redirect to='/login' />;

  let addMessage = (formData) => {
    props.sendMessage(formData.newMessageBody);
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {dialogElements}
      </div>
      <div className={s.messages}>
        {messageElements}
      </div>

      <DialogFormRedux onSubmit={addMessage}/>

    </div>
  );
}

export default Dialogs;