import React, { useState, useEffect } from 'react';

let ProfileStatusWithHooks = (props) => {

  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(
     () => {setStatus(props.status);}
     ,[props.status]
  );

  const onStatusChange = (event) => {
    setStatus(event.currentTarget.value);
  }

  const activateEditMode = () => {
    setEditMode(true);
  }

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  }

  return (
    <div>
      {!editMode ?
        <div>  <span onDoubleClick={activateEditMode}>{props.status || '=================='}</span> </div>
        :
        <div><input value={status} autoFocus={true} onBlur={deactivateEditMode} onChange={onStatusChange} /></div>
      }
    </div>
  );


}
export default ProfileStatusWithHooks;