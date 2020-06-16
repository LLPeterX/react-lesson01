import { InferActionsTypes } from "./redux-store";

type DialogType = {
  id: number
  name: string
}

type MessageType = {
  id: number
  message: string
}

let initialState = {
  dialogs: [
    { id: 1, name: "Петя" },
    { id: 2, name: "Ира" },
    { id: 3, name: "Худякова" },
    { id: 4, name: "Сергеич" },
    { id: 5, name: "Миша" },
    { id: 101, name: "Охраник Вася" }
  ] as Array<DialogType>,
  messages: [
    { id: 1, message: "Gotha!" },
    { id: 2, message: "Надо сделать отчет" },
    { id: 3, message: "Людочка - хорошая девочка" },
    { id: 4, message: "Вчера был потоп. Я перекрыл воду." },
    { id: 5, message: "Миша поехал в ФНС" },
    { id: 101, message: "Охранник не пустил меня" }
  ] as Array<MessageType>
};

export type InitialStateType = typeof initialState
export type ActionsType = InferActionsTypes<typeof actions>

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SEND_MESSAGE':
      let msgText = action.bodyText;
      // получаем макс. id в массиве объектов
      let lastMsg = state.messages.reduce((acc, curr) => acc.id > curr.id ? acc : curr);
      let nextId = lastMsg.id + 1;
      // добавляем новый элемент в массив messages.
      console.log(`addMessage reducer: text=${msgText} id=${nextId}`);
      let newState = {
        ...state,
        messages: [...state.messages, { id: nextId, message: msgText + " (id=" + nextId + ")" }]
      }
      console.log(newState);
      
      return newState
    default:
      return state;
  }

}

export const actions = {
  sendMessageActionCreator: (text: string) => ({ type: 'SEND_MESSAGE', bodyText: text }) as const
}

export default dialogsReducer;