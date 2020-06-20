// Параметры: 
//    itemsArray - исходный массив объектов, 
//    propValue = значение сравниваемого поля объекта
//    propName - имя свойства объекта, по которому осуществляется поиск
//    newObj - новое значение объекта

// старый метод
// const updateObjectInArrayOLD = (itemsArray:any, propValue:any, propName:any, newObjProps:any) => {
//   return itemsArray.map((item:any) => {
//     if (item[propName] === propValue) {
//       return { ...item, ...newObjProps }; // замена свойств объекта item декомпозицией объекта newObjProps
//     }
//     return item; // если не нашли нужное значение, то item без изменения
//   });

// }

// Новый метод

// Общий тип для объекта, к которому можно образаться как obj["propName"]
type PropertyValueType = number // можно расширить. У нас пока userId:number
type IndexableObjectType = {[item: string]:PropertyValueType} // тип значения свойста объекта может быть любым - any. Може


// export function updateObjectInArray<O extends IndexableObjectType>(itemsArray:Array<O>, propValue:PropertyValueType, propName:string, newObjProps: any) {
//   return itemsArray.map((item) => {
//     return (item[propName] === propValue) ? { ...item, ...newObjProps } : item;
//     // if (item[propName] === propValue) {
//     //   return { ...item, ...newObjProps }; 
//     // }
//     // return item; 
//   });
// }

export function updateObjectInArray(itemsArray:any, propValue:PropertyValueType, propName:string, newObjProps: any) {
  return itemsArray.map((item:any) => {
    return (item[propName] === propValue) ? { ...item, ...newObjProps } : item;
    // if (item[propName] === propValue) {
    //   return { ...item, ...newObjProps }; 
    // }
    // return item; 
  });
}
