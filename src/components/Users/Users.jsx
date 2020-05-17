import React from 'react';
import s from './Users.module.css';
import defaultAvatar from '../../assets/images/empty-avatar-png-18.png';
import { NavLink } from 'react-router-dom';
//import ReactPaginate from 'react-paginate';


let Users = (props) => {

  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) { pages.push(i); } // формируем массив [1,2,3,... pagesCount] - это номера страниц
  console.log('Current page: '+props.currentPage); // все время инкремент! почему?


  return (
    <div>
      <div>Total users: {props.totalUsersCount}</div>
      {/* Paginator */}
        {/* <ReactPaginate
          pageCount={pagesCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          initialPage={props.currentPage}
          subContainerClassName={s.paginator_item}
          containerClassName={s.paginator}
          pageClassName={s.paginator_item}
          previousClassName={s.paginator_item}
          nextClassName={s.paginator_item}
          breakClassName= {s.paginator_item}
          activeClassName={s.selectedPage}
          activeLinkClassName={s.selectedPage}
          onPageChange={(data) => props.onPageChanged(data.selected)}
        /> */}
      <div className={s.pagesMenu}>
        {

          pages.map(p =>
            <div className={p === props.currentPage ? s.selectedPage : ""} key={p}
              onClick={() => { props.onPageChanged(p) }}>{p}</div>
          )
        }

      </div>
      {
        props.users.map(u => <div key={u.id}>
          <span>
            <div>
              <NavLink to={"/profile/" + u.id}>
                <img src={u.photos.small != null ? u.photos.small : defaultAvatar} alt="" className={s.userPhoto} />
              </NavLink>
            </div>
            <div>
              {u.followed
                ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                  props.unfollow(u.id);
                }} >UnFollow</button>
                : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                  props.follow(u.id);
                }}>Follow</button>
              }
            </div>
          </span>
          <span>
            <span>
              {/* <div>{u.fullName}</div> */}
              <div>{u.id} : {u.name} </div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{"u.location.city"}</div>
              <div>{"u.location.country"}</div>
            </span>
          </span>
        </div>
        )
      }
    </div>
  ); // return
}

export default Users;