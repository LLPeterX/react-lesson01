// Параметры: 
//   itemsArray - исходный массив объектов, 
//    propValue = значение сравниваемого поля объекта
//    propName - имя свойства объекта, по которому осуществляется поиск
//    newObj - новое значение объекта
export const updateObjectInArray = (itemsArray, propValue, propName, newObjProps) => {
  return itemsArray.map(item => {
    if (item[propName] === propValue) {
      return { ...item, ...newObjProps }; // замена свойств объекта item декомпозицией объекта newObjProps
    }
    return item; // если не нашли нужное значение, то item без изменения
  });

}
