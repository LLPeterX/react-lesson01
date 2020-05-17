import React from "react";
import s from '../Dialogs.module.css'; // импорт на уровень выше

const Message = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    );
}


export default Message;