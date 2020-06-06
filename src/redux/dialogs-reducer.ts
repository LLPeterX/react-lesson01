const SEND_MESSAGE = 'lesson001/dialogs/SEND-MESSAGE';


type UsersDataType = {
  id: number
  name: string
}
type MessagesDataType = {
  id: number
  message: string
}

export type InitialStateType = {
  usersData: Array<UsersDataType>
  msgData: Array<MessagesDataType>
}

type SendMessageActionType = {
  type: typeof SEND_MESSAGE
  bodyText: string
}

let initialState:InitialStateType = {
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
  
};

const dialogsReducer = (state = initialState, action:SendMessageActionType):InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE:
      let msgText = action.bodyText;
      let lastMsg = state.msgData.reduce((acc, curr) => acc.id > curr.id ? acc : curr);
      let nextId = lastMsg.id + 1;
      // добавляем новый элемент в массив msgData.
      return {
        ...state,
        msgData: [...state.msgData, {id: nextId, message: msgText+" (id="+nextId+")"}]
      };
    default:
      return state;
  }

}

export const sendMessageCreator = (text:string):SendMessageActionType => {
  return { type: SEND_MESSAGE, bodyText: text };
}

export default dialogsReducer;