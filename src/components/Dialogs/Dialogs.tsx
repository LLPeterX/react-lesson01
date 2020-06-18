import React from 'react'
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { InitialStateType } from '../../redux/dialogs-reducer'
import AddMessageForm from './AddMessageForm'
import {NewMessageFormValuesType} from './AddMessageForm'

// redux forms


type PropsType = {
  dialogsPage: InitialStateType
  sendMessage: (text: string) => void
}

const Dialogs: React.FC<PropsType> = (props) => {
  let state = props.dialogsPage;
  let dialogElements = state.dialogs.map(e => <DialogItem name={e.name} key={e.id} id={e.id} />); // список юзеров
  let messageElements = state.messages.map(m => <Message message={m.message} key={m.id} />); // список наших сообщений
  
  let addMessage = (formData: NewMessageFormValuesType) => {
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

      <AddMessageForm onSubmit={addMessage} />

    </div>
  );
}

export default Dialogs;