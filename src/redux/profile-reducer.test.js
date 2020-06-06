import profileReducer from "./profile-reducer.ts";
import { addPostActionCreator, deletePost } from "./profile-reducer.ts";

// тестовые данные 
let initialState = {
  postsData: [
    { id: 1, message: "Test message 1", likes: 2 },
    { id: 2, message: "Test message 2", likes: 20 },
    { id: 3, message: "Test message 3", likes: 1 },
    { id: 4, message: "Test message 4", likes: 100500 }
  ] // еще были profile и status, но мы их не тестируем
};

test('after add new post the array length should be 5', () => {
  // 1. Подходавиваем входящие данные - тестовые данные
  let action = addPostActionCreator('Test text');
  // 2. Вычисляем выходные данные
  let newState = profileReducer(initialState, action);
  // после этого массив newState.posts[] должен содержать 3-й элемент с id-3 и текстом 'Test Text'
  //3. Проверяем корректность выходных данных
  // Ожидаем, что длина массива=5
  expect(newState.postsData.length).toBe(5);
  expect(newState.postsData[4].id).toBe(5);
  expect(newState.postsData[4].message).toBe('Test text');
  expect(newState.postsData).toContainEqual({id:5, message: 'Test text', likes: 0});
});

test('after post delete the array length must be decremented', () => {
  let action = deletePost(2); // дпустим, удаляем пост N 2. Длина массива должна стать 4
  let newState = profileReducer(initialState, action);
  expect(newState.postsData.length).toBe(3);
});

test('test for incorrect ID: length should be same', () => {
  let action = deletePost(2000); 
  let newState = profileReducer(initialState, action);
  console.log(newState.postsData);
  expect(newState.postsData.length).toBe(4);
});