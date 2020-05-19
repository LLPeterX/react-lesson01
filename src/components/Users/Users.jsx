import React from 'react';
import s from './Users.module.css';
import defaultAvatar from '../../assets/images/empty-avatar-png-18.png';
import { NavLink } from 'react-router-dom';
import Pagination from "react-js-pagination";
//import ReactPaginate from 'react-paginate';
// нихуя не получается с ReactPaginate!

class Users extends React.Component {

  constructor(props) {
    super(props);
    this.pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
    this.pages = [];
    let maxVisiblePages = this.pagesCount > 20 ? 20 : this.pagesCount;
    for (let i = 1; i <= maxVisiblePages; i++) { this.pages.push(i); } // формируем массив [1,2,3,... pagesCount] - это номера страниц
    // local state for Pagination
    this.state = {
      activePage: this.props.currentPage
    };
  }
  
  componentDidMount() {
  }
  
  handlePageChange(pageNumber) {
//    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
    this.props.onPageChanged(pageNumber);
  }
  render() {
    return (
      <div>
        <div className={s.paginationContainer}>
        <div>Total users: {this.props.totalUsersCount}</div>
        {/* Paginator */}
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={this.props.totalUsersCount}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
          nextPageText='>'
          prevPageText='<'
          activeClass={s.selectedPage}
          itemClass={s.pagination_item}
          activeLinkClass = {s.pagination_item_link}
          linkClass = {s.pagination_item_link}

        />
        </div>
        {/* <div className={s.pagesMenu}>
          {

            this.pages.map(p =>
              <div className={p === this.props.currentPage ? s.selectedPage : ""} key={p}
                onClick={() => { this.props.onPageChanged(p) }}>{p}</div>
            )
          }

        </div> */}
        {
          this.props.users.map(u => <div key={u.id}>
            <span>
              <div>
                <NavLink to={"/profile/" + u.id}>
                  <img src={u.photos.small != null ? u.photos.small : defaultAvatar} alt="" className={s.userPhoto} />
                </NavLink>
              </div>
              <div>
                {u.followed
                  ? <button disabled={this.props.followingInProgress.some(id => id === u.id)} onClick={() => {
                    this.props.unfollow(u.id);
                  }} >UnFollow</button>
                  : <button disabled={this.props.followingInProgress.some(id => id === u.id)} onClick={() => {
                    this.props.follow(u.id);
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

}

export default Users;