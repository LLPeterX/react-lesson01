import React from "react";
import s from './Dialogs.module.css';
import { NavLink } from "react-router-dom";

const DialogItem = (props) => {
    return (
    <div className={`${s.dialog} ${s.active}`}>
        <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
    </div>
    );
}

const Message = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    );
}


const Dialogs = (props) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>

                <DialogItem name="Петя" id="1"/>
                <DialogItem name="Люда" id="2"/>
                <DialogItem name="Ира" id="3"/>
                <DialogItem name="Сергеич" id="4"/>
                <DialogItem name="Миша" id="5"/>
                <DialogItem name="Охранник" id="101"/>
            </div>
            <div className={s.messages}>
                <Message message="I got to break free!"/>
                <Message message="Приветики"/>
                <Message message="Опять прислали отчет"/>
                <Message message="Пью водку"/>
                <Message message="Я за рулем!"/>
                <Message message="Стой, кто идет!"/>
            </div>
        </div>
    );
}

export default Dialogs;