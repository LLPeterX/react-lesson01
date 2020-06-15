// Параметры: 
//    itemsArray - исходный массив объектов, 
//    propValue = значение сравниваемого поля объекта
//    propName - имя свойства объекта, по которому осуществляется поиск

import { UserType } from "../types/types";

//    newObj - новое значение объекта
export const updateObjectInArrayOLD = (itemsArray:any, propValue:any, propName:any, newObjProps:any) => {
  return itemsArray.map((item:any) => {
    if (item[propName] === propValue) {
      return { ...item, ...newObjProps }; // замена свойств объекта item декомпозицией объекта newObjProps
    }
    return item; // если не нашли нужное значение, то item без изменения
  });

}
// Общий тип для объекта, к которому можно образаться как obj["propName"]
// Вместо any можно задать конкретные типы (примитивы + UserType)
type IndexableObjectType = {[item: string]:any} // значение свойств объекта может быть любым

export function updateObjectInArray<O extends IndexableObjectType>(itemsArray:Array<O>, propValue:keyof any, propName:string, newObjProps: any) {
  return itemsArray.map((item:O) => {
    if (item[propName] === propValue) {
      return { ...item, ...newObjProps }; 
    }
    return item; 
  });
}
