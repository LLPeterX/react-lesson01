import React from 'react';
import s from './Users.module.css';
import defaultAvatar from '../../assets/images/empty-avatar-png-18.png';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/types';

type PropsType = {
  user: UserType
  followingInProgress: Array<number>
  follow: (userId: number) => void
  unfollow: (userId: number) => void
}

class User extends React.Component<PropsType> {

  render() {
    return (
      <div key={this.props.user.id} className={s.userData}>
        <span>
          <div>
            <NavLink to={"/profile/" + this.props.user.id}>
              <img src={this.props.user.photos.small ? this.props.user.photos.small : defaultAvatar} alt="" className={s.userPhoto} />
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
        </span>
      </div>
    )
  }
}

export default User;