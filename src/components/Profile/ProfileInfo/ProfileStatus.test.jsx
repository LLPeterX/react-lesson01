import React from 'react'
import {create} from 'react-test-renderer'
import ProfileStatus from './ProfileStatus'

describe("ProfileStatus test", () => {
  test("Status form props should be in the local state", () => {
    const component = create(<ProfileStatus status={'Test status'} />); // создаем объект классовой компоненты
    const instance = component.getInstance(); // получаем ссылку на объект
      expect(instance.state.status).toBe('Test status'); // получаем свойство объекта и сравниваем с ожидаемым
  });
  test("Intially <span> should be displayed", () => {
    const component = create(<ProfileStatus status={'Test status'} editMode={false}/>); 
    const root = component.root;
    const span = root.findByType("span");
    //expect(span).not.toBe(undefined); 
    expect(span).not.toBeUndefined();
  });

  // test("Intially <input> should NOT be displayed", () => {
  //   const component = create(<ProfileStatus status={'Test status'} editMode={false}/>); 
  //   const root = component.root;
  //   const input = root.findByType("input");
  //   expect(input).toBeUndefined();
  // });
  
  test("Intially <span> should contains correct status", () => {
    const component = create(<ProfileStatus status={'Test status'}/>); 
    const instance = component.root;
    const span = instance.findByType("span");
    expect(span.children[0]).toBe('Test status'); 
  });

  test("After switch to editMode <input> should be visible", () => {
    const component = create(<ProfileStatus status={'Test status'}/>); 
    const instance = component.getInstance();
    const root = component.root;
    const span = root.findByType("span");
    span.props.onDoubleClick();
    const input = root.findByType("input");
    expect(instance.state.editMode).toBe(true);
    expect(input).not.toBeUndefined();
    expect(input.props.value).toBe('Test status');
  });

  test("check callback 'deactivateEditMode' is called", () => {
    const mockCallback = jest.fn();
    const component = create(<ProfileStatus status={'Test status'} updateStatus={mockCallback}/>); 
    const instance = component.getInstance();
    instance.deactivateEditMode();
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0]).toBe('Test status');
  });
  
});

