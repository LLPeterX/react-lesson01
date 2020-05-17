//const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
  usersData: [
    { id: 1, name: "Петя" },
    { id: 2, name: "Ира" },
    { id: 3, name: "Худякова" },
    { id: 4, name: "Сергеич" },
    { id: 5, name: "Миша" },
    { id: 101, name: "Охраник Вася" }
  ],
  msgData: [
    { id: 1, message: "Gotha!" },
    { id: 2, message: "Надо сделать отчет" },
    { id: 3, message: "Людочка - хорошая девочка" },
    { id: 4, message: "Вчера был потоп. Я перекрыл воду." },
    { id: 5, message: "Миша поехал в ФНС" },
    { id: 101, message: "Охранник не пустил меня" }
  ]
  //,newMessageBody: ''
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    // case UPDATE_NEW_MESSAGE_BODY:
    //   //newState = {...state};
    //   //newState.newMessageBody = action.bodyText;
    //   return {...state, newMessageBody: action.bodyText};
    case SEND_MESSAGE:
      //let msgText = state.newMessageBody;
      let msgText = action.bodyText;
      let lastMsg = state.msgData.reduce((acc, curr) => acc.id > curr.id ? acc : curr);
      let nextId = lastMsg.id + 1;
      
      return {
        ...state,
        newMessageBody: '',
        msgData: [...state.msgData, {id: nextId, message: msgText+" (id="+nextId+")"}]
      };
    default:
      return state;
  }

}

export const sendMessageCreator = (text) => {
  return { type: SEND_MESSAGE, bodyText: text };
}

// export const updateNewMessageBodyCreator = (text) => {
//   return { type: UPDATE_NEW_MESSAGE_BODY, bodyText: text };
// }

export default dialogsReducer;