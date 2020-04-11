import React from "react";
import s from './Dialogs.module.css';

const Dialogs = (props) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <div className={`${s.dialog} ${s.active}`}> Петя </div>
                <div className={s.dialog}> Люда </div>
                <div className={s.dialog}> Ира </div>
                <div className={s.dialog}> Сергеич </div>
                <div className={s.dialog}> Охранник </div>
            </div>
            <div className={s.messages}>
                <div className={s.message}>I got to break free!</div>
                <div className={s.message}>Приветики!</div>
                <div className={s.message}>Опять прислали отчет</div>
                <div className={s.message}>Я не делал привики!</div>
                <div className={s.message}>Все говно...</div>

            </div>
        </div>
    );
}

export default Dialogs;