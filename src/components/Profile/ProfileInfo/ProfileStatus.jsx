import React from 'react';
//import s from './ProfileInfo.module.css'

class ProfileStatus extends React.Component {
  // local state
  state = {
    editMode: false,
    status: this.props.status // начальное значение берём из props
  }
  activateEditMode = () => {
    this.setState({ editMode: true });
  }

  deactivateEditMode = () => {
    this.setState({ editMode: false });
    this.props.updateStatus(this.state.status);
  }

  onStatusChange = (event) => {
    this.setState({ status: event.currentTarget.value });
  }

  componentDidUpdate(prevProps, prevState) {
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