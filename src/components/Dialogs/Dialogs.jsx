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

let usersData = [
    {id:1, name:"Петя"},
    {id:2, name:"Люда"},
    {id:3, name:"Ира"},
    {id:4, name: "Сергеич"},
    {id:5, name: "Миша"},
    {id:101,name: "Охранник"}
];

let messagesData = [
    {id:1, message:"Gotta to break free!"},
    {id:2, message:"Помоги с Excel!"},
    {id:3, message: "Сделай отчет по активам. Лежит в папке N:\\HOME"},
    {id:4, message: "Я завхоз и не ебите мне мозги"},
    {id:5, message: "Я поехал в налоговую за документами"},
    {id:101,message: "Стоять, блять! Кто идет?"}
];

// let dialogElements = [
//     <DialogItem name={usersData[0].name} id={usersData[0].id}/>,
//     <DialogItem name={usersData[1].name} id={usersData[1].id}/>
// ];

let dialogElements = usersData.map((el) => { return (<DialogItem name={el.name} id={el.id}/>);});
let messageElements = messagesData.map(e => { return(<Message message={e.message}/>); });

const Dialogs = (props) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                {messageElements}
            </div>
        </div>
    );
}

export default Dialogs;