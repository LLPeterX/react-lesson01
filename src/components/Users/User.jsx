import React from 'react';
import s from './Users.module.css';
import defaultAvatar from '../../assets/images/empty-avatar-png-18.png';
import { NavLink } from 'react-router-dom';

class User extends React.Component {

  render() {
    return (
      <div key={this.props.user.id} className={s.userData}>
        <span>
          <div>
            <NavLink to={"/profile/" + this.props.user.id}>
              <img src={this.props.user.photos.small ? this.props.user.photos.small : defaultAvatar} alt="" className={s.userPhoto} />
              {/* <img src={defaultAvatar} alt="" className={s.userPhoto} /> */}
            </NavLink>
          </div>
          <div>
            {this.props.user.followed
              ? <button disabled={this.props.followingInProgress.some(id => id === this.props.user.id)} onClick={() => {
                this.props.unfollow(this.props.user.id);
              }} >UnFollow</button>
              : <button disabled={this.props.followingInProgress.some(id => id === this.props.user.id)} onClick={() => {
                this.props.follow(this.props.user.id);
              }}>Follow</button>
            }
          </div>
        </span>
        <span>
          <span>
            <div>{this.props.user.id} : {this.props.user.name} </div>
            <div>{this.props.user.status}</div>
          </span>
          <span>
            {/* <div>{"u.location.city"}</div> */}
            <div>{this.props.user.location && this.props.user.location.city }</div>
            <div>{this.props.user.location && this.props.user.location.country }</div>
            {/* <div>{"u.location.country"}</div> */}
          </span>
        </span>
      </div>
    )
  }
}

export default User;