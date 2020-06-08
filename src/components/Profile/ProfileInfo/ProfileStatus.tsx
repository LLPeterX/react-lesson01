import React from 'react';

type PropsType = {
  status: string
  updateStatus: (status: string) => void
}

type LocalStateType = {
  editMode: boolean
  status: string
}

class ProfileStatus extends React.Component<PropsType, LocalStateType> {
  // local state
  state = {
    editMode: false,
    status: this.props.status // начальное значение берём из props
  }
  // methods
  activateEditMode = ():void => {
    this.setState({ editMode: true });
  }

  deactivateEditMode = ():void => {
    this.setState({ editMode: false });
    this.props.updateStatus(this.state.status);
  }

  onStatusChange = (event: React.FormEvent<HTMLInputElement>):void => {
    this.setState({ status: event.currentTarget.value });
  }

  componentDidUpdate(prevProps:PropsType, prevState:LocalStateType) {
    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status });
    }
  }


  render() {
    return (
      <div>
        {!this.state.editMode ?
          <div>
            <span onDoubleClick={() => { this.activateEditMode() }}>{this.props.status || '(нет статуса)'}</span>
          </div>
          :
          <div>
            <input value={this.state.status} onBlur={() => { this.deactivateEditMode() }}
              autoFocus={true} onChange={this.onStatusChange} />
          </div>
        }
      </div>
    );
  } // render

}
export default ProfileStatus;