import React from 'react';
import Pagination from "react-js-pagination";
import User from './User';
import s from './Users.module.css'
import { UserType } from '../../types/types';

type LocalStateType = {
  activePage: number
}

type PropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  users: Array<UserType>
  follow: (userId:number) => void
  unfollow: (userId:number) => void
  followingInProgress: Array<number>
}

class Users extends React.Component<PropsType,LocalStateType> {
  pagesCount: number;

  constructor(props:PropsType) {
    super(props);
    this.pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
    //this.pages = [];
    //let maxVisiblePages = this.pagesCount > 20 ? 20 : this.pagesCount;
    //for (let i = 1; i <= maxVisiblePages; i++) { this.pages.push(i); } // формируем массив [1,2,3,... pagesCount] - это номера страниц
    // local state for Pagination
    this.state = {
      activePage: this.props.currentPage
    };
  }


  handlePageChange(pageNumber:number) {
    this.setState({ activePage: pageNumber });
    this.props.onPageChanged(pageNumber);
  }
  render() {
    return (
      <div>
        <div className={s.paginationContainer}>
          <div>Total users: {this.props.totalUsersCount}</div>
          <Pagination activePage={this.state.activePage}
            itemsCountPerPage={9}
            totalItemsCount={this.props.totalUsersCount}
            pageRangeDisplayed={10}
            onChange={this.handlePageChange.bind(this)}
            nextPageText='>'
            prevPageText='<'
            activeClass={s.selectedPage}
            itemClass={s.pagination_item}
            activeLinkClass={s.pagination_item_link}
            linkClass={s.pagination_item_link}
          />
        </div>
        <div className={s.usersList}>
          {
            this.props.users.map(u =>
              <User user={u} followingInProgress={this.props.followingInProgress}
                follow={this.props.follow} unfollow={this.props.unfollow}
                key={u.id} />
            )
          }
        </div>
      </div>
    ); // return
  }

}

export default Users;