import React, { useState, useEffect, ChangeEvent } from 'react';

type PropsType = {
  status: string
  updateStatus: (status: string) => void
}

let ProfileStatusWithHooks:React.FC<PropsType> = (props) => {

  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(
     () => {setStatus(props.status);}
     ,[props.status]
  );

  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
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