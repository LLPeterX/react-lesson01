import React from "react";
import s from '../Dialogs.module.css';
import { NavLink } from "react-router-dom";
import {DialogType} from '../../../redux/dialogs-reducer'

// тип можно было импортировать из dialog-reducer
const DialogItem: React.FC<DialogType> = (props) => {
    return (
        <div className={`${s.dialog} ${s.active}`}>
            <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
        </div>
    );
}

export default DialogItem;